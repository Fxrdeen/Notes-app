import { ComponentProps } from 'react'
import NotePreview from './NotePreview'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '@renderer/hooks/useNotesList'
export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}
const NotePreviewList = ({ className, onSelect, ...props }: NotePreviewListProps) => {
  const { handleNoteSelect, notes, selectedNoteIndex } = useNotesList({ onSelect })
  if (!notes) return null
  if (notes.length === 0) {
    return (
      <ul className={twMerge('text-center p-4', className)}>
        <span>No Notes Yet</span>
      </ul>
    )
  }
  return (
    <ul className={className} {...props}>
      {notes.map((note, index) => (
        <NotePreview
          key={note.title + note.lastEditTime}
          isActive={selectedNoteIndex === index}
          {...note}
          onClick={handleNoteSelect(index)}
        />
      ))}
    </ul>
  )
}

export default NotePreviewList
