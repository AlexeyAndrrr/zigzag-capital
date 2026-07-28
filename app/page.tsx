"use client";

import { useEffect, useRef } from "react";

const SERVICES = [
  {
    number: "01",
    title: "Advisory",
    cue: "Shape the signal",
    copy: "We sharpen positioning, launch strategy, and market narrative until the idea reads clearly from every angle.",
    output: "NOISE → SIGNAL",
  },
  {
    number: "02",
    title: "Investment",
    cue: "Add conviction",
    copy: "We deploy aligned, early capital where it can unlock the next decisive move.",
    output: "SIGNAL → MOMENTUM",
  },
  {
    number: "03",
    title: "Networking",
    cue: "Multiply the motion",
    copy: "We connect teams with the operators, partners, communities, and ecosystems that compound progress.",
    output: "MOMENTUM → NETWORK",
  },
];

const PARTNERS = [
  {
    name: "$TRUMP",
    label: "Official Trump",
    href: "https://gettrumpmemes.com/",
    image: "/portfolio/trump.png",
    className: "partner-trump",
  },
  {
    name: "WLFI",
    label: "World Liberty Financial",
    href: "https://www.worldlibertyfinancial.com/",
    image: "/portfolio/wlfi.png",
    className: "partner-wlfi",
  },
  {
    name: "VIRTUALS",
    label: "Virtuals ecosystem",
    href: "https://www.virtuals.io/",
    image: "/portfolio/virtuals.svg",
    className: "partner-virtuals",
  },
  {
    name: "PNUT",
    label: "Peanut the Squirrel",
    href: "https://pnutsol.com/",
    image: "/portfolio/pnut.png",
    className: "partner-pnut",
  },
  {
    name: "DAOS.FUN",
    label: "Onchain capital formation",
    href: "https://www.daos.fun/",
    image: "/portfolio/daos.png",
    className: "partner-daos",
  },
];

function ZigzagMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`zigzag-mark${compact ? " zigzag-mark-compact" : ""}`}
      aria-hidden="true"
    >
      <span className="zigzag-stroke zigzag-top" />
      <span className="zigzag-stroke zigzag-diagonal" />
      <span className="zigzag-stroke zigzag-bottom" />
    </span>
  );
}

function SignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let frame = 0;
    let scrollProgress = 0;
    let visible = !document.hidden;
    let pointerHasMoved = false;
    let velocity = 0;
    let previousX = width * 0.72;
    let previousY = height * 0.36;
    const target = { x: previousX, y: previousY };
    const points = Array.from({ length: 18 }, () => ({
      x: target.x,
      y: target.y,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerHasMoved = true;
      target.x = event.clientX;
      target.y = event.clientY;
      const dx = event.clientX - previousX;
      const dy = event.clientY - previousY;
      velocity = Math.min(42, Math.hypot(dx, dy));
      previousX = event.clientX;
      previousY = event.clientY;
    };

    const onScroll = () => {
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = available > 0 ? window.scrollY / available : 0;
    };

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !reducedMotion) frame = requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      context.clearRect(0, 0, width, height);
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(255, 47, 168, .38)");
      gradient.addColorStop(1, "rgba(33, 70, 255, .42)");
      context.strokeStyle = gradient;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(-40, height * 0.42);
      context.lineTo(width * 0.3, height * 0.42);
      context.lineTo(width * 0.7, height * 0.66);
      context.lineTo(width + 40, height * 0.66);
      context.stroke();
    };

    function draw() {
      if (!visible) return;
      context.clearRect(0, 0, width, height);

      if (!pointerHasMoved) {
        target.x = width * (0.72 - scrollProgress * 0.36);
        target.y =
          height *
          (0.35 + scrollProgress * 0.25 + Math.sin(scrollProgress * 8) * 0.04);
      }

      points[0].x += (target.x - points[0].x) * 0.22;
      points[0].y += (target.y - points[0].y) * 0.22;

      for (let index = 1; index < points.length; index += 1) {
        const previous = points[index - 1];
        const point = points[index];
        const spring = 0.24 - index * 0.006;
        point.x += (previous.x - point.x) * spring;
        point.y += (previous.y - point.y) * spring;
      }

      velocity *= 0.92;
      const gradient = context.createLinearGradient(
        points[points.length - 1].x - 220,
        points[points.length - 1].y,
        points[0].x + 180,
        points[0].y,
      );
      gradient.addColorStop(0, "rgba(33, 70, 255, 0)");
      gradient.addColorStop(0.2, "rgba(33, 70, 255, .4)");
      gradient.addColorStop(0.62, "rgba(123, 61, 247, .64)");
      gradient.addColorStop(1, "rgba(255, 47, 168, .78)");

      context.strokeStyle = gradient;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = 1.6 + Math.min(velocity * 0.045, 1.4);
      context.beginPath();

      const tail = points[points.length - 1];
      context.moveTo(-90, tail.y + scrollProgress * 80);
      context.lineTo(tail.x - 120, tail.y);

      for (let index = points.length - 1; index > 0; index -= 1) {
        const point = points[index];
        const next = points[index - 1];
        const wave =
          Math.sin(index * 0.9 + scrollProgress * 13) *
          velocity *
          (index / points.length) *
          0.18;
        const centerX = (point.x + next.x) / 2;
        const centerY = (point.y + next.y) / 2 + wave;
        context.quadraticCurveTo(point.x, point.y + wave, centerX, centerY);
      }

      context.lineTo(points[0].x, points[0].y);
      context.lineTo(width + 90, points[0].y - 72 + scrollProgress * 120);
      context.stroke();

      [0, 6, 12].forEach((index, nodeIndex) => {
        const point = points[index];
        context.beginPath();
        context.fillStyle =
          nodeIndex === 0
            ? "rgba(255, 47, 168, .88)"
            : "rgba(33, 70, 255, .32)";
        context.arc(
          point.x,
          point.y,
          nodeIndex === 0 ? 3.6 : 2.2,
          0,
          Math.PI * 2,
        );
        context.fill();
      });

      frame = requestAnimationFrame(draw);
    }

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    if (reducedMotion) {
      drawStatic();
    } else {
      frame = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />;
}

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let scrollFrame = 0;

    const updateScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const available =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = available > 0 ? window.scrollY / available : 0;
        root.style.setProperty("--scroll-progress", progress.toFixed(4));
        root.style.setProperty("--scroll-shift", `${progress * -220}px`);
        root.style.setProperty("--scroll-turn", `${progress * 18 - 6}deg`);
        root.style.setProperty(
          "--progress-height",
          `${Math.max(4, progress * 100)}%`,
        );
      });
    };

    const updatePointer = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
      root.style.setProperty("--mouse-x", `${x * 100}%`);
      root.style.setProperty("--mouse-y", `${y * 100}%`);
      root.style.setProperty("--mouse-shift-x", `${(x - 0.5) * 24}px`);
      root.style.setProperty("--mouse-shift-y", `${(y - 0.5) * 18}px`);
      root.style.setProperty("--mouse-turn", `${(x - 0.5) * 3.5}deg`);
      document.body.classList.add("pointer-active");
    };

    const magnets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]"),
    );
    const magnetCleanups = magnets.map((element) => {
      const move = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        element.style.setProperty("--magnet-x", `${x * 8}px`);
        element.style.setProperty("--magnet-y", `${y * 8}px`);
      };
      const leave = () => {
        element.style.setProperty("--magnet-x", "0px");
        element.style.setProperty("--magnet-y", "0px");
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
      };
    });

    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    revealItems.forEach((item) => observer.observe(item));

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => {
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateScroll);
      observer.disconnect();
      magnetCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <main ref={pageRef} className="site-shell">
      <SignalCanvas />
      <div className="cursor-lens" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <aside className="scroll-meter" aria-hidden="true">
        <span className="scroll-meter-label">ZZ / 26</span>
        <span className="scroll-meter-track">
          <span className="scroll-meter-fill" />
        </span>
      </aside>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Zigzag Capital home">
          <ZigzagMark compact />
          <span className="brand-name">Zigzag Capital</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#approach">Approach</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>

        <a
          className="header-cta magnetic"
          data-magnetic
          href="mailto:hello@zigzag.capital?subject=The%20next%20turn"
        >
          Start a signal <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />

        <div className="hero-index mono">
          <span>INCUBATION FUND</span>
          <span>EARLY / ALIGNED / ACTIVE</span>
        </div>

        <h1 id="hero-title" className="hero-title">
          <span className="hero-line hero-line-one">The future</span>
          <span className="hero-line hero-line-two">never moves</span>
          <span className="hero-line hero-line-three">
            in a straight <em>line.</em>
          </span>
        </h1>

        <div className="hero-footer">
          <p className="hero-copy">
            We work at the bend—shaping the signal, backing the move, and
            connecting the people who turn early momentum into markets.
          </p>

          <a
            className="turn-button magnetic"
            data-magnetic
            href="#approach"
          >
            <span>Make the next turn</span>
            <span className="turn-button-arrow" aria-hidden="true">
              ↘
            </span>
          </a>

          <div className="hero-coordinate mono" aria-hidden="true">
            <span>X 0.73</span>
            <span>Y 0.28</span>
          </div>
        </div>

        <div className="hero-zigzag" aria-hidden="true">
          <ZigzagMark />
          <span>THE NON-LINEAR ADVANTAGE</span>
        </div>
      </section>

      <section className="manifesto" aria-label="Our point of view">
        <p className="section-tag mono reveal">01 / POINT OF VIEW</p>
        <p className="manifesto-copy reveal">
          Most people notice a line once it becomes a{" "}
          <span className="pink-swipe">trend.</span> We work earlier—when the
          idea is sharp, the signal is noisy, and one well-timed turn can change
          the trajectory.
        </p>
        <div className="manifesto-note mono reveal">
          <span>↓ KEEP SCROLLING</span>
          <span>THE LINE IS LIVE</span>
        </div>
      </section>

      <section id="approach" className="approach" aria-labelledby="approach-title">
        <div className="approach-heading">
          <p className="section-tag mono">02 / HOW WE MOVE</p>
          <h2 id="approach-title">
            One system.
            <br />
            Three turns.
          </h2>
          <p>
            From first signal to durable network, we stay close to the work.
          </p>
          <div className="approach-mini-mark">
            <ZigzagMark compact />
          </div>
        </div>

        <div className="service-stack">
          {SERVICES.map((service, index) => (
            <article
              className={`service-panel service-panel-${index + 1} reveal`}
              key={service.title}
            >
              <div className="service-number mono">{service.number}</div>
              <div className="service-body">
                <p className="service-cue mono">{service.cue}</p>
                <h3>{service.title}</h3>
                <p className="service-copy">{service.copy}</p>
              </div>
              <div className="service-output mono">{service.output}</div>
              <span className="service-node" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="work" aria-labelledby="work-title">
        <div className="work-intro reveal">
          <div>
            <p className="section-tag mono">03 / SELECTED COLLABORATIONS</p>
            <h2 id="work-title">
              A few lines
              <br />
              we’ve crossed.
            </h2>
          </div>
          <p>
            Teams and ecosystems we’ve worked with across culture, capital, and
            onchain coordination.
          </p>
        </div>

        <div className="portfolio-route">
          <div className="route-segments" aria-hidden="true">
            <span className="route-segment route-a" />
            <span className="route-segment route-b" />
            <span className="route-segment route-c" />
            <span className="route-segment route-d" />
          </div>

          {PARTNERS.map((partner, index) => (
            <a
              className={`partner-station ${partner.className} reveal`}
              href={partner.href}
              target="_blank"
              rel="noreferrer"
              key={partner.name}
              aria-label={`${partner.label} — open official website`}
            >
              <span className="partner-index mono">
                0{index + 1} / SELECTED COLLABORATION
              </span>
              <span className="partner-visual">
                <img src={partner.image} alt={`${partner.label} logo`} />
              </span>
              <span className="partner-meta">
                <span>
                  <strong>{partner.name}</strong>
                  <small>{partner.label}</small>
                </span>
                <span className="partner-arrow" aria-hidden="true">
                  ↗
                </span>
              </span>
              <span className="station-node" aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="trademark-note mono">
          All names and marks belong to their respective owners.
        </p>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div className="contact-top mono reveal">
          <span>04 / THE NEXT TURN</span>
          <span>OPEN CHANNEL</span>
        </div>

        <h2 id="contact-title" className="contact-title reveal">
          Bring us the thesis
          <br />
          before it looks <em>obvious.</em>
        </h2>

        <a
          className="contact-button magnetic reveal"
          data-magnetic
          href="mailto:hello@zigzag.capital?subject=The%20next%20turn"
        >
          <span>Start a conversation</span>
          <span aria-hidden="true">↗</span>
        </a>

        <div className="closing-mark reveal" aria-hidden="true">
          <ZigzagMark />
        </div>
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#top">
          <ZigzagMark compact />
          <span>Zigzag Capital</span>
        </a>
        <p>Capital for the unexpected turn.</p>
        <p className="mono">© 2026 / ALL RIGHTS RESERVED</p>
      </footer>
    </main>
  );
}
