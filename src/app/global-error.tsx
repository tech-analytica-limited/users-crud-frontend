'use client'

import {Button} from "@/components/ui/button";

export default function GlobalError({error, reset,}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
    <body
      className="flex flex-col min-h-screen bg-gradient-to-br items-center justify-center from-orange-400 via-red-500 to-pink-500">
    <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl p-6 gap-4">
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}
              className="p-2 bg-lime-500 text-white hover:bg-lime-500 hover:text-white ml-2 cursor-pointer"
      >
        Try again
      </Button>
    </div>
    </body>
    </html>
  )
}