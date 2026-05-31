import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 85, suffix: "+", label: "Happy customers"   },
  { value: 45, suffix: "+", label: "Verified providers" },
  { value: 6,  suffix: "",  label: "Cities live"        },
  { value: 92, suffix: "+", label: "Jobs completed"     },
];

function format(n: number) {
  if (n >= 1000) return `${Math.floor(n / 1000)}K`;
  return `${n}`;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1600;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {format(n)}{suffix}
    </span>
  );
}

export function TrustedStats() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[36px] bg-[#0d1f1f] p-10 shadow-xl md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#00B8A9]/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-[#00B8A9]/20 blur-3xl" />

        <div className="relative">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00B8A9]">Trust at scale</span>
          <h2 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">
            Trusted across India.
          </h2>
          <p className="mt-3 max-w-lg text-white/60">
            Real numbers. Real homes. Real professionals. We're building the most trusted home services network in the country.
          </p>
        </div>

        <div className="relative mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map(s => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-4xl font-extrabold text-[#00B8A9] md:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
