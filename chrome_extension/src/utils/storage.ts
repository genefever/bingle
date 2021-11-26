export interface LocalStorageOptions {
  overlayOption?: string
}

export type LocalStorageOptionsKeys = keyof LocalStorageOptions

export function setStoredOverlayOption(overlayOption: string): Promise<void> {
  const val: LocalStorageOptions = {
    overlayOption,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(val, () => {
      resolve()
    })
  })
}

export function getStoredOverlayOption(): Promise<LocalStorageOptions> {
  const keys: LocalStorageOptionsKeys[] = ['overlayOption']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorageOptions) => {
      resolve(res)
    })
  })
}
