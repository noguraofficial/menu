import Hero from '@/components/Hero'
import MenuSection from '@/components/MenuSection'
import AboutSection from '@/components/AboutSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <MenuSection />
      <AboutSection />
    </div>
  )
}
