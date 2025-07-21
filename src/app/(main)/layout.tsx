'use client';

import React, { useEffect, useState } from 'react';
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isBlockedBrowser, setIsBlockedBrowser] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || '';
    const isInAppBrowser =
      /FBAN|FBAV|Instagram|LinkedIn|Twitter|Messenger/i.test(ua);

    if (isInAppBrowser) {
      setIsBlockedBrowser(true);
    }
  }, []);

  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      {isBlockedBrowser ? (
        <div style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '1rem',
          fontFamily: 'sans-serif',
          color: '#fff',
          backgroundColor: '#000'
        }}>
          <div>
            <h1>⚠️ Unsupported Browser</h1>
            <p>Google sign-in doesn&apos;t work inside this app&apos;s browser.</p>
            <p>Please open this link in <strong>Chrome</strong> or <strong>Safari</strong> for login to work.</p>
          </div>
        </div>
      ) : (
        children
      )}
    </ClerkProvider>
  );
};

export default Layout;
