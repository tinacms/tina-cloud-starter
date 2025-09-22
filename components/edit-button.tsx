import { useEditState } from 'tinacms/dist/edit-state'

const MyEditButton = () => {
  const { edit, setEdit } = useEditState()

  return (
    <button
      onClick={() => {
        setEdit((editState) => !editState)
      }}
    >
      {edit ? 'exit exit mode' : 'Enter edit mode'}
    </button>
  )
}
