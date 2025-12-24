import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-900 text-white py-3 shadow-md'>
      <div className="logo">
        <span className='font-bold text-xl mx-8'>SimplyDo</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:text-blue-400 transition-colors '>Home</li>
        <li className='cursor-pointer hover:text-blue-400 transition-colors '>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
