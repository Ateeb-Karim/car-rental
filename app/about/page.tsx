import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="px-6 py-16 max-w-4xl mx-auto">
        <span className="text-accent text-sm font-medium tracking-wide uppercase">
          About Us
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
          Built for people who&apos;d rather drive than wait.
        </h1>
        <p className="text-textMuted mt-4 max-w-2xl leading-relaxed">
          Drift started as a small fleet of well-maintained cars and a simple
          idea: renting a car shouldn&apos;t feel like paperwork. Every vehicle
          in our lineup is inspected, insured, and ready to go — so you can book
          in minutes and pick up the keys without the usual hassle.
        </p>
      </div>

      <div className="relative w-full aspect-21/9 max-h-105 overflow-hidden">
        <Image
          src={"/images/background-image.png"}
          alt={"A row of vehicles in a dark showroom"}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent" />
      </div>

      <div className="px-6 py-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 -mt-4 sm:-mt-20 relative z-10">
          <Stat number="15+" label="Cars in the fleet" />
          <Stat number="4" label="Cities covered" />
          <Stat number="4.6★" label="Average rating" />
        </div>

        <div className="mt-16">
          <h2 className="font-display text-xl font-semibold mb-6 tracking-tight">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ValueCard
              title="Transparency"
              body="The price you see is the price you pay — no hidden fees at pickup."
            />
            <ValueCard
              title="Reliability"
              body="Every car is inspected before it's listed. No breakdown surprises."
            />
            <ValueCard
              title="Simplicity"
              body="Book in three steps. Pick up your car. That's the whole process."
            />
          </div>
        </div>

        <div className="mt-16 bg-surface border border-border rounded-card p-8 text-center">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Ready to hit the road?
          </h2>
          <p className="text-textMuted text-sm mt-2">
            Browse the fleet and find your next rental in minutes.
          </p>
          <Link
            href="/cars"
            className="inline-block mt-5 bg-accent text-bg font-semibold px-6 py-3 rounded-full hover:bg-accentHover hover:shadow-glow transition-all"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    </main>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-surface border border-border rounded-card p-6 text-center shadow-soft">
      <p className="font-display text-2xl font-bold text-accent">{number}</p>
      <p className="text-textMuted text-sm mt-1">{label}</p>
    </div>
  );
}

function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <h3 className="font-display font-semibold tracking-tight">{title}</h3>
      <p className="text-textMuted text-sm mt-2 leading-relaxed">{body}</p>
    </div>
  );
}
