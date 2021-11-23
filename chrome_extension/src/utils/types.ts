// Background script broadcasting update isActive in popup.tsx
interface IsActiveToggle {
  type: 'TOGGLE_IS_ACTIVE'
  isActive: boolean
}

export type MessageType = IsActiveToggle
