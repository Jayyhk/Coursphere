'use client'
import React from 'react'
import { Button, buttonVariants } from "./ui/button"
import { signIn } from "next-auth/react"

type Props = {}

const GetStartedButton = (props: Props) => {
    return (
        <Button className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
            variant='premium' 
            onClick={() => {
                signIn('google')
            }}
        >
            Get Started
        </Button>
      )
}

export default GetStartedButton