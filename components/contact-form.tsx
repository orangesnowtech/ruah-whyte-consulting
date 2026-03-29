"use client";

import { FormEvent, useState } from "react";

type ContactState = {
  name: string;
  email: string;
  message: string;
};

const initialState: ContactState = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<ContactState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Unable to submit the form.");
      }

      setFormData(initialState);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:max-w-2xl">
      <label className="grid gap-2 text-sm font-semibold">
        Name
        <input
          required
          value={formData.name}
          onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300 focus:border-[#0974c2] focus:outline-none"
          placeholder="Your full name"
          name="name"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Email
        <input
          required
          type="email"
          value={formData.email}
          onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300 focus:border-[#0974c2] focus:outline-none"
          placeholder="you@company.com"
          name="email"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Message
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-300 focus:border-[#0974c2] focus:outline-none"
          placeholder="Share a short summary of your goals and timeline."
          name="message"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-fit rounded-full bg-[#0974c2] px-6 py-3 font-semibold text-white transition hover:bg-[#0864a7] disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>

      {status === "success" ? (
        <p className="text-sm font-medium text-emerald-300">Thanks. Your message has been sent.</p>
      ) : null}

      {status === "error" ? <p className="text-sm font-medium text-red-300">{errorMessage}</p> : null}
    </form>
  );
}
