"use client"

import type React from "react"
import Image from "next/image"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, BookOpen, Sparkles } from "lucide-react"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      try {
        // Submit to Google Forms
        const formData = new FormData()
        formData.append('entry.1855661999', email)
        
        await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfMY2KQFeIJiCp8fsT7jxiCSc9jBbjDzfiB9oIjVKeaYmAKwA/formResponse', {
          method: 'POST',
          body: formData,
          mode: 'no-cors' // Required for Google Forms
        })
        
        setIsSubmitted(true)
        console.log("Email submitted to Google Forms:", email)
      } catch (error) {
        console.error("Error submitting to Google Forms:", error)
        // Still show success message to user since Google Forms submissions 
        // often succeed even when fetch throws an error due to no-cors mode
        setIsSubmitted(true)
      }
    }
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 transition-opacity duration-1000 ease-out"
      style={{ 
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1s ease-out, transform 1s ease-out'
      }}
    >
      {/* Header */}
      <header className="px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="h-8 w-8" style={{ color: "#eb7373" }} />
          <h1 className="text-3xl font-bold text-black">BookThreads</h1>
        </div>
        {/*
        <p className="text-lg" style={{ color: "#eb7373" }}>
          Your reading sanctuary
        </p>
        */}
      </header>

      {/* Main Content */}
      <main className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Transform Your Reading
              <br />
              <span style={{ color: "#eb7373" }}>Experience</span>
            </h2>
            <p className="text-xl text-black mb-8 max-w-2xl mx-auto leading-relaxed">
              Capture, organize, and rediscover your favorite passages with BookThreads. Never lose track of
              meaningful insights again.
            </p>
          </div>

          {/* Centered Waitlist Form */}
          <div className="flex justify-center mb-20">
            <div className="w-full max-w-lg">
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl" style={{ borderColor: "#eb7373" }}>
                <CardContent className="p-12">
                  {!isSubmitted ? (
                    <>
                      <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-black mb-3">Join the Waitlist</h3>
                        <p className="text-lg" style={{ color: "#eb7373" }}>
                          Be the first to experience the future of reading
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="text-black placeholder:text-gray-500 h-12 text-lg border-2"
                          style={
                            {
                              borderColor: "#eb7373",
                              "--tw-ring-color": "#eb7373",
                            } as React.CSSProperties
                          }
                          onFocus={(e) => {
                            e.target.style.borderColor = "#eb7373"
                            e.target.style.boxShadow = `0 0 0 3px rgba(235, 115, 115, 0.1)`
                          }}
                        />
                        <Button
                          type="submit"
                          className="w-full text-white py-4 text-xl font-semibold border-0 hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: "#eb7373" }}
                        >
                          Join Waitlist
                        </Button>
                      </form>

                      <p className="text-sm text-center mt-6" style={{ color: "#eb7373" }}>
                        No spam, ever. Unsubscribe anytime.
                      </p>
                    </>
                  ) : (
                    <div className="text-center">
                      <CheckCircle className="h-20 w-20 mx-auto mb-6" style={{ color: "#eb7373" }} />
                      <h3 className="text-3xl font-bold text-black mb-3">You're In!</h3>
                      <p className="text-lg" style={{ color: "#eb7373" }}>
                        Thanks for joining our waitlist. We'll notify you when BookThreads is ready!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats 
              <div className="mt-10 text-center">
                <p className="font-semibold text-lg" style={{ color: "#eb7373" }}>
                  Join <span className="text-black font-bold">2,847</span> readers already on the waitlist
                </p>
              </div>
              */}
            </div>
          </div>

          {/* Features List */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div
                className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "rgba(235, 115, 115, 0.1)" }}
              >
                <Sparkles className="h-8 w-8" style={{ color: "#eb7373" }} />
              </div>
              <h4 className="text-xl font-semibold text-black mb-2">Capture Instantly</h4>
              <p style={{ color: "#eb7373" }}>Snap photos of book pages, articles, or any text you want to remember</p>
            </div>

            <div className="text-center">
              <div
                className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "rgba(235, 115, 115, 0.1)" }}
              >
                <Sparkles className="h-8 w-8" style={{ color: "#eb7373" }} />
              </div>
              <h4 className="text-xl font-semibold text-black mb-2">AI Organization</h4>
              <p style={{ color: "#eb7373" }}>Automatically extract and organize text by book, chapter, and topic</p>
            </div>

            <div className="text-center">
              <div
                className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "rgba(235, 115, 115, 0.1)" }}
              >
                <BookOpen className="h-8 w-8" style={{ color: "#eb7373" }} />
              </div>
              <h4 className="text-xl font-semibold text-black mb-2">Reading Sanctuary</h4>
              <p style={{ color: "#eb7373" }}>Create your personal library of insights and meaningful passages</p>
            </div>
          </div>
        </div>
      </main>

          {/* App Mockup Previews - Side by Side */}
          <div className="flex justify-center mb-20">
            <div className="flex gap-6 max-w-6xl">
              <Image
                src="/BookThreads sign up.jpg"
                alt="BookThreads app demo showing book list"
                width={400}
                height={300}
                className="drop-shadow-xl rounded-lg"
              />
              <Image
                src="/BookThreads books.jpg"
                alt="BookThreads app demo showing sign-in screen"
                width={400}
                height={300}
                className="drop-shadow-xl rounded-lg"
              />
            </div>
          </div>

          

      {/* Footer */}
      <footer
        className="text-center py-8 px-6 border-t bg-white/90"
        style={{ borderColor: "rgba(235, 115, 115, 0.2)" }}
      >
        <p style={{ color: "#eb7373" }}>© 2025 BookThreads. Launching soon.</p>
      </footer>
    </div>
  )
}
