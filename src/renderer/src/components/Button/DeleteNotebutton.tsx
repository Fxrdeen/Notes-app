import React from 'react'
import ActionButton, { ActionButtonProps } from './ActionButton'
import { FaRegTrashCan } from 'react-icons/fa6'
const DeleteNotebutton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-400" />
    </ActionButton>
  )
}

export default DeleteNotebutton
