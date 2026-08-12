// app/contact/page.tsx
"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

const OFFICE_IMAGE =
  "https://images.unsplash.com/photo-1763207503516-36dc6337e956?auto=format&fit=crop&w=1200&q=80";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const emptyForm: ContactForm = { name: "", email: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (form.message.trim().length < 10)
      newErrors.message = "Message should be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    // No backend yet — this is where you'd POST to an API/email service.
    console.log("Contact form submitted:", form);
    setSubmitted(true);
    setForm(emptyForm);
  }

  return (
    <main className="min-h-screen bg-bg text-text px-6 py-16 max-w-4xl mx-auto">
      <span className="text-accent text-sm font-medium tracking-wide uppercase">
        Contact
      </span>
      <h1 className="font-display text-3xl sm:text-4xl font-bold mt-3">
        Get in touch
      </h1>
      <p className="text-textMuted mt-3 max-w-xl">
        Questions about a booking, a car, or anything else — send us a message
        and we'll get back to you.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 mt-10">
        {/* Contact info */}
        <div className="flex flex-col gap-5">
          <InfoItem label="Email" value="support@drift-rentals.com" />
          <InfoItem label="Phone" value="+92 300 1234567" />
          <InfoItem label="Office" value="Islamabad, Pakistan" />
          <InfoItem label="Hours" value="Mon–Sat, 9am–7pm" />
          <div className="relative aspect-4/3 rounded-card overflow-hidden border border-border mt-2">
            <Image
              src={OFFICE_IMAGE}
              alt="Drift Rentals office building"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-surface border border-border rounded-card p-6">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto text-2xl">
                ✓
              </div>
              <p className="font-display font-semibold mt-4">Message sent</p>
              <p className="text-textMuted text-sm mt-1">
                We'll get back to you within one business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-link text-sm hover:underline mt-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field label="Name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full bg-surfaceAlt text-text rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-link"
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full bg-surfaceAlt text-text rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-link"
                />
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className="w-full bg-surfaceAlt text-text rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-link resize-none"
                />
              </Field>

              <button
                type="submit"
                className="bg-accent text-bg font-medium px-6 py-2.5 rounded hover:bg-accentHover transition-colors mt-2"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-textMuted text-xs">{label}</p>
      <p className="font-medium mt-0.5">{value}</p>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-textMuted text-sm font-medium mb-1.5 block">
        {label}
      </label>
      {children}
      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  );
}
