'use client'

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'

export function EditableReveal({
  children,
  index = 0,
  className = '',
}: {
  children: ReactNode
  index?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${mounted ? 'editable-reveal' : ''} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${Math.min(index, 8) * 90}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
