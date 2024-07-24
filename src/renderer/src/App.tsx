import { Content, RootLayout, Sidebar } from './components'
import ActionButtonsRow from './components/ActionButtonsRow'
import DraggableTopbar from './components/DraggableTopbar'
import NotePreviewList from './components/NotePreviewList'

const App = () => {
  return (
    <>
      <DraggableTopbar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" />
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">Content</Content>
      </RootLayout>
    </>
  )
}

export default App
