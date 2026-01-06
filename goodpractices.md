## good practices i learned while creating this project:
- parent- explicit height for flex to work
- in nextjs, sign-up/[[...signup]] has 2 brackets. the inner bracket means anything like sign-up/a/b, sign-up/a etc. and the outer bracket makes it optional. so now, even sign-up would be listened to.
- display block set krdo when aap media queries add kr rhe ho responsive banane ke liye.. when for ex. you set display to hidden for default, then lg:block kr diya. chalega.
- always media queries ke sath sath project build up kro. no need of first making a prototype and then adding the media queries. otherwise tumko kabhi bhi mann nai krega apne website ko responsive banane ka.
- always parent ki size ko fix kro then child ko dena start kro.

- object-cover: hero images, profile pictures, backgrounds/photos
- object-contain: logos, icons, thumbnails
- object-fill: default: rarely used
- object-none: rarely used.

## a few things about flexbox:
flex-1 is a Tailwind CSS utility that does:

**What it means:**
- flex-grow: 1 - Takes up available space (grows)
- flex-shrink: 1 - Can shrink if needed
- flex-basis: 0% - Starts with 0 width, then expands
- use flex before flex-col

## next js: IMAGE: fill property
- used when its parent is set to relative so that the image fills with respect to the parent component.