import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send } from "lucide-react";
import { Container, SectionLabel, Button } from "@nayeem/ui";
import { createDocument, COLLECTIONS } from "@nayeem/firebase";
import { ContactChannels } from "../components/sections/ContactChannels";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Subject is too short"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactForm) => {
    try {
      await createDocument(COLLECTIONS.messages, {
        ...values,
        status: "unread",
        createdAt: new Date().toISOString(),
      });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <Container className="py-24">
      <SectionLabel index="07" label="Initiate Transmission" className="mb-6" />
      <h1 className="font-display text-4xl font-bold sm:text-5xl">Let's Work Together</h1>
      <p className="mt-3 max-w-lg text-foreground-muted">
        Have a project in mind or just want to say hello? Reach out through any channel below.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <ContactChannels />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-xl border border-base-border bg-base-panel/40 p-6">
          <div>
            <label className="font-mono text-xs tracking-widest text-foreground-muted">YOUR NAME *</label>
            <input
              {...register("name")}
              placeholder="e.g. Alex Vance"
              className="mt-2 w-full rounded-lg border border-base-border bg-base-black px-4 py-3 outline-none placeholder:text-foreground-faint focus:border-accent-cyan"
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>

          <div>
            <label className="font-mono text-xs tracking-widest text-foreground-muted">YOUR EMAIL *</label>
            <input
              {...register("email")}
              placeholder="alex@company.com"
              className="mt-2 w-full rounded-lg border border-base-border bg-base-black px-4 py-3 outline-none placeholder:text-foreground-faint focus:border-accent-cyan"
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="font-mono text-xs tracking-widest text-foreground-muted">SUBJECT *</label>
            <input
              {...register("subject")}
              placeholder="Project inquiry"
              className="mt-2 w-full rounded-lg border border-base-border bg-base-black px-4 py-3 outline-none placeholder:text-foreground-faint focus:border-accent-cyan"
            />
            {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="font-mono text-xs tracking-widest text-foreground-muted">MESSAGE / PROJECT DETAILS *</label>
            <textarea
              {...register("message")}
              rows={5}
              placeholder="Tell me about your project requirements..."
              className="mt-2 w-full rounded-lg border border-base-border bg-base-black px-4 py-3 outline-none placeholder:text-foreground-faint focus:border-accent-cyan"
            />
            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full justify-center">
            {isSubmitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE"} <Send size={14} />
          </Button>

          {status === "success" && <p className="text-sm text-accent-green">Message sent — thank you!</p>}
          {status === "error" && <p className="text-sm text-red-400">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </Container>
  );
}
