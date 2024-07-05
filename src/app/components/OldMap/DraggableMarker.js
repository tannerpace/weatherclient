import { Marker, Popup } from "react-leaflet"
import { useState, useRef, useCallback, useMemo } from "react"
import updateAction from "@/utils/updateAction"
import useLocation from "@/hooks/useLocation"
import { useStateMachine } from "little-state-machine"
function DraggableMarker({ position, isEnd, isAdd = false }) {
  const { state, actions } = useStateMachine({ updateAction })
  const [draggable, setDraggable] = useState(false)
  const { setSelectedEndPoints, setSelectedStartPoints } = useLocation()
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newPosition = marker.getLatLng()
          if (isEnd) {
            actions.updateAction({
              end_lattitude: newPosition.lat,
              end_longitude: newPosition.lng,
            })
          } else if (isAdd) {
            // handle adding new location
            actions.updateAction({
              new_lattitude: newPosition.lat,
              new_longitude: newPosition.lng,
            })
          } else {
            actions.updateAction({
              start_lattitude: newPosition.lat,
              start_longitude: newPosition.lng,
            })
          }
        }
      },
    }),
    []
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
              : isAdd
              ? "Select Location"
              : "Drag to Start"
            : "Click to drag"}
        </span>
      </Popup>
    </Marker>
  )
}

export default DraggableMarker
