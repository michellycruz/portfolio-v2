import { ThemeProvider } from "./context/ThemeContext";
import { usePortfolioContent } from "./hooks/usePortfolioContent";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { BackToTop } from "./components/layout/BackToTop";
import { Hero } from "./components/sections/Hero";
import { Experience } from "./components/sections/Experience";
import { Education } from "./components/sections/Education";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";

function PortfolioApp() {
  const { content, offline } = usePortfolioContent();

  return (
    <div className="min-h-screen">
      {offline && (
        <div className="bg-coral px-4 py-2 text-center text-xs font-medium text-white">
          Não foi possível conectar à API — exibindo conteúdo em cache local.
        </div>
      )}

      <Navbar />

      <main>
        <Hero profile={content.profile} />
        <Experience items={content.experience} />
        <Education items={content.education} institutions={content.institutions} />
        <Skills
          infraSkills={content.infraSkills}
          infraHighlights={content.infraHighlights}
          categories={content.skillCategories}
        />
        <Projects items={content.projects} />
        <Contact />
      </main>

      <Footer social={content.profile.social} name={content.profile.name} />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
