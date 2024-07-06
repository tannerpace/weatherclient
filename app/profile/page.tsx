import dynamic from "next/dynamic"

const ProfileComponent = dynamic(() => import("@/components/Profile"), {
  ssr: false,
})

const ProfilePage: React.FC = () => {
  return (
    <div>
      <ProfileComponent />
    </div>
  )
}

export default ProfilePage
