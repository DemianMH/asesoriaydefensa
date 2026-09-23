"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "whatsapp";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-colors duration-300 px-7 py-3.5 text-sm sm:text-base select-none overflow-hidden";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 text-navy-950 shadow-[0_8px_30px_-8px_rgba(201,162,39,0.55)] hover:shadow-[0_10px_40px_-6px_rgba(201,162,39,0.7)]",
  outline:
    "border border-gold-400/70 text-gold-200 hover:text-navy-950 hover:bg-gold-400",
  ghost: "text-white/90 hover:text-gold-300",
  whatsapp:
    "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_8px_30px_-8px_rgba(16,185,129,0.55)] hover:shadow-[0_10px_40px_-6px_rgba(16,185,129,0.7)]",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function AnimatedButton(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", className = "", icon } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <motion.span
      className="relative z-10 inline-flex items-center gap-2"
      initial={false}
    >
      {children}
      {icon}
    </motion.span>
  );

  const motionProps = {
    whileHover: { scale: 1.045, y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  };

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <motion.a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...motionProps}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.span className="inline-block" {...motionProps}>
        <Link href={props.href} className={classes}>
          {content}
        </Link>
      </motion.span>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <motion.button
      type={buttonProps.type || "button"}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      className={`${classes} disabled:opacity-60 disabled:pointer-events-none`}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
