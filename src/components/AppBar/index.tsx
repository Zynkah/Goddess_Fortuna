import React, { useCallback, useState } from 'react'
import { SettingsDropdown } from './SettingsDropdown'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Link } from 'react-router-dom'
import { APPBAR_WALLET_BUTTON_CLASS } from './uiTokens'

export const AppBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<'settings' | null>(null)

  const toggleSettingsMenu = useCallback(() => {
    setActiveMenu(current => (current === 'settings' ? null : 'settings'))
  }, [])

  const closeSettingsMenu = useCallback(() => {
    setActiveMenu(current => (current === 'settings' ? null : current))
  }, [])

  return (
    <div className='sticky top-0 z-50'>
      <div className='navbar border-b border-[rgba(201,162,39,0.14)] bg-[#070502]/95 backdrop-blur-sm'>
        <div className='navbar-start align-items-center'>
          <div className='flex items-center gap-2 p-2 ml-4 md:ml-10'>
            <Link
              to='/'
              className='font-cinzel text-lg tracking-[4px] text-fortuna-gold-light md:text-xl'
            >
              GODDESS FORTUNA
            </Link>
          </div>
        </div>

        <div className='navbar-end gap-2 pr-2 sm:pr-4'>
          <WalletMultiButton className={APPBAR_WALLET_BUTTON_CLASS} />
          <SettingsDropdown
            isOpen={activeMenu === 'settings'}
            onToggle={toggleSettingsMenu}
            onClose={closeSettingsMenu}
          />
        </div>
      </div>
    </div>
  )
}
