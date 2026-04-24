import { getPublicProjects, type Project } from "@/lib/projects";
import PortfolioGrid from "./PortfolioGrid";

export default async function Portfolio() {
  const projects = await getPublicProjects();

  return (
    <section id="portfolio" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-4">Selected work</p>
        <h2 className="section-heading">
          <span className="ethereal-text">Constellations</span>{" "}
          <span className="text-moon-pearl">of shipped work.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-moon-silver/80">
          A growing archive of systems built, agents deployed, and hours
          returned to the humans who used to do this by hand.
        </p>
      </div>

      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <PortfolioGrid projects={projects} />
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="glass halo mx-auto max-w-xl rounded-2xl p-10 text-center">
      <div className="mb-4 text-4xl text-moon-gold">✦</div>
      <h3 className="font-display text-2xl text-moon-pearl">
        The archive is still forming
      </h3>
      <p className="mt-3 text-sm text-moon-silver/80">
        Projects will appear here once they&apos;re added from the admin panel.
      </p>
    </div>
  );
}

export type { Project };
