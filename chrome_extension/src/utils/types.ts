// Message types for chrome.runtime
interface SetQuery {
  type: 'SET_QUERY'
  query: string
}
interface SetEnable {
  type: 'SET_ENABLE'
  enable: boolean
}
export type MessageType = SetQuery | SetEnable

// Event types
export type SelectChangeEventHandler = React.ChangeEvent<HTMLInputElement>
