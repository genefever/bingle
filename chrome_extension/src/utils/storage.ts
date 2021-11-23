export interface LocalStorage {
  overlayOption?: string
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredOverlayOption(overlayOption: string): Promise<void> {
  const val: LocalStorage = {
    overlayOption,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(val, () => {
      resolve()
    })
  })
}

export function getStoredOverlayOption(): Promise<LocalStorage> {
  const keys: LocalStorageKeys[] = ['overlayOption']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res)
    })
  })
}
