"use client"

import Image from 'next/image'
import React, {useState} from 'react'

const PromptCard = ({prompt}) => {
  const [copied, setCopied] = useState('')
  console.log(prompt.creator, 'prompt.creator')

  const handleCopy = () => {
    setCopied(prompt.text)
    navigator.clipboard.writeText(prompt.text)

    setTimeout(() => {
      setCopied('')
    }, 3000)
  }

  return (
    <div className='prompt_card'>
      <div className='flex items-start justify-between gap-5'>
        <div className='flex justify-start items-center cursor-pointer' onClick={() => {}}>
          <Image className='rounded-full object-contain' width={40} height={40} src={prompt.creator.image} alt='user_image'/>
        </div>

        <div className='flex flex-col'>
          <p className='font-satoshi font-semibold text-gray-900'>{prompt.creator.username}</p>
          <p className='font-inter text-sm text-gray-500'>{prompt.creator.email}</p>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
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
      <p className='font-inter text-sm blue_gradient cursor-pointer'>{prompt.tag}</p>
    </div>
  )
}

export default PromptCard