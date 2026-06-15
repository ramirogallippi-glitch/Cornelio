"use client"

import dynamic from "next/dynamic"

const CorneliоLanding = dynamic(() => import("../components/ui/cornelio-landing"), { ssr: false })

export default function Home() {
  return <CorneliоLanding />
}
