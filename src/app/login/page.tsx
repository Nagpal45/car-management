"use client"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = {
      username: (form[0] as HTMLInputElement).value,
      password: (form[1] as HTMLInputElement).value
    }
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        throw new Error('Login failed')
      }
      router.push('/productList');
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-[50px] font-bold mb-16'>Login</h1>
      <form className='flex flex-col space-y-10 w-full items-center' onSubmit={handleLogin}>
        <input className='p-4 w-[50%] border border-gray-500' type='text' placeholder='Username'/>
        <input className='p-4 w-[50%] border border-gray-500' type='password' placeholder='Password' />
        <button className='p-4 w-[30%] bg-blue-500 text-white rounded rounded-[40px]' type="submit">Login</button>
      </form>
  </div>
  )
}
