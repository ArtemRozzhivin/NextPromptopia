import React from 'react';
import Nav from '@components/Nav';
import '@styles/global.css';
import Provider from '@components/Provider';

export const metadate = {
  title: 'Promptopia',
  description: 'Discover @ Share AI Prompts',
};

//@ts-ignore
const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
