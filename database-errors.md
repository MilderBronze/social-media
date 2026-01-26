# Common Database & Prisma Errors

This is a debugging guide for the most common database errors you'll encounter.

## P2002: Unique Constraint Violation

**Error Message:**

```
Unique constraint failed on the fields: (`email`)
```

**What It Means:**
You tried to insert a record with a value that must be unique, but that value already exists.

**Common Causes:**

- Trying to create a user with an email that already exists
- Creating a follow request between the same two users twice
- Duplicate username

**Example:**

```typescript
// ❌ This fails if user already exists
await prisma.user.create({
  data: {
    id: "user_123",
    username: "johndoe", // If "johndoe" already exists → P2002 error
    email: "john@example.com",
  },
});
```

**How to Fix:**

```typescript
// ✅ Check if exists first
const existing = await prisma.user.findUnique({
  where: { username: "johndoe" },
});
if (existing) {
  throw new Error("Username already taken");
}
// OR use upsert
await prisma.user.upsert({
  where: { username: "johndoe" },
  update: { email: "new@example.com" },
  create: { id: "user_123", username: "johndoe", email: "new@example.com" },
});
```

---

## P2003: Foreign Key Constraint Violation ⭐ MOST COMMON

**Error Message:**

```
Foreign key constraint violated on the constraint: `FollowRequest_senderId_fkey`
```

**What It Means:**
You tried to insert a record referencing another record that doesn't exist.

**Common Causes:**

- User not synced to database (your issue!)
- Deleting a user while they still have posts/comments
- Reference ID doesn't exist in the parent table
- Type mismatch in IDs (e.g., String vs Int)

**Example:**

```typescript
// ❌ This fails if userId doesn't exist in User table
await prisma.post.create({
  data: {
    desc: "My post",
    userId: "nonexistent_user_id", // P2003: User doesn't exist
  },
});
```

**How to Fix:**

```typescript
// ✅ Verify the referenced record exists
const userExists = await prisma.user.findUnique({ where: { id: userId } });
if (!userExists) {
  throw new Error("User does not exist");
}
// Then create the post
await prisma.post.create({
  data: { desc: "My post", userId },
});
```

**Prevention Strategy:**

```typescript
// Always check foreign keys before creating relations
const sender = await prisma.user.findUnique({ where: { id: senderId } });
const receiver = await prisma.user.findUnique({ where: { id: receiverId } });

if (!sender || !receiver) {
  throw new Error("One or both users don't exist");
}

await prisma.followRequest.create({
  data: { senderId, receiverId },
});
```

---

## P2025: Record Not Found

**Error Message:**

```
An operation failed because it depends on one or more records that were not found
```

**What It Means:**
You tried to find, update, or delete a record that doesn't exist.

**Common Causes:**

- Finding a user by ID that doesn't exist
- Deleting a post that's already deleted
- Updating a non-existent record

**Example:**

```typescript
// ❌ This fails if postId doesn't exist
await prisma.post.delete({
  where: { id: 999 }, // P2025: Post doesn't exist
});
```

**How to Fix:**

```typescript
// ✅ Check existence first
const post = await prisma.post.findUnique({ where: { id: 999 } });
if (!post) {
  throw new Error("Post not found");
}
await prisma.post.delete({ where: { id: 999 } });
```

---

## P2014: Required Relation Violation

**Error Message:**

```
The change violates a required relation between models
```

**What It Means:**
You tried to delete a parent record that has required child records depending on it.

**Common Causes:**

