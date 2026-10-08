import { Container, SectionLabel, GlowCard, Loader } from "@nayeem/ui";
import { useServices } from "../hooks/useFirestoreData";

export function Services() {
  const { data, loading } = useServices();

  const services = data ?? [];

  return (
    <Container className="py-24">
      <SectionLabel index="06" label="SERVICES" className="mb-6" />

      <h1 className="font-display text-4xl font-bold">
        Services
      </h1>

      {loading && (
        <div className="mt-10">
          <Loader label="LOADING SERVICES..." />
        </div>
      )}

      {!loading && services.length === 0 && (
        <div className="mt-10 text-sm text-foreground-muted">
          No services available yet.
        </div>
      )}

      {!loading && services.length > 0 && (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <GlowCard key={service.id}>
              <h3 className="font-display text-lg font-semibold">
                {service.title}
              </h3>

              <p className="mt-2 text-sm text-foreground-muted">
                {service.description}
              </p>
            </GlowCard>
          ))}
        </div>
      )}
    </Container>
  );
}