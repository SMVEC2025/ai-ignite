import React from 'react';

export default function Index() {
  return (
    <div className="c_legal-wrap">
      <div className="c_legal-card">
        <header className="c_legal-header">
          <h1 className="c_legal-title">Privacy Policy</h1>
          <p className="c_legal-subtitle">AI Ignite 2025 Hackathon — Effective date: 01 Oct 2025</p>
        </header>

        <section className="c_legal-section">
          <h2>What we collect</h2>
          <p>
            We collect the information you provide (name, email, phone, institute/company), team & submission details,
            authentication data (email/OTP/SSO), and usage logs (e.g., IP, device, pages viewed). Optional profile fields
            (e.g., course, CGPA) are collected only if you submit them.
          </p>
        </section>

        <section className="c_legal-section">
          <h2>How we use it</h2>
          <p>
            We use data to run the event: authenticate participants, manage teams, evaluate submissions, communicate
            updates, and improve our platform. We may anonymize data for analytics and reporting.
          </p>
        </section>

        <section className="c_legal-section">
          <h2>Sharing</h2>
          <p>
            We share data with service providers (e.g., hosting, email, authentication) under contract to operate the
            hackathon. We may publish winners and project summaries. We do not sell your personal data.
          </p>
        </section>

        <section className="c_legal-section">
          <h2>Retention</h2>
          <p>
            We retain personal data only as long as needed for the event and our legitimate interests (e.g., audit,
            security), or as required by law. You can request deletion after the event unless we must keep it.
          </p>
        </section>

        <section className="c_legal-section">
          <h2>Security</h2>
          <p>
            We apply reasonable administrative, technical, and physical safeguards. However, no system is 100% secure.
            Please use strong, unique passwords and enable MFA where available.
          </p>
        </section>

        <section className="c_legal-section">
          <h2>Children</h2>
          <p>
            The hackathon is not intended for children under 13. If you believe a child provided us personal data,
            contact us to remove it.
          </p>
        </section>

        <section className="c_legal-section">
          <h2>Your rights</h2>
          <p>
            Subject to local law, you may request access, correction, deletion, or restriction of your personal data.
            Email us at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.
          </p>
        </section>

        <section className="c_legal-section">
          <h2>International transfers</h2>
          <p>
            Our providers may process data outside your region. If so, we rely on appropriate safeguards and contractual
            protections.
          </p>
        </section>

        <section className="c_legal-section">
          <h2>Cookies & third parties</h2>
          <p>
            We use cookies and similar technologies for session management and analytics. Third-party tools (e.g.,
            Google, GitHub, Supabase) may collect data per their policies.
          </p>
        </section>

        <section className="c_legal-section">
          <h2>Updates</h2>
          <p>
            We may update this Policy. Substantial changes will be posted on this page and/or emailed to registered users.
          </p>
        </section>

        <section className="c_legal-section">
          <h2>Contact</h2>
          <p>
            For privacy questions, email <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
