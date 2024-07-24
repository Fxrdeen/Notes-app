import { notesMock } from '@renderer/store/mocks'
import { ComponentProps } from 'react'
import NotePreview from './NotePreview'
import { twMerge } from 'tailwind-merge'
const NotePreviewList = ({ className, ...props }: ComponentProps<'ul'>) => {
  if (notesMock.length === 0) {
    return (
      <ul className={twMerge('text-center p-4', className)}>
        <span>No Notes Yet</span>
      </ul>
    )
  }
  return (
    <ul className={className} {...props}>
      {notesMock.map((note) => (
        <NotePreview {...note} key={note.title + note.lastEditTime} />
      ))}
    </ul>
  )
}

export default NotePreviewList
