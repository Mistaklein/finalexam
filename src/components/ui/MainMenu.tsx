"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MenuList, MenuItem, MenuLink } from "@/components/ui/menu";
import { Home, FileText, GitBranch } from "lucide-react";
import clsx from "clsx";

export function MainMenu() {
  const pathname = usePathname();

  const items = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/exam-1",
      label: "Exam 1",
      icon: FileText,
    },
    {
      href: "/git-1",
      label: "Git 1",
      icon: GitBranch,
    },
  ];

  return (
    <Menu className="py-4">
      <MenuList>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <MenuItem key={item.href}>
              <MenuLink asChild>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                    "text-[var(--color-text)] hover:bg-[var(--color-primary-light)]",
                    isActive &&
                      "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                  )}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </MenuLink>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default MainMenu;
