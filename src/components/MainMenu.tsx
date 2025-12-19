"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Menu as MenuIcon, Home, FileText, GitBranch } from "lucide-react";
import clsx from "clsx";

export default function MainMenu() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const items = [
    { href: "/", label: "Home", Icon: Home, external: false },
    { href: "https://exam1-smoky.vercel.app/", label: "Exam 1", Icon: FileText, external: true },
    { href: "https://github.com/Mistaklein/finalexam", label: "Git 1", Icon: GitBranch, external: true },
  ];

  return (
    <div ref={ref} className="fixed top-4 left-4 z-50">
      <button
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
      >
        <MenuIcon size={18} />
        <span className="font-medium">Menu</span>
      </button>

      {open && (
        <nav
          role="menu"
          aria-label="Main menu"
          className="mt-2 w-48 rounded-md shadow-lg border bg-[var(--color-bg,#ffffff)]"
        >
          <ul className="py-2">
            {items.map(({ href, label, Icon, external }) => {
              const isActive = !external && pathname === href;
              const linkProps = external
                ? {
                    href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : { href };
              return (
                <li key={href} role="none">
                  <Link
                    {...linkProps}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 text-sm w-full",
                      "text-[var(--color-text)] hover:bg-[var(--color-primary-light)]",
                      isActive && "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                    )}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
