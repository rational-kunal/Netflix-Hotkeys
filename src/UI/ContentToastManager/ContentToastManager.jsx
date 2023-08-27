import useEventManager from '../hooks/useEventManager'
import React, { useState } from 'react'
import Toast from './Toast'
import ToastModel from './ToastModel'

function ContentToastManager() {
  const [toastModel, setToastModel] = useState(null)

  useEventManager((event) => {
    setToastModel(ToastModel.fromEvent(event))
  })

  if (!toastModel) {
    return null
  }

  const handleClose = () => {
    setToastModel(null)
  }

  return <Toast model={toastModel} onClose={handleClose} />
}

export default ContentToastManager
