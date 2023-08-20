import { Icon, Paper, Snackbar, Stack, Typography } from '@mui/material'
import SpeedOutlined from '@mui/icons-material/SpeedOutlined'
import ClosedCaptionOffOutlinedIcon from '@mui/icons-material/ClosedCaptionOffOutlined'
import ClosedCaptionDisabledOutlinedIcon from '@mui/icons-material/ClosedCaptionDisabledOutlined'
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
    text: '1.5x',
  },
  [HotkeysEventType.PLAY_SPEED_NORMAL]: {
    shouldDisplay: false,
    icon: null,
    text: null,
  },
  [HotkeysEventType.SUBTITLE_ON]: {
    shouldDisplay: true,
    icon: ClosedCaptionOffOutlinedIcon,
    text: 'Subtitles On',
  },
  [HotkeysEventType.SUBTITLE_OFF]: {
    shouldDisplay: true,
    icon: ClosedCaptionDisabledOutlinedIcon,
    text: 'Subtitles Off',
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
