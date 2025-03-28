"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

// import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, systemTheme, setTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="btn btn-primary">
            {currentTheme === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
            ) : (
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
            )}
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary text-primary-content" align="end">
        <DropdownMenuItem onClick={() => { setTheme("light")} }>
          Light 
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setTheme("dark")} }>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setTheme("system")} }>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
