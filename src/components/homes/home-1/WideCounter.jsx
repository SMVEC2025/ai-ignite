import React, { useEffect, useMemo, useState } from "react";
export default function WideCountdown() {
  const target = useMemo(() => new Date(2025, 9, 24, 0, 0, 0, 0), []);

  const compute = () => {
    const now = new Date();
    let diff = target.getTime() - now.getTime();

    const isPast = diff <= 0;
    if (isPast) diff = 0; // clamp

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(diff / day);
    const hours = Math.floor((diff % day) / hour);
    const minutes = Math.floor((diff % hour) / minute);

    return { days, hours, minutes, isPast };
  };

  const [left, setLeft] = useState(compute);

  useEffect(() => {
    const id = setInterval(() => setLeft(compute()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="wc-wrapper">
      <div className="wc-inner">
        <h1 className="wc-heading">
          Finals  – <span className="wc-date">24 & 25 Oct 2025</span>
        </h1>

        <h2 className="wc-subheading">Venue: SMVEC, Engineering College, Pondicherry</h2>

        <div className="wc-grid">
          <TimeBlock label="Days" value={left.days} />
          <Divider />
          <TimeBlock label="Hours" value={left.hours} />
          <Divider />
          <TimeBlock label="Minutes" value={left.minutes} />
        </div>

        <div className="wc-note">
          {left.isPast ? (
            <span>Finals date has passed.</span>
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
}

function TimeBlock({ label, value }) {
  return (
    <div className="wc-block">
      <div className="wc-value">{String(value).padStart(2, "0")}</div>
      <div className="wc-label">{label}</div>
    </div>
  );
}

function Divider() {
  return <div className="wc-divider" aria-hidden />;
}
