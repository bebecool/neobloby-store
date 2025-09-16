import { useCallback, useState } from "react"

export type StateType = {
  state: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const useToggleState = (initialState = false): StateType => {
  const [state, setState] = useState(initialState)

  const close = useCallback(() => {
    setState(false)
  }, [])

  const open = useCallback(() => {
    setState(true)
  }, [])

  const toggle = useCallback(() => {
    setState((state) => !state)
  }, [])

  return {
    state,
    close,
    open,
    toggle,
  }
}

export default useToggleState
