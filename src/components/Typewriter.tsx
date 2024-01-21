'use client'

import React from 'react'
import Typewriter from 'typewriter-effect'

type Props = {}

const TypewriterComponent = (props: Props) => {
  return (
    <Typewriter
              options={{
                strings: [
                  "courses.",
                  "learning.",
                  "educational videos.",
                  "concept checks."
                ],
                autoStart: true,
                loop: true,
              }}
            />
  )
}

export default TypewriterComponent