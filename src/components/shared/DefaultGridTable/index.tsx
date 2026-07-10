import type { ReactNode } from 'react'

interface DefaultGridTableProps {
  title: string
  children: ReactNode
  className?: string
  variant?: 'legacy' | 'glass'
}

export const DefaultGridTable = ({
  title,
  children,
  className = '',
  variant = 'legacy',
}: DefaultGridTableProps) => {
  const containerClass = [
    variant === 'glass'
      ? 'overflow-hidden rounded-xl border border-white/15 bg-[#0f1220]/95 shadow-2xl backdrop-blur-sm'
      : 'sub-container-purple',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const contentClass = [
    variant === 'glass'
      ? 'rounded-lg border border-white/10 bg-white/5'
      : 'sub-container-purple-grid',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const titleClass =
    variant === 'glass'
      ? 'border-b border-white/10 px-4 py-3 text-lg font-semibold text-white'
      : 'ev-header-purple'

  return (
    <div className={containerClass}>
      <div className={contentClass}>
        <h2 className={titleClass}>{title}</h2>
        {children}
      </div>
    </div>
  )
}
