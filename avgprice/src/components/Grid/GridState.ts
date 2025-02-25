import { GridApi } from '@mui/x-data-grid/'
import { GridEvents } from '@mui/x-data-grid/models/events'
import { MutableRefObject, useEffect, useRef } from 'react'
import { parseOrNull } from '../../utils'
/**
 * Listens to column-related changes on grid, and saves column settings to local storage.
 * Restores settings upon reload.
 * Docs: https://mui.com/x/react-data-grid/state/#save-and-restore-the-state
 * SO: https://stackoverflow.com/a/75090454/207291
 * Usage:
 * `
 * function MyGrid() {
 *   const apiRef = useGridApiRef()
 *   usePersistColumnSettings(apiRef, 'customers-grid')
 *   return <DataGrid apiRef={apiRef} />
 * }
 * `
 * Note: to persist column visibility, you may need to add the following to grid props:
 *  `initialState={{ columns: { columnVisibilityModel: {} } }}`
 */
export function usePersistColumnSettings (
  apiRef: MutableRefObject<GridApi>,
  key: string
) {
  const initialized = useRef(false)
  const storageKey = `${key}_grid-state`

  useEffect(() => {
    const ref = apiRef.current

    if (!ref?.subscribeEvent) return

    // Restore state on first ref load
    if (!initialized.current) {
      initialized.current = true

      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const parsed = parseOrNull(raw)
        if (parsed) {
          try {
            // console.debug(`Restoring grid state for ${key}`, parsed)
            ref.restoreState(parsed)
          }
          catch (e) {
            console.warn(`Failed to restore grid state`, e)
          }
        }
      }
    }

    const subs: VoidFunction[] = []

    const save = () => {
      const state = ref.exportState()
      if (state) {
        // console.debug(`Storing grid state for ${key}`)
        localStorage.setItem(storageKey, JSON.stringify(state))
      }
    }

    const subscribe = <E extends GridEvents> (event: E) => {
      subs.push(ref.subscribeEvent(event, save))
    }

    subscribe('columnResizeStop')
    subscribe('columnOrderChange')
    subscribe('columnVisibilityModelChange')

    return () => {
      subs.forEach(unsub => {
        unsub()
      })
    }
  }, [apiRef])
}