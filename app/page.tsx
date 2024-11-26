
import { HeroSection } from '@/components/hero-section';
import { FeaturedProducts } from '@/components/featured-products';
import { Categories } from '@/components/categories';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kamala Tailor Items",
  description: "Kamala Tailor Items is your premier destination for tailoring  products.",
};

export default function Home() {
  
  return (
    <div className="container mx-auto pb-8 pt-3 rounded">
      <HeroSection />
      <Categories />
      <FeaturedProducts />
    </div>
  );
}