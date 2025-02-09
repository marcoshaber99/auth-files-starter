"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbTitles: { [key: string]: string } = {
  dashboard: "Dashboard",
  settings: "Settings",
  profile: "Profile",
  // Add more mappings as needed
};

const breadcrumbParents: { [key: string]: { title: string; href: string } } = {
  settings: { title: "Dashboard", href: "/dashboard" },
  profile: { title: "Dashboard", href: "/dashboard" },
  // Add more parent mappings as needed
};

export function PageBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const currentPage = segments[segments.length - 1];
  const title = breadcrumbTitles[currentPage] || currentPage;
  const parent = breadcrumbParents[currentPage];

  if (segments.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parent && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={parent.href}>{parent.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
