import { User } from '@/generated/prisma/client'
import React from 'react'

export const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <div className=''>
      <span className='text-bluee-500 text-xs cursor-pointer' onClick={() => setOpen(true)}>Update</span>
      <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
        <form action="" className='p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:1/3'></form>
      </div>
    </div>
  )
}
