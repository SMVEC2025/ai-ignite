import React, { useState } from 'react';

const FAQS = [
  {
    q: 'Who can participate?',
    a: 'Students and professionals aged 18+ can participate. You can join solo or form a team of up to four members.'
  },
  {
    q: 'Is the event online or offline?',
    a: 'Qualifiers and mentoring are conducted online. The final round will be held offline at SMVEC, Puducherry.'
  },
  {
    q: 'How do I create or join a team?',
    a: 'After login, create a team from your dashboard or join via an invite magic link shared by a teammate.'
  },
  {
    q: 'What are the allowed login methods?',
    a: 'Email + password with OTP verification, plus sign-in via Google or GitHub.'
  },
  {
    q: 'Who owns the project IP?',
    a: 'By default, your team owns your project. You grant the organizers a limited license to showcase the work for event operations and promotion.'
  }
];

export default function index() {
  const [open, setOpen] = useState(0);

  return (
    <div className="c_legal-wrap">
      <div className="c_legal-card">
        <header className="c_legal-header">
          <h1 className="c_legal-title">FAQs</h1>
          <p className="c_legal-subtitle">Quick answers about AI Ignite 2025</p>
        </header>

        <ul className="c_faq-list">
          {FAQS.map((f, i) => (
            <li className={`c_faq-item ${open === i ? 'is-open' : ''}`} key={f.q}>
              <button className="c_faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <span className="c_faq-icon">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <div className="c_faq-a">{f.a}</div>}
            </li>
          ))}
        </ul>

        <div className="c_legal-note">
          Still need help? Write to <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.
        </div>
      </div>
    </div>
  );
}
