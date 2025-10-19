import { getRepoData } from '@/app/api/github/repo/route'
import MainLayout from '@/components/layout/main-layout'
import HeroSection from '@/components/sections/hero-section'
import FeaturesSection from '@/components/sections/features-section'
import RepoSearchContainer from '@/components/repo-search-container'

export default async function Home() {
  const defaultRepoData = await getRepoData('404-grave', '404-grave')
  
  return (
    <MainLayout>
      <HeroSection />
      <RepoSearchContainer defaultRepoData={defaultRepoData} />
      <FeaturesSection />
    </MainLayout>
  )
}