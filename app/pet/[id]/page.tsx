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
    <div className="container mx-auto px-4 py-8">
      <Link href="/browse" className="inline-block mb-6">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับไปหน้ารายการ
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
          <Image 
            src={pet.image || "/placeholder.svg"} 
            alt={pet.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
          <div className="mb-4">
            <p className="text-gray-600">{pet.breed}</p>
            <p className="text-gray-600">{pet.age}</p>
          </div>
          
          <p className="text-gray-700 mb-6">{pet.description}</p>
          
          <div className="mb-8">
            <div className="text-3xl font-bold text-gray-900">
              {pet.pricePerDay.toLocaleString()}
              <span className="text-base font-normal text-gray-600 ml-1">บาท/วัน</span>
            </div>
          </div>

          <Link href={`/pet/${id}/rent`}>
            <Button size="lg" className="w-full md:w-auto bg-black text-white hover:bg-gray-800">
              เช่าตอนนี้
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
