'use client';

import React, { useState, useEffect } from 'react'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react';

const MyProfile = () => {
  const {data: session} = useSession() 
  const [usersPrompts, setUsersPrompts] = useState([])

  const fetchUsersPrompts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/prompts`)
    const data = await response.json()
    setUsersPrompts(data)
  }

  useEffect(() => {
    if(session?.user.id) fetchUsersPrompts()
  }, [session?.user.id])


  const handleEdit = () => {

  }

  const handleDelete = () => {
    
}

  return (
    <div>
      <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination' 
      data={usersPrompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
    </div>
  )
}

export default MyProfile