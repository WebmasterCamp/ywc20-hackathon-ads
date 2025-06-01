"use client"

import { useState, useEffect } from "react"
import React from "react"
import { ArrowLeft, CreditCard, FileCheck, Calendar, Clipboard, Package } from "lucide-react"
import Link from "next/link"

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completed, setCompleted] = useState(false)

  const steps = [
    { number: "01", title: "ชำระเงิน", isActive: currentStep >= 1, icon: CreditCard },
    { number: "02", title: "รอเรา\nตรวจเอกสาร", isActive: currentStep >= 2, icon: FileCheck },
    { number: "03", title: "นัดวัน\nประเมินหน้างาน", isActive: currentStep >= 3, icon: Calendar },
    { number: "04", title: "ประเมินหน้างาน", isActive: currentStep >= 4, icon: Clipboard },
    { number: "05", title: "ส่งมอบสัตว์เลี้ยง", isActive: currentStep >= 5, icon: Package },
  ]

  useEffect(() => {
    // Auto-start the progress
    const timer = setTimeout(() => {
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1)
      } else if (currentStep === 5 && !completed) {
        setCompleted(true)
      }
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [currentStep, completed])

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
          {currentStep < 5 ? (
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100 max-w-md">
              <div className="animate-pulse mb-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-500 flex items-center justify-center">
                  {steps[currentStep-1].icon && React.createElement(steps[currentStep-1].icon, { className: "w-6 h-6 text-white" })}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {currentStep === 1 && "กำลังดำเนินการชำระเงิน"}
                {currentStep === 2 && "กำลังตรวจสอบเอกสาร"}
                {currentStep === 3 && "กำลังนัดหมายวันประเมิน"}
                {currentStep === 4 && "กำลังประเมินหน้างาน"}
              </h3>
              <p className="text-blue-600">โปรดรอสักครู่...</p>
            </div>
          ) : (
            <div className="text-center p-8 bg-green-50 rounded-lg border border-green-100 max-w-md">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">เสร็จสิ้นกระบวนการ</h2>
              <p className="text-green-600 mb-6">การส่งมอบสัตว์เลี้ยงเสร็จสมบูรณ์</p>
              
              <Link href="/browse" className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                กลับสู่หน้าหลัก
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
