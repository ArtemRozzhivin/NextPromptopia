"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {ClientSafeProvider, LiteralUnion, getProviders, signIn} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers';

const Nav = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(true)
  const [isToggleDropdown, setToggleDropdown] = useState(false)
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
  
      setProviders(response)
    }

    setProvider()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' width={30} height={30} alt='Promptopia Logo' className='object-contain' />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}

      <div className='sm:flex hidden'>
      {isUserLoggedIn ? <div className='flex gap-3 md:gap-5'>
        <Link href="/create-prompt" className='black_btn'>
        Create Post
        </Link>
        <button type='button' className='outline_btn'>
        Sign Out
        </button>

        <Image src="/assets/images/logo.svg" width={35} height={35} className='rounded-full' alt='profile'/>
      </div> : <>
      {providers && Object.values(providers).map((provider) => <button onClick={() => signIn(provider.id)} type='button' key={provider.name} className='black_btn'>Sign In</button>)}
      </>}
      </div>

      {/* Mobile Navigation */}

      <div className='sm:hidden flex'>
      {isUserLoggedIn ? <div>
        <Image onClick={() => setToggleDropdown((prevState) => !prevState)} src="/assets/images/logo.svg" width={35} height={35} className='rounded-full' alt='profile'/>

        {isToggleDropdown && <div className='relative'>
          <div className='dropdown'>
            <Link className='dropdown_link' href="/profile">My Profile</Link>
            <Link className='dropdown_link' href="/create-prompt">Create Post</Link>

            <button type='button' className='w-full black_btn mt-5'>
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
