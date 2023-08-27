import { Icon, Paper, Snackbar, Stack, Typography } from '@mui/material'
import React from 'react'
import ToastModel from './ToastModel'

/**
 * @param {Object} props
 * @param {ToastModel} props.model
 * @param {() => void} props.onClose
 */
function Toast({ model, onClose }) {
  if (!model) {
    return null
  }

  return (
    <Snackbar
      open={true}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      onClose={onClose}
      autoHideDuration={model.autoCloseDelay}
    >
      <Paper
        elevation={0}
        sx={{ paddingX: 2, borderRadius: 2, bgcolor: 'rgba(1,1,1,0.5)', color: 'primary.contrastText' }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {model.icon && <Icon component={model.icon} sx={{ fontSize: '34px' }} />}
          {model.text && <Typography fontSize={32}>{model.text}</Typography>}
        </Stack>
      </Paper>
    </Snackbar>
  )
}

export default Toast
