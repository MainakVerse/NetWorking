'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from 'next/navigation'

type Props = {}

function Navbar({}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const getLinkClasses = (path: string) =>
    pathname === path ? 'text-yellow-400 font-bold' : ''

  return (
    <div className='fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 text-zinc-300'>
      <div className='w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 pt-6 pb-4 flex items-center justify-between font-light'>
        {/* Logo */}
        <div className='overflow-hidden'>
          <motion.div initial={{opacity:0, y:100}} animate={{opacity:1, y:0}} transition={{ duration:0.3}}>
            <a href="/" className='flex items-center space-x-1'>
              <Image src="/logo.png" width={25} height={25} alt="logo" />
              <span className='font-bold text-2xl text-white'>Net Working</span>
            </a>
          </motion.div>
        </div>

        {/* Desktop Nav */}
        <div className='max-md:hidden overflow-hidden'>
          <motion.div initial={{opacity:0, y:100}} animate={{opacity:1, y:0}} transition={{ duration:0.3}} className='flex items-center space-x-6'>
            <a href="/profiling" className={getLinkClasses('/profiling')}>Profiling</a>
            <a href="/advisory" className={getLinkClasses('/advisory')}>Advisory</a>
            <a href="/guide" className={getLinkClasses('/guide')}>Guide</a>
            <a href="/contact" className={getLinkClasses('/contact')}>Contact</a>
          </motion.div>
        </div>

        {/* Hamburger */}
        <div className='md:hidden cursor-pointer' onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col space-y-4 px-6 pb-4"
          >
            <a href="/profiling" className={getLinkClasses('/profiling')}>Profiling</a>
            <a href="/advisory" className={getLinkClasses('/advisory')}>Advisory</a>
            <a href="/guide" className={getLinkClasses('/guide')}>Guide</a>
            <a href="/contact" className={getLinkClasses('/contact')}>Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
