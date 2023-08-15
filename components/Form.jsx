import Link from 'next/link'
import React from 'react'

const Form = ({type, prompt, setPrompt, submitting, handleSubmiting}) => {

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} prompt</span>
      </h1>

      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form className='mt-10 w-full max-w-2xl flex flex-col gap-10 glassmorphism' onSubmit={(e) => handleSubmiting(e)}>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI prompt</span>
          <textarea className='form_textarea' placeholder='Write your prompt here...' required value={prompt.text} onChange={(e) => setPrompt({...prompt, text: e.target.value})}/>
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Tag of prompt (#production, #marketing, #coding)</span>
          <input className='form_input' placeholder='#tag' required value={prompt.tag} onChange={(e) => setPrompt({...prompt, tag: e.target.value})}/>
        </label>

        <div className='flex-end gap-5'>
          <Link className='outline_btn' href={type === 'Edit' ? '/profile' : '/'}>Cancel</Link>

          <button className='primary_btn' disabled={submitting} type='submit'>{submitting ? <span>{type} prompt...</span> : <span>{type} prompt</span>}</button>
        </div>
      </form>
    </section>
  )
}

export default Form