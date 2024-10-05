import BottomNavigationBar from "@/components/BottomNavBar"
import dynamic from "next/dynamic"

const SavedLocations = dynamic(() => import("@/components/SavedLocations"), {
  ssr: false,
})

const ProfilePage: React.FC = () => {
  return (
    <div>
      <SavedLocations />
      <BottomNavigationBar />
    </div>
  )
}

export default ProfilePage
