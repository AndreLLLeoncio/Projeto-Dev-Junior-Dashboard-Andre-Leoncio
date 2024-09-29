"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function Calendario() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="w-full">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow w-full h-full"
    />

    </div>

  )
}
