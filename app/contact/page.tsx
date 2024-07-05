import dynamic from "next/dynamic"

import Contact from "@/components/Contact"
import BottomNavBar from "../shared/BottomNavBar"
const ContactPage = () => {
  return (
    <main>
      <Contact />
      <BottomNavBar />
    </main>
  )
}

export default ContactPage
