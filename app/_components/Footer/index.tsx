import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const itemClassName =
    'col-span-2 grid grid-cols-subgrid items-center gap-x-3';
  const labelClassName =
    'text-xs font-medium text-content-muted tracking-wider uppercase bg-border-subtle/40 px-1.5 py-0.5 rounded text-center';
  const linkClassName =
    'hover:text-brand transition-colors underline underline-offset-4 decoration-border-subtle hover:decoration-brand';

  return (
    <footer className="relative w-full bg-warm-gray/20 border-t border-border-subtle text-content-main px-6 pt-10 pb-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-start gap-8 md:gap-12">
        <div className="flex flex-col gap-2 shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.svg"
              alt="新光織帶 Logo"
              width={60}
              height={60}
              className="h-10 w-auto object-contain"
              priority={false}
            />
            <span className="font-wen-kai-zh text-3xl font-bold tracking-wider text-brand transition-opacity group-hover:opacity-90">
              新光織帶
            </span>
          </Link>
          <p className="text-xs text-content-muted tracking-widest pl-0.5">
            提供各式走馬帶、高速帶等客製化織帶製造
          </p>
        </div>

        <div className="w-full h-px md:w-px md:h-24 bg-border-subtle shrink-0" />

        <address className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_1fr] gap-x-8 gap-y-3 text-sm text-content-main not-italic leading-relaxed">
          <div className={itemClassName}>
            <span className={labelClassName}>電話</span>
            <div className="text-content-muted">
              <Link
                href="tel:+88647552626"
                className="hover:text-brand transition-colors mr-1"
              >
                (04) 755-2626
              </Link>
              /
              <Link
                href="tel:+886928552626"
                className="hover:text-brand transition-colors ml-1"
              >
                0928-552-626
              </Link>
            </div>
          </div>

          <div className={itemClassName}>
            <span className={labelClassName}>E-mail</span>
            <Link
              href="mailto:sue4100035045@gmail.com"
              className={`${linkClassName} text-content-muted`}
            >
              sue4100035045@gmail.com
            </Link>
          </div>

          <div className={itemClassName}>
            <span className={labelClassName}>傳真</span>
            <span className="text-content-muted">(04) 755-2633</span>
          </div>

          <div className={itemClassName}>
            <span className={labelClassName}>合作夥伴</span>
            <Link
              href="https://pengsbrand.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClassName} text-content-muted`}
            >
              Peng&apos;s Laces
            </Link>
          </div>

          <div className={itemClassName}>
            <span className={labelClassName}>地址</span>
            <span className="text-content-muted">
              彰化縣和美鎮彰美路四段135號
            </span>
          </div>
        </address>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-border-subtle/60 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-content-muted">
        <p>&copy; {currentYear} 新光織帶 All Rights Reserved.</p>
        <p className="tracking-wide">Designed & Developed by Sue Wang</p>
      </div>
    </footer>
  );
}
