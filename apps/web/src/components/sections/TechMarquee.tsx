import { Marquee, SectionLabel, Container } from "@nayeem/ui";
import { useTechStack } from "../../hooks/useFirestoreData";

const FALLBACK = [
  "React", "TypeScript", "JavaScript", "Node.js", "Python", "Firebase",
  "MongoDB", "Cloudinary", "Cloudflare", "Git", "Tailwind", "GSAP", "Three.js",
];

export function TechMarquee() {
  const { data } = useTechStack();

  const row1 = (data && data.length ? data.filter((t) => t.row === 1) : FALLBACK.map((n, i) => ({ id: String(i), name: n })));
  const row2 = (data && data.length ? data.filter((t) => t.row === 2) : [...FALLBACK].reverse().map((n, i) => ({ id: `r${i}`, name: n })));

  const renderItem = (name: string, key: string) => (
    <div
      key={key}
      className="flex items-center gap-2 rounded-full border border-base-border bg-base-panel/60 px-5 py-2.5 font-mono text-xs tracking-widest text-foreground-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
    >
      {name.toUpperCase()}
    </div>
  );

  return (
    <section className="border-y border-base-border bg-base-near py-16">
      <Container>
        <SectionLabel index="00" label="TECH STACK" className="mb-8" />
      </Container>
      <div className="flex flex-col gap-4">
        <Marquee direction="left" items={row1.map((t) => renderItem(t.name, t.id))} />
        <Marquee direction="right" items={row2.map((t) => renderItem(t.name, t.id))} />
      </div>
    </section>
  );
}
