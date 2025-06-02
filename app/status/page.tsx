"use client"

import { useState, useEffect, Suspense } from "react"
import React from "react"
import { ArrowLeft, CreditCard, FileCheck, Calendar as CalendarIcon, Clipboard, Package, Check, Clock } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

function StatusContent() {
  const searchParams = useSearchParams()
  const price = searchParams.get('price') ? parseInt(searchParams.get('price') || '0') : 2400
  const days = searchParams.get('days') ? parseInt(searchParams.get('days') || '1') : 1
  const petName = searchParams.get('petName') || 'สัตว์เลี้ยง'
  
  const [currentStep, setCurrentStep] = useState(1)
  const [completed, setCompleted] = useState(false)
  
  // State for appointment scheduling
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTimeStart, setAppointmentTimeStart] = useState('09:00')
  const [appointmentTimeEnd, setAppointmentTimeEnd] = useState('10:00')
  const [isAppointmentValid, setIsAppointmentValid] = useState(false)

  const steps = [
    { number: "01", title: "\nชำระเงิน", isActive: currentStep >= 1, icon: CreditCard },
    { number: "02", title: "รอเรา\nตรวจเอกสาร", isActive: currentStep >= 2, icon: FileCheck },
    { number: "03", title: "นัดวันประเมินหน้างาน", isActive: currentStep >= 3, icon: CalendarIcon },
    { number: "04", title: "ประเมินหน้างาน", isActive: currentStep >= 4, icon: Clipboard },
    { number: "05", title: "ส่งมอบสัตว์เลี้ยง", isActive: currentStep >= 5, icon: Package },
    { number: "06", title: "ส่งคืน\nสัตว์เลี้ยง", isActive: currentStep >= 6, icon: Check },
  ]

  // Manual step progression functions for each step
  const handleNextStep = () => {
    if (currentStep < 5) {
      // For step 3, validate appointment details before proceeding
      if (currentStep === 3 && !isAppointmentValid) {
        return // Don't proceed if appointment details are invalid
      }
      setCurrentStep(prev => prev + 1)
    }
  }
  
  // Validate appointment details
  useEffect(() => {
    if (appointmentDate && appointmentTimeStart && appointmentTimeEnd) {
      setIsAppointmentValid(true)
    } else {
      setIsAppointmentValid(false)
    }
  }, [appointmentDate, appointmentTimeStart, appointmentTimeEnd])
  
  const handleDeliveryComplete = () => {
    setCurrentStep(6)
  }
  
  const handleReturnComplete = () => {
    setCompleted(true)
  }
  
  // Payment form state with prefilled values for demo
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "4242 4242 4242 4242",
    cardName: "สมชาย ใจดี",
    expiry: "12/25",
    cvv: "123"
  })
  
  const [isProcessing, setIsProcessing] = useState(false)
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep(2) // Move to next step after payment
      
      // Automatically progress from step 2 to step 3 after a delay
      setTimeout(() => {
        setCurrentStep(3)
      }, 2500) // Wait 2.5 seconds before auto-progressing
    }, 1500)
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-12">
          <Link href="/browse" className="flex items-center hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700 mr-4" />
            <h1 className="text-2xl font-bold text-gray-900">ขั้นตอนการส่งมอบสัตว์เลี้ยง</h1>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                {/* Step Circle with Icon */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"} transition-all duration-300`}>
                    {React.createElement(step.icon, { className: "w-6 h-6" })}
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-lg font-bold text-gray-900 mb-1">{step.number}</div>
                    <div className="text-sm text-gray-600 whitespace-pre-line max-w-20">{step.title}</div>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 mt-[-60px] transition-all duration-500 ${currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Status Message */}
        <div className="flex flex-col items-center gap-4">
          {currentStep === 1 ? (
            <Card className="p-6 bg-white rounded-lg border max-w-md w-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">ชำระเงิน</h3>
              <p className="text-center text-sm text-gray-500 mb-1">ค่าเช่า {petName} {days} วัน</p>
              <p className="text-center text-lg font-medium text-green-600 mb-4">฿{price.toLocaleString()}</p>
              <p className="text-center text-sm text-gray-500 mb-4">ข้อมูลถูกเติมไว้ล่วงหน้าสำหรับการสาธิต</p>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">หมายเลขบัตร</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={paymentDetails.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardName">ชื่อบนบัตร</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="ชื่อ นามสกุล"
                    value={paymentDetails.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">วันหมดอายุ</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={paymentDetails.expiry}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={paymentDetails.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-medium shadow-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        กำลังดำเนินการ...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        ชำระเงิน ฿{price.toLocaleString()}
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-gray-500 mt-2">กดปุ่มเพื่อดำเนินการต่อไปยังขั้นตอนถัดไป</p>
                </div>
              </form>
            </Card>
          ) : currentStep < 6 ? (
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100 max-w-md">
              <div className="mb-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-500 flex items-center justify-center">
                  {steps[currentStep-1].icon && React.createElement(steps[currentStep-1].icon, { className: "w-6 h-6 text-white" })}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {currentStep === 2 && "กำลังตรวจสอบเอกสาร"}
                {currentStep === 3 && "นัดหมายวันประเมิน"}
                {currentStep === 4 && "ผลประเมินความเหมาะสมหน้างาน"}
                {currentStep === 5 && "กำลังส่งมอบสัตว์เลี้ยง"}
              </h3>
              {currentStep === 3 ? (
                <div className="text-left">
                  <p className="text-blue-600 mb-4 text-center">กรุณาเลือกวันที่และเวลาที่สะดวกสำหรับการประเมิน</p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <Label htmlFor="appointment-date" className="flex items-center mb-2">
                        <CalendarIcon className="w-4 h-4 mr-2" /> วันที่นัดหมาย
                      </Label>
                      <Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className="w-full justify-start text-left font-normal"
    >
      {appointmentDate
        ? new Date(appointmentDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
        : <span className="text-gray-400">เลือกวันที่นัดหมาย</span>
      }
      <CalendarIcon className="ml-auto h-4 w-4 text-blue-500" />
    </Button>
  </PopoverTrigger>
  <PopoverContent align="start" className="p-0">
    <div className="p-4">
      <input
        type="date"
        value={appointmentDate}
        onChange={e => setAppointmentDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        className="w-full border rounded p-2 font-kanit"
        style={{ fontFamily: 'var(--font-kanit)' }}
      />
    </div>
  </PopoverContent>
</Popover>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label htmlFor="appointment-time-start" className="flex items-center mb-2">
                          <Clock className="w-4 h-4 mr-2" /> เวลาที่สะดวก
                        </Label>
                        <Select value={appointmentTimeStart} onValueChange={setAppointmentTimeStart}>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกเวลาที่สะดวกสำหรับนัดหมาย" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">09:00</SelectItem>
                            <SelectItem value="10:00">10:00</SelectItem>
                            <SelectItem value="11:00">11:00</SelectItem>
                            <SelectItem value="12:00">12:00</SelectItem>
                            <SelectItem value="13:00">13:00</SelectItem>
                            <SelectItem value="14:00">14:00</SelectItem>
                            <SelectItem value="15:00">15:00</SelectItem>
                            <SelectItem value="16:00">16:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex-1">
                        <Label htmlFor="appointment-time-end" className="flex items-center mb-2">
                          <Clock className="w-4 h-4 mr-2" /> เวลาสิ้นสุด
                        </Label>
                        <Select value={appointmentTimeEnd} onValueChange={setAppointmentTimeEnd}>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกเวลาสิ้นสุด" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10:00">10:00</SelectItem>
                            <SelectItem value="11:00">11:00</SelectItem>
                            <SelectItem value="12:00">12:00</SelectItem>
                            <SelectItem value="13:00">13:00</SelectItem>
                            <SelectItem value="14:00">14:00</SelectItem>
                            <SelectItem value="15:00">15:00</SelectItem>
                            <SelectItem value="16:00">16:00</SelectItem>
                            <SelectItem value="17:00">17:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-md mb-4 border border-blue-100">
                    <p className="text-sm text-blue-700">
                      <strong>หมายเหตุ:</strong> การประเมินหน้างานจะใช้เวลาประมาณ 1 ชั่วโมง
                      โปรดเตรียมพื้นที่และเอกสารให้พร้อม
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleNextStep}
                    disabled={!isAppointmentValid}
                    className="w-full inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    ยืนยันการนัดหมาย
                  </Button>
                </div>
              ) : (
                <>
                  {currentStep === 4 ? (
                    <div className="text-left">
                      <p className="text-blue-600 mb-4 text-center">ผลการประเมินหน้างาน</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-800">
                              <strong>พื้นที่สัตว์จะอยู่</strong><br />
                              มีพื้นที่ปลอดภัย นอนสะอาด ไม่มีของอันตรายหรือหลบหนีได้
                            </p>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">ผ่าน</span>
                          </div>
                        </div>
                        
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-800">
                              <strong>อุณหภูมิ/แสงแดด/ความเสี่ยง</strong><br />
                              ไม่มีแดดร้อนจัด พื้นไม่ลื่น ไม่มีของกินอันตราย
                            </p>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">ผ่าน</span>
                          </div>
                        </div>
                        
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-800">
                              <strong>ความสะอาด</strong><br />
                              ไม่มีเศษของกิน/ขยะ/สิ่งของอันตรายเกลื่อนบ้าน
                            </p>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">ผ่าน</span>
                          </div>
                        </div>
                        
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-800">
                              <strong>ท่าทีของลูกค้า</strong><br />
                              มีความน่าสงสัยหรือไม่ เช่น กล้าจ้องตาหมาหรือไม่ ขยับมือเร็วเกินไปไหม อารมณ์ร้อนหรือใจเย็น
                            </p>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">ผ่าน</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-md mb-4 border border-green-100">
                        <p className="text-sm text-green-700 flex items-center">
                          <Check className="w-4 h-4 mr-2" />
                          <strong>ผลการประเมิน:</strong> ผ่านทุกหัวข้อ สามารถดำเนินการส่งมอบสัตว์เลี้ยงได้
                        </p>
                      </div>
                      
                      <Button 
                        onClick={handleNextStep}
                        className="w-full inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        ดำเนินการขั้นตอนถัดไป
                      </Button>
                    </div>
                  ) : currentStep === 2 ? (
                    <>
                      <p className="text-blue-600 mb-4">กำลังตรวจสอบเอกสารของคุณ...</p>
                      <div className="flex items-center justify-center space-x-2 mt-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse delay-150"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse delay-300"></div>
                      </div>
                      <div className="text-sm text-gray-500 italic">ระบบกำลังตรวจสอบเอกสารโดยอัตโนมัติ</div>
                    </>
                  ) : currentStep === 5 ? (
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-full max-w-xs bg-white rounded-lg shadow-md border border-blue-200 p-5 mb-4 flex flex-col items-center">
                        <div className="flex items-center justify-center mb-3">
                          <CalendarIcon className="w-7 h-7 text-blue-500 mr-2" />
                          <Clock className="w-7 h-7 text-blue-500" />
                        </div>
                        <div className="text-lg font-bold text-gray-900 mb-1">วันและเวลาส่งมอบสัตว์เลี้ยง</div>
                        <div className="text-xl text-blue-700 font-semibold mb-2">
                          {appointmentDate ? new Date(appointmentDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
                        </div>
                        <div className="text-lg text-blue-700 font-medium">
                          {appointmentTimeStart} - {appointmentTimeEnd} น.
                        </div>
                        <div className="mt-3 text-sm text-gray-600 text-center">
                          ทีมงานจะไปส่งมอบสัตว์เลี้ยงให้คุณตามวันและเวลาที่เลือกไว้<br />กรุณาเตรียมตัวให้พร้อม
                        </div>
                      </div>
                      <Link 
                        href={`/return?petName=${encodeURIComponent(petName)}`}
                        className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        ดำเนินการต่อไปยังการส่งคืน
                      </Link>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleNextStep}
                      className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      ดำเนินการขั้นตอนถัดไป
                    </Button>
                  )}
                </>
              )}
            </div>
          ) : !completed ? (
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100 max-w-md">
              <div className="mb-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                ตรวจสอบการส่งคืนสัตว์เลี้ยง
              </h3>
              <p className="text-gray-700 mb-6">กำลังตรวจสอบสภาพสัตว์เลี้ยงก่อนรับคืน</p>
              <div className="flex flex-col items-center">
                <img
                  src="/dog-check.png"
                  alt="dog"
                  className="w-40 h-40 rounded-full object-cover mb-4 shadow-md border-4 border-white"
                  style={{ fontFamily: 'var(--font-kanit)' }}
                />
                <form
                  className="flex flex-col gap-4 w-full max-w-xs"
                  onSubmit={e => {
                    e.preventDefault();
                    handleReturnComplete();
                  }}
                >
                  {[1,2,3,4].map((n) => (
                    <label key={n} className="flex items-center gap-3 text-base font-kanit">
                      <input type="checkbox" className="w-5 h-5 accent-green-500" />
                      กำลังตรวจสอบสภาพสัตว์เลี้ยงก่อนรับคืน
                    </label>
                  ))}
                  <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-full mt-4 text-base font-kanit"
                  >
                    ยืนยันการส่งคืน
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="text-center max-w-md">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">การเช่าสิ้นเสร็จสิ้น</h2>
              <p className="text-gray-600 mb-6">การส่งคืนสัตว์เลี้ยงเสร็จสมบูรณ์ ขอบคุณที่ใช้บริการ</p>
              
              <div className="flex flex-col gap-5 items-center mt-8">
                <div className="w-full max-w-xs">
                  <FeedbackDialog />
                </div>
                
                <Link 
                  href="/" 
                  className="w-full bg-white text-black border-2 border-black font-medium rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-lg py-2"
                >
                  กลับสู่หน้าหลัก
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Component() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 rounded-full bg-blue-200 mb-4"></div>
        <div className="h-4 w-48 bg-blue-200 rounded mb-2"></div>
        <div className="h-3 w-32 bg-blue-100 rounded"></div>
      </div>
    </div>}>
      <StatusContent />
    </Suspense>
  )
}
