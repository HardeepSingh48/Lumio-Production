import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return  <SignIn
      redirectUrl="/"
      appearance={{
        elements: {
          socialButtonsBlockButton: { mode: 'redirect' },
        },
      }}
    />
}

export default page