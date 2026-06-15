"use client"

import React, { useState, useEffect } from "react"

const C = {
  vino:       "#7B2635",
  oro:        "#C4A064",
  avorio:     "#F7EDD8",
  testo:      "#2A1208",
  fondoScuro: "#1a0a04",
}

const serif = "'Playfair Display', Georgia, serif"
const sans  = "'Inter', sans-serif"

const navItems = [
  { label: "Menú",     id: "menu" },
  { label: "Galería",  id: "gallery" },
  { label: "Storia",   id: "storia" },
  { label: "Reservas", id: "reservas" },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return isMobile
}

export function TopNavBar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const navTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  const bg   = scrolled || menuOpen ? "rgba(253,246,236,0.97)" : "transparent"
  const blur = scrolled || menuOpen ? "blur(16px)" : "none"
  const logo = scrolled || menuOpen ? C.vino  : C.avorio
  const link = scrolled             ? C.testo : "rgba(247,237,216,0.85)"

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        width: "100%", boxSizing: "border-box",
        backgroundColor: bg, backdropFilter: blur,
        borderBottom: scrolled || menuOpen ? "1px solid rgba(196,160,100,0.2)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 32px",
          height: isMobile ? 52 : 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>
            <span style={{ fontFamily: serif, fontStyle: "italic",
              fontSize: isMobile ? 20 : 22, fontWeight: 700,
              color: logo, transition: "color 0.4s" }}>
              Cornelio
            </span>
          </button>

          {/* Desktop: links centrados */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {navItems.map(item => (
                <button key={item.id} onClick={() => navTo(item.id)}
                  style={{ background: "none", border: "none", cursor: "pointer",
                    fontFamily: serif, fontStyle: "italic", fontSize: 15,
                    color: link, padding: "8px 14px", borderRadius: 6,
                    transition: "color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = C.oro }}
                  onMouseLeave={e => { e.currentTarget.style.color = link }}>
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Desktop: botón Reservar / Mobile: hamburguesa */}
          {isMobile ? (
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ background: "none", border: "none", cursor: "pointer",
                display: "flex", flexDirection: "column", gap: 5, padding: 4, flexShrink: 0 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: "block", width: 22, height: 1.5,
                  background: logo, transition: "all 0.3s",
                  transform: menuOpen
                    ? (i === 0 ? "rotate(45deg) translate(4px,4px)"
                      : i === 2 ? "rotate(-45deg) translate(4px,-4px)"
                      : "scale(0)")
                    : "none",
                }} />
              ))}
            </button>
          ) : (
            <a href="https://wa.me/5491141626719?text=Hola!%20Quisiera%20reservar%20una%20mesa%20en%20Cornelio."
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: sans, fontSize: 11, letterSpacing: "0.15em",
                textTransform: "uppercase", fontWeight: 700, flexShrink: 0,
                color: scrolled ? "#fff" : C.fondoScuro,
                background: scrolled ? C.vino : C.oro,
                padding: "9px 22px", borderRadius: 999,
                textDecoration: "none", transition: "all 0.3s" }}>
              Reservar
            </a>
          )}
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: 52, left: 0, right: 0, zIndex: 49,
          background: "rgba(253,246,236,0.97)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(196,160,100,0.2)",
          padding: "12px 0 20px",
        }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => navTo(item.id)}
              style={{ display: "block", width: "100%", padding: "13px 24px",
                background: "none", border: "none", cursor: "pointer",
                fontFamily: serif, fontStyle: "italic", fontSize: 18,
                color: C.testo, textAlign: "left" }}>
              {item.label}
            </button>
          ))}
          <div style={{ margin: "12px 24px 0", paddingTop: 14,
            borderTop: "1px solid rgba(196,160,100,0.2)" }}>
            <a href="https://wa.me/5491141626719?text=Hola!%20Quisiera%20reservar%20una%20mesa%20en%20Cornelio."
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: sans, fontSize: 11, letterSpacing: "0.15em",
                textTransform: "uppercase", fontWeight: 700,
                color: "#fff", background: C.vino,
                padding: "12px 24px", borderRadius: 999,
                textDecoration: "none", display: "inline-block" }}>
              Reservar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default TopNavBar
