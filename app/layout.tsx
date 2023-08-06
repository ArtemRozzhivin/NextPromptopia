import React from 'react';
import Nav from '@components/Nav';
import '@styles/global.css';

export const metadate = {
  title: 'Promptopia',
  description: 'Discover @ Share AI Prompts',
};

//@ts-ignore
const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
