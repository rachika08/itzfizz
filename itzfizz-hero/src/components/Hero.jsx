import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "58%", label: "Faster performance", card: "bg-race text-paper" },
  { value: "23%", label: "Better efficiency", card: "bg-gold text-track" },
  {
    value: "27%",
    label: "Improved engagement",
    card: "border border-gold bg-carbon text-gold",
  },
  { value: "40%", label: "Time saved", card: "bg-race text-paper" },
];

function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const statsRef = useRef(null);
  const laneRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stats = statsRef.current.children;

      // Initial state
      gsap.set([headingRef.current, subHeadingRef.current, carRef.current, stats], {
        opacity: 0,
      });
      gsap.set([headingRef.current, subHeadingRef.current, carRef.current], {
        y: 50,
      });

      // Intro animation
      gsap
        .timeline()
        .to(headingRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        .to(
          subHeadingRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          carRef.current,
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.3"
        )
        .to(stats, { opacity: 1, duration: 0.5, stagger: 0.2, ease: "power2.out" });


      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1000",
            scrub: 2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(
          carRef.current,
          {
            x: () =>
              (roadRef.current?.offsetWidth || 0) - (carRef.current?.offsetWidth || 0),
          },
          0
        )
        .to(laneRef.current, { backgroundPositionX: "-1200px" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[640px] flex-col overflow-hidden bg-track px-6 py-6 text-paper sm:px-10 lg:px-16"
    >
      {/* Red glow behind the car */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_70%,rgba(225,6,0,0.28),transparent_65%)]" />

      {/* Top bar */}
      <header className="relative flex shrink-0 items-center justify-between font-display text-xs font-semibold tracking-[0.3em] sm:text-sm">
        <h1 className="text-gold">ITZFIZZ</h1>
        <p className="font-body text-[11px] font-medium tracking-[0.2em] text-paper/60 sm:text-xs">
          Scroll to explore ↓
        </p>
      </header>

      {/* Headline */}
      <div className="relative mt-6 shrink-0 text-center sm:mt-8 lg:mt-10">
        <h2
          ref={headingRef}
          aria-label="Welcome"
          className="pl-[0.3em] font-display text-4xl font-extrabold tracking-[0.3em] sm:text-6xl lg:text-7xl"
        >
          WELCOME
        </h2>
        <h3
          ref={subHeadingRef}
          aria-label="Itzfizz"
          className="mt-2 pl-[0.5em] font-display text-xl font-light tracking-[0.5em] text-gold sm:text-3xl lg:text-4xl"
        >
          ITZFIZZ
        </h3>
      </div>

      {/* Road + car: takes remaining space, sits at its bottom */}
      <div className="relative flex min-h-0 flex-1 flex-col justify-end pb-6 pt-[140px] sm:pt-[180px] lg:pt-[230px]">
        <div ref={roadRef} className="relative">
          {/* Car wrapper */}
          <div
            ref={carRef}
            className="absolute bottom-full left-0 z-10 w-[280px] max-w-[80%] will-change-transform sm:w-[360px] lg:w-[460px]"
          >
            {/* Contact shadow */}
            <div className="absolute inset-x-[4%] bottom-[6px] h-4 rounded-[50%] bg-black/80 blur-md" />
            <img
              src="/Glossy Red Ferrari Side Profile.png"
              alt="Luxury car driving across the screen"
              className="relative block w-full drop-shadow-[0_0_28px_rgba(225,6,0,0.35)]"
            />
          </div>

          {/* Track */}
          <div className="relative z-0">
            <div className="h-2 w-full bg-[repeating-linear-gradient(90deg,#e10600_0_28px,#f4f1ea_28px_56px)]" />

            <div className="asphalt relative h-20 w-full overflow-hidden sm:h-24">
              <div className="absolute inset-x-0 top-2 h-[3px] bg-paper/70" />
              <div className="absolute inset-x-0 bottom-2 h-[3px] bg-paper/70" />
              <div className="tyre-marks absolute inset-x-0 top-[22%] h-2" />
              <div className="tyre-marks absolute inset-x-0 top-[34%] h-2 opacity-70" />
              <div
                ref={laneRef}
                className="lane-dashes absolute inset-x-0 top-[68%] h-[5px]"
              />
            </div>

            <div className="h-2 w-full bg-[repeating-linear-gradient(90deg,#e10600_0_28px,#f4f1ea_28px_56px)]" />
            <div className="h-3 w-full bg-gradient-to-b from-black/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* Stats: always pinned at bottom of the screen */}
      <div
        ref={statsRef}
        className="relative grid shrink-0 grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
      >
        {STATS.map((s) => (
          <div key={s.label} className={`rounded-md px-3 py-4 text-center sm:py-5 ${s.card}`}>
            <p className="font-display text-3xl font-bold tabular-nums sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-1 text-xs font-medium opacity-90 sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;

