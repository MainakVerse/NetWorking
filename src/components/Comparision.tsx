'use client'
import React from 'react'
import {motion} from "framer-motion"
import {BarChart , Bar, ResponsiveContainer} from "recharts"

const data = [
  {
    "name": "Page A",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page B",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page C",
    "uv": 2100,
    "pv": 2100,
    "amt": 2200
  },
  {
    "name": "Page D",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page E",
    "uv": 2400,
    "pv": 5200,
    "amt": 2900
  },
  {
    "name": "Page F",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page G",
    "uv": 2870,
    "pv": 3400,
    "amt": 3000
  },
  {
    "name": "Page H",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page I",
    "uv": 3120,
    "pv": 3200,
    "amt": 2100
  },
  {
    "name": "Page J",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  },
  {
    "name": "Page K",
    "uv": 3560,
    "pv": 4800,
    "amt": 2600
  },
  {
    "name": "Page L",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page M",
    "uv": 4110,
    "pv": 4500,
    "amt": 2500
  },
  {
    "name": "Page N",
    "uv": 4800,
    "pv": 4100,
    "amt": 3200
  }
]


function getRandomColor (){
  let color = `hsl(${Math.random() * 360}, 100%, 85%)`
  return color
}

type Props = {}

function Comparison({}: Props) {
  const randomColor = getRandomColor()
  // Add state to track which checkboxes are activated
  const [activeCheckboxes, setActiveCheckboxes] = React.useState([false, false, false, false])
  // Add state to track if the arrow animation should run
  const [arrowActive, setArrowActive] = React.useState(false)

  // Sequential animation of checkboxes
  React.useEffect(() => {
    if (arrowActive) {
      const timers: NodeJS.Timeout[] = [];
      
      // Activate checkboxes one by one
      timers.push(setTimeout(() => setActiveCheckboxes([true, false, false, false]), 300));
      timers.push(setTimeout(() => setActiveCheckboxes([true, true, false, false]), 800));
      timers.push(setTimeout(() => setActiveCheckboxes([true, true, true, false]), 1300));
      timers.push(setTimeout(() => setActiveCheckboxes([true, true, true, true]), 1800));
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [arrowActive]);

  const handleViewportEnter = () => {
    setArrowActive(true);
  };

  const wrapper = {
    hidden:{
        opacity:0
    },
    visible:{
        opacity:1,
        transition:{
            staggerChildren:0.25,
            when: "beforeChildren"
        }
    }
  }

  const list = {
    hidden:{opacity:0, y:-100},
    visible:{
        opacity:1,
        y:0,
        transition:{duration:0.3, ease:[0.455, 0.03, 0.515, 0.955]}
    }
  }

  const draw = {
    hidden: { pathLength: 0, opacity: 0, translateX:100 },
    visible: (i:any) => {
      const delay = 1 + i * 5;
      return {
        pathLength: 1,
        opacity: 1,
        translateX:0,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };

  // Animation variant for the arrow flowing down
  const arrowVariant = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <div className='relative z-20'>
      <div className='w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 pt-24'>
       
        <motion.h1 initial={{translateX:200, opacity:0}} whileInView={{translateX:0, opacity:1}}  transition={{duration:0.3}} viewport={{once:true}} className='mb-6 text-2xl sm:text-3xl lg:text-4xl text-white text-center font-semibold overflow-hidden'>
          Understanding Networking Made Easy
        </motion.h1>
        <motion.p initial={{translateX:200, opacity:0}} whileInView={{translateX:0, opacity:1}}  transition={{duration:0.3}} viewport={{once:true}} className='mb-16 text-center max-w-xl mx-auto font-light text-zinc-500'>
          Deep dive into the knowledge of networking, understand why it works this way and how you can be a more vigilant user of networks.
        </motion.p>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-10 items-end'>
            <div className='relative text-sm max-w-lg'>
              <svg viewBox="0 0 577 211" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.rect variants={draw} initial='hidden' whileInView='visible' viewport={{once:true}} x="0.5" y="187" width="576" height="1" fill="url(#paint0_linear_280_1304)"></motion.rect>
                    <motion.line variants={draw} initial='hidden' whileInView='visible' viewport={{once:true}} x1="0.957328" y1="168.502" x2="502.957" y2="125.502" stroke="url(#paint1_linear_280_1304)" pathLength="1" strokeDashoffset="0px" strokeDasharray="0.75px 1px"></motion.line>
                    <motion.path variants={draw} initial='hidden' whileInView='visible' viewport={{once:true}} d="M1.5 177C149.455 159.787 424 116 502.5 1" stroke="url(#paint2_linear_280_1304)" pathLength="1" strokeDashoffset="0px" strokeDasharray="0.6975px 1px"></motion.path>
                    <defs><linearGradient id="paint0_linear_280_1304" x1="0.499992" y1="187.954" x2="576.5" y2="187.81" gradientUnits="userSpaceOnUse"><stop stopColor="#18181B"></stop><stop offset="0.177083" stopColor="#71717A"></stop><stop offset="1" stopColor="#09090B"></stop></linearGradient><linearGradient id="paint1_linear_280_1304" x1="1" y1="169" x2="503" y2="126" gradientUnits="userSpaceOnUse"><stop stopColor="#3178C6" stopOpacity="0.25"></stop><stop offset="0.515625" stopColor="#3178C6"></stop><stop offset="1" stopColor="#3178C6"></stop></linearGradient><linearGradient id="paint2_linear_280_1304" x1="502.5" y1="0.9998" x2="2.49996" y2="187" gradientUnits="userSpaceOnUse"><stop stopColor="#F97583"></stop><stop offset="0.489583" stopColor="#F97583"></stop><stop offset="1" stopColor="#F97583" stopOpacity="0.25"></stop></linearGradient></defs></svg>
                    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.3, duration:0.5}} className='absolute left-0 top-0 text-white'>
                      <span className='flex items-center gap-1 '>
                          <span>Insights</span>
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 14" className="fill-current h-3"><path d="M9.31328 2.625H9.75078V3.0625V9.1875V9.625H8.87578V9.1875V4.11797L1.96602 11.0277L1.65703 11.3367L1.03906 10.7187L1.34805 10.4098L8.25781 3.5H3.18828H2.75078V2.625H3.18828H9.31328Z"></path></svg>
                          </span>
                      </span>
                      
                      <span className='flex gap-1.5 items-center mt-2'>
                        <span className='text-red-400'>
                          -
                        </span>
                        <span>With Net Working</span>
                      </span>
                      <span className='flex gap-1.5 items-center mt-2'>
                        <span className='text-blue-400'>
                          -
                        </span>
                        <span>Without Net Working</span>
                      </span>
                </motion.div>
            </div>
            <div className='lg:pr-16'>
              <motion.ul 
                variants={wrapper} 
                initial='hidden' 
                whileInView='visible' 
                viewport={{once:true}}
                onViewportEnter={handleViewportEnter}
                className='overflow-hidden px-2'
              >
                <motion.li variants={list}>
                  <button className='text-white flex gap-4 items-center text-left relative'>
                    
                    <div className='relative bg-gradient-to-br from-zinc-100 to-zinc-50 h-5 w-5 rounded-md p-px'>
                      <motion.div 
                        animate={activeCheckboxes[0] ? {
                          backgroundColor: "#ffffff",
                          transition: { duration: 0.3 }
                        } : {
                          backgroundColor: "#000000",
                          transition: { duration: 0.3 }
                        }}
                        className='rounded-[5px] h-full w-full flex items-center justify-center'
                      >
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 25 24" 
                          className="fill-current ml-px h-3.5 text-black"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={activeCheckboxes[0] ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path fillRule="evenodd" clipRule="evenodd" d="M21.0821 5.29289C21.4726 5.68342 21.4726 6.31658 21.0821 6.70711L10.0821 17.7071C9.69158 18.0976 9.05842 18.0976 8.66789 17.7071L3.66789 12.7071C3.27737 12.3166 3.27737 11.6834 3.66789 11.2929C4.05842 10.9024 4.69158 10.9024 5.08211 11.2929L9.375 15.5858L19.6679 5.29289C20.0584 4.90237 20.6916 4.90237 21.0821 5.29289Z"></path>
                        </motion.svg>
                      </motion.div>
                    </div>
                    <div>
                      <div className='font-light text-zinc-300'>Analyze Your Network</div>
                      <div className='text-xs text-zinc-400'>Check all the KPIs that define your network.</div>
                    </div>
                  </button>
                </motion.li>
                
                <motion.div 
                  className="relative ml-2 py-1"
                  initial="hidden"
                  animate={activeCheckboxes[0] ? "visible" : "hidden"}
                  variants={arrowVariant}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 16" className="fill-current h-3 ml-2 text-zinc-600 -translate-x-px">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4 0C4.41422 0 4.75 0.335786 4.75 0.75V13.3401L6.70041 11.2397C6.98226 10.9361 7.45681 10.9186 7.76034 11.2004C8.06387 11.4823 8.08145 11.9568 7.7996 12.2603L4.5496 15.7603C4.40769 15.9132 4.20855 16 4 16C3.79145 16 3.59232 15.9132 3.45041 15.7603L0.200408 12.2603C-0.081444 11.9568 -0.0638681 11.4823 0.239665 11.2004C0.543198 10.9186 1.01775 10.9361 1.2996 11.2397L3.25 13.3401V0.75C3.25 0.335786 3.58579 0 4 0Z"></path>
                  </svg>
                </motion.div>
                
                <motion.li variants={list}>
                  <button className='text-white flex gap-4 items-center text-left relative'>
                    <div className='relative bg-gradient-to-br from-zinc-100 to-zinc-50 h-5 w-5 rounded-md p-px'>
                      <motion.div 
                        animate={activeCheckboxes[1] ? {
                          backgroundColor: "#ffffff",
                          transition: { duration: 0.3 }
                        } : {
                          backgroundColor: "#000000",
                          transition: { duration: 0.3 }
                        }}
                        className='rounded-[5px] h-full w-full flex items-center justify-center'
                      >
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 25 24" 
                          className="fill-current ml-px h-3.5 text-black"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={activeCheckboxes[1] ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path fillRule="evenodd" clipRule="evenodd" d="M21.0821 5.29289C21.4726 5.68342 21.4726 6.31658 21.0821 6.70711L10.0821 17.7071C9.69158 18.0976 9.05842 18.0976 8.66789 17.7071L3.66789 12.7071C3.27737 12.3166 3.27737 11.6834 3.66789 11.2929C4.05842 10.9024 4.69158 10.9024 5.08211 11.2929L9.375 15.5858L19.6679 5.29289C20.0584 4.90237 20.6916 4.90237 21.0821 5.29289Z"></path>
                        </motion.svg>
                      </motion.div>
                    </div>
                    <div>
                      <div className='font-light text-zinc-300'>Check Your Network Speed</div>
                      <div className='text-xs text-zinc-400'>Measure how performing your network is.</div>
                    </div>
                  </button>
                </motion.li>
                
                <motion.div 
                  className="relative ml-2 py-1"
                  initial="hidden"
                  animate={activeCheckboxes[1] ? "visible" : "hidden"}
                  variants={arrowVariant}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 16" className="fill-current h-3 ml-2 text-zinc-600 -translate-x-px">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4 0C4.41422 0 4.75 0.335786 4.75 0.75V13.3401L6.70041 11.2397C6.98226 10.9361 7.45681 10.9186 7.76034 11.2004C8.06387 11.4823 8.08145 11.9568 7.7996 12.2603L4.5496 15.7603C4.40769 15.9132 4.20855 16 4 16C3.79145 16 3.59232 15.9132 3.45041 15.7603L0.200408 12.2603C-0.081444 11.9568 -0.0638681 11.4823 0.239665 11.2004C0.543198 10.9186 1.01775 10.9361 1.2996 11.2397L3.25 13.3401V0.75C3.25 0.335786 3.58579 0 4 0Z"></path>
                  </svg>
                </motion.div>
                
                <motion.li variants={list}>
                  <button className='text-white flex gap-4 items-center text-left relative'>
                    <div className='relative bg-gradient-to-br from-zinc-100 to-zinc-50 h-5 w-5 rounded-md p-px'>
                      <motion.div 
                        animate={activeCheckboxes[2] ? {
                          backgroundColor: "#ffffff",
                          transition: { duration: 0.3 }
                        } : {
                          backgroundColor: "#000000",
                          transition: { duration: 0.3 }
                        }}
                        className='rounded-[5px] h-full w-full flex items-center justify-center'
                      >
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 25 24" 
                          className="fill-current ml-px h-3.5 text-black"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={activeCheckboxes[2] ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path fillRule="evenodd" clipRule="evenodd" d="M21.0821 5.29289C21.4726 5.68342 21.4726 6.31658 21.0821 6.70711L10.0821 17.7071C9.69158 18.0976 9.05842 18.0976 8.66789 17.7071L3.66789 12.7071C3.27737 12.3166 3.27737 11.6834 3.66789 11.2929C4.05842 10.9024 4.69158 10.9024 5.08211 11.2929L9.375 15.5858L19.6679 5.29289C20.0584 4.90237 20.6916 4.90237 21.0821 5.29289Z"></path>
                        </motion.svg>
                      </motion.div>
                    </div>
                    <div>
                      <div className='font-light text-zinc-300'>Get Advised On Security</div>
                      <div className='text-xs text-zinc-400'>Obtain pro-tips by expert Networking AI to keep your details safe.</div>
                    </div>
                  </button>
                </motion.li>
                
                <motion.div 
                  className="relative ml-2 py-1"
                  initial="hidden"
                  animate={activeCheckboxes[2] ? "visible" : "hidden"}
                  variants={arrowVariant}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 16" className="fill-current h-3 ml-2 text-zinc-600 -translate-x-px">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4 0C4.41422 0 4.75 0.335786 4.75 0.75V13.3401L6.70041 11.2397C6.98226 10.9361 7.45681 10.9186 7.76034 11.2004C8.06387 11.4823 8.08145 11.9568 7.7996 12.2603L4.5496 15.7603C4.40769 15.9132 4.20855 16 4 16C3.79145 16 3.59232 15.9132 3.45041 15.7603L0.200408 12.2603C-0.081444 11.9568 -0.0638681 11.4823 0.239665 11.2004C0.543198 10.9186 1.01775 10.9361 1.2996 11.2397L3.25 13.3401V0.75C3.25 0.335786 3.58579 0 4 0Z"></path>
                  </svg>
                </motion.div>
                
                <motion.li variants={list}>
                  <button className='text-white flex gap-4 items-center text-left relative'>
                    <div className='relative bg-gradient-to-br from-zinc-100 to-zinc-50 h-5 w-5 rounded-md p-px'>
                      <motion.div 
                        animate={activeCheckboxes[3] ? {
                          backgroundColor: "#ffffff",
                          transition: { duration: 0.3 }
                        } : {
                          backgroundColor: "#000000",
                          transition: { duration: 0.3 }
                        }}
                        className='rounded-[5px] h-full w-full flex items-center justify-center'
                      >
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 25 24" 
                          className="fill-current ml-px h-3.5 text-black"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={activeCheckboxes[3] ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path fillRule="evenodd" clipRule="evenodd" d="M21.0821 5.29289C21.4726 5.68342 21.4726 6.31658 21.0821 6.70711L10.0821 17.7071C9.69158 18.0976 9.05842 18.0976 8.66789 17.7071L3.66789 12.7071C3.27737 12.3166 3.27737 11.6834 3.66789 11.2929C4.05842 10.9024 4.69158 10.9024 5.08211 11.2929L9.375 15.5858L19.6679 5.29289C20.0584 4.90237 20.6916 4.90237 21.0821 5.29289Z"></path>
                        </motion.svg>
                      </motion.div>
                    </div>
                    <div>
                      <div className='font-light text-zinc-300'>Become More Vigilant</div>
                      <div className='text-xs text-zinc-400'>Be A Part of Daily Updates and Stay Ahead and Secured.</div>
                    </div>
                  </button>
                </motion.li>
              </motion.ul>
            </div>
        </div>
        <div className='grid grid-cols-1 gap-y-16 gap-x-6 pt-32'>
            <motion.div initial={{opacity:0, scale:0.7}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{delay:0.5, duration:0.5}} className='w-full lg:h-[500px] h-[300px] rounded-xl shadow-sm relative border-[0.5px] border-neutral-700'>
                <motion.div initial={{opacity:0, translateX:100}} whileInView={{opacity:1, translateX:0}} viewport={{once:true}} transition={{delay:1, duration:0.5}} className='absolute left-4 top-4'> 
                    <div className='text-sm text-white'>
                        <h3 className='text-lg font-semibold'>Increasing Case of Cyber Frauds</h3>
                        <p className='text-gray-600'>Are your personal and financial details really protected?</p>
                       
                        
                    </div>
                </motion.div>
                <ResponsiveContainer width='100%' height='100%' style={{padding:6, top:100}}>
                <BarChart width={150} height={40} data={data}>
                  <defs>
                    
                    <linearGradient id='colorUv' x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={randomColor} stopOpacity={0.6} />
                          <stop offset="90%" stopColor="#111" stopOpacity={0.1} />
                          <stop offset="100%" stopColor="#111" stopOpacity={0} />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                        <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
                        <feFlood floodColor="#ffffff" floodOpacity={0.75} result="color" />
                        <feComposite in="color" in2="offsetBlur" operator="in" result="glowColor" />
                        <feComposite in="SourceGraphic" in2="glowColor" operator="over" />
                    </filter>
                  </defs>
                  <Bar dataKey="uv" fill="url(#colorUv)" style={{backdropFilter:'blur(1px'}} radius={[10,10,0,0]} />
                </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
      </div>  
    </div>
  )
}

export default Comparison