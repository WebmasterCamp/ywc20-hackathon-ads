"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  name?: string
  email: string
}

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("currentUser")
    if (userStr) {
      setCurrentUser(JSON.parse(userStr))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    router.push("/auth")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-black">Logo</div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Link One
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Link Two
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Link Three
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Link Four
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text-gray-600">Welcome, {currentUser.name || currentUser.email}</span>
                <Button onClick={handleLogout} className="bg-black text-white hover:bg-gray-800">
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button className="bg-black text-white hover:bg-gray-800">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-600 text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-wider mb-4">TagLine</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Short heading here</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
            tristique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">Get started</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-600 px-8 py-3">
              Learn more
            </Button>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">TagLine</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Service overview</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-600 text-white p-8 rounded-lg">
                <div className="w-16 h-16 bg-gray-500 rounded mb-6 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="Service icon"
                    width={32}
                    height={32}
                    className="opacity-50"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">Medium length section heading goes here</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                  tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommend Dog Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Recommend dog</h2>
            <p className="text-gray-600">เเนะนําหมาที่เลี้ยงง่าย</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Dog breed"
                    width={300}
                    height={200}
                    className="opacity-50"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Medium length section heading goes here</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                    tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      เเนะนํา
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                      ดูรายละเอียด
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Newsletter Signup */}
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-black mb-4">Logo</div>
              <p className="text-sm text-gray-600 mb-4">
                Join our newsletter to stay up to date on features and releases.
              </p>
              <div className="flex gap-2 mb-4">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button className="bg-black text-white hover:bg-gray-800">Subscribe</Button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our
                company.
              </p>
            </div>

            {/* Footer Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Column One</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Link One
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Link Two
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Link Three
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Link Four
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Link Five
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Column Two</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Link Six
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Link Seven
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Link Eight
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Link Nine
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Link Ten
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4 mb-4">
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Instagram size={20} />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Twitter size={20} />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <Youtube size={20} />
                </Link>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    YouTube
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-8 border-gray-200" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2024 Relume. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-gray-900">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-gray-900">
                Cookies Settings
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
