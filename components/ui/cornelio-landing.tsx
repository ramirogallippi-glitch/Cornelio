"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HorizonHero } from "./horizon-hero-section"
import { BottomNavBar } from "./bottom-nav-bar"
import { MapPin, Phone, Mail, Clock, ChevronLeft, ChevronRight, UtensilsCrossed, Share2, Heart } from "lucide-react"

/* ── Paleta italiana elegante ── */
const C = {
  vino:       "#7B2635",   // Vino toscano
  terracota:  "#C4622D",   // Ceramica toscana
  oro:        "#C4A064",   // Oro antico
  salvia:     "#6B8F71",   // Foglia di salvia
  avorio:     "#F7EDD8",   // Avorio / lino
  crema:      "#FDF6EC",   // Crema chiara
  fondoScuro: "#1a0a04",   // Fondo scuro
  fondoMid:   "#F0E8D8",   // Fondo medio
  fondoCard:  "#FAF3E8",   // Fondo card
  testo:      "#2A1208",   // Testo scuro
  testoSuave: "#7A4020",   // Testo suave
}

const serif = "'Playfair Display', Georgia, serif"
const sans  = "'Inter', sans-serif"
const WA    = "5491141626719"
const waLink = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`

/* ── Divider elegante ── */
function ElegantDivider({ color = C.oro }: { color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "0 auto", width: "100%", maxWidth: 300 }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${color})` }} />
      <UtensilsCrossed size={13} color={color} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  )
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const links = [
    { label: "Menú", id: "menu", color: C.terracota },
    { label: "Galería", id: "gallery", color: C.salvia },
    { label: "Storia", id: "storia", color: C.vino },
    { label: "Reservas", id: "reservas", color: C.oro },
  ]

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
      padding: "16px 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      backgroundColor: scrolled ? "rgba(253,246,236,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? `1px solid rgba(196,160,100,0.2)` : "none",
      transition: "all 0.4s ease",
    }}>
      <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 22, fontWeight: 700,
        letterSpacing: "0.06em", color: scrolled ? C.vino : C.avorio }}>
        Cornelio
      </span>
      <div style={{ display: "flex", gap: 32 }}>
        {links.map(l => (
          <button key={l.label} onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: serif,
              fontStyle: "italic", fontSize: 15, letterSpacing: "0.04em",
              color: scrolled ? C.testo : "rgba(247,237,216,0.7)", fontWeight: 400, transition: "color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = l.color }}
            onMouseLeave={e => { e.currentTarget.style.color = scrolled ? C.testo : "rgba(247,237,216,0.7)" }}>
            {l.label}
          </button>
        ))}
      </div>
      <a href="tel:+5491141626719"
        style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
          color: scrolled ? C.vino : C.avorio, background: "transparent", padding: "10px 0", fontWeight: 600,
          textDecoration: "none", borderBottom: `1px solid ${scrolled ? C.vino : "rgba(247,237,216,0.4)"}`,
          transition: "all 0.25s" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = C.oro; e.currentTarget.style.color = C.oro }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = scrolled ? C.vino : "rgba(247,237,216,0.4)"; e.currentTarget.style.color = scrolled ? C.vino : C.avorio }}>
        +54 9 11 4162-6719
      </a>
    </nav>
  )
}

