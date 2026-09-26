import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Container, SectionLabel, Button } from "@nayeem/ui";
import { createDocument, COLLECTIONS } from "@nayeem/firebase";

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
      <SectionLabel index="07" label="Contact" className="mb-6" />
      <h1 className="font-display text-4xl font-bold">Get In Touch</h1>
      <p className="mt-3 max-w-lg text-foreground-muted">
        Have a project in mind or just want to say hello? Send a message below.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 max-w-xl space-y-5">
        <div>
          <label className="font-mono text-xs tracking-widest text-foreground-muted">NAME</label>
          <input
            {...register("name")}
            className="mt-2 w-full rounded-lg border border-base-border bg-base-panel/60 px-4 py-3 outline-none focus:border-accent-cyan"
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div>
          <label className="font-mono text-xs tracking-widest text-foreground-muted">EMAIL</label>
          <input
            {...register("email")}
            className="mt-2 w-full rounded-lg border border-base-border bg-base-panel/60 px-4 py-3 outline-none focus:border-accent-cyan"
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label className="font-mono text-xs tracking-widest text-foreground-muted">SUBJECT</label>
          <input
            {...register("subject")}
            className="mt-2 w-full rounded-lg border border-base-border bg-base-panel/60 px-4 py-3 outline-none focus:border-accent-cyan"
          />
          {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
        </div>

        <div>
          <label className="font-mono text-xs tracking-widest text-foreground-muted">MESSAGE</label>
          <textarea
            {...register("message")}
            rows={5}
            className="mt-2 w-full rounded-lg border border-base-border bg-base-panel/60 px-4 py-3 outline-none focus:border-accent-cyan"
          />
          {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
        </Button>

        {status === "success" && <p className="text-sm text-accent-green">Message sent — thank you!</p>}
        {status === "error" && <p className="text-sm text-red-400">Something went wrong. Please try again.</p>}
      </form>
    </Container>
  );
}
