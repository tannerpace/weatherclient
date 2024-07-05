import { Marker, Popup } from "react-leaflet"
import { useState, useRef, useCallback, useMemo } from "react"
import updateAction from "@/utils/updateAction"

import { useStateMachine } from "little-state-machine"
function DraggableMarkerEnd({ position, isEnd }) {
  const { actions } = useStateMachine({ updateAction })
  const [draggable, setDraggable] = useState(false)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newPosition = marker.getLatLng()
          actions.updateAction({
            end_lattitude: newPosition.lat,
            end_longitude: newPosition.lng,
          })
        }
      },
    }),
    [actions]
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? isEnd
              ? "Drag to End"
              : "Drag to Start"
            : "Click to drag"}
        </span>
      </Popup>
    </Marker>
  )
}

export default DraggableMarkerEnd
