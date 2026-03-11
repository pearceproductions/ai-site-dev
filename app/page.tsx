"use client";

import Image from "next/image";
import localFont from "next/font/local";


const inclusiveSans = localFont({
  src: "../public/fonts/InclusiveSans-VariableFont_wght.ttf",
  weight: "100 900",
  variable: "--font-inclusive",
});

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Check, ArrowRight, Shield, Zap, Wrench, Gauge, Users, Clock, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Efficientia — website mock (single page)
 * Style: dark, premium, minimal, high-contrast, low-jargon.
 * Notes:
 * - Replace "Book a call" with your calendly link.
 * - Replace placeholders in Case Studies.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55 },
  },
};

const inViewViewport = { once: true, amount: 0.08 };

const caseStudies = [
  {
    title: "Ops workflow overhaul",
    industry: "Professional services",
    problem: "Quote handoffs and approvals were split across inboxes and spreadsheets.",
    built: "A connected workflow that routes enquiries and keeps the team synced.",
    outcomeLabel: "Impact",
    outcomes: ["12+ admin hours saved each week", "Live visibility across every handoff"],
    accent: "from-[#48c0d6]/35 via-[#48c0d6]/10 to-transparent",
  },
  {
    title: "Sales follow-up engine",
    industry: "B2B lead generation",
    problem: "Leads were going cold while reps stitched together reminders and outreach by hand.",
    built: "An AI-assisted follow-up flow that drafts next steps and triggers timely actions.",
    outcomeLabel: "Result",
    outcomes: ["Higher lead contact consistency", "Quicker turnaround from enquiry to call"],
    accent: "from-[#8ab4ff]/30 via-[#48c0d6]/10 to-transparent",
  },
  {
    title: "Internal knowledge copilot",
    industry: "Multi-site operations",
    problem: "Teams relied on tribal knowledge for SOPs, reporting steps, and recurring decisions.",
    built: "A secure internal assistant trained on process docs and reporting guidance.",
    outcomeLabel: "Outcome",
    outcomes: ["Answers surfaced in seconds", "More consistent process execution"],
    accent: "from-[#6ee7b7]/25 via-[#48c0d6]/10 to-transparent",
  },
];

const problemInsights = [
  {
    title: "Manual admin",
    insight: "Usually the first leak. Teams burn hours retyping the same data into email, CRM, finance, and delivery tools.",
    example: "A simple intake-to-delivery workflow can remove repeat entry, auto-create records, and surface the next action instantly.",
  },
  {
    title: "Disconnected software",
    insight: "When systems do not talk to each other, the team becomes the integration layer.",
    example: "Joining CRM, project management, and billing data removes status-chasing and reduces missed handoffs.",
  },
  {
    title: "Repetative tasks",
    insight: "Low-value repetition drains attention as much as it drains time.",
    example: "Recurring updates, follow-ups, summaries, and reminders are usually the fastest automation wins.",
  },
  {
    title: "Slow reporting",
    insight: "If reporting arrives late, decisions arrive late too.",
    example: "Live dashboards and automated summaries can turn weekly reporting lag into same-day visibility.",
  },
  {
    title: "Tribal knowledge",
    insight: "Critical know-how sitting in one person's head creates fragility across the whole operation.",
    example: "Internal assistants and structured SOPs make answers reusable instead of dependent on memory.",
  },
  {
    title: "No clear workflow",
    insight: "Automation on top of ambiguity just creates faster confusion.",
    example: "Mapping the path from enquiry to delivery usually exposes the bottlenecks, ownership gaps, and the real quick wins.",
  },
];

function getCarouselOffset(index: number, activeIndex: number, total: number) {
  const rawOffset = (index - activeIndex + total) % total;

  if (rawOffset === 0) return 0;
  if (rawOffset === 1) return 1;
  if (rawOffset === total - 1) return -1;

  return rawOffset > total / 2 ? rawOffset - total : rawOffset;
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10">
      <div className="relative rounded-2xl px-4 py-4 transition duration-300 hover:translate-y-1 bg/10">
        <p className="text-lg lg:text-base leading-relaxed text-[#faf9f9]/90">{children}</p>
      </div>
    </div>
  );
}

