import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'

const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  return {
    selectedNote
  }
}

export default useMarkdownEditor
