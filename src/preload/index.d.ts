import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    // electron: ElectronAPIi
    context: {
      locale: string
    }
  }
}
