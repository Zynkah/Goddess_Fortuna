import { useEffect, useRef } from 'react'
import NetworkSwitcher from '../../components/AppBar/NetworkSwitcher'
import { useAutoConnect } from '../../contexts/AutoConnectProvider'
import { APPBAR_ICON_BUTTON_CLASS, APPBAR_PANEL_CLASS } from './uiTokens'

type SettingsDropdownProps = {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

export const SettingsDropdown = ({ isOpen, onToggle, onClose }: SettingsDropdownProps) => {
  const { autoConnect, setAutoConnect } = useAutoConnect()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        onClick={onToggle}
        aria-controls='settings-menu'
        aria-haspopup='menu'
        aria-expanded={isOpen}
        className={APPBAR_ICON_BUTTON_CLASS}
      >
        <svg
          className='w-7 h-7'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg>
      </button>
      <div
        id='settings-menu'
        role='menu'
        className={`absolute right-0 top-full z-20 mt-2 w-72 p-3 ${APPBAR_PANEL_CLASS} ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className='flex flex-col gap-3'>
          <label className='flex cursor-pointer items-center justify-between gap-3 text-sm text-white/90'>
            <span>Autoconnect</span>
            <span className='relative inline-flex h-6 w-11 items-center rounded-full bg-white/15 p-0.5'>
              <input
                type='checkbox'
                checked={autoConnect}
                onChange={e => setAutoConnect(e.target.checked)}
                className='peer sr-only'
              />
              <span className='h-5 w-5 rounded-full bg-white transition-transform duration-150 peer-checked:translate-x-5 peer-checked:bg-[var(--purple)]'></span>
            </span>
          </label>
          <NetworkSwitcher />
        </div>
      </div>
    </div>
  )
}
