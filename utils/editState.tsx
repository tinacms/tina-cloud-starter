import React, { useContext, useState } from 'react';
const LOCALSTORAGEKEY = 'tinaisadmin'

// need this to see if our site is being rendered on the server
const isSSR = typeof window === 'undefined'

export const isEditing = (): boolean =>{
    if(!isSSR){
        const isEdit = window.localStorage.getItem(LOCALSTORAGEKEY)
        return isEdit && isEdit === 'true'
    }
    // assume not editing if SSR
    return false
}

export const setEditing = (isEditing: boolean) => {
    if(!isSSR){
        console.log('setting edit local storage')
        console.log(isEditing?  'true': 'false')
        window.localStorage.setItem(LOCALSTORAGEKEY, isEditing?  'true': 'false')
    }
}

const EditContext = React.createContext({
  edit: isEditing(),
  setEdit: (editing: boolean) => {},
});

/* 
We will wrap our app in this so we will always be able to get the editmode state with `useEditMode`
*/
export const EditProvider: React.FC = ({ children }) => {
  const [edit, setEditState] = useState(
    // use the correct prefix as initial state
    isEditing()
  );
  const setEdit = (edit: boolean)=>{
    // set React state and localstorage
    setEditState(edit)
    setEditing(edit)
  }
  return (
    <EditContext.Provider value={{ edit, setEdit }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEditState = () => useContext(EditContext);