"use client"

import { useState, Suspense } from "react"
import React from "react"
import { ArrowLeft, CreditCard, FileCheck, Calendar, Clipboard, Package, Check } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

function ReturnContent() {
  const searchParams = useSearchParams()
  const petName = searchParams.get('petName') || 'สัตว์เลี้ยง'
  
  const [completed, setCompleted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Steps for the entire process (showing all steps with step 6 active)
  const steps = [
    { number: "01", title: "\nชำระเงิน", isActive: true, isCompleted: true, icon: CreditCard },
    { number: "02", title: "รอเรา\nตรวจเอกสาร", isActive: true, isCompleted: true, icon: FileCheck },
    { number: "03", title: "นัดวันประเมินหน้างาน", isActive: true, isCompleted: true, icon: Calendar },
    { number: "04", title: "ประเมินหน้างาน", isActive: true, isCompleted: true, icon: Clipboard },
    { number: "05", title: "ส่งมอบสัตว์เลี้ยง", isActive: true, isCompleted: true, icon: Package },
    { number: "06", title: "ส่งคืน\nสัตว์เลี้ยง", isActive: true, isCompleted: false, icon: Check },
  ]

  // Handle return process manually instead of auto-completing
  const handleStartReturn = () => {
    setIsProcessing(true)
  }
  
  const handleConfirmReturn = () => {
    setCompleted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-12">
          <Link href="/browse" className="flex items-center hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700 mr-4" />
            <h1 className="text-2xl font-bold text-gray-900">ขั้นตอนการส่งคืนสัตว์เลี้ยง</h1>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                {/* Step Circle with Icon */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`
                      w-14 h-14 rounded-full flex items-center justify-center mb-2
                      ${step.isActive 
                        ? step.isCompleted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                      }
                      ${step.number === "06" && isProcessing ? 'animate-pulse' : ''}
                    `}
                  >
                    {step.icon && React.createElement(step.icon, { className: "w-6 h-6" })}
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{step.number}</div>
                    <div className="text-xs text-gray-600 whitespace-pre-line">{step.title}</div>
                  </div>
                </div>
                
                {/* Connector Line (except after last step) */}
                {index < steps.length - 1 && (
                  <div 
                    className={`
                      w-12 h-1 mx-1 sm:w-16 md:w-24 
                      ${step.isActive && steps[index + 1].isActive ? 'bg-blue-500' : 'bg-gray-200'}
                      ${step.isCompleted && steps[index + 1].isCompleted ? 'bg-green-500' : ''}
                    `}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex justify-center">
          {!isProcessing && !completed ? (
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100 max-w-md">
              <div className="mb-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-500 flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                เริ่มขั้นตอนการส่งคืน {petName}
              </h3>
              <p className="text-blue-600 mb-4">คลิกปุ่มด้านล่างเพื่อเริ่มกระบวนการส่งคืนสัตว์เลี้ยง</p>
              
              <Button 
                onClick={handleStartReturn}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg font-medium"
              >
                <Package className="mr-2 h-5 w-5" />
                เริ่มการส่งคืน
              </Button>
            </div>
          ) : isProcessing && !completed ? (
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100 max-w-md">
              <div className="mb-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                ตรวจสอบการส่งคืน {petName}
              </h3>
              <p className="text-blue-600 mb-4">กำลังตรวจสอบสภาพสัตว์เลี้ยงก่อนรับคืน</p>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <h4 className="font-medium text-gray-800 mb-2">รายการตรวจสอบ:</h4>
                <ul className="text-left text-sm space-y-2">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span>สุขภาพสัตว์เลี้ยงปกติ</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span>ไม่มีบาดแผลหรือการบาดเจ็บ</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span>พฤติกรรมปกติ</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span>อุปกรณ์ครบถ้วน</span>
                  </li>
                </ul>
              </div>
              
              <Button 
                onClick={handleConfirmReturn}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-medium"
              >
                <Check className="mr-2 h-5 w-5" />
                ยืนยันการส่งคืน
              </Button>
            </div>
          ) : (
            <div className="text-center max-w-md">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">การเช่าสิ้นสุดสมบูรณ์</h2>
              <p className="text-gray-600 mb-6">การส่งคืนสัตว์เลี้ยงเสร็จสมบูรณ์ ขอบคุณที่ใช้บริการ</p>
              
              <div className="flex flex-col gap-5 items-center mt-8">
                <div className="w-full max-w-xs">
                  <FeedbackDialog />
                </div>
                
                <Link 
                  href="/browse" 
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
      <ReturnContent />
    </Suspense>
  )
}
