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

  // Phone and location state
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [phoneError, setPhoneError] = useState('')
  // const [locationError, setLocationError] = useState('')

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

          {/* Phone Number Field */}
          <div>
            <h2 className="text-lg font-semibold mb-4">เบอร์โทรศัพท์ติดต่อ</h2>
            <Input
              type="tel"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={15}
              required
              className="font-kanit text-base"
              placeholder="กรอกเบอร์โทรศัพท์ของคุณ"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
            />
            {phoneError && <div className="text-red-500 text-sm mt-1">{phoneError}</div>}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">ขนาดพื้นที่โดยประมาณ</h2>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="ขนาด..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small-room">ห้อง/คอนโดขนาดเล็ก (น้อยกว่า 30 ตร.ม.)</SelectItem>
                <SelectItem value="medium-house">อพาร์ทเมนต์/บ้านขนาดกลาง (30-70 ตร.ม.)</SelectItem>
                <SelectItem value="large-house">บ้านเดี่ยว/ทาวน์โฮมขนาดใหญ่ (มากกว่า 70 ตร.ม.)</SelectItem>
                <SelectItem value="outdoor">มีสนามหรือพื้นที่กลางแจ้ง</SelectItem>
                <SelectItem value="other">อื่น ๆ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location/Address Field */}
          <div>
            <h2 className="text-lg font-semibold mb-4">สถานที่/ที่อยู่สำหรับส่งมอบ</h2>
            <Input
              type="text"
              className="font-kanit text-base"
              placeholder="กรอกที่อยู่หรือสถานที่สำหรับส่งมอบสัตว์เลี้ยง"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">สถานที่เลี้ยง</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden h-[300px] relative mb-4">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(location || 'Bangkok, Thailand')}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="แผนที่สถานที่เลี้ยง"
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
              if (!phone || phone.length < 9) {
                setPhoneError('กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง');
              } else {
                setPhoneError('');
              }

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
