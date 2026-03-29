import { ContactForm } from "@/components/contact-form";
import { SiteHeader } from "@/components/site-header";
import { getCompanyProfile } from "@/lib/content/companyProfile";

export default async function Home() {
  const profile = await getCompanyProfile();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-24 px-6 pb-16 pt-10 md:px-10 md:pt-14">
        <section className="grid gap-10 rounded-3xl border border-slate-200 bg-white/85 p-8 shadow-[0_15px_40px_-24px_rgba(56,52,106,0.55)] backdrop-blur md:grid-cols-[1.2fr_1fr] md:p-12">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-[#38346a]/20 bg-[#38346a]/8 px-3 py-1 text-sm font-semibold tracking-wide text-[#38346a]">
              Strategic Advisory
            </p>
            <h1 className="text-4xl leading-tight text-[#040405] md:text-5xl">
              {profile.hero.headline}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-700">{profile.hero.tagline}</p>
            <a
              href="#contact"
              className="inline-flex rounded-full bg-[#38346a] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#2f2b58]"
            >
              Contact Us
            </a>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#38346a] via-[#3f4c9d] to-[#0974c2] p-8 text-white shadow-xl">
            <h2 className="text-2xl">Why Work With Ruah Whyte</h2>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed md:text-base">
              {profile.hero.highlights.map((highlight) => (
                <li key={highlight} className="rounded-xl border border-white/20 bg-white/5 px-4 py-3">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl text-[#040405]">About</h2>
            {profile.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
          <aside className="rounded-2xl border border-[#0974c2]/20 bg-white p-6 shadow-[0_10px_26px_-20px_rgba(9,116,194,0.8)]">
            <h3 className="text-xl text-[#38346a]">Our Approach</h3>
            <p className="mt-4 leading-relaxed text-slate-700">{profile.about.approach}</p>
          </aside>
        </section>

        <section id="services" className="space-y-8">
          <h2 className="text-3xl text-[#040405]">Services</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {profile.services.map((service) => (
              <article
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_-20px_rgba(4,4,5,0.5)]"
              >
                <h3 className="text-xl text-[#38346a]">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-700">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-[#38346a]/20 bg-white p-6 shadow-[0_8px_24px_-20px_rgba(56,52,106,0.6)]">
            <h2 className="text-2xl text-[#38346a]">Our Mission</h2>
            <p className="mt-3 leading-relaxed text-slate-700">{profile.mission}</p>
          </article>
          <article className="rounded-2xl border border-[#0974c2]/20 bg-white p-6 shadow-[0_8px_24px_-20px_rgba(9,116,194,0.65)]">
            <h2 className="text-2xl text-[#0974c2]">Our Vision</h2>
            <p className="mt-3 leading-relaxed text-slate-700">{profile.vision}</p>
          </article>
        </section>

        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-3xl text-[#040405]">Industries We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {profile.industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-[#38346a]/20 bg-[#38346a]/8 px-4 py-2 text-sm font-semibold text-[#38346a]"
              >
                {industry}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-6 rounded-3xl bg-[#040405] px-6 py-10 text-white md:px-10">
          <h2 className="text-3xl">Start a Conversation</h2>
          <p className="max-w-2xl text-slate-200">
            Tell us what you are building, where you need support, and how we can help your team move forward.
          </p>
          <ContactForm />
        </section>
      </main>

      <footer className="border-t border-slate-200/80 px-6 py-8 text-center text-sm text-slate-600 md:px-10">
        © {new Date().getFullYear()} Ruah Whyte Consulting. All rights reserved.
      </footer>
    </div>
  );
}
