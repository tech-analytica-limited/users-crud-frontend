'use client' // Error boundaries must be Client Components

import {useEffect} from 'react'
import {Button} from "@/components/ui/button";

export default function Error({
                                error,
                                reset,
                              }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 gap-4 items-center justify-center">
      <h2 className="text-white/80 font-semibold">Something went wrong in login page!</h2>
      <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl p-6 gap-4">
        <Button className="p-2 bg-lime-500 text-white hover:bg-lime-500 hover:text-white ml-2 cursor-pointer"
                onClick={
                  // Attempt to recover by trying to re-render the segment
                  () => reset()
                }
        >
          Try again
        </Button>
        <p>Error Message: {error?.message}</p>
      </div>
    </div>
  )
}