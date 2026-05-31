import { motion } from "motion/react";
import { Search, UserCheck, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  { n: "01", icon: Search,       title: "Choose service", text: "Pick from 30+ professional home services with fixed, transparent pricing." },
  { n: "02", icon: UserCheck,    title: "Select provider", text: "Browse verified pros, real reviews, ratings, and live availability." },
  { n: "03", icon: CalendarCheck,title: "Book & relax",   text: "Confirm a slot, pay securely, and we'll handle the rest — guaranteed." },
];

export function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#00B8A9]">How it works</span>
          <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold text-[#0d1f1f] md:text-5xl">
            Book in three simple steps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            No calls, no guesswork, no hidden fees. Just fast, reliable service at your door.
          </p>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* Connector */}
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-16 hidden h-px bg-gradient-to-r from-transparent via-[#00B8A9]/60 to-transparent md:block" />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="group relative rounded-3xl border bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute -top-4 right-6 rounded-full bg-[#0d1f1f] px-3 py-1 text-[11px] font-bold tracking-widest text-[#00B8A9]">
                  STEP {s.n}
                </div>
                <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-teal-50 text-[#0d1f1f] shadow-md">
                  <Icon className="h-7 w-7 text-[#00B8A9]" strokeWidth={2.2} />
                </div>
                <h3 className="mt-6 text-center text-2xl font-bold text-[#0d1f1f]">{s.title}</h3>
                <p className="mt-3 text-center text-sm leading-relaxed text-gray-500">{s.text}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => navigate("/services")}
            className="bg-[#00B8A9] hover:bg-[#009e96] text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-colors"
          >
            Browse Services →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
