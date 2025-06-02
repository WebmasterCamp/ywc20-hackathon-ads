"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { dogs } from "@/data/dogs"

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

    // Add smooth scrolling behavior
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href');
        const element = document.querySelector(id as string);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    router.push("/auth")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#71AAC1]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Image src="/images/logo.svg" alt="logo" width={30} height={30} />
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#hero" className="text-white hover:text-gray-900">
              หน้าแรก
            </Link>
            <Link href="/browse" className="text-white hover:text-gray-900">
              เช่าสัตว์เลี้ยง
            </Link>
            <Link href="#services" className="text-white hover:text-gray-900">
              บริการของเรา
            </Link>
            <Link href="#contact" className="text-white hover:text-gray-900">
              ติดต่อเรา
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text-gray-600">สวัสดี, {currentUser.name || currentUser.email}</span>
                <Button onClick={handleLogout} className="bg-[#05A75B] text-white hover:bg-green-500">
                  ออกจากระบบ
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button className="bg-[#05A75B] text-white hover:bg-green-500">เข้าสู่ระบบ</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-sky-100 text-white relative min-h-dvh h-[110dvh] min-w-full overflow-hidden bg-cover bg-bottom bg-no-repeat" style={{ backgroundImage: "url('/images/landingpageHeroBg.webp')" }}>
        <div className="container mx-auto h-dvh px-4 pt-16 md:pt-8 pb-2 flex flex-col  items-center">
          <div className="w-full h-full flex flex-col items-center justify-start text-center pt-10 md:pt-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white"><span className=" text-2xl md:text-3xl">ไม่ยากถ้าอยาก</span><br />ลองเลี้ยง</h1>
            <p className="text-base md:text-lg text-sky-800 mb-8 max-w-md text-white">
            แพลตฟอร์มสำหรับผู้ที่อยากเลี้ยงสัตว์ แต่ยังไม่มั่นใจว่าจะสามารถเลี้ยงได้หรือไม่ กังวลเรื่องเวลา รวมถึงข้อจำกัดต่างๆ ให้สามารถทดลองเลี้ยงจริงผ่านการเช่าสัตว์เลี้ยง ก่อนตัดสินใจรับเลี้ยงอย่างถาวร
            </p>
            <Link href="/browse">
              <Button className="bg-[#05A75B] text-white hover:bg-green-500 px-8 py-3 rounded-full">
                เริ่มหาเพื่อนคู่ใจ
              </Button>
            </Link>
          </div>
        </div>
          <Image src="/images/herosectiondog.png" alt="Hero" width={500} height={500} className="max-w-[400px] md:max-w-full  absolute bottom-0 left-1/2 -translate-x-1/2" />
          
          {/* Blur gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-[20px] bg-[#E0F2FA] blur-3xl" />
          
          {/* Wave design at bottom */}
          {/* <div className="absolute bottom-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
              <path fill="#ffffff" fillOpacity="1" d="M0,192L80,176C160,160,320,128,480,128C640,128,800,160,960,165.3C1120,171,1280,149,1360,138.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div> */}
      </section>

      {/* Service Overview */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm text-sky-600 mb-2">Service overview</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ก่อนพบเพื่อนคู่ใจ</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">บริการของเราช่วยให้คุณได้เรียนรู้และทดลองเลี้ยงสัตว์ก่อนตัดสินใจเลี้ยงจริง ด้วยระบบที่ปลอดภัยและเป็นมิตร</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl overflow-hidden relative h-[450px] group">
              <Image 
                src="/images/Card-1.png" 
                alt="เรียนรู้วิธีเลี้ยงสุนัข" 
                fill
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">เรียนรู้วิธีเลี้ยงสุนัข</h3>
                <p className="text-sm opacity-90">เรียนรู้วิธีการดูแลสุนัขอย่างถูกต้อง ทั้งเรื่องอาหาร การฝึก การดูแลสุขภาพ และการเล่นกับสุนัขอย่างปลอดภัย</p>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden relative h-[450px] group">
              <Image 
                src="/images/Card-2.png" 
                alt="บริการเช่าสุนัข" 
                fill
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">บริการเช่าสุนัข</h3>
                <p className="text-sm opacity-90">บริการเช่าสุนัขหลากหลายสายพันธุ์ ทั้งสุนัขขนาดเล็กและใหญ่ ให้คุณได้ทดลองเลี้ยงก่อนตัดสินใจรับเลี้ยงจริง</p>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden relative h-[450px] group">
              <Image 
                src="/images/Card.png" 
                alt="ตัวกลางการขนส่ง" 
                fill
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">ตัวกลางการขนส่ง</h3>
                <p className="text-sm opacity-90">บริการขนส่งสัตว์เลี้ยงถึงบ้านคุณอย่างปลอดภัย พร้อมคำแนะนำในการดูแลและอุปกรณ์ที่จำเป็นสำหรับการเลี้ยงดู</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommend Dog Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Recommend dog</h2>
            <p className="text-gray-600">เแนะนําหมาที่เลี้ยงง่าย</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dogs.slice(0, 3).map((dog) => (
              <div key={dog.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-video bg-gray-200 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={dog.image}
                    alt={dog.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{dog.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {dog.description.length > 120 ? `${dog.description.substring(0, 120)}...` : dog.description}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      เแนะนํา
                    </Button>
                    <Link href={`/pet/${dog.id}`}>
                      <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                        ดูรายละเอียด
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 lg:col-span-1">
              <div className="text-2xl font-bold text-gray-900 mb-4">PetRenting</div>
              <p className="text-gray-600 mb-6 max-w-xs">
                บริการเช่าสัตว์เลี้ยงที่คุณสามารถเลือกได้ตามต้องการ เพื่อให้คุณได้ทดลองเลี้ยงก่อนตัดสินใจ
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">บริการของเรา</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    เช่าสุนัข
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    เช่าแมว
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    เช่าสัตว์เลี้ยงอื่นๆ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    บริการส่งสัตว์เลี้ยง
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">ช่วยเหลือ</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    คำถามที่พบบ่อย
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    นโยบายการเช่า
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    วิธีการเช่า
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    ติดต่อเรา
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">ติดตามเรา</h4>
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
            </div>
          </div>

          <hr className="my-8 border-gray-200" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025 PetRenting. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-gray-900">
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link href="#" className="hover:text-gray-900">
                เงื่อนไขการใช้บริการ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
