"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DashboardMock } from "./DashboardMock";
import { PortalFrame } from "./PortalFrame";
import { DASH_H, DASH_W, useRamp, useWindow, type Progress } from "./timeline";

const WINDOW_CAPTIONS: Array<{
  text: string;
  range: [number, number, number, number];
}> = [
  { text: "Connect your clients in seconds.", range: [0, 0.02, 0.21, 0.25] },
  {
    text: "Generate full-stack campaigns instantly via the Google Ads API.",
    range: [0.25, 0.29, 0.46, 0.5],
  },
  {
    text: "Monitor real-time ROAS and crawl metrics from a single source of truth.",
    range: [0.5, 0.54, 0.71, 0.75],
  },
];

const FINAL_CAPTION = {
  text: "Deliver white-labeled, read-only analytics to your clients.",
  range: [0.77, 0.82] as [number, number],
};

function WindowCaption({
  p,
  text,
  range,
}: {
  p: Progress;
  text: string;
  range: [number, number, number, number];
}) {
  const opacity = useWindow(p, range[0], range[1], range[2], range[3]);
  const y = useTransform(p, [range[0], range[1]], [16, 0]);
  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-6 text-center text-xl font-semibold tracking-tight text-white sm:text-3xl"
    >
      {text}
    </motion.p>
  );
}

function FinalCaption({
  p,
  text,
  range,
}: {
  p: Progress;
  text: string;
  range: [number, number];
}) {
  const opacity = useRamp(p, range[0], range[1]);
  const y = useTransform(p, [range[0], range[1]], [16, 0]);
  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-6 text-center text-xl font-semibold tracking-tight text-white sm:text-3xl"
    >
      {text}
    </motion.p>
  );
}

/**
 * Scroll-bound product tour: a 400vh track with a sticky viewport-height canvas.
 * scrollYProgress (0..1) drives every transform in the child components.
 */
export function ProductTour() {
  const track = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const dashScale = useTransform(scrollYProgress, [0.75, 0.85], [1, 0.9]);

  useEffect(() => {
    const update = () =>
      setFit(
        Math.min(
          (window.innerWidth * 0.92) / (DASH_W + 24),
          (window.innerHeight * 0.58) / DASH_H,
          1
        )
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div ref={track} className="relative h-[400vh] bg-[#0A0A0A]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute left-1/2 top-1/2 -z-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[120px]"
          aria-hidden
        />
        {/* Layout box sized to the scaled dashboard */}
        <div style={{ width: DASH_W * fit, height: DASH_H * fit }} className="relative">
          <motion.div
            style={{ scale: dashScale }}
            className="absolute inset-0 origin-center"
          >
            <div
              style={{ transform: `scale(${fit})`, width: DASH_W, height: DASH_H }}
              className="relative origin-top-left"
            >
              <PortalFrame p={scrollYProgress} />
              <div className="relative">
                <DashboardMock p={scrollYProgress} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-10 h-20">
          {WINDOW_CAPTIONS.map((c) => (
            <WindowCaption key={c.text} p={scrollYProgress} {...c} />
          ))}
          <FinalCaption
            p={scrollYProgress}
            text={FINAL_CAPTION.text}
            range={FINAL_CAPTION.range}
          />
        </div>
      </div>
    </div>
  );
}
