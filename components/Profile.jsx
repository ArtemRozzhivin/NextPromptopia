import React from 'react'
import PromptCard from '@components/PromptCard'


import { PromptList } from '@components/Feed'

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  return (
    <section className='w-full'>
      <h1><span className='head_text text-left blue_gradient'>{name} Profile</span></h1>
      <p className='desc'>{desc}</p>

      <ul className='mt-10 prompt_layout'>
        {data.map((prompt) => <PromptCard key={prompt._id} prompt={prompt}/>)}
      </ul>

    </section>
  )
}

export default Profile