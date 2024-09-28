import Link from "next/link";
interface BreadcrumbProps {
  pages?: { url: string; name: string }[];
  pageName: string;
}
const Breadcrumb = ({ pageName, pages }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Ana Menü /
            </Link>
          </li>
          {pages?.map((item, index) => {
            return (
              <li key={index} className="font-medium text-primary">
                <Link className="font-medium" href={item.url}>
                  {item.name} /
                </Link>
              </li>
            );
          })}
          <li className="font-medium">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
