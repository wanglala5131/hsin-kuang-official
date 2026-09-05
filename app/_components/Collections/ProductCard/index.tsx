import Image from 'next/image';
import Link from 'next/link';
import { TagIcon } from '@heroicons/react/24/outline';

import type { Locale } from '@/app/_lib/locale';
import type { Product } from '@/app/[lang]/(public)/collections/_data';

interface Props {
  product: Product;
  lang: Locale;
}

export default function ProductCard({ product, lang }: Props) {
  return (
    <Link
      href={`/${lang}/collections/${product.slug}`}
      className="group block rounded-2xl bg-background p-2 shadow-sm ring-1 ring-border-subtle/60 transition-shadow duration-300 hover:shadow-lg sm:p-2.5"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-warm-gray">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="pt-4">
        <h3 className="text-base font-bold text-content-main sm:text-lg">
          {product.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-sm text-content-muted"
            >
              <TagIcon className="size-3.5" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
