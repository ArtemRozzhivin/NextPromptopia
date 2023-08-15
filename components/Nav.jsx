"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const Nav = () => {
  const {data: session} = useSession();
  const router = useRouter()
  const [isToggleDropdown, setToggleDropdown] = useState(false)
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
  
      setProviders(response)
    }

    setUpProvider()
  }, [])

  const handleSigtnOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' width={30} height={30} alt='Promptopia Logo' className='object-contain' />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}

      <div className='sm:flex hidden'>
      {session?.user ? <div className='flex gap-3 md:gap-5'>
        <Link href="/create-prompt" className='black_btn'>
        Create Post
        </Link>
        <Link href='/' onClick={handleSigtnOut} type='button' className='outline_btn'>
        Sign Out
        </Link>

        <Link href="/profile">
        <Image src={session.user.image} width={35} height={35} className='rounded-full' alt='profile'/>
        </Link>
      </div> : <>
      {providers && Object.values(providers).map((provider) => <button onClick={() => signIn(provider.id)} type='button' key={provider.name} className='black_btn'>Sign In</button>)}
      </>}
      </div>

      {/* Mobile Navigation */}

      <div className='sm:hidden flex'>
      {session?.user ? <div>
        <Image onClick={() => setToggleDropdown((prevState) => !prevState)} src={session.user.image} width={35} height={35} className='rounded-full' alt='profile'/>

        {isToggleDropdown && <div className='relative'>
          <div className='dropdown'>
            <p className='text-xs font-inter text-gray-700 hover:text-gray-500 font-medium'>Hello, {session.user.name}!</p>
            <hr className='w-full'/>
            <Link className='dropdown_link' href="/profile">My Profile</Link>
            <Link className='dropdown_link' href="/create-prompt">Create Post</Link>

            <button onClick={handleSigtnOut} type='button' className='w-full black_btn mt-5'>
            Sign Out
            </button>
            </div>
          </div>}
      </div> : <>
      {providers && Object.values(providers).map((provider) => <button onClick={() => signIn(provider.id)} type='button' key={provider.name} className='black_btn'>Sign In</button>)}
      </>}
      </div>
    </nav>
  );
};

export default Nav;
