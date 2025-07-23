"use client"

import { Github, Twitter } from "lucide-react"
import Image from "next/image"

interface NavbarProps {
  theme: "light" | "dark"
}

export default function Navbar({ theme }: NavbarProps) {
  const isPatternDark = theme === "dark"

  return (
    <nav className="w-full py-6">
      <div className="container flex items-center justify-between sm:justify-around mx-auto px-4 sm:px-6 lg:px-8">

        <span
          className={`flex items-center gap-[4px] sm:gap-[6px] font-bold tracking-tight transition-colors duration-300 text-lg sm:text-xl ${isPatternDark ? "text-white" : "text-neutral-800 dark:text-neutral-200"
            }`}
        >
         
          <span className="whitespace-nowrap">PedoFile</span>
        </span>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 sm:gap-4">
            <a
              href="https://x.com/ishantwtss"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full p-1.5 sm:p-2 transition-all duration-300 ${isPatternDark ? "hover:bg-white/10" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              aria-label="Twitter"
            >
              <Twitter
                className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 ${isPatternDark
                  ? "text-white hover:text-neutral-300"
                  : "text-neutral-800 hover:text-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-400"
                  }`}
                strokeWidth={1.5}
              />
            </a>
            <a
              href="https://github.com/IshanHunt77"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full p-1.5 sm:p-2 transition-all duration-300 ${isPatternDark ? "hover:bg-white/10" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              aria-label="GitHub"
            >
              <Github
                className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 ${isPatternDark
                  ? "text-white hover:text-neutral-300"
                  : "text-neutral-800 hover:text-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-400"
                  }`}
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}