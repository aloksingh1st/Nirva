import React, { useState } from "react";

interface CreateAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    baseUrl: string;
    redirectUrl: string;
  }) => void;
}

const CreateAppModal: React.FC<CreateAppModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 800)); // Simulate delay
    onCreate({ name, baseUrl, redirectUrl });

    setIsSubmitting(false);
    setName("");
    setBaseUrl("");
    setRedirectUrl("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card text-card-foreground rounded-2xl shadow-lg w-full max-w-md p-6 animate-fade-in-up border border-border">
        <h2 className="text-xl font-semibold mb-4">Create a New App</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* App Name */}
          <div>
            <label className="block text-sm font-medium mb-1">App Name</label>
            <input
              type="text"
              placeholder="My Awesome App"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-background border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              required
            />
          </div>

          {/* Base URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Base URL</label>
            <input
              type="url"
              placeholder="https://myapp.nirva.dev"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-background border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              required
            />
          </div>

          {/* Redirect URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Redirect URL
            </label>
            <input
              type="url"
              placeholder="https://myapp.nirva.dev/auth/callback"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-background border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-muted text-muted-foreground hover:bg-muted/80 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create App"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppModal;
