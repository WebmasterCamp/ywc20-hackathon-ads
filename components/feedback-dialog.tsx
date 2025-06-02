"use client"

import { useState, ChangeEvent } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function FeedbackDialog() {
  const [feedback, setFeedback] = useState("")
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    // Log the feedback data more visibly
    console.log('%c Feedback Submitted ', 'background: #222; color: #bada55; font-size: 16px;')
    console.log(' Comment:', feedback || '(No comment provided)')
    
    // Here you would normally send the feedback to your backend
    // For example: sendFeedbackToAPI({ feedback })
    
    setSubmitted(true)
    
    // Reset after 2 seconds and close dialog
    setTimeout(() => {
      setFeedback("")
      setSubmitted(false)
      setOpen(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full max-w-xs bg-black text-white text-center font-medium rounded-full py-5 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-lg">แชร์ความคิดเห็น</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md overflow-hidden p-0 border-0">
        <div className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-t-lg p-6 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg">
            <Image 
              src="/images/feedbackdog.png" 
              alt="Feedback Dog" 
              fill 
              className="object-cover"
            />
          </div>
          <DialogTitle className="text-xl font-bold text-center mb-1">เพราะการได้อยู่กับสัตว์เลี้ยง</DialogTitle>
          <DialogTitle className="text-xl font-bold text-center mb-3">แม้ช่วงเวลาสั้นๆ ก็มีความหมาย</DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            กรุณาแชร์ความคิดเห็นเกี่ยวกับประสบการณ์การเช่าสัตว์เลี้ยงของคุณ
          </DialogDescription>
        </div>
        
        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="mb-2 text-green-500 font-semibold text-xl">ขอบคุณสำหรับความคิดเห็น!</div>
              <p className="text-gray-600">ความคิดเห็นของคุณมีค่าต่อการพัฒนาบริการของเรา</p>
            </div>
          ) : (
            <>
              <textarea
                value={feedback}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
                placeholder="แชร์ความคิดเห็นของคุณเกี่ยวกับประสบการณ์การเช่า..."
                className="min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              />
              
              <DialogFooter className="mt-4">
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={feedback.trim() === ""}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg py-3 transition-all shadow-md hover:shadow-lg"
                >
                  ส่งความคิดเห็น
                </Button>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
