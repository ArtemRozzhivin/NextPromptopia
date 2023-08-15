'use client';

import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard'
import { useSession } from 'next-auth/react'

export const PromtsList = ({data, handleTagClick}) => {
  return <ul className='mt-16 prompt_layout'>
    {data.map((prompt) => <PromptCard key={prompt._id} prompt={prompt} handleTagClick={() => handleTagClick(prompt.tag)}/>)}
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

  const handleSearch = () => {
    const searchRegex = new RegExp(searchText.toLowerCase())
    
    setSearchResult(allPrompts.filter((item) => searchRegex.test(item.creator.username.toLowerCase()) 
    || searchRegex.test(item.tag.toLowerCase())
    || searchRegex.test(item.text.toLowerCase())
    ))
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
  }

  useEffect(() => {
    fetchAllPrompts()
  }, [])

  useEffect(() => {
    handleSearch()
  }, [searchText])

  return <section className='feed'>
    <form className='relative w-full flex-center'>
      <input value={searchText} onChange={(e) => setSearchText(e.target.value)} className='search_input peer' required type='text' placeholder='Search for a tag or a username'/>
    </form>

    {/* All / search prompts */}
    {searchText === '' ? session?.user && <PromtsList handleTagClick={handleTagClick} data={allPrompts}/> : <PromtsList handleTagClick={handleTagClick} data={searchResult}/>}
  </section>;
};

export default Feed;
