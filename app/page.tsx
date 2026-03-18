import Banner from "@/components/banner";
import WelcomeSection from "@/components/welcomeSection";
import ServicesSection from "@/components/ourServicesSection";
import SideNav from "@/components/sideNav";
import ContactSection from "@/components/contactUsSection";

export default function Home() {
  return (
    <main className="bg-[#f0f7ed] min-h-screen md:ml-16 text-[#3A3D2A]">

      <SideNav />

      <Banner />

      <div className="max-w-6xl mx-auto px-6 space-y-24">
        <WelcomeSection />
        <ServicesSection />
        <ContactSection />
      </div>

    </main>
  );
}