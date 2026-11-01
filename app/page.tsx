import Banner from "@/components/homepage/Banner"
import FeatureSection from "@/components/homepage/FeatureSection"
import Gallery from "@/components/homepage/Gallary"
import Newsletter from "@/components/homepage/Newsletter"
import RecentUpcommingSection from "@/components/homepage/RecentUpcommingSection"

export default function Page() {
  return (
    <main>
      <Banner/>
      <FeatureSection/>
      <RecentUpcommingSection/>
      <Gallery/>
      <Newsletter/>
      
    </main>
  )
}
