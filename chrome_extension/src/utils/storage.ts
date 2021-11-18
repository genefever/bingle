export interface LocalStorage {
  overlayOption?: string
  isActive?: boolean
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

export function setStoredIsActive(isActive: boolean): Promise<void> {
  const val: LocalStorage = {
    isActive,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(val, () => {
      resolve()
    })
  })
}

export function getStoredIsActive(): Promise<LocalStorage> {
  const keys: LocalStorageKeys[] = ['isActive']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res)
    })
  })
}
