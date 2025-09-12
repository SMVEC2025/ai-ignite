import React from 'react';

export default function Index() {
  return (
    <div className="c_legal-wrap">
      <div className="c_legal-card">
        <header className="c_legal-header">
          <h1 className="c_legal-title">Terms of Use</h1>
          <p className="c_legal-subtitle">AI Ignite 2025 Hackathon — Effective date: 01 Oct 2025</p>
        </header>

        <nav className="c_legal-toc" aria-label="Table of contents">
          <strong>On this page</strong>
          <ul>
            <li><a href="#eligibility">Eligibility</a></li>
            <li><a href="#registration">Registration & Accounts</a></li>
            <li><a href="#conduct">Code of Conduct</a></li>
            <li><a href="#ip">Intellectual Property</a></li>
            <li><a href="#submissions">Submissions & Judging</a></li>
            <li><a href="#prizes">Prizes</a></li>
            <li><a href="#privacy">Privacy & Data</a></li>
            <li><a href="#limit">Disclaimers & Liability</a></li>
            <li><a href="#changes">Changes & Cancellation</a></li>
            <li><a href="#law">Governing Law</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <section className="c_legal-section" id="eligibility">
          <h2>Eligibility</h2>
          <p>
            Participation is open to individuals (18+) and teams of up to four (4) members. By registering, you
            confirm you have the legal capacity to enter these Terms and, where applicable, permission from your
            institution or employer to participate.
          </p>
        </section>

        <section className="c_legal-section" id="registration">
          <h2>Registration & Accounts</h2>
          <p>
            You must create an account using an email and password or via approved SSO (Google/GitHub). You’re
            responsible for safeguarding your credentials. We may verify your email via OTP or magic link. False
            information or impersonation can result in disqualification.
          </p>
        </section>

        <section className="c_legal-section" id="conduct">
          <h2>Code of Conduct</h2>
          <p>
            Be respectful, inclusive, and professional. No harassment, plagiarism, cheating, or unauthorized access to
            systems. External assets, datasets, and code must be used in accordance with their licenses. We may
            disqualify teams violating this policy.
          </p>
        </section>

        <section className="c_legal-section" id="ip">
          <h2>Intellectual Property</h2>
          <p>
            Unless stated otherwise in specific challenge rules, you and your team retain IP rights in your submission.
            By submitting, you grant the organizers a non-exclusive, worldwide, royalty-free license to display,
            demo, and reference your project for event operations, judging, and promotion.
          </p>
        </section>

        <section className="c_legal-section" id="submissions">
          <h2>Submissions & Judging</h2>
          <p>
            Submissions must be your original work created during the hackathon window, with permitted use of open-source
            or prior libraries where allowed. Judging criteria may include innovation, technical quality, impact, UX, and
            presentation. Judges’ decisions are final.
          </p>
        </section>

        <section className="c_legal-section" id="prizes">
          <h2>Prizes</h2>
          <p>
            Prizes (if any) will be described on the event website. We may verify identity and eligibility before
            awarding. Taxes, fees, and compliance obligations are the winner’s responsibility. We can substitute prizes
            of equal or greater value if necessary.
          </p>
        </section>

        <section className="c_legal-section" id="privacy">
          <h2>Privacy & Data</h2>
          <p>
            We process personal data as described in our <a href="/privacy">Privacy Policy</a>. By participating, you
            consent to that processing, including communications about the event and operational notices.
          </p>
        </section>

        <section className="c_legal-section" id="limit">
          <h2>Disclaimers & Liability</h2>
          <p>
            The event is provided “as is.” To the maximum extent permitted by law, the organizers disclaim all warranties
            and are not liable for indirect, incidental, or consequential damages. Our total liability related to the
            event will not exceed INR 10,000.
          </p>
        </section>

        <section className="c_legal-section" id="changes">
          <h2>Changes & Cancellation</h2>
          <p>
            We may modify schedules, rules, venues (including online/offline format), or cancel the event if needed.
            Substantial changes will be announced on the event website or via email.
          </p>
        </section>

        <section className="c_legal-section" id="law">
          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Venue for disputes will be competent courts in Puducherry,
            India, unless required otherwise by applicable law.
          </p>
        </section>

        <section className="c_legal-section" id="contact">
          <h2>Contact</h2>
          <p>
            Questions? Email <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
