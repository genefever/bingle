export interface LocalStorageOptions {
  hasAutoOverlay: boolean
}

export type LocalStorageKeys = keyof LocalStorageOptions

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set(options, () => {
      resolve()
    })
  })
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['hasAutoOverlay']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorageOptions) => {
      resolve(res)
    })
  })
}
