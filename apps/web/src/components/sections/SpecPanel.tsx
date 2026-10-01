import { Copy } from "lucide-react";
import { useState } from "react";

const LINES = [
  { key: "name", value: '"Masud Rana Nayeem"' },
  { key: "core", value: '["React", "Node.js", "TypeScript"]' },
  { key: "stack", value: '["MERN", "Firebase", "Tailwind"]' },
  { key: "focus", value: '"Full-Stack + AI/ML"' },
  { key: "status", value: '"Open to Opportunities"' },
];

/** Terminal/code-styled info panel — reinforces the robotic/technical visual language from the spec. */
export function SpecPanel() {
  const [copied, setCopied] = useState(false);

  const code = [
    "const engineer = {",
    ...LINES.map((l) => `  ${l.key}: ${l.value},`),
    "};",
    ">_ ready",
  ].join("\n");

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-xl border border-base-border bg-base-panel/70 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-base-border px-4 py-2.5">
        <span className="font-mono text-[11px] tracking-widest text-foreground-muted">
          FILE: engineer.config.ts
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 font-mono text-[10px] text-foreground-faint hover:text-accent-cyan"
        >
          <Copy size={11} /> {copied ? "COPIED" : "COPY"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed">
        <code>
          <span className="text-accent-purple">const</span>{" "}
          <span className="text-foreground">engineer</span> = {"{"}
          {"\n"}
          {LINES.map((l) => (
            <span key={l.key}>
              {"  "}
              <span className="text-accent-cyan">{l.key}</span>
              <span className="text-foreground-faint">: </span>
              <span className="text-accent-green">{l.value}</span>
              <span className="text-foreground-faint">,</span>
              {"\n"}
            </span>
          ))}
          {"}"};{"\n"}
          <span className="text-accent-cyan">{">_ "}</span>
          <span className="animate-pulse-glow text-foreground-muted">ready</span>
        </code>
      </pre>
    </div>
  );
}
