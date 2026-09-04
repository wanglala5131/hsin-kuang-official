import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ArrowLink({ href, children, className = '' }: Props) {
  return (
    <Link
      href={href}
      className={`group relative inline-block pb-3 pr-6 text-content-main transition-colors duration-300 hover:text-brand ${className}`}
    >
      <span className="text-md font-semibold tracking-[0.2em] uppercase">
        {children}
      </span>
      <span className="pointer-events-none absolute -right-[5px] bottom-[10px] -left-[15px] h-[1.5px] bg-brand transition-transform duration-300 ease-out group-hover:translate-x-1.5">
        <span className="absolute right-0 h-[1.5px] w-8 origin-bottom-right rotate-[35deg] bg-brand" />
      </span>
    </Link>
  );
}
