import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="h-[15%] p-4 w-full border-b border-gray-300 flex justify-between pl-20 items-center">
        <Link to='/'><h2 className="font-bold text-4xl">Workout Budyyy</h2></Link>

        <div className='flex  justify-center items-center gap-4'>
          <Link className='bg-gray-300 py-2 px-4 rounded-3xl' to='/login'>Login</Link>
          <Link className='bg-gray-300 py-2 px-4 rounded-3xl' to='/signup'>Signup</Link>
        </div>
    </div>
  )
}

export default Navbar
