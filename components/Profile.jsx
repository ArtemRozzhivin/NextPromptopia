import React from 'react'
import PromptCard from '@components/PromptCard'

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  return (
    <section className='w-full'>
      <h1><span className='head_text text-left blue_gradient'>{name} profile</span></h1>
      <p className='desc'>{desc}</p>

      {!data.length ? <p className='text-center text-2xl blue_gradient mt-32'>This author has not yet created his own prompts</p> : <ul className='mt-10 prompt_layout'>
        {data.map((prompt) => <PromptCard key={prompt._id} prompt={prompt} handleEdit={() => handleEdit(prompt)} handleDelete={() => handleDelete(prompt)} />)}
      </ul>}

    </section>
  )
}

export default Profile