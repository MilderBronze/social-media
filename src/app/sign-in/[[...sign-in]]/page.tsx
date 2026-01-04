import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='h-full justify-center flex items-center'>
            <SignIn />
        </div>
    )
}