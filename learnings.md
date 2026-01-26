notFound from next/navigate helps render the classic prebuilt 404 not found page.

server actions create krne hetu aap lib folder me action.ts file banate ho.

## Hooks Overview

### 1. useFormStatus

**Purpose**: Provides the status of a form submission (pending, submitted, etc.) from the parent form element.

**Key Points**:

- Imported from `react-dom`, not React
- Only works inside a `<form>` element
- Returns an object with `pending` (boolean) and `data` (FormData)

**Examples**:

```tsx
// Example 1: Loading indicator during form submission
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

// Example 2: Dynamic text based on form state
export function FormButton() {
  const { pending } = useFormStatus();
  return <button>{pending ? "Loading..." : "Send Request"}</button>;
}

// Example 3: Used in your project (UpdateButton.tsx)
const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>{pending ? "Updating..." : "Update"}</button>
  );
};
```

---

### 2. useActionState

**Purpose**: Manages state returned from a server action and provides a wrapped version of that action.

**Key Points**:

- Replaces the deprecated `useFormState` hook
- Takes a server action and initial state
- Returns `[state, formAction]` tuple
- `formAction` should be passed to form's `action` prop
- State updates when server action completes

**Examples**:

```tsx
// Example 1: Form with validation feedback
import { useActionState } from "react";
import { updateProfile } from "@/lib/actions";

export function ProfileForm() {
  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
    message: "",
  });

  return (
    <form action={formAction}>
      <input name="username" />
      {state.error && <p style={{ color: "red" }}>{state.message}</p>}
      {state.success && <p style={{ color: "green" }}>Profile updated!</p>}
      <button type="submit">Update</button>
    </form>
  );
}

// Example 2: Used in your project (UpdateUser.tsx)
const [state, formAction] = useActionState(updateProfile, {
  success: false,
  error: false,
});

return (
  <form action={formAction}>
    <input type="file" name="cover" />
    <button type="submit">Save Changes</button>
    {state.success && <div>Profile updated!</div>}
  </form>
);

// Example 3: Multi-step form with state tracking
export function CheckoutForm() {
  const [state, formAction] = useActionState(processPayment, {
    step: 1,
    paymentId: null,
    error: null,
  });

  return (
    <form action={formAction}>
      <input name="cardNumber" />
      {state.error && <p>{state.error}</p>}
      <p>Step: {state.step}</p>
      <button>Process Payment</button>
    </form>
  );
}
```

---

### 3. useOptimistic

**Purpose**: Immediately updates the UI with optimistic data while a server action is still processing.

**Key Points**:

- Provides instant feedback to the user (perceived performance)
- Takes initial state and reducer function
- Returns `[optimisticState, updateOptimisticState]`
- Reverts to real state if server action fails
- Used for follow/unfollow, like/unlike, accept/decline actions

**Examples**:

```tsx
// Example 1: Toggle follow button
import { useOptimistic, useState } from "react";
import { switchFollow } from "@/lib/actions";

export function FollowButton({ userId, initialFollowed }) {
  const [followed, setFollowed] = useState(initialFollowed);

  const [optimisticFollowed, toggleOptimistic] = useOptimistic(
    followed,
    (state) => !state, // Toggle the state immediately
  );

  const handleClick = async () => {
    toggleOptimistic(); // UI updates instantly
    await switchFollow(userId); // Then call server
    // If it fails, it reverts to original state
  };

  return (
    <button onClick={handleClick}>
      {optimisticFollowed ? "Following" : "Follow"}
    </button>
  );
}

// Example 2: Remove item from list optimistically
export function ItemList({ items, itemId }) {
  const [optimisticItems, removeOptimistic] = useOptimistic(
    items,
    (state, itemToRemove) => state.filter((i) => i.id !== itemToRemove),
  );

  const handleDelete = async (id) => {
    removeOptimistic(id); // UI updates immediately
    await deleteItem(id); // Then call server
  };

  return (
    <ul>
      {optimisticItems.map((item) => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

// Example 3: Used in your project (UserInfoCardInteraction.tsx)
const [optimisticState, switchOptimisticState] = useOptimistic(
  userState,
  (state) => ({
    ...state,
    following: !state.following, // Toggle following status instantly
  }),
);

const handleFollowClick = async () => {
  switchOptimisticState(); // UI updates immediately
  await switchFollow(userId); // Then sync with server
};
```

---

## When to Use Each Hook

| Hook               | When                              | Why                                            |
| ------------------ | --------------------------------- | ---------------------------------------------- |
| **useFormStatus**  | Inside submit buttons/forms       | Show loading state during form submission      |
| **useActionState** | Forms with server actions         | Manage form state and display server responses |
| **useOptimistic**  | Quick actions (follow, like, etc) | Instant UI feedback while server processes     |
