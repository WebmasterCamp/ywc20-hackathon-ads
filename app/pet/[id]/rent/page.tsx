"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { dogs } from "@/data/dogs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default function RentPetPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const pet = dogs.find(dog => dog.id === parseInt(id))
  const [days, setDays] = useState(1)
  const [loading, setLoading] = useState(false)
  const [idCardImage, setIdCardImage] = useState<string | null>(null)

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
      <Link href={`/pet/${id}`} className="inline-block mb-6">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับไปหน้ารายละเอียด
        </Button>
      </Link>

      <h1 className="text-3xl font-bold mb-8">ยืนยันตัวตนว่าคุณคือใคร</h1>

      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">รูปบัตรประชาชน</h2>
            <p className="text-gray-600 mb-4">เพื่อรายละเอียดครบถ้วนชัดเจน</p>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              {idCardImage ? (
                <div className="space-y-4">
                  <div className="relative w-full h-48 mx-auto overflow-hidden rounded-lg">
                    <Image 
                      src={idCardImage} 
                      alt="ID Card Preview" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIdCardImage(null)}
                    >
                      เปลี่ยนรูป
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="idCard"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            setIdCardImage(event.target.result as string)
                          }
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                  <Label
                    htmlFor="idCard"
                    className="inline-block px-6 py-3 bg-black text-white rounded-md cursor-pointer hover:bg-gray-800 rounded-full"
                  >
                    อัพโหลดรูปภาพ
                  </Label>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">ขนาดพื้นที่โดยประมาณ</h2>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="ขนาด..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">น้อยกว่า 50 ตร.ม.</SelectItem>
                <SelectItem value="medium">50-100 ตร.ม.</SelectItem>
                <SelectItem value="large">มากกว่า 100 ตร.ม.</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">สถานที่เลี้ยง</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden h-[300px] relative mb-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5377227833847!2d100.5622233!3d13.7455416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ0JzQzLjkiTiAxMDDCsDMzJzQ0LjAiRQ!5e0!3m2!1sen!2sth!4v1623144611444!5m2!1sen!2sth" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">ระยะเวลาการเช่า</h2>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="1"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                className="w-24"
              />
              <span>วัน</span>
              <div className="ml-auto text-xl font-semibold">
                {(pet.pricePerDay * days).toLocaleString()} บาท
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full bg-black text-white hover:bg-gray-800 rounded-full"
            onClick={() => {
              setLoading(true)
              // Here you would normally submit the form data to your backend
              // For now, we'll just simulate a delay
              const totalPrice = pet.pricePerDay * days;
              setTimeout(() => {
                router.push(`/status?price=${totalPrice}&days=${days}&petName=${encodeURIComponent(pet.name)}`)
              }, 1000)
            }}
            disabled={loading || !idCardImage}
          >
            {loading ? 'กำลังบันทึก...' : 'บันทึก และไปต่อ'}
          </Button>
          {!idCardImage && (
            <p className="text-red-500 text-sm text-center mt-2">* กรุณาอัพโหลดรูปบัตรประชาชนก่อนดำเนินการต่อ</p>
          )}
        </div>
      </div>
    </div>
  )
}
