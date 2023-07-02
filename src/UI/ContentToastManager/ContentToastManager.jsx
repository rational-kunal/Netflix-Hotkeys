import { Icon, Paper, Snackbar, Stack, Typography } from '@mui/material'
import SpeedOutlined from '@mui/icons-material/SpeedOutlined'
import useEventManager from '../hooks/useEventManager'
import { HotkeysEventType } from '../../core/EventManager'
import React from 'react'

const ToastDataPerEventType = {
  [HotkeysEventType.PLAY_SPEED_SLOWEST]: {
    shouldDisplay: true,
    icon: SpeedOutlined,
    text: '0.5x',
  },
  [HotkeysEventType.PLAY_SPEED_FASTEST]: {
    shouldDisplay: true,
    icon: SpeedOutlined,
    text: '2x',
  },
  [HotkeysEventType.PLAY_SPEED_NORMAL]: {
    shouldDisplay: false,
    icon: null,
    text: null,
  },
}

function ContentToastManager() {
  const activeEvent = useEventManager()
  let toast = null
  const toastDataForEvent = activeEvent ? ToastDataPerEventType[activeEvent.type] : null
  if (activeEvent && toastDataForEvent && toastDataForEvent.shouldDisplay) {
    const { icon, text } = toastDataForEvent
    toast = (
      <Paper
        elevation={3}
        sx={{ paddingX: 2, borderRadius: 6, bgcolor: 'rgba(1,1,1,0.5)', color: 'primary.contrastText' }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {icon && <Icon component={icon} sx={{ fontSize: '84px' }} />}
          {text && <Typography fontSize={64}>{text}</Typography>}
        </Stack>
      </Paper>
    )
  }

  return (
    <Snackbar open={toast !== null} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
      {toast}
    </Snackbar>
  )
}

export default ContentToastManager
