import dynamic from "next/dynamic"

const SurfProfileComponent = dynamic(() => import("@/components/SurfProfile"), {
  ssr: false,
})

const SurfProfilePage: React.FC = () => {
  return (
    <div>
      <SurfProfileComponent />
    </div>
  )
}

export default SurfProfilePage
