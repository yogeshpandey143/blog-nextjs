import FeaturedBlogs from "@/Components/FeaturedBlogs";
import Footer from "@/Components/Footer";
import HeroSection from "@/Components/HeroSection";


export default function Home() {
  return (
<>
<main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.03] ">
<HeroSection></HeroSection>
<FeaturedBlogs></FeaturedBlogs>
<Footer></Footer>
</main>
</>
  );
}
