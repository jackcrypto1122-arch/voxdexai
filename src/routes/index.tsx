import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Cpu,
  Lock,
  Mic,
  Minus,
  Network,
  Plus,
  Radio,
  Settings2,
  Shield,
  Wallet,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Reveal, WordReveal, TiltCard, CountUp, Magnetic } from "@/components/motion-primitives";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Vozdex AI — The World's First Voice-Over Trading Protocol" },
      { name: "description", content: "Trade crypto with your voice on Robinhood Chain. Voice Guardrails and Agentic Trading coming soon — one AI-native protocol for conversational finance." },
    ],
  }),
});

/* ---------- Shared ---------- */

function Logo() {
  return (
    <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="h-6 w-6 rounded-full lime-panel grid place-items-center">
        <Mic className="h-3.5 w-3.5" strokeWidth={2.5} />
      </div>
      <span className="font-serif text-xl tracking-[0.15em]">VOZDEX AI</span>
    </motion.div>
  );
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-lime/40 bg-lime/10 text-lime text-[10px] font-mono uppercase tracking-widest">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-75 animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
      </span>
      Live
    </span>
  );
}

function SoonBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-yellow-400/40 bg-yellow-400/10 text-yellow-300 text-[10px] font-mono uppercase tracking-widest">
      <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 animate-pulse" />
      Coming Soon
    </span>
  );
}

/* ---------- Nav ---------- */

