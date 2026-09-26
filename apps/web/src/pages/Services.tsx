import { Container, SectionLabel, GlowCard, Loader } from "@nayeem/ui";
import { useServices } from "../hooks/useFirestoreData";

export function Services() {
  const { data, loading } = useServices();

  return (
    <Container className="py-24">
      <SectionLabel index="06" label="Services" className="mb-6" />
      <h1 className="font-display text-4xl font-bold">Services</h1>

      {loading && <Loader label="LOADING SERVICES..." />}

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(data ?? []).map((s) => (
          <GlowCard key={s.id}>
            <h3 className="font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-foreground-muted">{s.description}</p>
          </GlowCard>
        ))}
      </div>
    </Container>
  );
}
