'use client'
import React, { useRef, useState } from 'react'
import HeroAnimation from './HeroAnimation'
import { motion } from 'framer-motion'
import { useTypewriter } from 'react-simple-typewriter'
import InteractiveGlobe from './Globe'

type Props = {}

function Hero({}: Props) {
  const [text] = useTypewriter({
    words: ['Profile','Analyze','Upgrade','Learn'],
    loop: false,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  })

  const wrapper = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  }

  const list = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.455, 0.03, 0.515, 0.955], delay: 1 },
    },
  }

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  }

  // 🔊 Music logic
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleAudio = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <div className='w-full px-4 sm:px-8 lg:px-16 pt-20'>
      <div className='flex flex-col md:flex-row md:gap-x-6 lg:gap-x-0 xl:grid xl:grid-cols-2 mt-4'>
        <div className='shrink-0 md:w-1/2 lg:w-7/12 xl:w-auto'>
          <motion.h1
            initial='hidden'
            animate='visible'
            variants={container}
            className='text-4xl lg:text-5xl mb-8 font-semibold'
          >
            <HeroAnimation
              text='The One Platform To'
              className='text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-300 inline-block'
            />
            <HeroAnimation
              text={text}
              className='text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-violet-600 inline-block'
            />
            <HeroAnimation
              text='Your Network'
              className='text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-300 inline-block'
            />
          </motion.h1>

          <motion.ul
            initial='hidden'
            animate='visible'
            variants={wrapper}
            className='text-white space-y-2'
          >
            {[
              'Analyze Your Network',
              'Check Your Network Speed',
              'Get Advised On Security',
              'Become More Vigilant',
            ].map((text, idx) => (
              <motion.li key={idx} variants={list} className='flex gap-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  className='fill-current h-5 shrink-0 mt-0.5'
                >
                  <path d='M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z' />
                </svg>
                <span>{text}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.5 }}
            className='mt-10 flex flex-col items-center sm:flex-row gap-3'
          >
            <a
              href='/profiling'
              className='inline-flex relative z-10 h-10 rounded-xl p-px shadow-lg bg-gradient-to-b from-white to-zinc-300'
            >
              <div className='flex items-center gap-1 px-6 font-medium rounded-xl whitespace-nowrap bg-white text-black'>
                <span>Get Started</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 448 512'
                  className='fill-current h-3.5'
                >
                  <path d='M429.8 273l17-17-17-17L276.2 85.4l-17-17-33.9 33.9 17 17L354.9 232 24 232 0 232l0 48 24 0 330.8 0L242.2 392.6l-17 17 33.9 33.9 17-17L429.8 273z' />
                </svg>
              </div>
            </a>

            <button
              onClick={toggleAudio}
              className='inline-flex relative z-10 h-10 rounded-xl p-px shadow-lg bg-gradient-to-b from-white to-zinc-300'
            >
              <div className='flex items-center gap-1 px-6 font-medium rounded-xl whitespace-nowrap bg-yellow-500 text-black'>
                <span>{isPlaying ? 'Stop Ambience' : 'Hit Ambience'}</span>
              </div>
            </button>

            <audio ref={audioRef} src='/background-music.mp3' loop />
          </motion.div>
        </div>

        <div className='hidden md:block md:h-[500px] lg:h-[600px] shrink-0 grow-0 overflow-hidden z-10'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className='relative h-full w-full'
          >
            <InteractiveGlobe />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
