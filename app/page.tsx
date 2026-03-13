import Banner from "@/components/banner"
import WelcomeSection from "@/components/welcomeSection"
import ServicesSection from "@/components/ourServicesSection"
import SideNav from "@/components/sideNav"
import ContactSection from "@/components/contactUsSection"

export default function Home() {
  return (
    <main className="bg-neutral-200 min-h-screen md:ml-16">

  <SideNav />

  <Banner />

  <div className="max-w-6xl mx-auto px-6">
    <WelcomeSection />
    <ServicesSection />
    <ContactSection/>
  </div>

</main>
  )
}