function Pill({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <Card className="pelative border-[#faf9f9]/10 bg-[#faf9f9]/1 backdrop-blur-[3px] px-4 py-4 shadow-xl transition duration-200 ease-in-out 
    hover:bg-[#161925]/10 backdrop-blur-[3px] hover:translate-y-0.5 hover:shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faf9f9]/10">{icon}</div>
          <CardTitle className="text-[#faf9f9]">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-[#faf9f9]/75 leading-relaxed">{text}</p>
      </CardContent>
    </Card>
  );
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#faf9f9]/10 bg-[#faf9f9]/5 p-6 transition duration-200 ease-in-out 
    hover:bg-[#161925]/90 hover:translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-[#faf9f9]/60">Step {n}</div>
          <div className="mt-1 text-xl font-semibold text-[#faf9f9]">{title}</div>
        </div>
        <Badge variant="secondary" className="bg-[#faf9f9]/10 text-[#faf9f9]/80 border-[#faf9f9]/10">
          {n}
        </Badge>
      </div>
      <p className="mt-3 text-[#faf9f9]/75 leading-relaxed">{text}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[#faf9f9]/10 bg-[#faf9f9]/1 p-5 backdrop-blur-[3px] px-4 py-4 shadow-xl transition duration-200 ease-in-out hover:bg-[#faf9f9]/[0.07] hover:translate-y-0.5 hover:shadow-lg">
      <div className="text-2xl font-semibold text-[#faf9f9]">{value}</div>
      <div className="mt-1 text-sm text-[#faf9f9]/65">{label}</div>
    </div>
  );
}

function Nav() {
  const links = [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#how" },
    { label: "Case studies", href: "#cases" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="sticky top-0 z-30 border-b border-[#faf9f9]/10 bg-[#161925]/50 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-1">
          <a href="#top" className="flex items-center gap-0">
            <Image
              src="/efficientia-logo.png"
              alt="Efficientia logo"
              width={56}
              height={56}
              className="h-8 w-8 p-3 object-contain"
              priority
            />

            <div className="leading-none">
              <div className="text-2xl text-[#faf9f9] font-semibold tracking-wide">efficientia</div>
              <div className="text-xs text-[#faf9f9]/60">The Power to Produce Results</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-[#faf9f9]/70 hover:text-[#faf9f9] transition">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact">
              <Button className="rounded-2xl bg-[#48c0d6] text-[#161925] 
transition duration-200 ease-in-out 
hover:bg-[#48c0d6]/90 hover:translate-y-0.5 hover:shadow-lg">Book a call</Button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}



function Hero() {
  const [pct, setPct] = useState(10);
  const [team, setTeam] = useState(15);
  const [salary, setSalary] = useState(45000);

  const estValue = useMemo(() => {
    // rough: payroll * pct
    const payroll = team * salary;
    const value = payroll * (pct / 100);
    return Math.round(value).toLocaleString("en-GB");
  }, [pct, team, salary]);

  return (
    <section id="top" className="pt-10 sm:pt-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#faf9f9]/10 bg-[#faf9f9]/5 px-3 py-1 text-xs text-[#faf9f9]/70">
              <Zap  className="h-4 w-4" />
              Practical AI and automation for growing teams
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight text-[#faf9f9]">
              AI systems that improve business efficiency.
            </h1>

            <p className="mt-4 text-lg text-[#faf9f9]/75 leading-relaxed">
            We design and implement practical AI systems that remove friction, connect your tools, and protect margin as you scale.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#contact">
                <Button className="w-full sm:w-auto rounded-2xl bg-[#48c0d6] text-[#161925] transition duration-200 ease-in-out 
hover:bg-[#48c0d6]/90 hover:translate-y-0.5 hover:shadow-lg">
                  Book a strategy call <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#how">
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto rounded-2xl bg-[#faf9f9]/10 text-[#faf9f9] transition duration-200 ease-in-out 
                  hover:bg-[#161925]/90 hover:translate-y-0.5 hover:shadow-lg"
                >
                  See how it works
                </Button>
              </a>
            </div>

            <div className="mt-7 hidden lg:grid lg:grid-cols-3 gap-3">
              <Stat value="Simple" label="Easy to use tools and systems" />
              <Stat value="Secure" label="Built inside your systems & stacks" />
              <Stat value="Powerful" label="Drive growth and productivity" />
            </div>
          </motion.div>

          <motion.div
  initial={{ opacity: 1, x: 50 }}
  animate={{
    opacity: 1,
    scale: [1], x: 0 // subtle but noticeable
  }}
  transition={{
    opacity: { duration: 1.50, delay: 0.20 },
    scale: { duration: 3.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
  }}
  whileHover={{ scale: 1.02 }}
  className="relative will-change-transform rounded-3xl border border-[#faf9f9]/10 bg-[#faf9f9]/5 p-6 backdrop-blur-[3px] shadow-xl transition-shadow duration-300 hover:shadow-2xl"
>



              <div className="inline-flex items-center gap-2 rounded-full border border-[#faf9f9]/10 bg-[#faf9f9]/5 px-3 py-1 text-xs text-[#faf9f9]/70">
               <Users  className="h-4 w-4" /> Small inefficiencies can become expensive.
            </div>
            
            <div className="flex items-start justify-between gap-4">
              <div>
              <div style={{ marginTop: '16px' }}></div>
                <div className="text-[#faf9f9] font-semibold gap-4">How much is your team&apos;s time worth?</div>
                <div className="mt-1 text-sm text-[#faf9f9]/65">Try our efficiency calculator</div>
              </div>
           
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-[#faf9f9]/60">Team size</label>
                    <span className="text-xs text-[#faf9f9]/70">{team}</span>
                  </div>
                  <input
                    value={team}
                    onChange={(e) => setTeam(Math.min(100, Math.max(1, Number(e.target.value || 0))))}
                    className="mt-2 h-2 w-full appearance-none rounded-full bg-[#faf9f9]/15 outline-none accent-[#48c0d6]"
                    type="range"
                    min={1}
                    max={100}
                  />
                  <div className="mt-2 flex justify-between text-[11px] text-[#faf9f9]/55">
                    <span>1</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-[#faf9f9]/60">Avg salary (£)</label>
                    <span className="text-xs text-[#faf9f9]/70">£{salary.toLocaleString("en-GB")}</span>
                  </div>
                  <input
                    value={salary}
                    onChange={(e) => setSalary(Math.min(100000, Math.max(30000, Number(e.target.value || 0))))}
                    className="mt-2 h-2 w-full appearance-none rounded-full bg-[#faf9f9]/15 outline-none accent-[#48c0d6]"
                    type="range"
                    min={30000}
                    max={100000}
                    step={1000}
                  />
                  <div className="mt-2 flex justify-between text-[11px] text-[#faf9f9]/55">
                    <span>£30k</span>
                    <span>£65k</span>
                    <span>£100k</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-[#faf9f9]/60">Efficiency gain (%)</label>
                    <span className="text-xs text-[#faf9f9]/70">{pct}%</span>
                  </div>
                  <input
                    value={pct}
                    onChange={(e) => setPct(Math.min(100, Math.max(0, Number(e.target.value || 0))))}
                    className="mt-2 h-2 w-full appearance-none rounded-full bg-[#faf9f9]/15 outline-none accent-[#48c0d6]"
                    type="range"
                    min={0}
                    max={100}
                  />
                  <div className="mt-2 flex justify-between text-[11px] text-[#faf9f9]/55">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#faf9f9]/10 bg-[#faf9f9]/5 p-5">
                <div className="text-sm text-[#faf9f9]/65">Estimated annual value</div>
                <div className="mt-1 text-3xl font-semibold text-[#faf9f9]">£{estValue}</div>
                
              </div>

            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 lg:hidden">
            <Stat value="Simple" label="Easy to use tools and systems" />
            <Stat value="Secure" label="Built inside your systems & stacks" />
            <Stat value="Powerful" label="Drive growth and productivity" />
          </div>
        </div>

        <Quote>
          If your team saved just <span className="text-[#faf9f9] font-semibold">10%</span> of their time, what would that be worth?
        </Quote>
      </Container>
    </section>
  );
}

function Problem() {
  const [activeInsight, setActiveInsight] = useState<string | null>(null);

  return (
    <section className="py-10">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={inViewViewport} variants={fadeUp}>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-[#faf9f9]">Most businesses don’t have an AI problem. They have a systems problem.</h2>
            <p className="mt-4 text-[#faf9f9]/75 leading-relaxed">
            Tools are everywhere.
Implementation is the hard part.
We redesign workflows, connect your existing software, and build AI into day-to-day operations.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {problemInsights.map((item) => {
              const isOpen = activeInsight === item.title;

              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActiveInsight(item.title)}
                  onMouseLeave={() => setActiveInsight((current) => (current === item.title ? null : current))}
                  onFocus={() => setActiveInsight(item.title)}
                  onBlur={() => setActiveInsight((current) => (current === item.title ? null : current))}
                  onClick={() =>
                    setActiveInsight((current) => (current === item.title ? null : item.title))
                  }
                  className={`group relative overflow-hidden rounded-2xl border bg-[#faf9f9]/[0.03] p-5 text-left shadow-xl backdrop-blur-[3px] transition-all duration-500 ease-out ${
                    isOpen
                      ? "border-[#48c0d6]/50 bg-[#161925]/55 shadow-[0_18px_60px_rgba(8,18,35,0.45)]"
                      : "border-[#faf9f9]/10 hover:translate-y-1 hover:border-[#48c0d6]/35"
                  }`}
                  aria-pressed={isOpen}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#48c0d6]/12 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#48c0d6]/20 bg-[#48c0d6]/10 shadow-[0_0_0_rgba(72,192,214,0)] transition-all duration-500 group-hover:shadow-[0_0_24px_rgba(72,192,214,0.5)]">
                      <Check className="h-5 w-5 text-[#48c0d6] drop-shadow-[0_0_14px_rgba(72,192,214,0.9)]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-lg font-medium text-[#faf9f9]/92">{item.title}</div>
                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                          y: isOpen ? 0 : 12,
                          marginTop: isOpen ? 14 : 0,
                        }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm leading-relaxed text-[#faf9f9]/72">{item.insight}</p>
                        <p className="mt-3 text-sm leading-relaxed text-[#48c0d6]/90">{item.example}</p>
                      </motion.div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact">
              <Button className="rounded-2xl bg-[#48c0d6] text-[#161925] transition duration-200 ease-in-out hover:bg-[#48c0d6]/90 hover:translate-y-0.5 hover:shadow-lg">
                Fix the biggest bottleneck <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#cases">
              <Button
                variant="secondary"
                className="rounded-2xl bg-[#faf9f9]/10 text-[#faf9f9] transition duration-200 ease-in-out hover:bg-[#161925]/90 hover:translate-y-0.5 hover:shadow-lg"
              >
                See example outcomes
              </Button>
            </a>
          </div>

          <Quote>
            &ldquo;AI won&apos;t replace your job. But someone using AI will...&rdquo;
          </Quote>
        </motion.div>
      </Container>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-10">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={inViewViewport} variants={fadeUp}>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-[#faf9f9]">What we build</h2>
              <p className="mt-4 text-[#faf9f9]/75 leading-relaxed">
                Practical systems that reduce repetition, improve speed, and make work more consistent.
              </p>
            </div>
            <a href="#contact">
              <Button className="rounded-2xl bg-[#48c0d6] text-[#161925] hover:bg-[#48c0d6]/90 transition duration-200 ease-in-out 
hover:bg-[#48c0d6]/90 hover:translate-y-0.5 hover:shadow-lg">Book a call</Button>
            </a>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <Pill
              icon={<Wrench className="h-5 w-5 text-[#faf9f9]" />}
              title="Automation and integrations"
              text="Connect your tools and remove manual steps between them."
            />
            <Pill
              icon={<Users className="h-5 w-5 text-[#faf9f9]" />}
              title="Internal AI assistants"
              text="Help your team find answers fast using your docs, processes, and data."
            />
            <Pill
              icon={<Gauge className="h-5 w-5 text-[#faf9f9]" />}
              title="Reporting and visibility"
              text="Automated reporting so you see what matters, without spreadsheet chaos."
            />
          </div>

          <Quote>
            &ldquo;Most businesses don&apos;t need more people. They need better systems.&rdquo;
          </Quote>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <Card className="border-[#faf9f9]/10 bg-[#faf9f9]/1 backdrop-blur-[3px] transition duration-200 ease-in-out 
     hover:translate-y-0.5 hover:shadow-lg backdrop-blur-[3px] px-4 py-4 shadow-xl transition duration-200 ease-in-out hover:bg-[#faf9f9]/[0.07] hover:translate-y-0.5 hover:shadow-lg">
      
              <CardHeader>
                <CardTitle className="text-[#faf9f9]">AI Efficiency Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-[#faf9f9]/75">
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Map workflows</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Identify quick wins</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Create a simple roadmap</li>
                </ul>
                <div className="mt-4 text-sm text-[#faf9f9]/60">From £1,000 (first few slots free)</div>
              </CardContent>
            </Card>

            <Card className="border-[#faf9f9]/10 bg-[#faf9f9]/1 backdrop-blur-[3px] px-4 py-4 shadow-xl transition duration-200 ease-in-out hover:bg-[#faf9f9]/[0.07] hover:translate-y-0.5 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#faf9f9]">Project integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-[#faf9f9]/75">
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Build inside your stack</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Automate key processes</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Train your team</li>
                </ul>
                <div className="mt-4 text-sm text-[#faf9f9]/60">Projects from £3,000</div>
              </CardContent>
            </Card>

            <Card className="border-[#faf9f9]/10 bg-[#faf9f9]/1 backdrop-blur-[3px] px-4 py-4 shadow-xl transition duration-200 ease-in-out hover:bg-[#faf9f9]/[0.07] hover:translate-y-0.5 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#faf9f9]">Optimisation retainer</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-[#faf9f9]/75">
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Improve performance</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Add new workflows</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Keep it running properly</li>
                </ul>
                <div className="mt-4 text-sm text-[#faf9f9]/60">From £500 per month</div>
              </CardContent>
            </Card>
          </div>

          <Quote>
            &ldquo;Automation doesn&apos;t remove people. It removes repetition.&rdquo;
          </Quote>
        </motion.div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="py-10">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={inViewViewport} variants={fadeUp}>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-[#faf9f9]">How it works</h2>
              <p className="mt-4 text-[#faf9f9]/75 leading-relaxed">
                A simple process that keeps things moving and avoids disruption.
              </p>
            </div>

            <a href="#contact">
              <Button className="rounded-2xl bg-[#48c0d6] text-[#161925] transition duration-200 ease-in-out hover:bg-[#48c0d6]/90 hover:translate-y-0.5 hover:shadow-lg">
                Start with an audit
              </Button>
            </a>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-3 backdrop-blur-[3px]">
            <Step n="1" title="Audit" text="We map what’s happening, find quick wins, and agree priorities." />
            <Step n="2" title="Build" text="We implement the systems inside your tools, test properly, and train your team." />
            <Step n="3" title="Improve" text="We monitor performance and keep improving the workflows over time." />
          </div>

          <Quote>
            &ldquo;Efficiency isn&apos;t about working harder. It&apos;s about removing friction.&rdquo;
          </Quote>
        </motion.div>
      </Container>
    </section>
  );
}

function Cases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const interactionLockRef = useRef<number | null>(null);

  const rotateCarousel = (direction: number) => {
    if (interactionLockRef.current) {
      return;
    }

    setActiveIndex((current) => (current + direction + caseStudies.length) % caseStudies.length);
    interactionLockRef.current = window.setTimeout(() => {
      interactionLockRef.current = null;
    }, 460);
  };

  const handleCarouselDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const impulse = Math.abs(info.offset.x) + Math.abs(info.velocity.x) * 0.1;

    if (impulse < 90) {
      return;
    }

    const direction = info.offset.x < 0 || info.velocity.x < -180 ? 1 : -1;
    rotateCarousel(direction);
  };

  const handleCarouselWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

    if (Math.abs(dominantDelta) < 30) {
      return;
    }

    event.preventDefault();
    rotateCarousel(dominantDelta > 0 ? 1 : -1);
  };

  useEffect(() => {
    if (isCarouselHovered) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % caseStudies.length);
    }, 11000);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, isCarouselHovered]);

  useEffect(() => {
    return () => {
      if (interactionLockRef.current) {
        window.clearTimeout(interactionLockRef.current);
      }
    };
  }, []);

  return (
    <section id="cases" className="py-10">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={inViewViewport} variants={fadeUp}>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-[#faf9f9]">Case studies</h2>
              <p className="mt-4 text-[#faf9f9]/75 leading-relaxed">
                A faster, more tactile snapshot of the kinds of systems we build and the outcomes they create.
              </p>
            </div>

            <a href="#contact">
              <Button className="rounded-2xl bg-[#48c0d6] text-[#161925] transition duration-200 ease-in-out hover:bg-[#48c0d6]/90 hover:translate-y-0.5 hover:shadow-lg">
                Build something like this
              </Button>
            </a>
          </div>

          <div className="mt-8">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              dragMomentum={false}
              onDragEnd={handleCarouselDragEnd}
              onWheel={handleCarouselWheel}
              onMouseEnter={() => setIsCarouselHovered(true)}
              onMouseLeave={() => setIsCarouselHovered(false)}
              onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key === "ArrowLeft") {
                  rotateCarousel(-1);
                }

                if (event.key === "ArrowRight") {
                  rotateCarousel(1);
                }
              }}
              tabIndex={0}
              className="relative mx-auto h-[520px] w-full max-w-[900px] cursor-grab select-none px-2 outline-none [perspective:2200px] sm:h-[530px] sm:px-6 lg:h-[520px]"
              style={{ touchAction: "pan-y" }}
            >
              {caseStudies.map((study, index) => {
                const offset = getCarouselOffset(index, activeIndex, caseStudies.length);
                const isActive = offset === 0;
                const isEdgeCard = Math.abs(offset) === 1;
                const cardDirection = offset < 0 ? -1 : 1;

                return (
                  <motion.article
                    key={study.title}
                    animate={{
                      x: offset === 0 ? "0%" : offset < 0 ? "-29%" : "29%",
                      y: isActive ? 0 : 12,
                      scale: isActive ? 1 : 0.9,
                      opacity: isActive ? 1 : isEdgeCard ? 0.72 : 0.14,
                      rotateY: offset === 0 ? 0 : offset < 0 ? 26 : -26,
                      rotateX: isActive ? 0 : 3,
                      z: isActive ? 100 : -120,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 165,
                      damping: 24,
                      mass: 0.82,
                    }}
                    className="absolute left-1/2 top-4 h-[calc(100%-2rem)] w-[94%] max-w-[690px] -translate-x-1/2 transform-gpu sm:top-5 sm:h-[calc(100%-2.5rem)] sm:w-[90%]"
                    style={{
                      transformStyle: "preserve-3d",
                      zIndex: isActive ? 30 : 20 - Math.abs(offset),
                      filter: isActive ? "blur(0px)" : isEdgeCard ? "blur(2.6px)" : "blur(10.6px)",
                      pointerEvents: isEdgeCard || isActive ? "auto" : "none",
                    }}
                    onClick={() => {
                      if (!isActive) {
                        rotateCarousel(cardDirection);
                      }
                    }}
                  >
                    <motion.div
                      animate={isActive ? { y: [0, -6, 0] } : { y: 0 }}
                      transition={
                        isActive
                          ? { duration: 3.1, repeat: Infinity, ease: [0.37, 0, 0.63, 1] }
                          : { duration: 0.35 }
                      }
                      className="relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-[#faf9f9]/10 bg-[#0f1421]/80 p-4 shadow-[0_26px_90px_rgba(5,10,20,0.38)] backdrop-blur-[10px] sm:p-5 lg:p-6"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${study.accent}`} />
                      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#faf9f9]/35 to-transparent" />

                      <div className="relative flex items-start justify-between gap-4">
                        <div>
                          <div className="inline-flex items-center rounded-full border border-[#faf9f9]/10 bg-[#faf9f9]/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#faf9f9]/55 backdrop-blur-md">
                            {study.industry}
                          </div>
                          <h3 className="mt-3 text-[1.85rem] font-semibold leading-[0.98] text-[#faf9f9] sm:text-[2.2rem]">{study.title}</h3>
                        </div>

                        <div className="rounded-full border border-[#faf9f9]/10 bg-[#faf9f9]/5 px-3 py-1 text-sm text-[#faf9f9]/65 backdrop-blur-md">
                          0{index + 1}
                        </div>
                      </div>

                      <div className="relative mt-4 grid gap-3 sm:mt-5 sm:grid-cols-[1.05fr_0.95fr]">
                        <div className="space-y-3">
                          <div className="rounded-2xl border border-[#faf9f9]/10 bg-[#faf9f9]/5 p-3 backdrop-blur-md">
                            <div className="text-xs uppercase tracking-[0.22em] text-[#faf9f9]/45">Problem</div>
                            <p className="mt-2 text-sm leading-relaxed text-[#faf9f9]/78">{study.problem}</p>
                          </div>

                          <div className="rounded-2xl border border-[#faf9f9]/10 bg-[#faf9f9]/5 p-3 backdrop-blur-md">
                            <div className="text-xs uppercase tracking-[0.22em] text-[#faf9f9]/45">What we built</div>
                            <p className="mt-2 text-sm leading-relaxed text-[#faf9f9]/78">{study.built}</p>
                          </div>
                        </div>

                        <div className="rounded-[1.75rem] border border-[#faf9f9]/10 bg-[#0b0f19]/55 p-4 backdrop-blur-lg">
                          <div className="text-xs uppercase tracking-[0.22em] text-[#faf9f9]/45">{study.outcomeLabel}</div>
                          <ul className="mt-3 space-y-2.5 text-sm text-[#faf9f9]/82">
                            {study.outcomes.map((outcome) => (
                              <li key={outcome} className="flex gap-3">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#48c0d6] shadow-[0_0_18px_rgba(72,192,214,0.9)]" />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </motion.article>
                );
              })}
            </motion.div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => rotateCarousel(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#faf9f9]/10 bg-[#faf9f9]/5 text-[#faf9f9]/75 backdrop-blur-md transition hover:bg-[#faf9f9]/10 hover:text-[#faf9f9]"
                aria-label="Previous case study"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {caseStudies.map((study, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={study.title}
                    type="button"
                    onClick={() => {
                      if (index !== activeIndex) {
                        setActiveIndex(index);
                      }
                    }}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      isActive ? "w-10 bg-[#48c0d6] shadow-[0_0_20px_rgba(72,192,214,0.7)]" : "w-2.5 bg-[#faf9f9]/25"
                    }`}
                    aria-label={`Show ${study.title}`}
                  />
                );
              })}

              <button
                type="button"
                onClick={() => rotateCarousel(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#faf9f9]/10 bg-[#faf9f9]/5 text-[#faf9f9]/75 backdrop-blur-md transition hover:bg-[#faf9f9]/10 hover:text-[#faf9f9]"
                aria-label="Next case study"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href="#services">
                <Button
                  variant="secondary"
                  className="rounded-2xl bg-[#faf9f9]/10 text-[#faf9f9] transition duration-200 ease-in-out hover:bg-[#161925]/90 hover:translate-y-0.5 hover:shadow-lg"
                >
                  Explore services
                </Button>
              </a>
              <a href="#contact">
                <Button className="rounded-2xl bg-[#48c0d6] text-[#161925] transition duration-200 ease-in-out hover:bg-[#48c0d6]/90 hover:translate-y-0.5 hover:shadow-lg">
                  Talk through your use case
                </Button>
              </a>
            </div>
          </div>

          <Quote>
            &ldquo;Small improvements compound. So does clarity.&rdquo;
          </Quote>
        </motion.div>
      </Container>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What tools do you work with?",
      a: "Most common stacks: Google Workspace, Microsoft 365, HubSpot, Pipedrive, Notion, ClickUp, Monday, Slack, Teams, Zapier, Make, n8n, and more. We build around what you already use.",
    },
    {
      q: "Do we need to be technical?",
      a: "No. We set it up, document it, and train your team so it’s simple to use day to day.",
    },
    {
      q: "Will this replace staff?",
      a: "The goal is to remove repetition, not people. You get time back so the team can focus on higher value work.",
    },
    {
      q: "How long does it take?",
      a: "Audits can be 3 to 7 days. Project builds are typically 2 to 6 weeks depending on scope.",
    },
    {
      q: "What if our processes are messy?",
      a: "That’s normal. We simplify first, then automate. Bad processes automated just create faster chaos.",
    },
    {
      q: "How do you handle data and security?",
      a: "We work with access controls, minimal permissions, and clear data boundaries. We’ll agree what data is used and where it lives before anything is built.",
    },
  ];

  return (
    <section id="faq" className="py-10">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-[#faf9f9]">FAQ</h2>
          <p className="mt-4 text-[#faf9f9]/75 leading-relaxed">
            Short answers. No fluff.
          </p>
        </div>

        <div className="mt-7 space-y-4">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={f.q}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="cursor-pointer rounded-2xl border border-[#faf9f9]/10 bg-[#faf9f9]/5 p-6 backdrop-blur-[3px] transition duration-200 ease-in-out hover:bg-[#161925]/10 hover:shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="text-[#faf9f9] font-semibold">
                    {f.q}
                  </div>
                  <div className="text-[#faf9f9]/60 text-sm">
                    {isOpen ? "−" : "+"}
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[#faf9f9]/75 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact">
            <Button className="rounded-2xl bg-[#48c0d6] text-[#161925] transition duration-200 ease-in-out hover:bg-[#48c0d6]/90 hover:translate-y-0.5 hover:shadow-lg">
              Ask about your stack
            </Button>
          </a>
          <a href="#how">
            <Button
              variant="secondary"
              className="rounded-2xl bg-[#faf9f9]/10 text-[#faf9f9] transition duration-200 ease-in-out hover:bg-[#161925]/90 hover:translate-y-0.5 hover:shadow-lg"
            >
              Review the process
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-12">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={inViewViewport} variants={fadeUp}>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#faf9f9]/10 bg-[#faf9f9]/5 p-7 backdrop-blur-[3px]">
              <h2 className="text-3xl font-semibold text-[#faf9f9]">Book a call</h2>
              <p className="mt-3 text-[#faf9f9]/75 leading-relaxed">
                Tell us what you want to improve. We’ll come back with a clear next step.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input className="rounded-2xl bg-[#161925] border-[#faf9f9]/10 text-[#faf9f9]" placeholder="Name" />
                  <Input className="rounded-2xl bg-[#161925] border-[#faf9f9]/10 text-[#faf9f9]" placeholder="Company" />
                </div>
                <Input className="rounded-2xl bg-[#161925] border-[#faf9f9]/10 text-[#faf9f9]" placeholder="Email" />
                <Input className="rounded-2xl bg-[#161925] border-[#faf9f9]/10 text-[#faf9f9]" placeholder="Team size" />
                <Input
                  className="rounded-2xl bg-[#161925] border-[#faf9f9]/10 text-[#faf9f9]"
                  placeholder="Tools you use (CRM, email, project tools)"
                />
                <Textarea
                  className="rounded-2xl bg-[#161925] border-[#faf9f9]/10 text-[#faf9f9]"
                  placeholder="What do you want to improve?"
                  rows={4}
                />
                <Button className="mt-2 rounded-2xl bg-[#48c0d6] text-[#161925] hover:bg-[#48c0d6]/90 transition duration-200 ease-in-out 
hover:bg-[#48c0d6]/90 hover:translate-y-0.5 hover:shadow-lg">
                  Submit enquiry <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-[#faf9f9]/10 bg-[#faf9f9]/5 p-7 backdrop-blur-[3px]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faf9f9]/10">
                  <Shield className="h-5 w-5 text-[#faf9f9]" />
                </div>
                <div>
                  <div className="text-[#faf9f9] font-semibold">How we keep this safe</div>
                  <div className="text-sm text-[#faf9f9]/60">Practical guardrails, agreed up front</div>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-[#faf9f9]/75">
                <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Minimal permissions and access control</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Clear data boundaries, agreed before build</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Documentation and handover included</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-1" /> Built inside tools you already trust</li>
              </ul>

              <Separator className="my-6 bg-[#faf9f9]/10" />

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faf9f9]/10">
                <Clock className="h-5 w-5 text-[#faf9f9]" />
                </div>
                <div>
                  <div className="text-[#faf9f9] font-semibold">Limited audit slots</div>
                  <div className="text-sm text-[#faf9f9]/60">Secure your advantage today</div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-[#faf9f9]/10 bg-[#faf9f9]/5 p-5 text-[#faf9f9]/75 leading-relaxed">
                If you’re on the fence, start small. We’ll identify a few quick wins and outline a plan you can actually
                implement.
              </div>

              <Quote>
                &ldquo;Operational clarity is a competitive advantage.&rdquo;
              </Quote>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#faf9f9]/10 pt-8">
            <div className="text-[#faf9f9]/70 text-sm">© {new Date().getFullYear()} efficientia</div>
            <div className="text-[#faf9f9]/55 text-sm">Built for practical results. Not AI theatre.</div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}


export default function EfficientiaSiteMock() {
  return (
    <div className={`relative min-h-screen text-[#faf9f9] ${inclusiveSans.className}`}>
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Base */}
        <div className="absolute inset-0 bg-[#0b0f19]" />

        {/* logo watermark */}
      

        <div className="absolute inset-0 bg-[url('/efficientia-logo.png')] bg-center bg-no-repeat bg-[length:70%] blur-sm opacity-[0.02]"/>

        {/* Futuristic gradient blobs */}

        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(72,192,214,0.25),transparent_55%),radial-gradient(900px_circle_at_85%_30%,rgba(99,102,241,0.16),transparent_55%),radial-gradient(900px_circle_at_50%_90%,rgba(16,185,129,0.10),transparent_60%)]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(250,249,249,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(250,249,249,0.10)_1px,transparent_1px)] [background-size:48px_48px]" />

        {/* Vignette */}
        <div className="absolute inset-0 opacity-[0.5] bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      <Nav />

      <main>
        <Hero />
        <Problem />
        <Services />
        <HowItWorks />
        <Cases />
        <FAQ />
        <Contact />
      </main>
    </div>
  );
}
