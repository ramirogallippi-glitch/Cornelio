"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HorizonHero } from "./horizon-hero-section"
import { TopNavBar } from "./top-nav-bar"
import { MapPin, Phone, Mail, Clock, ChevronLeft, ChevronRight, UtensilsCrossed, Share2, Heart } from "lucide-react"

/* ── Paleta ── */
const C = {
  vino:       "#7B2635",
  terracota:  "#C4622D",
  oro:        "#C4A064",
  salvia:     "#6B8F71",
  avorio:     "#F7EDD8",
  crema:      "#FDF6EC",
  fondoScuro: "#1a0a04",
  fondoMid:   "#F0E8D8",
  testo:      "#2A1208",
  testoSuave: "#7A4020",
}

const serif = "'Playfair Display', Georgia, serif"
const sans  = "'Inter', sans-serif"
const WA    = "5491141626719"
const waLink = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`

/* ── Media query hook ── */
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

/* ── Divider ── */
function ElegantDivider({ color = C.oro }: { color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "0 auto", width: "100%", maxWidth: 280 }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${color})` }} />
      <UtensilsCrossed size={12} color={color} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  )
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const links = [
    { label: "Menú", id: "menu" },
    { label: "Galería", id: "gallery" },
    { label: "Storia", id: "storia" },
    { label: "Reservas", id: "reservas" },
  ]

  const navTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        width: "100%", boxSizing: "border-box", margin: 0,
        padding: isMobile ? "14px 20px" : "16px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backgroundColor: scrolled || menuOpen ? "rgba(253,246,236,0.97)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
        borderBottom: scrolled || menuOpen ? `1px solid rgba(196,160,100,0.2)` : "none",
        transition: "all 0.4s ease",
      }}>
        <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: isMobile ? 20 : 22,
          fontWeight: 700, color: scrolled || menuOpen ? C.vino : C.avorio }}>
          Cornelio
        </span>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 32 }}>
            {links.map(l => (
              <button key={l.label} onClick={() => navTo(l.id)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: serif,
                  fontStyle: "italic", fontSize: 15, color: scrolled ? C.testo : "rgba(247,237,216,0.8)",
                  fontWeight: 400, transition: "color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = C.oro }}
                onMouseLeave={e => { e.currentTarget.style.color = scrolled ? C.testo : "rgba(247,237,216,0.8)" }}>
                {l.label}
              </button>
            ))}
          </div>
        )}

        {/* Desktop tel / Mobile hamburger */}
        {isMobile ? (
          <button onClick={() => setMenuOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: 22, height: 1.5,
                background: scrolled || menuOpen ? C.vino : C.avorio,
                transition: "all 0.3s",
                transform: menuOpen ? (i===0 ? "rotate(45deg) translate(4px,4px)" : i===2 ? "rotate(-45deg) translate(4px,-4px)" : "scale(0)") : "none",
              }} />
            ))}
          </button>
        ) : (
          <a href="tel:+5491141626719"
            style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
              color: scrolled ? C.vino : C.avorio, textDecoration: "none", fontWeight: 600,
              borderBottom: `1px solid ${scrolled ? C.vino : "rgba(247,237,216,0.4)"}` }}>
            +54 9 11 4162-6719
          </a>
        )}
      </nav>

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{ position: "fixed", top: 52, left: 0, right: 0, zIndex: 39,
          background: "rgba(253,246,236,0.97)", backdropFilter: "blur(14px)",
          borderBottom: `1px solid rgba(196,160,100,0.2)`, padding: "20px 0" }}>
          {links.map(l => (
            <button key={l.label} onClick={() => navTo(l.id)}
              style={{ display: "block", width: "100%", padding: "14px 24px", background: "none", border: "none",
                cursor: "pointer", fontFamily: serif, fontStyle: "italic", fontSize: 18,
                color: C.testo, textAlign: "left" }}>
              {l.label}
            </button>
          ))}
          <div style={{ margin: "12px 24px 0", paddingTop: 12, borderTop: `1px solid ${C.oro}33` }}>
            <a href="tel:+5491141626719"
              style={{ fontFamily: sans, fontSize: 11, color: C.vino, textDecoration: "none", letterSpacing: "0.1em" }}>
              +54 9 11 4162-6719
            </a>
          </div>
        </div>
      )}
    </>
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
  const isMobile = useIsMobile()
  const prev = () => setCurrent(i => i === 0 ? galleryImages.length - 1 : i - 1)
  const next = () => setCurrent(i => i === galleryImages.length - 1 ? 0 : i + 1)
  const accent = galAccents[current]

  return (
    <section id="gallery" style={{ padding: isMobile ? "64px 16px" : "100px 40px", background: C.fondoMid }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 60 }}>
          <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.3em", color: C.salvia, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>Nuestra Galería</p>
          <h2 style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(28px, 7vw, 54px)", color: C.testo, fontWeight: 700, marginBottom: 20 }}>
            Una Experiencia Visual
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ElegantDivider color={C.salvia} />
          </div>
        </div>

        <div style={{ position: "relative", overflow: "hidden", borderRadius: 4,
          border: `2px solid ${accent}40`, marginBottom: 10, transition: "border-color 0.4s" }}>
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              style={{ height: isMobile ? "56vw" : "clamp(280px, 48vw, 520px)", overflow: "hidden", position: "relative" }}>
              <img src={galleryImages[current].url} alt={galleryImages[current].caption}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,10,4,0.65) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: isMobile ? 14 : 24, left: isMobile ? 16 : 28, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 20, height: 2, background: accent }} />
                <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: isMobile ? 14 : 18, color: C.avorio }}>{galleryImages[current].caption}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          {[{ fn: prev, Icon: ChevronLeft, s: "left" }, { fn: next, Icon: ChevronRight, s: "right" }].map(({ fn, Icon, s }) => (
            <button key={s} onClick={fn}
              style={{ position: "absolute", top: "50%", [s]: isMobile ? 8 : 14, transform: "translateY(-50%)",
                background: "rgba(253,246,236,0.88)", backdropFilter: "blur(8px)",
                border: `1.5px solid ${accent}`, borderRadius: "50%",
                width: isMobile ? 36 : 42, height: isMobile ? 36 : 42,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: accent }}>
              <Icon size={isMobile ? 15 : 18} />
            </button>
          ))}
        </div>

        {/* Thumbnails — 3 columnas en mobile */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(6, 1fr)", gap: 6 }}>
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
      { nombre: "Burrata della Nonna", desc: "Burrata fresca con tomates asados, albahaca y aceite de trufa negra", precio: "$9.800", img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=300&q=80" },
      { nombre: "Carpaccio di Manzo", desc: "Finas láminas de lomo crudo, rúcula, alcaparras y parmigiano reggiano 36 meses", precio: "$12.400", img: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=300&q=80" },
      { nombre: "Crostini al Tartufo", desc: "Pan artesanal tostado, crema de hongos porcini y láminas de trufa de temporada", precio: "$8.200", img: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=300&q=80" },
    ]
  },
  {
    categoria: "Pasta Fatta da Noi", color: C.salvia,
    platos: [
      { nombre: "Tagliatelle al Ragù", desc: "Pasta fresca tirada a mano con ragù de ternera y panceta, cocido ocho horas", precio: "$14.500", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&q=80" },
      { nombre: "Tortellini in Brodo", desc: "Rellenos de ricotta y nuez moscada en caldo de gallina de campo con hierbas finas", precio: "$13.200", img: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=300&q=80" },
      { nombre: "Pappardelle ai Funghi", desc: "Pasta al huevo con hongos porcini, manteca de tomillo y virutas de parmesano", precio: "$15.800", img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&q=80" },
    ]
  },
  {
    categoria: "Secondi", color: C.vino,
    platos: [
      { nombre: "Ossobuco alla Milanese", desc: "Jarrete de ternera estofado con gremolata, azafrán y risotto alla parmigiana", precio: "$22.500", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80" },
      { nombre: "Branzino al Forno", desc: "Róbalo entero al horno con hierbas mediterráneas, limón y aceite de oliva extra virgen", precio: "$19.800", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&q=80" },
      { nombre: "Agnello in Crosta", desc: "Rack de cordero en costra de hierbas, jus de vino tinto y puré de raíces de invierno", precio: "$24.200", img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&q=80" },
    ]
  },
]

function MenuSection() {
  const [activeTab, setActiveTab] = useState(0)
  const isMobile = useIsMobile()
  const cat = menuData[activeTab]

  return (
    <section id="menu" style={{ padding: isMobile ? "64px 20px" : "100px 40px", background: C.crema }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 52 }}>
          <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.3em", color: C.terracota, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>La Cucina</p>
          <h2 style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(28px, 7vw, 52px)", color: C.testo, fontWeight: 700, marginBottom: 22 }}>
            Il Nostro Menù
          </h2>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <ElegantDivider color={C.terracota} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
            {menuData.map((m, i) => (
              <button key={m.categoria} onClick={() => setActiveTab(i)}
                style={{ fontFamily: sans, fontSize: isMobile ? 10 : 11, letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: isMobile ? "8px 16px" : "9px 24px", borderRadius: 999, fontWeight: 600, cursor: "pointer",
                  border: `1.5px solid ${m.color}`,
                  background: i === activeTab ? m.color : "transparent",
                  color: i === activeTab ? "#fff" : m.color,
                  transition: "all 0.22s" }}>
                {isMobile && m.categoria === "Pasta Fatta da Noi" ? "Pasta" : m.categoria}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}>
            {cat.platos.map((p, i) => (
              <div key={p.nombre}>
                <div style={{ display: "flex", alignItems: "center",
                  padding: isMobile ? "16px 0" : "22px 0", gap: isMobile ? 14 : 24 }}>
                  {/* Foto */}
                  <div style={{ flexShrink: 0, width: isMobile ? 72 : 96, height: isMobile ? 72 : 96,
                    borderRadius: 8, overflow: "hidden",
                    border: `2px solid ${cat.color}30` }}>
                    <img src={p.img} alt={p.nombre}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  {/* Texto */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                      <h3 style={{ fontFamily: serif, fontStyle: "italic", fontSize: isMobile ? 16 : 19, fontWeight: 600, color: C.testo, lineHeight: 1.2 }}>{p.nombre}</h3>
                      <span style={{ fontFamily: serif, fontSize: isMobile ? 14 : 16, color: cat.color, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{p.precio}</span>
                    </div>
                    <p style={{ fontFamily: sans, fontSize: isMobile ? 12 : 13, color: C.testoSuave, lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </div>
                {i < cat.platos.length - 1 && <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${cat.color}33, transparent)` }} />}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div style={{ marginTop: 36, textAlign: "center" }}>
          <p style={{ fontFamily: sans, fontSize: 11, color: C.testoSuave, opacity: 0.5, letterSpacing: "0.06em" }}>
            {isMobile ? "Menú de temporada · Ingredientes frescos" : "Menú de temporada · Ingredientes frescos de mercado · Carta de vinos disponible"}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── Storia ── */
function StoriaSection() {
  const isMobile = useIsMobile()
  return (
    <section id="storia" style={{ padding: isMobile ? "64px 20px" : "100px 40px", background: C.fondoMid }}>
      <div style={{ maxWidth: 1200, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? 40 : 80,
        alignItems: "center" }}>

        <motion.div initial={{ opacity: 0, y: isMobile ? 24 : 0, x: isMobile ? 0 : -36 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ position: "relative" }}>
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
            alt="Salón de Cornelio"
            style={{ width: "100%", aspectRatio: isMobile ? "16/9" : "4/5", objectFit: "cover", display: "block", borderRadius: 4 }} />
          <div style={{ position: "absolute", bottom: isMobile ? 14 : 24,
            right: isMobile ? 14 : -18,
            background: C.vino, padding: isMobile ? "12px 16px" : "16px 20px",
            textAlign: "center", borderRadius: 4 }}>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: isMobile ? 26 : 32, fontWeight: 900, color: C.avorio, lineHeight: 1 }}>100</p>
            <p style={{ fontFamily: sans, fontSize: 8, letterSpacing: "0.15em", color: "rgba(247,237,216,0.8)", textTransform: "uppercase", marginTop: 3 }}>Años</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}>
          <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.3em", color: C.salvia, textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>Desde 1924</p>
          <h2 style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(26px, 5vw, 46px)", color: C.testo, fontWeight: 700, marginBottom: 22, lineHeight: 1.2 }}>
            La Nostra Storia
          </h2>
          <div style={{ marginBottom: 24 }}><ElegantDivider color={C.salvia} /></div>
          <p style={{ fontFamily: sans, fontSize: isMobile ? 13 : 14, color: C.testoSuave, lineHeight: 1.9, marginBottom: 16 }}>
            En 1924, Cornelio Ferrante llegó desde Bolonia con una maleta de recetas y el sueño de recrear la cocina de su madre en el Río de la Plata.
          </p>
          <p style={{ fontFamily: sans, fontSize: isMobile ? 13 : 14, color: C.testoSuave, lineHeight: 1.9, marginBottom: 24 }}>
            Hoy, cien años después, sus bisnietos mantienen vivas las tradiciones: la masa se tira a mano cada mañana y el ragù se cocina ocho horas sin apuros.
          </p>
          <div style={{ borderLeft: `3px solid ${C.oro}`, paddingLeft: 18 }}>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: isMobile ? 15 : 17, color: C.testo, lineHeight: 1.7 }}>
              "La cucina è memoria, amore e tempo."
            </p>
            <p style={{ fontFamily: sans, fontSize: 11, color: C.testoSuave, marginTop: 6, opacity: 0.55 }}>— Cornelio Ferrante, 1924</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── CTA ── */
function CtaSection() {
  const isMobile = useIsMobile()
  return (
    <section id="reservas" style={{ padding: isMobile ? "80px 24px" : "110px 40px",
      textAlign: "center", position: "relative", overflow: "hidden", background: C.fondoScuro }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 500, height: 300, background: `radial-gradient(ellipse, ${C.vino}22 0%, transparent 70%)`, pointerEvents: "none" }} />
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
        style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.35em", color: C.oro, textTransform: "uppercase", marginBottom: 18, opacity: 0.75 }}>¿Listo para la experiencia?</p>
        <h2 style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(30px, 8vw, 60px)", color: C.avorio, fontWeight: 700, marginBottom: 16, lineHeight: 1.15 }}>
          Reservá tu mesa<br />esta noche
        </h2>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <ElegantDivider color={C.oro} />
        </div>
        <p style={{ fontFamily: sans, fontSize: isMobile ? 13 : 14, color: `${C.avorio}77`, maxWidth: 400, margin: "0 auto 36px", lineHeight: 1.8 }}>
          Escribinos por WhatsApp y te confirmamos disponibilidad en minutos.
        </p>
        <a href={waLink("Hola! Quisiera reservar una mesa en Cornelio para esta noche.")}
          target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: sans, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
            color: C.fondoScuro, background: C.oro, padding: isMobile ? "14px 32px" : "16px 48px",
            fontWeight: 700, textDecoration: "none", borderRadius: 999,
            display: "inline-flex", alignItems: "center", gap: 10,
            boxShadow: `0 10px 32px rgba(196,160,100,0.3)` }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Reservar por WhatsApp
        </a>
        <p style={{ fontFamily: sans, fontSize: 11, color: `${C.avorio}40`, marginTop: 20 }}>Martes a Domingo · 19:00 a 00:00 hs</p>
      </motion.div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  const isMobile = useIsMobile()
  const socials = [
    { icon: Heart, href: "https://instagram.com/cornelioresto", label: "Instagram", color: C.vino },
    { icon: Share2, href: "#", label: "Facebook", color: C.salvia },
  ]
  return (
    <footer style={{ background: "#110804" }}>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${C.vino}, ${C.terracota}, ${C.oro}, ${C.salvia})` }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "48px 20px 80px" : "68px 40px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? 36 : 60, marginBottom: isMobile ? 36 : 52 }}>

          {/* Col 1 */}
          <div>
            <h3 style={{ fontFamily: serif, fontStyle: "italic", fontSize: 28, fontWeight: 700, color: C.oro, marginBottom: 8 }}>Cornelio</h3>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 12, color: `${C.avorio}44`, marginBottom: 16 }}>Cucina Italiana dal 1924</p>
            <p style={{ fontFamily: sans, fontSize: 13, color: `${C.avorio}55`, lineHeight: 1.8, maxWidth: 300, marginBottom: 22 }}>
              Una experiencia gastronómica que honra la tradición italiana en el corazón de Buenos Aires.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width: 34, height: 34, borderRadius: "50%", border: `1.5px solid ${color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center", color: `${color}77` }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <Clock size={12} color={C.oro} />
              <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.2em", color: C.oro, textTransform: "uppercase", fontWeight: 700 }}>Horarios</p>
            </div>
            {[
              { dia: "Lunes", hs: "Cerrado" },
              { dia: "Mar — Jue", hs: "19:00 — 23:30" },
              { dia: "Vie — Sáb", hs: "12:30 / 19:00 — 00:30" },
              { dia: "Domingo", hs: "13:00 — 16:00" },
            ].map(({ dia, hs }) => (
              <div key={dia} style={{ marginBottom: 12 }}>
                <p style={{ fontFamily: sans, fontSize: 9, color: `${C.avorio}30`, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{dia}</p>
                <p style={{ fontFamily: sans, fontSize: 12, color: hs === "Cerrado" ? `${C.avorio}25` : `${C.avorio}65` }}>{hs}</p>
              </div>
            ))}
          </div>

          {/* Col 3 */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <MapPin size={12} color={C.salvia} />
              <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: "0.2em", color: C.salvia, textTransform: "uppercase", fontWeight: 700 }}>Contacto</p>
            </div>
            {[
              { icon: MapPin, text: "Av. Santa Fe 3242, Palermo\nBuenos Aires", color: C.salvia },
              { icon: Phone, text: "+54 9 11 4162-6719", color: C.terracota },
              { icon: Mail, text: "reservas@cornelioresto.com.ar", color: C.vino },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                <Icon size={12} color={color} style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontFamily: sans, fontSize: 12, color: `${C.avorio}55`, lineHeight: 1.6, whiteSpace: "pre-line" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ paddingTop: 20, borderTop: `1px solid ${C.avorio}10`,
          display: "flex", flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 12 }}>
          <p style={{ fontFamily: sans, fontSize: 11, color: `${C.avorio}20` }}>© 2024 Cornelio. Todos los derechos reservados.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {[["Reservas", C.vino], ["Menú", C.terracota], ["Privacidad", C.salvia]].map(([item, col]) => (
              <a key={item} href="#"
                style={{ fontFamily: sans, fontSize: 10, color: `${C.avorio}22`, textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none" }}>
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
      <TopNavBar />
      <HorizonHero
        waLink={waLink("Hola! Quisiera reservar una mesa en Cornelio.")}
        onMenuClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
      />
      <MenuSection />
      <GallerySection />
      <StoriaSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
