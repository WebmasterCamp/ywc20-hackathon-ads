"use client"

import { use, useState } from "react"
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
  const [selectedImage, setSelectedImage] = useState(0)

  const images = pet?.images || [pet?.image || "/placeholder.svg"]

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
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 border-blue-500">
            <Image 
              src={images[selectedImage]} 
              alt={pet.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-blue-500' : 'hover:opacity-80'}`}
              >
                <Image 
                  src={image} 
                  alt={`${pet.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-6">{pet.name}</h1>
          <div className="text-3xl font-bold mb-6">
            {pet.pricePerDay.toLocaleString()} บาท/ วัน
          </div>
          
          <p className="text-gray-700 mb-6">{pet.description}</p>
          
          <Link href={`/pet/${id}/rent`}>
            <Button size="lg" className="w-full bg-black text-white hover:bg-gray-800">
              สนใจเช่า
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
