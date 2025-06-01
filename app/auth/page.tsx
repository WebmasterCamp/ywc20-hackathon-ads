"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface User {
  email: string
  password: string
  name?: string
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (isLogin) {
      // Handle Login
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((u: User) => u.email === email && u.password === password)
      
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user))
        router.push("/")
      } else {
        setError("Invalid email or password")
      }
    } else {
      // Handle Register
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const existingUser = users.find((u: User) => u.email === email)
      
      if (existingUser) {
        setError("Email already exists")
        return
      }

      const newUser = { email, password, name }
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem("currentUser", JSON.stringify(newUser))
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
          <div className="flex justify-center mt-4 space-x-4">
            <Button
              variant={isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(true)}
              className={isLogin ? "bg-black" : ""}
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(false)}
              className={!isLogin ? "bg-black" : ""}
            >
              Register
            </Button>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                id="name"
                type="text"
                required={!isLogin}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            {isLogin ? "Sign in" : "Register"}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
} 