import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotes } from '../shared/types'

declare global {
  interface Window {
    // electron: ElectronAPIi
    context: {
      locale: string
      getNotes: GetNotes
    }
  }
}
