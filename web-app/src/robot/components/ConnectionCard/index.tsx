import ConnectionForm from '@/robot/components/ConnectionCard/ConnectionForm'
import ConnectionInfo from '@/robot/components/ConnectionCard/ConnectionInfo'
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
      <Stack p={1} spacing={1}>
        {robotConnectionStatus === 'connected' ? <ConnectionInfo /> : <ConnectionForm onSubmit={onSubmit} />}
      </Stack>
    </Paper>
  )
}
