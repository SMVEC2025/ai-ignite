import { Link } from "react-router-dom";

export default function Breadcrumbs({ items = [], current, subtitle }) {
  return (
    <div className="team-breadcrumbs team-breadcrumbs--dark">
      <div className="team-breadcrumbs__content">
        {/* Title + Subtitle */}
        <h1 className="team-breadcrumbs__title">{current}</h1>

        {/* Breadcrumbs */}
        <nav className="team-breadcrumbs__nav" aria-label="Breadcrumb">
          <ol className="team-breadcrumbs__list">
            {items.map((item, idx) => (
              <li key={idx} className="team-breadcrumbs__item">
                <Link to={item.href} className="team-breadcrumbs__link">
                  {item.label}
                </Link>
                <span className="team-breadcrumbs__sep">›</span>
              </li>
            ))}
            <li className="team-breadcrumbs__item team-breadcrumbs__item--current">
              {current}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
