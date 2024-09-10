'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

export default function CreateUser() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      const data = await response.json()
      console.log('User created:', data)
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleNameChange} placeholder="name" required />
      <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" required />
      <button type="submit">Create User</button>
    </form>
  )
}
