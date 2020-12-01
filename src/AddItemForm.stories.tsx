import React from 'react'
import { AddItemForm } from './AddItemForm'

export default {
  title: 'AddItemForm Component',
  component: AddItemForm
}

//action("Button add was pressed inside the form")
export const AddItemFormBaseExample = (props: any) => {
  return <AddItemForm addItem={()=>{alert("title")}} />
}
