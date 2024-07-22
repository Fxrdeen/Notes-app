import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Contextisolation must be enabled in the Browserwindow')
}

try {
  contextBridge.exposeInMainWorld('context', {})
} catch (error) {
  console.error(error)
}
