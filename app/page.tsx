import Banner from "@/components/banner"
import WelcomeSection from "@/components/welcomeSection"
import ServicesSection from "@/components/ourServicesSection"
import SideNav from "@/components/sideNav"

export default function Home() {
  return (
    <main className="bg-neutral-200 min-h-screen">

      <Banner />

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_200px] gap-10 px-6">

        <div>
          <WelcomeSection />
          <ServicesSection />
          {/* ContactSection later */}
        </div>

        <SideNav />

      </div>

    </main>
  )
}