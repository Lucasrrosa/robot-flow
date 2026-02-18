import type { RobotStatus } from "./types"

export function createRobotWs(
  ip: string,
  handlers: {
    onOpen: () => void;
    onClose: () => void;
    onStatus: (st: RobotStatus) => void;
  }
) {
  const ws = new WebSocket(`ws://${ip}:81`)

  ws.onopen = () => handlers.onOpen()
  ws.onclose = () => handlers.onClose()

  ws.onmessage = (ev) => {
    try {
      const msg = JSON.parse(ev.data)
      if (msg.type === "status") handlers.onStatus(msg as RobotStatus)
    } catch {
      // ignore
    }
  }

  return ws
}