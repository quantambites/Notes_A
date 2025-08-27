import React from "react"
import { Copy } from "lucide-react"

const About = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText("harshenduswarnakar@gmail.com")
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-gray-400 flex flex-row gap-4 p-4 rounded-lg shadow-md items-center">
        <h1 className="text-lg font-semibold">
          Copy support mail
        </h1>
        <button onClick={handleCopy} className="hover:bg-yellow-200 border border-border p-2 rounded-xl">
          <Copy size={20} />
        </button>
      </div>
    </div>
  )
}

export default About
