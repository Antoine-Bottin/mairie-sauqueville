"use client";

import { usePathname } from "next/navigation";

const AlertBannerWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <>{children}</>;
};

export default AlertBannerWrapper;
