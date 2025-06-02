"use client"

import { useState, useEffect, Suspense } from "react"
import React from "react"
import { ArrowLeft, CreditCard, FileCheck, Calendar, Clipboard, Package, Check } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

function StatusContent() {
  const searchParams = useSearchParams()
  const price = searchParams.get('price') ? parseInt(searchParams.get('price') || '0') : 2400
  const days = searchParams.get('days') ? parseInt(searchParams.get('days') || '1') : 1
  const petName = searchParams.get('petName') || 'สัตว์เลี้ยง'
  
  const [currentStep, setCurrentStep] = useState(1)
  const [completed, setCompleted] = useState(false)

  const steps = [
    { number: "01", title: "\nชำระเงิน", isActive: currentStep >= 1, icon: CreditCard },
    { number: "02", title: "รอเรา\nตรวจเอกสาร", isActive: currentStep >= 2, icon: FileCheck },
    { number: "03", title: "นัดวันประเมินหน้างาน", isActive: currentStep >= 3, icon: Calendar },
    { number: "04", title: "ประเมินหน้างาน", isActive: currentStep >= 4, icon: Clipboard },
    { number: "05", title: "ส่งมอบสัตว์เลี้ยง", isActive: currentStep >= 5, icon: Package },
    { number: "06", title: "ส่งคืน\nสัตว์เลี้ยง", isActive: currentStep >= 6, icon: Check },
  ]

  // Only auto-progress for steps after payment (step 1)
  useEffect(() => {
    // Skip auto-progress for step 1 (payment)
    if (currentStep === 1) return;
    
    // Auto-start the progress for other steps
    const timer = setTimeout(() => {
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1)
      } else if (currentStep === 6 && !completed) {
        setCompleted(true)
      }
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [currentStep, completed])
  
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
              <div className="animate-pulse mb-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-500 flex items-center justify-center">
                  {steps[currentStep-1].icon && React.createElement(steps[currentStep-1].icon, { className: "w-6 h-6 text-white" })}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {currentStep === 2 && "กำลังตรวจสอบเอกสาร"}
                {currentStep === 3 && "กำลังนัดหมายวันประเมิน"}
                {currentStep === 4 && "กำลังประเมินหน้างาน"}
                {currentStep === 5 && "กำลังส่งมอบสัตว์เลี้ยง"}
              </h3>
              <p className="text-blue-600">โปรดรอสักครู่...</p>
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
