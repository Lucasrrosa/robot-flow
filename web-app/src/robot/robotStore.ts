import { create } from "zustand"
import type { ConnectionStatus, RobotStatus, RobotStore } from "./types/types"


export const useRobotStore = create<RobotStore>((set) => ({
  robotConnectionStatus: 'disconnected',
  setRobotConnected: (v:ConnectionStatus) => set({ robotConnectionStatus: v }),

  lastStatus: null,
  setLastStatus: (st: RobotStatus | null) => set({ lastStatus: st }), 
}))