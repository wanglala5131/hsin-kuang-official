'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  PaintBrushIcon,
  RectangleGroupIcon,
  ScissorsIcon,
  SparklesIcon,
  Square3Stack3DIcon,
  StopCircleIcon,
  SwatchIcon,
  TagIcon,
} from '@heroicons/react/24/solid';

import ImageWithSpinner from '@/app/_components/ImageWithSpinner';
import type { CustomizationItem } from '@/app/[lang]/(public)/customization/_data';

const PALETTE = ['bg-background', 'bg-warm-gray/30'];
const CONTENT_PALETTE_DESKTOP = ['md:bg-background', 'md:bg-warm-gray/30'];

// Icons are keyed by the item's stable `id` here (client-side) rather than
// traveling through the data layer, since function props can't cross the
// Server -> Client Component boundary.
const ICONS: Record<string, typeof TagIcon> = {
  'shape-weave': Square3Stack3DIcon,
  usage: TagIcon,
  material: SwatchIcon,
  'color-size': RectangleGroupIcon,
  'core-elastic': StopCircleIcon,
  printing: PaintBrushIcon,
  finishing: ScissorsIcon,
  'special-processing': SparklesIcon,
};

interface TabProps {
  item: CustomizationItem;
  index: number;
  isActive: boolean;
  onSelect: (id: string) => void;
}

function VerticalTab({ item, index, isActive, onSelect }: TabProps) {
  const Icon = ICONS[item.id];

  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`flex shrink-0 cursor-pointer flex-col items-center gap-2 py-4 transition-all duration-300 ${
        PALETTE[index % PALETTE.length]
      } ${isActive ? 'w-12 opacity-100 md:w-14 ext-content-main' : 'w-9 text-content-main/50 hover:text-content-main md:w-10'}`}
    >
      <Icon className="size-4 shrink-0" />
      <span className="text-sm font-bold tracking-wide [writing-mode:vertical-rl]">
        {item.title}
      </span>
    </button>
  );
}

interface MobileMenuProps {
  items: CustomizationItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

function MobileMenu({ items, activeId, onSelect }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];
  const ActiveIcon = ICONS[activeItem.id];

  return (
    <div className="relative p-3 md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl bg-warm-gray px-4 py-3.5 text-content-main shadow-sm transition-colors active:bg-warm-gray/70"
      >
        <span className="flex items-center gap-2 text-base font-bold">
          <ActiveIcon className="size-5 shrink-0 text-brand" />
          {activeItem.title}
        </span>
        <ChevronDownIcon
          className={`size-5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul className="absolute inset-x-3 top-full z-20 mt-2 max-h-72 overflow-y-auto rounded-xl border border-border-subtle bg-background shadow-lg">
            {items.map((item) => {
              const Icon = ICONS[item.id];
              const isActive = item.id === activeId;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(item.id);
                      setOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left text-base font-bold transition-colors ${
                      isActive
                        ? 'bg-warm-gray/30 text-brand'
                        : 'text-content-main hover:bg-warm-gray/15'
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

function ContentPanel({
  item,
  index,
  renderImage,
}: {
  item: CustomizationItem;
  index: number;
  // Only the shown (or animating-out) panel should fire an image request —
  // every other panel stays mounted for sizing but must not fetch its image.
  renderImage: boolean;
}) {
  const Icon = ICONS[item.id];

  return (
    <div
      className={`flex h-full min-h-full flex-col gap-4 border border-warm-gray/30 bg-background p-6 md:border-0 md:p-8 ${CONTENT_PALETTE_DESKTOP[index % CONTENT_PALETTE_DESKTOP.length]}`}
    >
      <h3 className="flex items-center font-wen-kai-zh text-2xl font-bold text-brand md:text-3xl">
        <Icon className="mr-2 size-8 shrink-0" />
        {item.title}
      </h3>

      <p className="max-w-md text-md text-content-main/85 md:text-lg">
        {item.description}
      </p>

      <ul className="flex max-w-md list-disc flex-col gap-1.5 pl-5 text-sm text-content-main/80">
        {item.bulletList.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <figure className="w-full max-w-xs">
        <div className="relative h-50 w-full overflow-hidden rounded-lg bg-black/5">
          {renderImage && (
            <ImageWithSpinner
              src={item.image}
              alt={item.imageCaption}
              sizes="20rem"
              className={`object-cover ${item.imageClassName}`}
            />
          )}
        </div>
        <figcaption className="mt-1.5 text-xs text-content-main/60">
          {item.imageCaption}
        </figcaption>
      </figure>

      {/* TODO 考慮是否要做 */}
      {/* <ArrowLink href="/collections" className="mt-auto ml-auto">
        看範例產品
      </ArrowLink> */}
    </div>
  );
}

interface Props {
  items: CustomizationItem[];
}

export default function CustomizationDeck({ items }: Props) {
  const [activeId, setActiveId] = useState(items[0].id);
  const [outgoing, setOutgoing] = useState<{
    id: string;
    direction: 'forward' | 'backward';
  } | null>(null);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const activeIndex = items.findIndex((item) => item.id === activeId);

  const handleSelect = (id: string) => {
    if (id === activeId) return;

    const targetIndex = items.findIndex((item) => item.id === id);
    const dir: 'forward' | 'backward' =
      targetIndex > activeIndex ? 'forward' : 'backward';

    setOutgoing({ id: activeId, direction: dir });
    setDirection(dir);
    setActiveId(id);
  };

  const indexed = items.map((item, index) => ({ item, index }));
  const leftTabs = indexed.slice(0, activeIndex + 1);
  const rightTabs = indexed.slice(activeIndex + 1);

  const contentArea = (
    <div className="relative flex-1 overflow-hidden">
      <div className="grid h-full w-full">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const isOutgoing = outgoing?.id === item.id;

          let animationClass = 'invisible';
          if (outgoing && outgoing.id === item.id) {
            animationClass =
              outgoing.direction === 'forward'
                ? 'animate-slide-out-left'
                : 'animate-slide-out-right';
          } else if (isActive) {
            animationClass =
              direction === 'forward'
                ? 'animate-slide-in-right'
                : 'animate-slide-in-left';
          }

          return (
            <div
              key={item.id}
              className={`col-start-1 row-start-1 ${animationClass}`}
              onAnimationEnd={isOutgoing ? () => setOutgoing(null) : undefined}
            >
              <ContentPanel
                item={item}
                index={index}
                renderImage={isActive || isOutgoing}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-border-subtle md:border-0 md:shadow-sm md:ring-1 md:ring-border-subtle">
        <MobileMenu items={items} activeId={activeId} onSelect={handleSelect} />

        <div className="flex">
          <div className="hidden shrink-0 md:flex">
            {leftTabs.map(({ item, index }) => (
              <VerticalTab
                key={item.id}
                item={item}
                index={index}
                isActive={item.id === activeId}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {contentArea}

          <div className="hidden shrink-0 md:flex">
            {rightTabs.map(({ item, index }) => (
              <VerticalTab
                key={item.id}
                item={item}
                index={index}
                isActive={item.id === activeId}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
