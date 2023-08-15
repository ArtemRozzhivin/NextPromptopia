'use client';

import React, { useState, useEffect } from 'react'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')
  const [usersPrompts, setUsersPrompts] = useState([])

  const fetchUsersPrompts = async () => {
    const response = await fetch(`/api/users/${params?.id}/prompts`)
    const data = await response.json()
    setUsersPrompts(data)
  }

  useEffect(() => {
    if(params.id) fetchUsersPrompts()
  }, [])

  return (
    <div>
      <Profile
      name={userName}
      desc={`Welcome to personalized ${userName} profile page. Use, share, and be inspired by the ideas of others.`}
      data={usersPrompts}
      />
    </div>
  )
}

export default UserProfile