// Background script broadcasting update `query` in Popup.tsx
interface SetQuery {
  type: 'SET_QUERY'
  query: string
}
export type MessageType = SetQuery