- Deleting a user who has posts (if relation isn't cascade)
- Deleting a post that has comments
- Schema doesn't have `onDelete: Cascade` set

**How to Fix:**

```prisma
// In schema.prisma, add onDelete: Cascade
model Post {
  id     Int     @id @default(autoincrement())
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String
}
```

---

## P2016: Query Interpretation Error

**Error Message:**

```
Query interpretation error
```

**What It Means:**
Your Prisma query syntax is wrong or the where clause is invalid.

**Common Causes:**

- Wrong field name in where clause
- Type mismatch (comparing String to Int)
- Using wrong relation syntax

**Example:**

```typescript
// ❌ Wrong field name
await prisma.user.findUnique({
  where: { usernme: "john" }, // Typo: "usernme" instead of "username"
});

// ❌ Type mismatch
await prisma.post.findUnique({
  where: { id: "123" }, // id is Int, not String
});
```

**How to Fix:**

```typescript
// ✅ Use correct field name and type
await prisma.user.findUnique({
  where: { username: "john" },
});

await prisma.post.findUnique({
  where: { id: 123 }, // Int, not String
});
```

---

## P1000: Authentication Failed

**Error Message:**

```
Authentication failed against database server at `...` Could not connect to the server
```

**What It Means:**
Cannot connect to the database. Usually a connection string issue.

**Common Causes:**

- Wrong `DATABASE_URL` in `.env`
- Database server is down
- Network connectivity issues
- Wrong credentials

**How to Fix:**

```bash
# ✅ Verify your connection string
echo $DATABASE_URL

# ✅ Test the connection
npx prisma db execute --stdin < select 1

# ✅ Or verify database is running
psql -U postgres
```

---

## P1001: Timed Out

**Error Message:**

```
Can't reach database server at `...` Timeout after 10s
```

**What It Means:**
Connection attempt timed out - database is unreachable or very slow.

**How to Fix:**

```bash
# ✅ Check if database is running
psql -U postgres -d postgres -c "SELECT 1"

# ✅ Check network connectivity
ping <database-host>

# ✅ Increase timeout in connection string
DATABASE_URL="postgresql://user:pass@host/db?connect_timeout=20"
```

---

## Quick Error Reference Table

| Code  | Name                        | Cause                                     | Quick Fix                         |
| ----- | --------------------------- | ----------------------------------------- | --------------------------------- |
| P2002 | Unique Constraint           | Duplicate value in unique field           | Check if exists, use upsert       |
| P2003 | Foreign Key Violation       | Referenced record doesn't exist           | Verify parent record exists       |
| P2025 | Record Not Found            | Trying to update/delete non-existent item | Add existence check               |
| P2014 | Required Relation Violation | Deleting record with required children    | Add `onDelete: Cascade` to schema |
| P2016 | Query Interpretation Error  | Invalid query syntax or field name        | Check field names and types       |
| P1000 | Auth Failed                 | Can't connect to database                 | Verify `DATABASE_URL`             |
| P1001 | Timed Out                   | Database unreachable or too slow          | Check if DB is running            |

---

## Debugging Strategy

When you get a database error:

1. **Read the error code first** - P2002? P2003? Use the table above
2. **Check the specific constraint** - "Foreign key constraint: `X_Y_fkey`" tells you exactly which field
3. **Add logging** - Log the data being inserted/updated to see the exact values
4. **Verify prerequisites** - Does the parent record exist? Is the field unique? Is the data type correct?
5. **Test in Prisma Studio** - `npx prisma studio` to visually inspect your data

---

## Tools for Debugging

### Prisma Studio

Visually inspect your database:

```bash
npx prisma studio
```

Opens a web UI where you can:

- Browse all tables
- Search for specific records
- Manually create/edit/delete data
- See relationships between tables

### Console Logging Pattern

```typescript
console.log("Creating follow request with:", {
  senderId: currentUserId,
  receiverId: userId,
  senderExists: !!currentUserExists,
  receiverExists: !!targetUserExists,
});
```

### Database Query Pattern

```typescript
// Always log what you're inserting
try {
  const result = await prisma.followRequest.create({
    data: { senderId, receiverId },
  });
  console.log("Follow request created:", result);
} catch (error) {
  console.error("Full error object:", error);
  console.error("Error code:", error.code);
  console.error("Error meta:", error.meta);
  throw error;
}
```
