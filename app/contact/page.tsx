import dynamic from "next/dynamic"

import Contact from "@/components/Contact"
import BottomNavBar from "../../components/BottomNavBar"
const ContactPage = () => {
  return (
    <main>
      <Contact />
      <BottomNavBar />
    </main>
  )
}

export default ContactPage
