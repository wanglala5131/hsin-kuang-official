import ProductGallery from '@/app/_components/Collections/ProductGallery';
import ShareProductButton from '@/app/_components/Collections/ShareProductButton';
import type { Product } from '@/app/[lang]/(public)/collections/_data';
import type { Dictionary } from '@/app/[lang]/dictionaries';

interface Props {
  product: Product;
  dict: Dictionary['collections'];
}

export default function ProductDetail({ product, dict }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <ProductGallery images={product.images} alt={product.title} dict={dict} />

      <div className="flex flex-col gap-6">
        <div className="self-start text-2xl font-bold text-content-main">
          {product.title}
        </div>

        <div className="rounded-xl bg-warm-gray/40 p-6 ring ring-border-subtle/20">
          <ul className="flex flex-col gap-2.5">
            {product.description.map((line) => (
              <li
                key={line}
                className="flex gap-2 text-sm leading-relaxed text-content-main sm:text-base"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-border-subtle/50 px-2.5 py-1 text-sm font-medium text-content-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div>
          <ShareProductButton title={product.title} dict={dict} />
        </div>
      </div>
    </div>
  );
}
