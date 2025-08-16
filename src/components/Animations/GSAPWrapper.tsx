import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GSAPWrapperProps {
  children: ReactNode;
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "slideInUp" | "stagger";
  duration?: number;
  delay?: number;
  trigger?: boolean;
  className?: string;
  staggerDelay?: number;
}

export default function GSAPWrapper({
  children,
  animation = "fadeInUp",
  duration = 0.8,
  delay = 0,
  trigger = true,
  className = "",
  staggerDelay = 0.1,
}: GSAPWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animateElement = () => {
      switch (animation) {
        case "fadeInUp":
          gsap.fromTo(
            element,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration, delay, ease: "power2.out" }
          );
          break;

        case "fadeInLeft":
          gsap.fromTo(
            element,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration, delay, ease: "power2.out" }
          );
          break;

        case "fadeInRight":
          gsap.fromTo(
            element,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration, delay, ease: "power2.out" }
          );
          break;

        case "scaleIn":
          gsap.fromTo(
            element,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration, delay, ease: "back.out(1.7)" }
          );
          break;

        case "slideInUp":
          gsap.fromTo(
            element,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration, delay, ease: "power3.out" }
          );
          break;

        case "stagger":
          const children = element.children;
          gsap.fromTo(
            children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration,
              stagger: staggerDelay,
              delay,
              ease: "power2.out",
            }
          );
          break;

        default:
          gsap.fromTo(
            element,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration, delay, ease: "power2.out" }
          );
      }
    };

    if (trigger) {
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        once: true,
        onEnter: animateElement,
      });
    } else {
      animateElement();
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [animation, duration, delay, trigger, staggerDelay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}