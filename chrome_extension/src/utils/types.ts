// Message types for chrome.runtime
export enum Messages {
  TOGGLE_ENABLE_EXTENSION,
  TOGGLE_IS_ACTIVE,
  SET_QUERY,
}

interface ToggleEnableExtension {
  type: Messages.TOGGLE_ENABLE_EXTENSION
  enable: boolean
}
interface ToggleIsActive {
  type: Messages.TOGGLE_IS_ACTIVE
  isActive: boolean
}
interface SetQuery {
  type: Messages.SET_QUERY
  query: string
}

export type MessageType = ToggleEnableExtension | ToggleIsActive | SetQuery

// Event types
export type SelectChangeEventHandler = React.ChangeEvent<HTMLInputElement>
