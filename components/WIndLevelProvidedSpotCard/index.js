/* eslint-disable import/no-anonymous-default-export */
import SpotCard from "@/components/Home/SpotCard"
import { WindLevelProvider } from "@/contexts/WindLevel"

// eslint-disable-next-line react/display-name
export default function ({ location }) {
  return (
    <WindLevelProvider>
      <SpotCard location={location} />
    </WindLevelProvider>
  )
}