function Nav() {
  const links = [
    { l: "Voice Trading", h: "#voice-trading" },
    { l: "Guardrails", h: "#guardrails" },
    { l: "Agentic", h: "#agentic" },
    { l: "Roadmap", h: "#roadmap" },
  ];
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 120);
    setScrolled(y > 20);
  });
  return (
    <motion.header
      initial={{ y: -80, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: hidden ? -80 : 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 border-b transition-colors ${scrolled ? "backdrop-blur-xl bg-background/70 border-border" : "backdrop-blur-md bg-background/40 border-transparent"}`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l, i) => (
            <motion.a
              key={l.l}
              href={l.h}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
              className="relative hover:text-foreground transition-colors group"
            >
              {l.l}
              <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-lime transition-transform duration-300 group-hover:scale-x-100" />
            </motion.a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#roadmap" className="btn-ghost hidden sm:inline-flex">Roadmap</a>
          <Magnetic><a href="#" className="btn-lime group">Launch Voice Trading <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></a></Magnetic>
        </div>
      </div>
    </motion.header>
  );
}

/* ---------- Hero ---------- */

function VoiceWave() {
  const bars = 22;
  return (
    <div className="flex items-end gap-[3px] h-8">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="block w-[3px] rounded-full bg-lime/80"
          animate={{ scaleY: [0.25, 1, 0.35, 0.8, 0.3] }}
          transition={{ duration: 1.4 + (i % 5) * 0.2, repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.08 }}
          style={{ height: "100%", transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}

function TradingTerminalPreview() {
  const nav = [
    { label: "Swap", icon: ArrowLeftRight, active: true },
    { label: "Portfolio", icon: Wallet },
    { label: "Markets", icon: BarChart3 },
    { label: "Orders", icon: ArrowUpRight },
    { label: "History", icon: Clock3 },
    { label: "Settings", icon: Settings2 },
    { label: "Voice Guardrails", icon: Shield },
    { label: "Agentic Trading", icon: Bot },
  ];

  const stats = [
    { label: "Portfolio", value: "$5.78", detail: "1 live holding" },
    { label: "ETH Spot", value: "$1,798", detail: "-0.07%" },
    { label: "Top Mover", value: "ETH", detail: "-0.07%" },
    { label: "Tracked Pairs", value: "4", detail: "Uniswap-style router" },
  ];

  const activity = [
    { pair: "USDC -> SOL", type: "swap", time: "8:14 PM" },
    { pair: "Send Transaction", type: "send", time: "May 11, 6:20 AM" },
    { pair: "Send Transaction", type: "send", time: "May 11, 6:05 AM" },
  ];

  return (
    <Reveal delay={0.2} y={40} className="relative mt-16 mx-auto max-w-6xl">
      <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,oklch(0.92_0.22_125/_0.14),transparent_60%)] blur-3xl" />
      <motion.div
        initial={{ opacity: 0, rotateX: 8, y: 40 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ delay: 0.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[28px] border border-lime/15 bg-[#040608] shadow-[0_30px_120px_rgba(186,255,61,0.12)] animate-float-slow"
        style={{ transformPerspective: 1200 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(190,255,50,0.12),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%)]" />
        <div className="grid min-h-[620px] lg:grid-cols-[112px_minmax(0,1fr)_220px]">
          <aside className="hidden border-r border-white/6 bg-black/30 p-4 md:flex md:flex-col">
            <div>
              <div className="font-serif text-2xl tracking-[0.16em] text-white">VOZDEX AI</div>
              <div className="mt-1 text-[9px] font-mono uppercase tracking-[0.32em] text-lime/70">
                Voice Trading Protocol
              </div>
            </div>

            <div className="mt-8 space-y-1.5">
              {nav.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-[10px] font-mono uppercase tracking-[0.22em] transition-colors ${
                    item.active
                      ? "bg-lime text-black shadow-[0_0_30px_rgba(190,255,50,0.25)]"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.04] p-2.5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white">0.003</div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/45">ETH</div>
                </div>
                <div className="flex min-w-0 items-center gap-2 rounded-xl bg-white/[0.04] px-2 py-1.5">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-lime/10 text-[9px] font-mono text-lime">
                    0x
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[10px] font-mono uppercase tracking-[0.16em] text-white">
                      0x61...
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-white/45">
                      ED32
                    </div>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/35" />
                </div>
              </div>
            </div>

            <div className="mt-auto rounded-2xl border border-lime/10 bg-white/[0.03] p-3">
              <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.24em] text-white/45">
                <span>Terminal</span>
                <span className="text-lime">Connected</span>
              </div>
              <div className="mt-4 flex justify-center">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-lime/20 bg-lime/5">
                  <Network className="h-6 w-6 text-lime" />
                </div>
              </div>
              <div className="mt-4 space-y-2 text-[9px] font-mono uppercase tracking-[0.18em] text-white/55">
                <div className="flex items-center justify-between">
                  <span>wallet</span>
                  <span>0x61...ed32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>rpc</span>
                  <span>robinhood</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>latency</span>
                  <span className="text-lime">42ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>block</span>
                  <span>6,918,481</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="relative flex min-w-0 flex-col">
            <div className="flex items-center justify-between border-b border-white/6 px-4 py-4 lg:px-6">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-[0.32em] text-white/45">
                  Protocol · v1.0.4
                </div>
                <div className="mt-1 font-serif text-3xl text-white">Swap Tokens</div>
                <p className="mt-1 max-w-xl text-xs text-white/45">
                  Live Robinhood Chain routing, wallet-aware execution, and voice-assisted intent capture.
                </p>
              </div>
              <div className="hidden rounded-full border border-lime/15 bg-white/[0.03] px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/60 lg:flex lg:items-center lg:gap-2">
                <Wallet className="h-3.5 w-3.5 text-lime" />
                <span>Wallet 0x61...ed32</span>
              </div>
            </div>

            <div className="grid gap-3 px-4 py-4 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/6 bg-white/[0.025] p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                >
                  <div className="text-[9px] font-mono uppercase tracking-[0.28em] text-white/40">
                    {stat.label}
                  </div>
                  <div className="mt-2 font-serif text-3xl text-lime">{stat.value}</div>
                  <div
                    className={`mt-1 text-[10px] font-mono uppercase tracking-[0.18em] ${
                      stat.detail.startsWith("-") ? "text-destructive/80" : "text-white/45"
                    }`}
                  >
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-10">
              <div className="absolute inset-0 dot-bg opacity-25" />
              <div className="absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(190,255,50,0.22),transparent_60%)] blur-3xl" />
              <div className="relative">
                <div className="absolute inset-0 rounded-full border border-lime/15 animate-spin-slow" />
                <div
                  className="absolute inset-4 rounded-full border border-lime/10"
                  style={{ animation: "spin-slow 22s linear infinite reverse" }}
                />
                <div className="absolute inset-0 rounded-full border border-lime/25 animate-ring-pulse" />
                <div
                  className="absolute inset-0 rounded-full border border-lime/25 animate-ring-pulse"
                  style={{ animationDelay: "1.2s" }}
                />
                <div className="grid h-40 w-40 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#dfff75,#b8ff40_60%,#87d70f)] shadow-[0_0_80px_rgba(190,255,50,0.35)]">
                  <Mic className="h-11 w-11 text-black" strokeWidth={2.5} />
                </div>
              </div>
              <div className="relative mt-8 text-center">
                <div className="font-serif text-4xl text-white">Tap to Speak</div>
                <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">
                  "Sell 1 ETH for USDC"
                </div>
              </div>
              <div className="relative mt-6">
                <VoiceWave />
              </div>
            </div>

            <div className="px-4 pb-4 lg:px-6 lg:pb-6">
              <div className="rounded-[26px] border border-lime/15 bg-black/55 p-4 shadow-[0_0_70px_rgba(190,255,50,0.08)] backdrop-blur-sm">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/45">
                      You Pay
                    </div>
                    <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-mono text-white">
                        E
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-xs uppercase tracking-[0.18em] text-white">ETH · Ethereum</div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-white/40">
                          Balance 0.0032 ETH
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-white/40" />
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <button className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/55">
                        Max
                      </button>
                      <div className="font-serif text-4xl text-white">0.02</div>
                    </div>
                  </div>

                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-lime/20 bg-lime/10 text-lime">
                    <Plus className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/45">
                      You Receive
                    </div>
                    <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-mono text-white">
                        A
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-xs uppercase tracking-[0.18em] text-white">ARROW · Arrow</div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-white/40">
                          Balance 0 ARROW
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-white/40" />
                    </div>
                    <div className="mt-3 flex items-end justify-end">
                      <div className="font-serif text-4xl text-white">17.946286</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 border-t border-white/6 pt-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 md:grid-cols-3">
                  <div>
                    <div>Rate</div>
                    <div className="mt-1 text-white">1 ETH = 897.314 ARROW</div>
                  </div>
                  <div>
                    <div>Slippage Tolerance</div>
                    <div className="mt-1 text-white">0.50%</div>
                  </div>
                  <div>
                    <div>Est. Network Fee</div>
                    <div className="mt-1 text-white">0.00021 ETH</div>
                  </div>
                </div>

                <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 text-[11px] font-mono uppercase tracking-[0.28em] text-black transition-transform hover:scale-[1.01]">
                  Review and Sign Swap
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <aside className="hidden border-l border-white/6 bg-black/25 p-4 xl:flex xl:flex-col">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.28em] text-white/45">
                <span>Wallet</span>
                <span className="text-lime">Live</span>
              </div>
              <div className="mt-2 font-serif text-xl text-white">Live Robinhood Chai...</div>
              <div className="mt-3 rounded-xl border border-white/6 bg-black/40 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
                0x61...ed32
              </div>
              <div className="mt-4 space-y-3 text-[10px] font-mono uppercase tracking-[0.16em] text-white/45">
                <div className="flex items-end justify-between">
                  <span>ETH</span>
                  <div className="text-right">
                    <div className="text-white">0.0032</div>
                    <div className="text-[9px] text-white/40">$5.78</div>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span>Portfolio Value</span>
                  <span className="font-serif text-3xl text-white">$5.78</span>
                </div>
              </div>
              <button className="mt-4 w-full rounded-full border border-white/10 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/65">
                Open Portfolio
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="text-[9px] font-mono uppercase tracking-[0.28em] text-white/45">Market</div>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <div className="font-serif text-2xl text-white">ETH / USD</div>
                  <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.18em] text-destructive/80">
                    -0.07%
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-4xl text-white">$1,798</div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/35">24h</div>
                </div>
              </div>
              <div className="mt-4 h-20 rounded-xl border border-lime/10 bg-[linear-gradient(180deg,rgba(190,255,50,0.08),transparent)] p-3">
                <svg viewBox="0 0 180 70" className="h-full w-full">
                  <path
                    d="M0 58 L20 55 L40 46 L60 50 L80 38 L100 41 L120 28 L140 18 L160 24 L180 15"
                    fill="none"
                    stroke="oklch(0.92 0.22 125)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-4 flex-1 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="text-[9px] font-mono uppercase tracking-[0.28em] text-white/45">
                Recent Activity
              </div>
              <div className="mt-4 space-y-3">
                {activity.map((item) => (
                  <div
                    key={`${item.pair}-${item.time}`}
                    className="rounded-xl border border-white/6 bg-black/35 px-3 py-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-lime/10 text-lime">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white">
                            {item.pair}
                          </div>
                          <div className="mt-1 text-[9px] font-mono uppercase tracking-[0.16em] text-white/40">
                            {item.type}
                          </div>
                        </div>
                      </div>
                      <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-white/35">
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </Reveal>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-border text-xs font-mono tracking-widest uppercase text-muted-foreground bg-background/40 backdrop-blur"
        >
          <LiveBadge />
          <span>Voice Trading · Robinhood Chain</span>
        </motion.div>
        <h1 className="mt-8 font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-tight max-w-5xl mx-auto">
          <WordReveal text="The world's first" delay={0.15} />
          <br />
          <span className="italic text-muted-foreground">
            <WordReveal text="live voice-over" delay={0.45} />
          </span>
          <br />
          <WordReveal text="trading protocol." delay={0.75} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="mt-6 max-w-xl mx-auto text-muted-foreground"
        >
          Trade crypto with your voice today on Robinhood Chain. Soon you'll secure your wallet with Voice Guardrails and deploy autonomous AI trading agents — all from one AI-native protocol.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-3 flex-wrap"
        >
          <Magnetic>
            <a href="#" className="btn-lime group">
              <span>Launch Voice Trading</span>
              <LiveBadge />
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic strength={12}><a href="#roadmap" className="btn-ghost">View Roadmap</a></Magnetic>
        </motion.div>

        <TradingTerminalPreview />
      </div>
    </section>
  );
}

/* ---------- Core Products intro ---------- */

function ProductsIntro() {
  const items = [
    { n: "01", t: "Voice Over Trading", s: "LIVE", d: "Speak trading intents. Execute on Robinhood Chain.", i: Mic },
    { n: "02", t: "Voice Guardrails", s: "SOON", d: "Set wallet rules by voice. Break them by voice.", i: Shield },
    { n: "03", t: "Agentic Trading", s: "SOON", d: "Autonomous AI agents that trade for you.", i: Bot },
  ];
  return (
    <section className="relative border-y border-border bg-[oklch(0.09_0.005_260)]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-baseline justify-between mb-14 flex-wrap gap-4">
          <Reveal as="h2" className="font-serif text-4xl md:text-5xl max-w-3xl leading-tight">
            Three products.<br />
            <span className="text-muted-foreground italic">One AI-native protocol.</span>
          </Reveal>
          <span className="eyebrow">Core Products</span>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08} className="bg-[oklch(0.09_0.005_260)] p-8">
              <TiltCard className="group relative">
                <div className="flex items-center justify-between">
                  <motion.div className="h-10 w-10 rounded-sm lime-panel grid place-items-center" whileHover={{ rotate: 8, scale: 1.08 }}>
                    <it.i className="h-5 w-5" strokeWidth={2} />
                  </motion.div>
                  {it.s === "LIVE" ? <LiveBadge /> : <SoonBadge />}
                </div>
                <div className="mt-6 font-mono text-xs text-muted-foreground">{it.n}</div>
                <h3 className="mt-1 font-serif text-2xl text-lime">{it.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 01 Voice Trading ---------- */

function VoiceTrading() {
  const examples = [
    "Swap 0.5 ETH to USDC",
    "Buy $250 of BTC",
    "Sell all my PEPE",
    "Bridge ETH to Base",
    "Swap my entire balance",
  ];
  const features = [
    "Natural Language Understanding",
    "Live Voice Execution",
    "Wallet-Aware Transactions",
    "Smart DEX Routing",
    "Multi-Step Intent Parsing",
    "Secure Transaction Review",
    "Robinhood Chain Native",
  ];
  return (
    <section id="voice-trading" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-16 items-start">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="eyebrow">01 · Voice Over Trading</span>
            <LiveBadge />
          </div>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">
            The world's first live voice-over trading protocol.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-lg leading-relaxed">
            Trade crypto naturally using your voice. Speak your trading intent, and Vozdex AI transforms natural language into secure on-chain transactions.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-lime shrink-0" /> {f}
              </div>
            ))}
          </div>
          <Magnetic>
            <a href="#" className="btn-lime mt-10 group">
              Launch Voice Trading <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal x={30} className="relative">
          <div className="rounded-md border border-border bg-surface overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-2">
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">voice intents · live</span>
              <LiveBadge />
            </div>
            <div className="p-6 space-y-3">
              {examples.map((e, i) => (
                <motion.div
                  key={e}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 rounded-sm border border-border bg-background/50 px-4 py-3 hover:border-lime/40 transition-colors group"
                >
                  <Mic className="h-4 w-4 text-lime group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-sm">"{e}"</span>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground group-hover:text-lime group-hover:translate-x-0.5 transition-all" />
                </motion.div>
              ))}
              <div className="pt-3 flex items-center justify-center">
                <VoiceWave />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 02 Voice Guardrails ---------- */

function Guardrails() {
  const proactive = [
    "Limit my spending to $100 per day.",
    "Never trade meme coins.",
    "Only swap ETH to stablecoins.",
    "Block transactions above 1 ETH.",
    "Require confirmation for every swap.",
  ];
  const emergency = [
    "Stop everything.",
    "Freeze my wallet.",
    "Revoke all approvals.",
    "Disable every AI agent.",
    "Cancel all pending transactions.",
  ];
  return (
    <section id="guardrails" className="relative border-y border-border bg-[oklch(0.09_0.005_260)]">
      <div className="mx-auto max-w-7xl px-6 py-28 grid md:grid-cols-2 gap-16 items-center">
        <Reveal x={-30} className="relative h-[420px] grid place-items-center order-2 md:order-1">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,oklch(0.92_0.22_125/_0.2),transparent_70%)] blur-2xl" />
          <div className="absolute h-80 w-80 rounded-full border border-lime/25 animate-spin-slow" />
          <div className="absolute h-64 w-64 rounded-full border border-lime/15" style={{ animation: "spin-slow 22s linear infinite reverse" }} />
          <div className="absolute h-48 w-48 rounded-full border border-lime/40 animate-ring-pulse" />
          <div className="absolute h-48 w-48 rounded-full border border-lime/40 animate-ring-pulse" style={{ animationDelay: "1.3s" }} />
          <div className="relative h-32 w-32 rounded-full lime-panel grid place-items-center animate-breathe">
            <Shield className="h-12 w-12" strokeWidth={2} />
          </div>
          <div className="absolute bottom-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Lock className="h-3 w-3 text-lime" /> voice-signed policy
          </div>
        </Reveal>

        <Reveal className="order-1 md:order-2">
          <div className="flex items-center gap-3">
            <span className="eyebrow">02 · Voice Guardrails</span>
            <SoonBadge />
          </div>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">
            Set the rules by voice.<br />
            <span className="italic text-muted-foreground">Break the rules by voice.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-lg leading-relaxed">
            An AI-powered on-chain permission system. Control wallet behavior entirely through voice — proactive protection and instant emergency response, one unified interface.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-sm border border-border bg-background/40 p-5">
              <div className="flex items-center gap-2 text-lime font-mono text-xs uppercase tracking-widest">
                <Shield className="h-3.5 w-3.5" /> Proactive Protection
              </div>
              <ul className="mt-3 space-y-1.5">
                {proactive.slice(0, 3).map((e) => (
                  <li key={e} className="text-sm text-muted-foreground font-mono">"{e}"</li>
                ))}
              </ul>
            </div>
            <div className="rounded-sm border border-destructive/30 bg-destructive/5 p-5">
              <div className="flex items-center gap-2 text-destructive font-mono text-xs uppercase tracking-widest">
                <Lock className="h-3.5 w-3.5" /> Emergency Protection
              </div>
              <ul className="mt-3 space-y-1.5">
                {emergency.slice(0, 3).map((e) => (
                  <li key={e} className="text-sm text-muted-foreground font-mono">"{e}"</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 03 Agentic Trading ---------- */

function AgenticTrading() {
  const nodes = [
    { x: 20, y: 30, label: "Strategy" },
    { x: 50, y: 20, label: "AI Agent" },
    { x: 80, y: 35, label: "Market" },
    { x: 30, y: 70, label: "Guardrails" },
    { x: 70, y: 75, label: "Router" },
  ];
  const edges = [[0,1],[1,2],[1,3],[1,4],[3,4],[2,4]] as const;
  const strategies = [
    "Invest $100 into ETH every Friday.",
    "Sell if BTC drops below $80,000.",
    "Take profits at 20%.",
    "Keep my portfolio 60% ETH and 40% BTC.",
  ];
  return (
    <section id="agentic" className="mx-auto max-w-7xl px-6 py-28 grid md:grid-cols-2 gap-16 items-center">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="eyebrow">03 · Agentic Trading</span>
          <SoonBadge />
        </div>
        <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">
          Autonomous AI agents<br />
          <span className="italic text-muted-foreground">that trade for you.</span>
        </h2>
        <p className="mt-6 text-muted-foreground max-w-lg leading-relaxed">
          Deploy AI trading agents that monitor markets, execute strategies, and optimize portfolios — fully non-custodial and bound by Voice Guardrails.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 text-sm">
          {["Dollar Cost Averaging", "Stop Loss Automation", "Take Profit Execution", "Portfolio Rebalancing", "Yield Optimization", "Market Monitoring"].map((c) => (
            <div key={c} className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-lime shrink-0" /> {c}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-sm border border-border bg-surface p-5">
          <div className="eyebrow">Describe your strategy</div>
          <ul className="mt-3 space-y-1.5">
            {strategies.map((s) => (
              <li key={s} className="text-sm text-muted-foreground font-mono">"{s}"</li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal x={30} className="relative h-[460px] rounded-md border border-border bg-surface overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-30" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">agent network</span>
          <SoonBadge />
        </div>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {edges.map(([a, b], i) => {
            const A = nodes[a], B = nodes[b];
            return (
              <g key={i}>
                <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="oklch(0.92 0.22 125 / 0.25)" strokeWidth="0.3" />
                <motion.circle
                  r="0.6"
                  fill="oklch(0.95 0.24 128)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0], cx: [A.x, B.x], cy: [A.y, B.y] }}
                  transition={{ duration: 2.2, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
                />
              </g>
            );
          })}
        </svg>
        {nodes.map((n, i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            <motion.div
              className="h-3 w-3 rounded-full bg-lime shadow-[0_0_16px_2px_oklch(0.92_0.22_125/_0.9)]"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{n.label}</span>
          </div>
        ))}
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
          {[{ i: Cpu, t: "AI" }, { i: Network, t: "Route" }, { i: Lock, t: "Sign" }].map((x) => (
            <div key={x.t} className="rounded-sm border border-border bg-background/50 p-3 text-center">
              <x.i className="h-4 w-4 text-lime mx-auto" />
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{x.t}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Platform Status / Roadmap ---------- */

function Roadmap() {
  const items = [
    { n: "01", t: "Voice Over Trading", status: "live", d: "Available now on Robinhood Chain.", i: Mic },
    { n: "02", t: "Voice Guardrails", status: "soon", d: "In development. Launching soon.", i: Shield },
    { n: "03", t: "Agentic Trading", status: "soon", d: "In development. Launching soon.", i: Bot },
  ];
  return (
    <section id="roadmap" className="relative border-y border-border bg-[oklch(0.08_0.005_260)]">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex items-baseline justify-between mb-14 flex-wrap gap-4">
          <Reveal as="h2" className="font-serif text-4xl md:text-5xl max-w-2xl leading-tight">
            Platform status.<br />
            <span className="text-muted-foreground italic">The road ahead.</span>
          </Reveal>
          <span className="eyebrow">Roadmap</span>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 right-0 top-8 h-px bg-border hidden md:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute left-0 top-8 h-px bg-lime origin-left hidden md:block"
            style={{ width: "33%" }}
          />
          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {items.map((it, i) => (
              <Reveal key={it.t} delay={i * 0.12} className="relative">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`relative h-4 w-4 rounded-full ${it.status === "live" ? "bg-lime" : "bg-yellow-300/60"} shadow-[0_0_18px_2px_oklch(0.92_0.22_125/_0.6)]`}
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  {it.status === "live" ? <LiveBadge /> : <SoonBadge />}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <it.i className="h-5 w-5 text-lime" />
                  <span className="font-mono text-xs text-muted-foreground">{it.n}</span>
                </div>
                <h3 className="mt-2 font-serif text-2xl">{it.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">{it.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Impact / stat ---------- */

function Impact() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid md:grid-cols-2 gap-6">
        <Reveal className="rounded-md border border-border bg-surface p-10">
          <div className="eyebrow">Live Quote Latency</div>
          <div className="mt-6 font-serif text-7xl text-lime">
            <CountUp to={42} /><span className="text-3xl text-muted-foreground">ms</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            Direct Quoter contract reads over a co-located RPC. No middleware, no aggregator round trips.
          </p>
          <div className="mt-8 h-24 relative overflow-hidden rounded-sm border border-border">
            <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
              <motion.path
                d="M0,80 L40,70 L80,72 L120,55 L160,60 L200,40 L240,50 L280,30 L320,35 L360,15 L400,20"
                fill="none"
                stroke="oklch(0.92 0.22 125)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
              <path d="M0,80 L40,70 L80,72 L120,55 L160,60 L200,40 L240,50 L280,30 L320,35 L360,15 L400,20 L400,100 L0,100 Z" fill="oklch(0.92 0.22 125 / 0.15)" />
            </svg>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="rounded-md border border-border p-10 lime-panel">
          <div className="font-mono text-xs tracking-widest uppercase opacity-70">On-chain settlement</div>
          <h3 className="mt-6 font-serif text-4xl leading-tight">
            Every swap is a signed router call — nothing custodial, nothing off-chain.
          </h3>
          <div className="mt-10 font-serif text-6xl">
            <CountUp to={99.9} decimals={1} suffix="%" />
            <span className="text-xl opacity-70"> settled first try</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function FAQ() {
  const faqs = [
    { q: "What is Vozdex AI?", a: "Vozdex AI is the world's first live Voice-Over Trading Protocol. It combines AI, voice, and blockchain into one AI-native trading experience on Robinhood Chain." },
    { q: "Which products are live today?", a: "Voice Over Trading is live now on Robinhood Chain. Voice Guardrails and Agentic Trading are currently in development." },
    { q: "How does voice trading work?", a: "Speak an intent like 'Swap 0.5 ETH to USDC'. The parser turns it into a structured swap, you review the live router quote, and sign in your own wallet." },
    { q: "Is my wallet ever custodial?", a: "Never. Every transaction is signed inside your wallet. Vozdex AI only builds calldata for the router." },
    { q: "What are Voice Guardrails?", a: "An AI-powered on-chain permission system controlled by voice. Set spending limits, block risky trades, or trigger emergency wallet freezes — all spoken." },
    { q: "What is Agentic Trading?", a: "Autonomous AI agents that continuously monitor markets and execute your spoken strategies, bound by your Voice Guardrails." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 grid md:grid-cols-[1fr_2fr] gap-16">
      <Reveal>
        <h2 className="font-serif text-4xl leading-tight">Have questions?<br /><span className="text-muted-foreground italic">Find answers.</span></h2>
        <p className="mt-4 text-sm text-muted-foreground">One protocol. Three products. Built for the future of conversational finance.</p>
        <Magnetic><a href="#" className="btn-lime mt-6 group">Launch Voice Trading <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></a></Magnetic>
      </Reveal>
      <div className="divide-y divide-border border-y border-border">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left py-6 flex items-start justify-between gap-6 group">
              <div className="flex-1">
                <div className="font-serif text-xl group-hover:text-lime transition-colors">{f.q}</div>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl overflow-hidden"
                    >
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <motion.div animate={{ rotate: open === i ? 180 : 0 }} className="mt-1 text-lime shrink-0">
                {open === i ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </motion.div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */

function CTA() {
  return (
    <section className="border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-20" />
      <div className="mx-auto max-w-7xl px-6 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative">
        <Reveal as="h2" className="font-serif text-4xl md:text-5xl max-w-xl leading-tight">
          The future of finance<br />is conversational.
        </Reveal>
        <Reveal delay={0.1} className="flex gap-3 flex-wrap">
          <Magnetic><a href="#" className="btn-lime group">Launch Voice Trading <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></a></Magnetic>
          <Magnetic strength={12}><a href="#roadmap" className="btn-ghost">View Roadmap</a></Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  const cols = [
    { h: "Products", l: ["Voice Trading", "Voice Guardrails", "Agentic Trading"] },
    { h: "Protocol", l: ["Roadmap", "Docs", "Router API"] },
    { h: "Community", l: ["X", "TG"] },
  ];
  return (
    <footer className="relative bg-[oklch(0.08_0.005_260)] border-t border-border overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 animate-grid-drift" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[radial-gradient(closest-side,oklch(0.92_0.22_125/_0.1),transparent_70%)] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-[2fr_3fr] gap-10">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            The world's first AI-native voice trading protocol. Built for Robinhood Chain.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Radio className="h-3.5 w-3.5 text-lime" />
            <span className="text-xs font-mono text-muted-foreground">Voice Trading live · Guardrails & Agents soon</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 text-sm">
          {cols.map((c) => (
            <div key={c.h}>
              <div className="eyebrow">{c.h}</div>
              <ul className="mt-4 space-y-2">
                {c.l.map((x) => (
                  <li key={x}><a href="#" className="text-muted-foreground hover:text-foreground transition-colors story-link">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="relative border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>© 2026 Vozdex AI</span>
          <span>Chain ID 4663 · rpc.mainnet.chain.robinhood.com</span>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Nav />
      <Hero />
      <ProductsIntro />
      <VoiceTrading />
      <Guardrails />
      <AgenticTrading />
      <Roadmap />
      <Impact />
      <FAQ />
      <CTA />
      <Footer />
    </motion.div>
  );
}
