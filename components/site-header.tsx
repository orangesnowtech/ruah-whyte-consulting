import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/ruah-whyte-logo.png"
            alt="Ruah Whyte Consulting logo"
            width={42}
            height={42}
            priority
          />
          <div>
            <p className="font-serif text-lg leading-none text-[#38346a]">Ruah Whyte</p>
            <p className="text-xs tracking-[0.18em] text-slate-600">CONSULTING</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
          <a href="#about" className="transition hover:text-[#38346a]">
            About
          </a>
          <a href="#services" className="transition hover:text-[#38346a]">
            Services
          </a>
          <a
            href="#contact"
            className="rounded-full bg-[#0974c2] px-4 py-2 text-white transition hover:bg-[#0864a7]"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
