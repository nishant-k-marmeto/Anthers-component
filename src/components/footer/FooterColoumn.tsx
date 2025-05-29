import React from 'react';

interface FooterLink {
  name: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterColumnProps {
  columns: FooterColumn[];
  logo?: {
    src: string;
    alt: string;
  };
  className?: string;
}

const FooterColumn: React.FC<FooterColumnProps> = ({
  columns,
  logo,
  className = "",
}) => {
  // Calculate grid columns based on number of sections
  const getGridCols = (numColumns: number) => {
    if (numColumns <= 2) return 'grid-cols-1 md:grid-cols-2';
    if (numColumns <= 3) return 'grid-cols-2 md:grid-cols-3';
    if (numColumns <= 4) return 'grid-cols-2 md:grid-cols-4';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'; // For 5 or more columns
  };

  // Calculate the container layout based on whether there's a logo
  const containerLayout = logo ? 'xl:grid xl:grid-cols-3 xl:gap-8' : '';

  return (
    <footer className={`bg-white ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className={containerLayout}>
          {logo && (
            <img
              alt={logo.alt}
              src={logo.src}
              className="h-9"
            />
          )}
          
          <div className={`mt-16 ${logo ? 'xl:col-span-2 xl:mt-0' : ''}`}>
            <div className={`grid ${getGridCols(columns.length)} gap-8`}>
              {columns.map((column, columnIndex) => (
                <div key={`column-${columnIndex}`} className={columnIndex > 0 ? 'mt-10 md:mt-0' : ''}>
                  <h3 className="text-sm/6 font-semibold text-gray-900">
                    {column.title}
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {column.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-sm/6 text-gray-600 hover:text-gray-900"
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterColumn;
  