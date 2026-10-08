import { SingleDocumentAdminPage } from "../components/cms/CmsEditors";
import { COLLECTIONS } from "@nayeem/firebase";

export function AboutAdmin() {
  return <SingleDocumentAdminPage
    title="About"
    collection={COLLECTIONS.about}
    docId="main"
    fields={[
      { key: "eyebrow", label: "Eyebrow" },
      { key: "title", label: "Title" },
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "body", label: "Full About Details", type: "textarea", help: "Long-form story shown in the public About section." },
      { key: "highlights", label: "Highlights", type: "array", help: "One highlight per line." },
      { key: "codingProfiles.beecrowd.platform", label: "beecrowd Platform" },
      { key: "codingProfiles.beecrowd.handle", label: "beecrowd Profile ID" },
      { key: "codingProfiles.beecrowd.url", label: "beecrowd Profile URL", type: "url" },
      { key: "codingProfiles.beecrowd.solved", label: "beecrowd Solved", type: "number" },
      { key: "codingProfiles.codeforces.platform", label: "Codeforces Platform" },
      { key: "codingProfiles.codeforces.handle", label: "Codeforces Handle" },
      { key: "codingProfiles.codeforces.url", label: "Codeforces Profile URL", type: "url" },
      { key: "codingProfiles.codeforces.solved", label: "Codeforces Solved", type: "number" },
      { key: "codingProfiles.codechef.platform", label: "CodeChef Platform" },
      { key: "codingProfiles.codechef.handle", label: "CodeChef Handle" },
      { key: "codingProfiles.codechef.url", label: "CodeChef Profile URL", type: "url" },
      { key: "codingProfiles.codechef.solved", label: "CodeChef Solved", type: "number" },
    ]}
    defaults={{
      eyebrow: "ABOUT",
      title: "Building useful digital systems",
      intro: "",
      body: "",
      highlights: [],
      codingProfiles: {
        beecrowd: { platform: "beecrowd", handle: "779446", url: "https://judge.beecrowd.com/en/profile/779446", solved: 73 },
        codeforces: { platform: "Codeforces", handle: "codeforcemasud", url: "https://codeforces.com/profile/codeforcemasud", solved: 40 },
        codechef: { platform: "CodeChef", handle: "codechefmasud", url: "https://www.codechef.com/users/codechefmasud", solved: 207 },
      },
    }}
  />;
}
