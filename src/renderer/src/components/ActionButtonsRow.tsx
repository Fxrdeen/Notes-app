import React, { ComponentProps } from 'react'
import NewNoteButton from './Button/NewNoteButton'
import DeleteNotebutton from './Button/DeleteNotebutton'

const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNotebutton />
    </div>
  )
}

export default ActionButtonsRow
