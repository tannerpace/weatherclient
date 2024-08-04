import dynamic from "next/dynamic"

const SavedLocations = dynamic(() => import("@/components/SavedLocations"), {
  ssr: false,
})

const ProfilePage: React.FC = () => {
  return (
    <div>
      <SavedLocations />
    </div>
  )
}

export default ProfilePage
