import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotes, ReadNote, WriteNote } from '../shared/types'

declare global {
  interface Window {
    // electron: ElectronAPIi
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
    }
  }
}
