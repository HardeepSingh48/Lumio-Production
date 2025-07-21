import React from 'react'
import { SignUp } from '@clerk/nextjs'

const page = () => {
  return   <SignUp
      redirectUrl="/"
      appearance={{
        elements: {
          socialButtonsBlockButton: { mode: 'redirect' },
        },
      }}
    />
}

export default page