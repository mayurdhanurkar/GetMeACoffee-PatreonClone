import Link from "next/link";

export const metadata = {
  title: "About | Get Me a Coffee",
  description:
    "Learn how Get Me a Coffee helps creators receive support from their community.",
};

const benefits = [
  {
    number: "01",
    title: "Make your page yours",
    description:
      "Create a personal page where supporters can see who you are and what you are working on.",
  },
  {
    number: "02",
    title: "Let people show up",
    description:
      "Your community can send a contribution and a message to let you know they appreciate your work.",
  },
  {
    number: "03",
    title: "Keep creating",
    description:
      "Use the support you receive to make more of the things your community enjoys.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden text-white">
      <section className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.17),transparent_42%),radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.14),transparent_38%)]"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-sm font-medium text-amber-200">
              <span aria-hidden="true">☕</span>
              A little support goes a long way
            </p>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Good work deserves a{" "}
              <span className="bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent">
                little support.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Get Me a Coffee gives creators a simple way to share their work
              and receive support from the people who enjoy it.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-xl bg-amber-300 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Get started
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Back to home
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-amber-300/20 via-purple-500/10 to-blue-500/20 blur-2xl"
            />
            <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-slate-400">A creator page</p>
                  <p className="mt-1 font-semibold">A place to say thanks</p>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/15 text-2xl">
                  ☕
                </span>
              </div>
              <div className="py-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-orange-500 text-3xl shadow-lg shadow-orange-950/30">
                  ✦
                </div>
                <p className="mt-5 text-xl font-semibold">Your creativity matters</p>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-400">
                  Every kind message and contribution can help keep an idea
                  moving forward.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    ✓
                  </span>
                  <div>
                    <p className="text-sm font-medium">Made for creators</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Share your page with your community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/35">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Why we built this
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Make it easier to support the work you love.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Great things are often made one small step at a time. We want to
              make those steps easier by giving creators a straightforward
              place to connect with supporters and accept contributions.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.number}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-amber-200/30 hover:bg-white/[0.06]"
              >
                <p className="text-sm font-semibold text-amber-300">
                  {benefit.number}
                </p>
                <h3 className="mt-5 text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col justify-between gap-8 rounded-3xl border border-amber-200/15 bg-gradient-to-br from-amber-300/10 via-purple-500/10 to-blue-500/10 p-8 sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Your next step
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Ready to share what you create?
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Set up your page and invite your community to be part of the
              journey.
            </p>
          </div>
          <Link
            href="/login"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Create your page
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
