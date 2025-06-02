"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { dogs } from "@/data/dogs"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default function PetPage({ params }: Props) {
  const { id } = use(params)
  const pet = dogs.find(dog => dog.id === parseInt(id))

  if (!pet) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบข้อมูลสัตว์เลี้ยง</h1>
          <Link href="/browse">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              กลับไปหน้ารายการ
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6">
      <Link href="/browse" className="inline-block mb-4">
        <Button variant="ghost" size="sm" className="text-gray-600">
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับ
        </Button>
      </Link>

      <div className="mb-6">
        <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden mb-4">
          <Image 
            src={pet.image} 
            alt={pet.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-4 right-4">
            <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm text-xs rounded-full px-3 py-1 h-auto">
              Show all photos
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{pet.name}</h1>
          <p className="text-gray-600">{pet.breed} · {pet.age}</p>
        </div>

        <div className="border-t border-b py-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">{pet.pricePerDay.toLocaleString()} บาท/ วัน</div>
            </div>
            <Link href={`/pet/${id}/rent`}>
              <Button className="bg-black text-white hover:bg-gray-800 px-6 rounded-full">
                สนใจเช่า
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">เกี่ยวกับน้องหมาตัวนี้</h2>
          <p className="text-gray-700 leading-relaxed">{pet.description}</p>
          
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">คุณลักษณะพิเศษ</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>เป็นมิตรกับเด็ก</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>ฝึกมาแล้ว</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>สุขภาพแข็งแรง</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>ได้รับวัคซีนครบ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
