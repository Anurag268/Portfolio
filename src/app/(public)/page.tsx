import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { getPortfolio } from "@/app/actions/portfolio";

export default async function Home() {
  const portfolio = await getPortfolio();
  
  return (
    <>
      <Hero portfolio={portfolio} />
      <About portfolio={portfolio} />
      <Skills portfolio={portfolio} />
      <Projects portfolio={portfolio} />
      <Experience portfolio={portfolio} />
      <Contact portfolio={portfolio} />
    </>
  );
}
