import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { GetNotes } from '@shared/types'
import { stat } from 'fs-extra'
import { ensureDir, readdir } from 'fs-extra'
import { homedir } from 'os'

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
  return Promise.all(notes.map(getNoteInfoFromFilename))
}
export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)
  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}
