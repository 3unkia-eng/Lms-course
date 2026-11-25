import './Gauge.css';

/**
 * Gauge (Core · Figma 398:2015): full ring. Track = whole circle, Indicator = arc from
 * 12 o'clock, clockwise, length = value. Value in the centre, Caption under the ring.
 * Tokens: Gauge/track/border, Gauge/indicator/border, Gauge/value/text, Gauge/caption/text, Gauge/thickness.
 * Entrance: the arc draws from 0 to the value (Figma: path trim end 0 → 1); off with reduced motion.
 */
export function Gauge({ value, caption, label }: { value: number; caption: string; label?: string }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <figure className="lms-gauge" role="img" aria-label={`${label ?? caption}: ${v}%`}>
      <div className="lms-gauge__arc">
        <svg viewBox="0 0 220 220" aria-hidden="true" focusable="false">
          <circle className="lms-gauge__track" cx="110" cy="110" r="98" />
          <circle
            className="lms-gauge__indicator"
            cx="110"
            cy="110"
            r="98"
            pathLength={100}
            strokeDasharray={`${v} 100`}
          />
        </svg>
        <span className="lms-gauge__value" aria-hidden="true">{v}%</span>
      </div>
      <figcaption className="lms-gauge__caption" aria-hidden="true">{caption}</figcaption>
    </figure>
  );
}
