interface AlertSurfaceProps {
  children: React.ReactNode
  variant: 'warning' | 'error' | 'success' | 'info'
  actions?: React.ReactNode
}

const VARIANT_CLASS_NAME: Record<AlertSurfaceProps['variant'], string> = {
  warning: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  error: 'border-rose-300/30 bg-rose-300/10 text-rose-100',
  success: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
  info: 'border-sky-300/30 bg-sky-300/10 text-sky-100',
}

export const AlertSurface = ({ children, variant, actions }: AlertSurfaceProps) => (
  <div className='mt-2 overflow-hidden rounded-xl border border-white/15 bg-[#0f1220]/95 p-2 shadow-2xl backdrop-blur-sm'>
    <div
      className={`flex items-start justify-between gap-3 rounded-lg border p-3 text-sm ${VARIANT_CLASS_NAME[variant]}`}
    >
      <div className='min-w-0 flex-1 text-sm font-medium'>{children}</div>
      {actions ? <div className='flex flex-shrink-0 items-center'>{actions}</div> : null}
    </div>
  </div>
)