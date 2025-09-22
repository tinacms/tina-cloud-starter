import { useEditState } from 'tinacms/dist/edit-state'

const MyEditButton = () => {
  const { edit, setEdit } = useEditState()

  return (
    <button
      onClick={() => {
        setEdit((editState) => !editState)
      }}
    >
      {edit ? 'Exit edit mode' : 'Enter this post'}
    </button>
  )
}
