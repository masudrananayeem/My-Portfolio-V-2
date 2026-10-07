import { useState } from "react";
import { ImagePlus, Loader2, UploadCloud } from "lucide-react";

export interface CloudinaryUploadResult { url: string; publicId: string; }

export function CloudinaryUpload({
  value,
  onChange,
  label = "Upload image",
  folder = "portfolio",
  accept = "image/png,image/jpeg,image/jpg",
}: {
  value?: string;
  onChange: (result: CloudinaryUploadResult) => void;
  label?: string;
  folder?: string;
  accept?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) return setError("Please select an image file.");
    if (!/image\/(png|jpeg|jpg)/i.test(file.type)) return setError("Only PNG, JPG and JPEG images are supported.");
    if (file.size > 8 * 1024 * 1024) return setError("Image must be 8 MB or smaller.");

    const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;
    if (!cloud || !preset) {
      setError("Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to apps/admin/.env.");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("upload_preset", preset);
      body.append("folder", folder);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: "POST", body });
      const data = await response.json() as { secure_url?: string; public_id?: string; error?: { message?: string } };
      if (!response.ok || !data.secure_url || !data.public_id) throw new Error(data.error?.message ?? "Cloudinary upload failed.");
      onChange({ url: data.secure_url, publicId: data.public_id });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2 rounded-xl border border-base-border bg-base-near/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-foreground-muted">{label.toUpperCase()}</p>
          <p className="mt-1 text-xs text-foreground-faint">PNG / JPG / JPEG · max 8 MB</p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-base-border px-3 py-2 text-xs font-semibold hover:border-accent-cyan">
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
          {uploading ? "UPLOADING…" : "CHOOSE FILE"}
          <input className="hidden" type="file" accept={accept} disabled={uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) void upload(file); e.currentTarget.value = ""; }} />
        </label>
      </div>
      {value && <img src={value} alt="Uploaded preview" className="mt-3 max-h-48 w-full rounded-lg border border-base-border object-cover" />}
      {!value && <div className="flex items-center gap-2 text-xs text-foreground-faint"><ImagePlus size={14} /> No image selected</div>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
