import { SingleDocumentAdminPage } from "../components/cms/CmsEditors";
import { COLLECTIONS } from "@nayeem/firebase";

export function SettingsAdmin() {
  return (
    <SingleDocumentAdminPage
      title="Site Settings"
      collection={COLLECTIONS.settings}
      docId="main"
      fields={[
        { key: "socialLinks.github", label: "GitHub URL", type: "url" },
        { key: "socialLinks.linkedin", label: "LinkedIn URL", type: "url" },
        { key: "socialLinks.facebook", label: "Facebook URL", type: "url" },
        { key: "socialLinks.email", label: "Email", type: "text" },
        { key: "contact.phone", label: "Phone" },
        { key: "contact.whatsapp", label: "WhatsApp URL", type: "url" },
        { key: "contact.location", label: "Location" },
        { key: "contact.intro", label: "Contact Intro", type: "textarea" },
        { key: "seo.title", label: "SEO Title", type: "text" },
        { key: "seo.description", label: "SEO Description", type: "textarea" },
        { key: "seo.ogImageUrl", label: "OG Image URL", type: "url" },
      ]}
      defaults={{
        socialLinks: {
          github: "https://github.com/masudrananayeem",
          linkedin: "",
          facebook: "",
          email: "",
        },
        contact: {
          phone: "",
          whatsapp: "",
          location: "Dhaka, Bangladesh",
          intro: "Open for full-time engineering roles, freelance projects, and collaboration.",
        },
        seo: {
          title: "Masud Rana Nayeem — Full Stack Developer",
          description: "Full Stack Developer, AI/ML enthusiast and researcher.",
          ogImageUrl: "",
        },
      }}
    />
  );
}
