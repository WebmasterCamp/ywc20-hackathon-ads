"use client"

import { useState, ChangeEvent } from "react"
import { Star } from "lucide-react"
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
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    // Log the feedback data more visibly
    console.log('%c Feedback Submitted ', 'background: #222; color: #bada55; font-size: 16px;')
    console.log(' Rating:', rating, 'out of 5')
    console.log(' Comment:', feedback || '(No comment provided)')
    
    // Here you would normally send the feedback to your backend
    // For example: sendFeedbackToAPI({ rating, feedback })
    
    setSubmitted(true)
    
    // Reset after 2 seconds and close dialog
    setTimeout(() => {
      setRating(0)
      setFeedback("")
      setSubmitted(false)
      setOpen(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-white text-black border-2 border-black font-medium rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-lg py-3">ให้คะแนนการเช่า</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ให้คะแนนประสบการณ์การเช่า</DialogTitle>
          <DialogDescription>
            กรุณาให้คะแนนและความคิดเห็นเกี่ยวกับประสบการณ์การเช่าสัตว์เลี้ยงของคุณ
          </DialogDescription>
        </DialogHeader>
        
        {submitted ? (
          <div className="py-6 text-center">
            <div className="mb-2 text-green-500 font-semibold text-xl">ขอบคุณสำหรับความคิดเห็น!</div>
            <p className="text-gray-600">ความคิดเห็นของคุณมีค่าต่อการพัฒนาบริการของเรา</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center py-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        rating >= star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <textarea
              value={feedback}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
              placeholder="แชร์ความคิดเห็นของคุณเกี่ยวกับประสบการณ์การเช่า..."
              className="min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
            />
            
            <DialogFooter className="mt-4">
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={rating === 0}
                className="w-full bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-lg py-3"
              >
                ส่งความคิดเห็น
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
