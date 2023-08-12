'use client';

import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard'
import { useSession } from 'next-auth/react'

export const PromtsList = ({data}) => {
  return <ul className='mt-16 prompt_layout'>
    {data.map((prompt) => <PromptCard key={prompt._id} prompt={prompt}/>)}
  </ul>
}

const Feed = () => {
  const {data: session} = useSession();
  const [allPrompts, setAllPrompts] = useState([])

  
  // Search states
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState('')
  
  const fetchAllPrompts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()
    setAllPrompts(data)
  }

  useEffect(() => {
    fetchAllPrompts()
  }, [])

  console.log(allPrompts, 'allPrompts')

  return <section className='feed'>
    <form className='relative w-full flex-center'>
      <input value={searchText} onChange={(e) => setSearchText(e.target.value)} className='search_input peer' required type='text' placeholder='Search for a tag or a username'/>
    </form>


    {/* All prompts */}
    {session?.user && <PromtsList data={allPrompts}/>}

    {/* Search prompts */}
  </section>;
};

export default Feed;
