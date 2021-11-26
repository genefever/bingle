// Message types for chrome.runtime
interface SetEnable {
  type: 'SET_ENABLE'
  enable: boolean
}
interface SetIsActive {
  type: 'SET_IS_ACTIVE'
  isActive: boolean
}
interface SetQuery {
  type: 'SET_QUERY'
  query: string
}

export type MessageType = SetEnable | SetIsActive | SetQuery

// Event types
export type SelectChangeEventHandler = React.ChangeEvent<HTMLInputElement>
