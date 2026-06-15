"use client"

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const STYLES = `
  .cornelio-hero-wrap {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #1a0a04;
  }
  .cornelio-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(10,4,2,0.3) 0%,
      rgba(10,4,2,0.15) 40%,
      rgba(10,4,2,0.6) 75%,
      rgba(10,4,2,0.92) 100%
    );
    pointer-events: none;
    z-index: 2;
  }
  .cornelio-overlay-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 35%, rgba(10,4,2,0.55) 100%);
    pointer-events: none;
    z-index: 2;
  }
  .cornelio-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 24px;
    z-index: 10;
  }
  .cornelio-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.4em;
    color: rgba(196,160,100,0.8);
    text-transform: uppercase;
    margin-bottom: 24px;
    opacity: 0;
  }
  .cornelio-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic;
    font-size: clamp(88px, 14vw, 160px);
    font-weight: 700;
    line-height: 0.9;
    color: #F7EDD8;
    margin-bottom: 24px;
    text-shadow: 0 4px 60px rgba(10,4,2,0.7);
    overflow: hidden;
  }
  .title-char {
    display: inline-block;
    opacity: 0;
    transform: translateY(100px);
  }
  .cornelio-subtitle {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic;
    font-size: clamp(16px, 2vw, 20px);
    color: rgba(247,237,216,0.65);
    letter-spacing: 0.06em;
    margin-bottom: 44px;
    opacity: 0;
    line-height: 1.8;
  }
  .cornelio-cta {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
    opacity: 0;
  }
  .cornelio-btn-primary {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #1a0a04;
    background: #C4A064;
    padding: 15px 42px;
    font-weight: 700;
    text-decoration: none;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 6px 28px rgba(196,160,100,0.4);
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .cornelio-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(196,160,100,0.55);
    background: #d4b074;
  }
  .cornelio-btn-secondary {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(247,237,216,0.9);
    background: rgba(247,237,216,0.1);
    padding: 15px 42px;
    font-weight: 600;
    border: 1px solid rgba(247,237,216,0.3);
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .cornelio-btn-secondary:hover {
    background: rgba(247,237,216,0.18);
    border-color: rgba(247,237,216,0.55);
  }
  .cornelio-scroll {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 10;
    opacity: 0;
  }
  .cornelio-scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, transparent, rgba(196,160,100,0.7));
    animation: scrollPulse 2s ease-in-out infinite;
  }
  .cornelio-scroll-text {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    letter-spacing: 0.3em;
    color: rgba(196,160,100,0.55);
    text-transform: uppercase;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
`

interface HorizonHeroProps {
  waLink: string
  onMenuClick: () => void
}

export function HorizonHero({ waLink, onMenuClick }: HorizonHeroProps) {
  const eyebrowRef  = useRef<HTMLParagraphElement>(null)
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })

    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })

    if (titleRef.current) {
      tl.to(titleRef.current.querySelectorAll('.title-char'), {
        y: 0, opacity: 1, duration: 1.3, stagger: 0.045, ease: 'power4.out'
      }, '-=0.5')
    }

    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
    tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
    tl.to(scrollRef.current, { opacity: 1, duration: 0.8 }, '-=0.3')

    return () => { tl.kill() }
  }, [])

  const splitText = (t: string) =>
    t.split('').map((c, i) => (
      <span key={i} className="title-char">{c}</span>
    ))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="cornelio-hero-wrap">

        {/* Video de fondo */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            transform: "scale(1.12)", transformOrigin: "center top",
            zIndex: 1
          }}
        >
          <source src="/podes_hacer_videos_.mp4" type="video/mp4" />
        </video>

        <div className="cornelio-overlay" />
        <div className="cornelio-overlay-vignette" />

        <div className="cornelio-content">
          <p ref={eyebrowRef} className="cornelio-eyebrow">✦ Buenos Aires · Palermo · dal 1924 ✦</p>

          <h1 ref={titleRef} className="cornelio-title">
            {splitText('Cornelio')}
          </h1>

          <div ref={subtitleRef} className="cornelio-subtitle">
            <span style={{ display: "block" }}>Cucina Italiana dal 1924</span>
            <span style={{ display: "block", fontSize: "0.72em", opacity: 0.6, marginTop: 6 }}>
              Pastas artesanales &nbsp;·&nbsp; Antipasti &nbsp;·&nbsp; Vinos de importación
            </span>
          </div>

          <div ref={ctaRef} className="cornelio-cta">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="cornelio-btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Reservar Mesa
            </a>
            <button onClick={onMenuClick} className="cornelio-btn-secondary">Ver Menú</button>
          </div>
        </div>

        <div ref={scrollRef} className="cornelio-scroll">
          <div className="cornelio-scroll-line" />
          <span className="cornelio-scroll-text">Scroll</span>
        </div>
      </div>
    </>
  )
}
