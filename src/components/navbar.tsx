"use client"
import Link from "next/link";

export default function Navbar() {   
    
    const handleLogout = async () => {
        try {
        await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        } catch (error) {
        console.error(error)
        }
    }
  return (
    <div className='fixed top-0 w-full flex justify-between items-center py-4 px-10 bg-gray-800 text-white'>
        <h1 className='text-2xl font-bold'><Link href='/'>CarSambhalo</Link></h1>
        <div className='space-x-8'>
            <Link href='/productList'>Product List</Link>
            <Link href='/productCreate'>Product Create</Link>
            <Link href='/' onClick={handleLogout}>Logout</Link>
        </div>
    </div>
  )
}
