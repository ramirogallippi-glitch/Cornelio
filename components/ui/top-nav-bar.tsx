"use client"

import React, { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

const C = {
  vino:      "#7B2635",
  terracota: "#C4622D",
  oro:       "#C4A064",
  salvia:    "#6B8F71",
  avorio:    "#F7EDD8",
  testo:     "#2A1208",
  fondoScuro:"#1a0a04",
}

const serif = "'Playfair Display', Georgia, serif"
const sans  = "'Inter', sans-serif"

const navItems = [
  { label: "Menú",     id: "menu" },
  { label: "Galería",  id: "gallery" },
  { label: "Storia",   id: "storia" },
  { label: "Reservas", id: "reservas" },
]

export function TopNavBar() {
  const [scrolled, setScrolled]   = useState(false)
  const [active, setActive]       = useState<string | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const navTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setActive(null)
  }

  const bg     = scrolled ? "rgba(253,246,236,0.97)" : "transparent"
  const border = scrolled ? "rgba(196,160,100,0.2)"  : "transparent"
  const logo   = scrolled ? C.vino   : C.avorio
  const link   = scrolled ? C.testo  : "rgba(247,237,216,0.85)"

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      width: "100%", boxSizing: "border-box",
      backgroundColor: bg,
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: `1px solid ${border}`,
      transition: "all 0.4s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 32px",
        height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 22,
            fontWeight: 700, color: logo, transition: "color 0.4s", letterSpacing: "0.02em" }}>
            Cornelio
          </span>
        </button>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => navTo(item.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: serif, fontStyle: "italic",
                fontSize: 15, fontWeight: 400,
                color: active === item.id ? C.oro : link,
                padding: "8px 16px", borderRadius: 6,
                transition: "color 0.2s, background 0.2s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = C.oro
                e.currentTarget.style.background = scrolled ? "rgba(196,160,100,0.08)" : "rgba(247,237,216,0.08)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = active === item.id ? C.oro : link
                e.currentTarget.style.background = "none"
              }}>
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA derecha */}
        <a href="https://wa.me/5491141626719?text=Hola!%20Quisiera%20reservar%20una%20mesa%20en%20Cornelio."
          target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily: sans, fontSize: 11, letterSpacing: "0.15em",
            textTransform: "uppercase", fontWeight: 700,
            color: scrolled ? "#fff" : C.fondoScuro,
            background: scrolled ? C.vino : C.oro,
            padding: "9px 22px", borderRadius: 999,
            textDecoration: "none", transition: "all 0.3s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.85" }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}>
          Reservar
        </a>
      </div>
    </nav>
  )
}

export default TopNavBar
