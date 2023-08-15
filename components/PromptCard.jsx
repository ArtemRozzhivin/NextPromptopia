"use client"

import Image from 'next/image'
import React, {useState} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const PromptCard = ({prompt, handleTagClick, handleEdit, handleDelete}) => {
  const {data: session} = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [copied, setCopied] = useState('')

  const handleCopy = () => {
    setCopied(prompt.text)
    navigator.clipboard.writeText(prompt.text)

    setTimeout(() => {
      setCopied('')
    }, 3000)
  }

  const handleProfileClick = () => {
    prompt.creator._id === session?.user.id 
    ? router.push('/profile') 
    : router.push(`/profile/${prompt.creator._id}?name=${prompt.creator.username}`)
  }

  return (
    <div className='prompt_card shadow-md'>
      <div className='flex items-start justify-between gap-5'>
        <div onClick={handleProfileClick} className='flex justify-start items-center cursor-pointer'>
          <Image className='rounded-full object-contain' width={40} height={40} src={prompt.creator.image} alt='user_image'/>
        </div>

        <div className='flex flex-col'>
          <p className='font-satoshi font-semibold text-gray-900'>{prompt.creator.username}</p>
          <p className='font-inter text-sm text-gray-500'>{prompt.creator.email}</p>
        </div>

        <div className='copy_btn shadow-md' onClick={handleCopy}>
          <Image src={
              copied === prompt.text
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === prompt.text ? "tick_icon" : "copy_icon"}
            width={17}
            height={17}/>
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{prompt.text}</p>
      <p onClick={handleTagClick} className='font-inter text-sm blue_gradient cursor-pointer'>#{prompt.tag}</p>

      {pathname === '/profile' && session?.user.id === prompt.creator._id && 
        <div className='flex gap-5 mt-7'>
          <button onClick={handleEdit} className='text-sm font-inter green_gradient px-3 py-1 border border-green-400 rounded-md shadow-md'>
            Edit
          </button>
          <button onClick={handleDelete} className='text-sm font-inter orange_gradient px-3 py-1 border border-orange-500 rounded-md shadow-md'>
            Delete
          </button>
        </div>
      }
    </div>
  )
}

export default PromptCard