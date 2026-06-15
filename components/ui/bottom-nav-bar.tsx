"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Images, BookText, CalendarCheck } from "lucide-react"

const navItems = [
  { label: "Menú", icon: BookOpen, id: "menu" },
  { label: "Galería", icon: Images, id: "gallery" },
  { label: "Historia", icon: BookText, id: "storia" },
  { label: "Reservas", icon: CalendarCheck, id: "reservas" },
]

const LABEL_WIDTH = 68

export function BottomNavBar() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (idx: number, id: string) => {
    setActiveIndex(idx)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.nav
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 28, delay: 0.8 }}
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        backgroundColor: "rgba(26, 16, 8, 0.88)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(201, 168, 76, 0.3)",
        borderRadius: 9999,
        display: "flex",
        alignItems: "center",
        padding: "6px 8px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1)",
        gap: 2,
      }}
    >
      {navItems.map((item, idx) => {
        const Icon = item.icon
        const isActive = activeIndex === idx
        return (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.94 }}
            onClick={() => handleClick(idx, item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 14px",
              borderRadius: 9999,
              border: "none",
              cursor: "pointer",
              height: 40,
              minWidth: 44,
              backgroundColor: isActive ? "rgba(201,168,76,0.15)" : "transparent",
              color: isActive ? "#C9A84C" : "rgba(245,236,215,0.45)",
              outline: "none",
              transition: "background-color 0.2s, color 0.2s",
            }}
            aria-label={item.label}
            type="button"
          >
            <Icon size={18} strokeWidth={1.8} aria-hidden />
            <motion.div
              initial={false}
              animate={{
                width: isActive ? `${LABEL_WIDTH}px` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "6px" : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 320, damping: 30 },
                opacity: { duration: 0.18 },
                marginLeft: { duration: 0.18 },
              }}
              style={{ overflow: "hidden", display: "flex", alignItems: "center" }}
            >
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "0.68rem",
                whiteSpace: "nowrap",
                userSelect: "none",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}>
                {item.label}
              </span>
            </motion.div>
          </motion.button>
        )
      })}
    </motion.nav>
  )
}

export default BottomNavBar
