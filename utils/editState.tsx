// This file handles whether or not a user is in edit mode

import React, { useContext, useState } from 'react';
const LOCALSTORAGEKEY = 'tina.isEditing'

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
    // grabs the correct initial edit state from localstorage
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