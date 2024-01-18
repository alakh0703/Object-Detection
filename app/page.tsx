"use client"
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // change url to /image-classification
    window.location.href = '/image-classification'
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
    </main>
  )
}