/* ── Gallery ── */
const galleryImages = [
  { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80", caption: "Salón Principal" },
  { url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80", caption: "Pasta Fresca" },
  { url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&q=80", caption: "Ambiente Nocturno" },
  { url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=900&q=80", caption: "Antipasti della Casa" },
  { url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80", caption: "Detalles del Salón" },
  { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80", caption: "Platos de Temporada" },
]
const galAccents = [C.vino, C.terracota, C.oro, C.salvia, C.vino, C.terracota]

function GallerySection() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(i => i === 0 ? galleryImages.length - 1 : i - 1)
  const next = () => setCurrent(i => i === galleryImages.length - 1 ? 0 : i + 1)
  const accent = galAccents[current]

  return (
    <section id="gallery" style={{ padding: "100px 40px", background: C.fondoMid }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.35em", color: C.salvia, textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>Nuestra Galería</p>
          <h2 style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(34px, 5vw, 54px)", color: C.testo, fontWeight: 700, marginBottom: 24 }}>
            Una Experiencia Visual
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ElegantDivider color={C.salvia} />
          </div>
        </div>

        <div style={{ position: "relative", overflow: "hidden", borderRadius: 4,
          border: `2px solid ${accent}40`, marginBottom: 14, transition: "border-color 0.4s" }}>
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.45 }}
              style={{ height: "clamp(300px, 52vw, 540px)", overflow: "hidden", position: "relative" }}>
              <img src={galleryImages[current].url} alt={galleryImages[current].caption}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,10,4,0.65) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 28, left: 32, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 28, height: 2, background: accent }} />
                <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 19, color: C.avorio }}>{galleryImages[current].caption}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          {[{ fn: prev, Icon: ChevronLeft, s: "left" }, { fn: next, Icon: ChevronRight, s: "right" }].map(({ fn, Icon, s }) => (
            <button key={s} onClick={fn}
              style={{ position: "absolute", top: "50%", [s]: 16, transform: "translateY(-50%)",
                background: "rgba(253,246,236,0.88)", backdropFilter: "blur(8px)",
                border: `1.5px solid ${accent}`, borderRadius: "50%",
                width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: accent, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = accent; (e.currentTarget as HTMLElement).style.color = "#fff" }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(253,246,236,0.88)"; (e.currentTarget as HTMLElement).style.color = accent }}>
              <Icon size={18} />
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
          {galleryImages.map((img, i) => (
            <div key={i} onClick={() => setCurrent(i)}
              style={{ aspectRatio: "1", overflow: "hidden", cursor: "pointer", borderRadius: 3,
                border: `2px solid ${i === current ? galAccents[i] : "transparent"}`,
                opacity: i === current ? 1 : 0.5, transition: "all 0.2s" }}>
              <img src={img.url} alt={img.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Menu ── */
const menuData = [
  {
    categoria: "Antipasti", color: C.terracota,
    platos: [
      { nombre: "Burrata della Nonna", desc: "Burrata fresca con tomates asados, albahaca y aceite de trufa negra", precio: "$9.800" },
      { nombre: "Carpaccio di Manzo", desc: "Finas láminas de lomo crudo, rúcula, alcaparras y parmigiano reggiano 36 meses", precio: "$12.400" },
      { nombre: "Crostini al Tartufo", desc: "Pan artesanal tostado, crema de hongos porcini y láminas de trufa de temporada", precio: "$8.200" },
    ]
  },
  {
    categoria: "Pasta Fatta da Noi", color: C.salvia,
    platos: [
      { nombre: "Tagliatelle al Ragù", desc: "Pasta fresca tirada a mano con ragù de ternera y panceta, cocido ocho horas", precio: "$14.500" },
      { nombre: "Tortellini in Brodo", desc: "Rellenos de ricotta y nuez moscada en caldo de gallina de campo con hierbas finas", precio: "$13.200" },
      { nombre: "Pappardelle ai Funghi", desc: "Pasta al huevo con hongos porcini, manteca de tomillo y virutas de parmesano", precio: "$15.800" },
    ]
  },
  {
    categoria: "Secondi", color: C.vino,
    platos: [
      { nombre: "Ossobuco alla Milanese", desc: "Jarrete de ternera estofado con gremolata, azafrán y risotto alla parmigiana", precio: "$22.500" },
      { nombre: "Branzino al Forno", desc: "Róbalo entero al horno con hierbas mediterráneas, limón y aceite de oliva extra virgen", precio: "$19.800" },
      { nombre: "Agnello in Crosta", desc: "Rack de cordero en costra de hierbas, jus de vino tinto y puré de raíces de invierno", precio: "$24.200" },
    ]
  },
]

function MenuSection() {
  const [activeTab, setActiveTab] = useState(0)
  const cat = menuData[activeTab]

  return (
    <section id="menu" style={{ padding: "100px 40px", background: C.crema }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.35em", color: C.terracota, textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>La Cucina</p>
          <h2 style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(34px, 5vw, 52px)", color: C.testo, fontWeight: 700, marginBottom: 26 }}>
            Il Nostro Menù
          </h2>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
            <ElegantDivider color={C.terracota} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
            {menuData.map((m, i) => (
              <button key={m.categoria} onClick={() => setActiveTab(i)}
                style={{ fontFamily: sans, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "9px 26px", borderRadius: 999, fontWeight: 600, cursor: "pointer",
                  border: `1.5px solid ${m.color}`,
                  background: i === activeTab ? m.color : "transparent",
                  color: i === activeTab ? "#fff" : m.color,
                  transition: "all 0.22s" }}>
                {m.categoria}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}>
            {cat.platos.map((p, i) => (
              <div key={p.nombre}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "26px 0", gap: 24 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                      <h3 style={{ fontFamily: serif, fontStyle: "italic", fontSize: 20, fontWeight: 600, color: C.testo }}>{p.nombre}</h3>
                    </div>
                    <p style={{ fontFamily: sans, fontSize: 13, color: C.testoSuave, lineHeight: 1.7, paddingLeft: 16 }}>{p.desc}</p>
                  </div>
                  <span style={{ fontFamily: serif, fontSize: 17, color: cat.color, fontWeight: 700, whiteSpace: "nowrap", marginTop: 4 }}>{p.precio}</span>
                </div>
                {i < cat.platos.length - 1 && <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${cat.color}33, transparent)` }} />}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div style={{ marginTop: 44, textAlign: "center" }}>
          <p style={{ fontFamily: sans, fontSize: 12, color: C.testoSuave, opacity: 0.55, letterSpacing: "0.08em" }}>
            Menú de temporada · Ingredientes frescos de mercado · Carta de vinos disponible
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── Storia ── */
function StoriaSection() {
  return (
    <section id="storia" style={{ padding: "100px 40px", background: C.fondoMid }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <motion.div initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ position: "relative" }}>
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
            alt="Salón de Cornelio"
            style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block", borderRadius: 4 }} />
          <div style={{ position: "absolute", top: 14, left: -14, right: 14, bottom: -14, border: `1.5px solid ${C.oro}50`, borderRadius: 6, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 28, right: -20,
            background: C.vino, padding: "18px 22px", textAlign: "center", borderRadius: 4,
            boxShadow: `0 8px 28px rgba(123,38,53,0.35)` }}>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 34, fontWeight: 900, color: C.avorio, lineHeight: 1 }}>100</p>
            <p style={{ fontFamily: sans, fontSize: 9, letterSpacing: "0.18em", color: "rgba(247,237,216,0.8)", textTransform: "uppercase", marginTop: 4 }}>Años de historia</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}>
          <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.35em", color: C.salvia, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Desde 1924</p>
          <h2 style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(30px, 4vw, 48px)", color: C.testo, fontWeight: 700, marginBottom: 26, lineHeight: 1.2 }}>
            La Nostra Storia
          </h2>
          <div style={{ marginBottom: 28 }}><ElegantDivider color={C.salvia} /></div>
          <p style={{ fontFamily: sans, fontSize: 14, color: C.testoSuave, lineHeight: 1.9, marginBottom: 18 }}>
            En 1924, Cornelio Ferrante llegó desde Bolonia con una maleta de recetas y el sueño de recrear la cocina de su madre en el Río de la Plata. Abrió su primera trattoria en una antigua casona del barrio de Palermo.
          </p>
          <p style={{ fontFamily: sans, fontSize: 14, color: C.testoSuave, lineHeight: 1.9, marginBottom: 28 }}>
            Hoy, cien años después, sus bisnietos mantienen vivas las tradiciones: la masa se tira a mano cada mañana, el ragù se cocina ocho horas sin apuros, y los vinos llegan directamente de las bodegas de Toscana y Piamonte.
          </p>
          <div style={{ borderLeft: `3px solid ${C.oro}`, paddingLeft: 20 }}>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 17, color: C.testo, lineHeight: 1.7 }}>
              "La cucina è memoria, amore e tempo. Non si può avere fretta."
            </p>
            <p style={{ fontFamily: sans, fontSize: 11, color: C.testoSuave, marginTop: 8, opacity: 0.6 }}>— Cornelio Ferrante, 1924</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── CTA ── */
function CtaSection() {
  return (
    <section id="reservas" style={{ padding: "110px 40px", textAlign: "center", position: "relative", overflow: "hidden",
      background: C.fondoScuro }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 350,
        background: `radial-gradient(ellipse, ${C.vino}22 0%, transparent 70%)`, pointerEvents: "none" }} />

      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
        style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.4em", color: C.oro, textTransform: "uppercase", marginBottom: 20, opacity: 0.75 }}>¿Listo para la experiencia?</p>
        <h2 style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(34px, 6vw, 64px)", color: C.avorio, fontWeight: 700, marginBottom: 18, lineHeight: 1.15 }}>
          Reservá tu mesa<br />esta noche
        </h2>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <ElegantDivider color={C.oro} />
        </div>
        <p style={{ fontFamily: sans, fontSize: 14, color: `${C.avorio}88`, maxWidth: 440, margin: "0 auto 44px", lineHeight: 1.8 }}>
          Escribinos por WhatsApp y te confirmamos disponibilidad en minutos.
        </p>
        <a href={waLink("Hola! Quisiera reservar una mesa en Cornelio para esta noche.")}
          target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: sans, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
            color: C.fondoScuro, background: C.oro, padding: "16px 48px", fontWeight: 700,
            textDecoration: "none", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 12,
            boxShadow: `0 10px 36px rgba(196,160,100,0.3)`, transition: "all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 18px 44px rgba(196,160,100,0.45)` }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 10px 36px rgba(196,160,100,0.3)` }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Reservar por WhatsApp
        </a>
        <p style={{ fontFamily: sans, fontSize: 11, color: `${C.avorio}44`, marginTop: 24 }}>Martes a Domingo · 19:00 a 00:00 hs</p>
      </motion.div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  const socials = [
    { icon: Heart, href: "https://instagram.com/cornelioresto", label: "Instagram", color: C.vino },
    { icon: Share2, href: "#", label: "Facebook", color: C.salvia },
  ]
  return (
    <footer style={{ background: "#110804" }}>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${C.vino}, ${C.terracota}, ${C.oro}, ${C.salvia})` }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "68px 40px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 60, marginBottom: 52 }}>
          <div>
            <h3 style={{ fontFamily: serif, fontStyle: "italic", fontSize: 32, fontWeight: 700, color: C.oro, marginBottom: 10, letterSpacing: "0.04em" }}>Cornelio</h3>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 12, color: `${C.avorio}44`, marginBottom: 18 }}>Cucina Italiana dal 1924</p>
            <p style={{ fontFamily: sans, fontSize: 13, color: `${C.avorio}55`, lineHeight: 1.8, maxWidth: 310, marginBottom: 26 }}>
              Una experiencia gastronómica que honra la tradición italiana en el corazón de Buenos Aires.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center", color: `${color}77`, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = color; (e.currentTarget as HTMLElement).style.color = color; e.currentTarget.style.background = `${color}18` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}44`; (e.currentTarget as HTMLElement).style.color = `${color}77`; e.currentTarget.style.background = "transparent" }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
              <Clock size={13} color={C.oro} />
              <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.2em", color: C.oro, textTransform: "uppercase", fontWeight: 700 }}>Horarios</p>
            </div>
            {[
              { dia: "Lunes", hs: "Cerrado" },
              { dia: "Mar — Jue", hs: "19:00 — 23:30" },
              { dia: "Vie — Sáb", hs: "12:30 / 19:00 — 00:30" },
              { dia: "Domingo", hs: "13:00 — 16:00" },
            ].map(({ dia, hs }) => (
              <div key={dia} style={{ marginBottom: 13 }}>
                <p style={{ fontFamily: sans, fontSize: 10, color: `${C.avorio}30`, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{dia}</p>
                <p style={{ fontFamily: sans, fontSize: 13, color: hs === "Cerrado" ? `${C.avorio}25` : `${C.avorio}65` }}>{hs}</p>
              </div>
            ))}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
              <MapPin size={13} color={C.salvia} />
              <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.2em", color: C.salvia, textTransform: "uppercase", fontWeight: 700 }}>Contacto</p>
            </div>
            {[
              { icon: MapPin, text: "Av. Santa Fe 3242, Palermo\nBuenos Aires, Argentina", color: C.salvia },
              { icon: Phone, text: "+54 9 11 4162-6719", color: C.terracota },
              { icon: Mail, text: "reservas@cornelioresto.com.ar", color: C.vino },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} style={{ display: "flex", gap: 11, marginBottom: 16, alignItems: "flex-start" }}>
                <Icon size={13} color={color} style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontFamily: sans, fontSize: 12, color: `${C.avorio}55`, lineHeight: 1.65, whiteSpace: "pre-line" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ paddingTop: 24, borderTop: `1px solid ${C.avorio}10`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: sans, fontSize: 11, color: `${C.avorio}20` }}>© 2024 Cornelio. Todos los derechos reservados.</p>
          <div style={{ display: "flex", gap: 24 }}>
            {[["Reservas", C.vino], ["Menú", C.terracota], ["Privacidad", C.salvia]].map(([item, col]) => (
              <a key={item} href="#"
                style={{ fontFamily: sans, fontSize: 10, color: `${C.avorio}22`, textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = col)}
                onMouseLeave={e => (e.currentTarget.style.color = `${C.avorio}22`)}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── Main ── */
export default function CorneliоLanding() {
  return (
    <main style={{ background: C.crema, minHeight: "100vh" }}>
      <Navbar />
      <HorizonHero
        waLink={waLink("Hola! Quisiera reservar una mesa en Cornelio.")}
        onMenuClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
      />
      <GallerySection />
      <MenuSection />
      <StoriaSection />
      <CtaSection />
      <Footer />
      <BottomNavBar />
    </main>
  )
}
