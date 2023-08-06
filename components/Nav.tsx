import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' width={50} height={50} alt='logoImg' />
        <p>Promptopia</p>
      </Link>
    </nav>
  );
};

export default Nav;
