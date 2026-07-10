import { FC } from 'react'
import { useNetworkConfiguration } from '../../contexts/NetworkConfigurationProvider'

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration()

  return (
    <label className='flex items-center justify-between gap-3 text-sm text-white/90'>
      <span>Network</span>
      <select
        value={networkConfiguration}
        onChange={e => setNetworkConfiguration(e.target.value)}
        className='h-9 rounded-md border border-white/15 bg-white/5 px-2 text-sm text-white outline-none transition-colors duration-150 hover:bg-white/10 focus:border-[var(--purple)]'
      >
        <option value='mainnet-beta'>main</option>
        <option value='devnet'>dev</option>
        <option value='testnet'>test</option>
      </select>
    </label>
  )
}

export default NetworkSwitcher
