import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { readFile, remove, stat, writeFile, writeFileSync } from 'fs-extra'
import { ensureDir, readdir } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'
import welcomeFile from '../../../resources/welcomeNote.md?asset'
export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const root = getRootDir()
  await ensureDir(root)
  const notesFileNames = await readdir(root, {
    encoding: fileEncoding,
    withFileTypes: false
  })
  const notes = notesFileNames.filter((filename) => filename.endsWith('.md'))
  if (notes.length === 0) {
    console.info('No notes found, creating welcome note')
    const content = await readFile(welcomeFile, { encoding: fileEncoding })
    await writeFile(`${root}/welcome.md`, content, { encoding: fileEncoding })
    notes.push('welcome.md')
  }
  return Promise.all(notes.map(getNoteInfoFromFilename))
}
export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)
  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}
export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir()
  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}
export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()
  console.info(`Writing note ${filename}}`)
  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}
export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)
  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })
  if (canceled || !filePath) {
    console.info('Note creation cancelled')
    return false
  }
  const { name: filename, dir: parentDir } = path.parse(filePath)
  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation Failed',
      message: `All notes must be saved under ${rootDir}. Avoid using other directories
      `
    })
    return false
  }
  console.log(`Creating note: ${filePath}`)
  await writeFileSync(filePath, '')
  return filename
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Note',
    message: `are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })
  if (response === 1) {
    console.info('note deletion cancelled')
    return false
  }
  console.log(`Deleting note ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  return true
}
