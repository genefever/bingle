// Background script broadcasting update `isActive` in Popup.tsx
interface SetPopup {
  type: 'SET_POPUP'
  isActive: boolean
  query: string
}
export type MessageType = SetPopup
