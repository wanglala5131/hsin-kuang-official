'use client';

export enum CirclePhase {
  Idle = 'idle',
  Filling = 'filling',
  Clearing = 'clearing',
}

const RADIUS = 44;
const SVG_SIZE = 112;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ITEM_HEIGHT = 32;

const circleProps = {
  cx: SVG_SIZE / 2,
  cy: SVG_SIZE / 2,
  r: RADIUS,
  strokeWidth: 2,
  fill: 'none',
};

interface BannerIndicatorProps {
  total: number;
  activeIndex: number;
  phase: CirclePhase;
  displayTime: number;
  transitionTime: number;
}

export default function BannerIndicator({
  total,
  activeIndex,
  phase,
  displayTime,
  transitionTime,
}: BannerIndicatorProps) {
  const getStrokeStyles = () => {
    if (phase === CirclePhase.Idle) {
      return {
        strokeDashoffset: CIRCUMFERENCE,
        transition: 'none',
      };
    }
    // CIRCUMFERENCE -> 0
    if (phase === CirclePhase.Filling) {
      return {
        strokeDashoffset: 0,
        transition: `stroke-dashoffset ${displayTime}ms linear`,
      };
    }
    // 0 -> -CIRCUMFERENCE. Clear the circle in a clockwise direction
    return {
      strokeDashoffset: -CIRCUMFERENCE,
      transition: `stroke-dashoffset ${transitionTime}ms ease-in-out`,
    };
  };

  return (
    <div className="absolute bottom-12 right-12 z-20 flex items-center justify-center w-24 h-24 md:w-28 md:h-28 pointer-events-none select-none">
      <svg
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        className="absolute inset-0 w-full h-full -rotate-90"
      >
        <circle {...circleProps} className="stroke-white/20" />
        <circle
          {...circleProps}
          className="stroke-white"
          strokeDasharray={CIRCUMFERENCE}
          strokeLinecap="round"
          style={getStrokeStyles()}
        />
      </svg>

      <div className="flex items-center text-white font-sans text-2xl font-light tracking-wider drop-shadow-md">
        <span>0</span>
        <div className="relative h-8 w-4 overflow-hidden">
          <div
            className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{
              transform: `translateY(-${activeIndex * ITEM_HEIGHT}px)`,
            }}
          >
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className="h-8 flex items-center justify-center leading-none"
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
