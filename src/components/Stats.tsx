'use client'
import React from 'react'
import {motion} from "framer-motion"

type Props = {}

function Stats({}: Props) {
    const wrapperstat = {
        hidden:{
            opacity:0, translateX:-100
        },
        visible:{
            opacity:1,
            translateX:0,
            transition:{
                staggerChildren:0.125
            }
        }
    }

    const wrapper= {
        hidden:{
            opacity:0
        },
        visible:{
            opacity:1,
            transition:{
                staggerChildren:0.125,
            }
        }
    }

    const list = {
        hidden:{opacity:0, y:-100},
        visible:{
            opacity:1,
            y:0,
            transition:{duration:0.3 , ease:[0.455, 0.03, 0.515, 0.955]}
        }
    }
  return (
    <div className='relative'>
        <div className='w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-y-12 pt-32'>
            <div className='lg:pr-16 overflow-hidden'>
                <motion.div initial={{translateX:100, opacity:0}} whileInView={{translateX:0, opacity:1}} transition={{duration:0.5}} viewport={{once:true}}>
                    <h2 className='text-2xl sm:text-3xl lg:text-4xl text-white max-w-md font-semibold'>Do Not Be An Easy Prey</h2>
                    <p className="mt-6 mb-3 max-w-xl font-light text-zinc-400">Blackhat hackers are smart and they try several ways to pin down your personal and business security. They breach using several ways and can cause negative impact in your reputation, bank balance and life. Be a vigilant citizen and keep ahead of the predators. 
                    </p>
                   
                </motion.div>
            </div>
            <div className='overflow-hidden'>
                <motion.div variants={wrapperstat} viewport={{once:true}} initial='hidden' whileInView='visible' className='grow order-2'>
                    <h3 className='text-xl text-white'>Most victims are targetted by these methods</h3>
                    
                    <motion.ul variants={wrapper} className='relative mt-6 space-y-3'>
                        <div className='absolute left-0 w-px -inset-y-12 bg-gradient-to-b from-white/0 via-white/20 to-white/0'> </div>
                        <motion.li variants={list} className='relative w-full'>
                            <div className='absolute inset-0 bg-violet-700 rounded-r-md' style={{opacity:'100%', width:'100%'}}></div>
                            <div className='relative items-center text-sm text-white px-2 w-full flex gap-4 h-6 whitespace-nowrap justify-between'>
                                <span>1. Phishing</span>
                               
                            </div>
                        </motion.li>
                        <motion.li variants={list}  className="relative w-full">
                            <div className="absolute inset-0 bg-green-700 rounded-r-md" style={{opacity:"85%",width:"63.760829207920786%"}}></div>
                            <div className="relative items-center text-sm text-white px-2 w-full flex gap-4 h-6 whitespace-nowrap justify-between">
                                <span>2. Reverse Engineering</span>
                                
                            </div>
                        </motion.li>
                        <motion.li variants={list}  className="relative w-full">
                            <div className="absolute inset-0 bg-yellow-700 rounded-r-md" style={{opacity:'70%',width:'50.39449257425742%'}}></div>
                            <div className="relative items-center text-sm text-white px-2 w-full flex gap-4 h-6 whitespace-nowrap justify-between">
                                <span>3. Dedicated Denial of Service</span>
                                
                            </div>
                        </motion.li>
                        <motion.li variants={list}  className="relative w-full">
                            <div className="absolute inset-0 bg-orange-700 rounded-r-md" style={{opacity:"55%",width:"45.3279702970297%"}}></div>
                            <div className="relative items-center text-sm text-white px-2 w-full flex gap-4 h-6 whitespace-nowrap justify-between">
                                <span>4. Man In the Middle</span>
                                
                            </div>
                        </motion.li>
                        <motion.li variants={list} className="relative w-full">
                            <div className="absolute inset-0 bg-blue-700 rounded-r-md" style={{opacity:"40%",width:"37.68564356435643%"}}></div>
                            <div className="relative items-center text-sm text-white px-2 w-full flex gap-4 h-6 whitespace-nowrap justify-between">
                                <span>5. Eavesdropping</span>
                                
                            </div>
                        </motion.li>
                    </motion.ul>
                </motion.div>
            </div>
        </div>
        <hr className='w-full border-none h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0 mt-20' />
    </div>
  )
}

export default Stats