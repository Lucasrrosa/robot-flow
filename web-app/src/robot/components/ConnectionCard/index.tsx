import ConnectionForm from '@/robot/components/ConnectionCard/ConnectionForm'
import ConnectionInfo from '@/robot/components/ConnectionCard/ConnectionInfo'
import { WsConnectionStatusIndicator } from '@/robot/components/ConnectionCard/WsConnectionStatusIndicator'
import { useRobotConnection } from '@/robot/contexts/useRobotConnection'
import { useRobotStore } from '@/robot/robotStore'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

export default function ConnectionCard() {
  const { connect } = useRobotConnection()
  const robotConnectionStatus = useRobotStore((store) => store.robotConnectionStatus)
  const onSubmit = (ip: string) => connect(ip)

  return (
    <Paper>
      <Stack p={2} spacing={1}>
        {robotConnectionStatus === 'connected' ? <ConnectionInfo /> : <ConnectionForm onSubmit={onSubmit} />}
        <Stack direction='row' spacing={2} justifyContent='end'>
          <WsConnectionStatusIndicator />
        </Stack>
      </Stack>
    </Paper>
  )
}
