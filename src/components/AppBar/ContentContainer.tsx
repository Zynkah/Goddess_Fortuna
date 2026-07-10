interface Props {
  children: React.ReactNode
}

export const ContentContainer: React.FC<Props> = ({ children }) => {
  return <div className='flex flex-1 flex-col'>{children}</div>
}
