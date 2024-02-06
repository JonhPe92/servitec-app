"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

interface BreadcrumbProps {
  pageName: string;
}

const Breadcumb = ({ pageName }: BreadcrumbProps) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="mb-6 flex flex-col mx-2 gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/dashboard">
              Home /
            </Link>
          </li>
          <li className="font-medium text-primary-content">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcumb;
