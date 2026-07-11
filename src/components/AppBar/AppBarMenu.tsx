import { useEffect, useRef, useState } from 'react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import NetworkSwitcher from './NetworkSwitcher'
import { useAutoConnect } from '../../contexts/AutoConnectProvider'
import useFortunaProgressStore from '../../stores/useFortunaProgressStore'
import { StatsModal } from '../Modals/StatsModal'
import { HowItWorksModal } from '../Modals/HowItWorksModal'
import useEscapeKey from '../../hooks/useEscapeKey'
import { APPBAR_ICON_BUTTON_CLASS, APPBAR_PANEL_CLASS } from './uiTokens'

const MENU_ROW_CLASS =
  'flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-2 text-left text-sm text-white/90 transition-colors duration-150 hover:bg-white/10'

export const AppBarMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isStatsOpen, setIsStatsOpen] = useState(false)
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false)
  const { autoConnect, setAutoConnect } = useAutoConnect()
  const { soundEnabled, setSoundEnabled } = useFortunaProgressStore()
  const containerRef = useRef<HTMLDivElement>(null)

  useEscapeKey(() => setIsOpen(false), isOpen)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        onClick={() => setIsOpen(current => !current)}
        aria-controls='appbar-menu'
        aria-haspopup='menu'
        aria-expanded={isOpen}
        className={APPBAR_ICON_BUTTON_CLASS}
      >
        <span className='sr-only'>Menu</span>
        {isOpen ? <XIcon className='h-6 w-6' /> : <MenuIcon className='h-6 w-6' />}
      </button>

      <div
        id='appbar-menu'
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
          <label className='flex cursor-pointer items-center justify-between gap-3 text-sm text-white/90'>
            <span>Sound effects</span>
            <span className='relative inline-flex h-6 w-11 items-center rounded-full bg-white/15 p-0.5'>
              <input
                type='checkbox'
                checked={soundEnabled}
                onChange={e => setSoundEnabled(e.target.checked)}
                className='peer sr-only'
              />
              <span className='h-5 w-5 rounded-full bg-white transition-transform duration-150 peer-checked:translate-x-5 peer-checked:bg-[var(--purple)]'></span>
            </span>
          </label>
          <NetworkSwitcher />

          <div className='mt-1 flex flex-col gap-1 border-t border-white/10 pt-3'>
            <button
              type='button'
              role='menuitem'
              onClick={() => {
                setIsOpen(false)
                setIsStatsOpen(true)
              }}
              className={MENU_ROW_CLASS}
            >
              <span>Stats</span>
            </button>
            <button
              type='button'
              role='menuitem'
              onClick={() => {
                setIsOpen(false)
                setIsHowItWorksOpen(true)
              }}
              className={MENU_ROW_CLASS}
            >
              <span>How it works</span>
            </button>
          </div>
        </div>
      </div>

      <StatsModal isOpen={isStatsOpen} onClose={() => setIsStatsOpen(false)} />
      <HowItWorksModal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} />
    </div>
  )
}
