"use client";

import * as React from "react";
import clsx from "clsx";

type PropsWithClass = React.PropsWithChildren<{ className?: string }>;

export function Menu({ children, className }: PropsWithClass) {
  return <div className={clsx("inline-block", className)}>{children}</div>;
}

export function MenuList({ children, className }: PropsWithClass) {
  return <ul className={clsx("flex gap-4", className)}>{children}</ul>;
}

export function MenuItem({ children, className, ...props }: any) {
  return (
    <li {...props} className={clsx("list-none", className)}>
      {children}
    </li>
  );
}

export function MenuLink({ children, className, asChild, ...props }: any) {
  if (asChild && React.isValidElement(props.children)) {
    return React.cloneElement(props.children, { className: clsx(className, props.children.props.className) });
  }

  return (
    <a className={clsx(className)} {...props}>
      {children}
    </a>
  );
}

export default Menu;
