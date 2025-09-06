import React from 'react'
import Breadcrumbs from '../../components/common/BreadCrumbs'
import { MessageSquare, Phone, MapPin, Trophy } from 'lucide-react';
import Faq from '../../components/homes/home-1/Faq';
import Cta from '../../components/homes/home-1/Cta';
import Footer1 from '../../components/footers/Footer1';
const VENUE_QUERY =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5144.152075208335!2d79.631931775059!3d11.914659888311942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5358c4d27d10a9%3A0x5013c5b96143ae32!2sSri%20Manakula%20Vinayagar%20Engineering%20College!5e1!3m2!1sen!2sin!4v1757133162537!5m2!1sen!2sin";

function Index() {
    return (
        <>
            <Breadcrumbs
                items={[
                    { label: "Home", href: "/" },
                ]}
                current="Contact Us"
                subtitle="Manage your members, invites and slots here."
            />

            {/* //main */}
            <main className="contactus-page">
                {/* Section: Get in Touch */}
                <section className="contactus-section">
                    <h2 className="contactus-h2">Get in Touch</h2>

                    <div className="contactus-grid contactus-grid--two">
                        {/* General Inquiries */}
                        <article className="contactus-card contactus-card--touch">
                            <div className="contactus-card__icon" aria-hidden="true"><MessageSquare /></div>
                            <h3 className="contactus-card__title">General Inquiries</h3>
                            <p className="contactus-card__desc">
                                For questions about registration, rules, or general information
                            </p>

                            <a className="contactus-link contactus-link--big" href="mailto:hello@aiignite2025.in">
                                hello@aiignite2025.in
                            </a>

                            <div className="contactus-pill">24 X 7</div>

                            <a className="contactus-btn contactus-btn--primary contactus-btn--block"
                                href="mailto:hello@aiignite2025.in">
                                Contact Now
                            </a>
                        </article>

                        {/* Technical Support */}
                        <article className="contactus-card contactus-card--touch">
                            <div className="contactus-card__icon" aria-hidden="true"><Phone /></div>
                            <h3 className="contactus-card__title">Technical Support</h3>
                            <p className="contactus-card__desc">
                                For help with platform access, submissions, or technical issues
                            </p>

                            <a className="contactus-link contactus-link--big" href="tel:+919876543210">
                                +91 98765 43210
                            </a>

                            <div className="contactus-pill">9:00 AM - 5:00 PM</div>

                            <a className="contactus-btn contactus-btn--outline contactus-btn--block"
                                href="tel:+919876543210">
                                Contact Now
                            </a>
                        </article>
                    </div>
                </section>

                {/* Section: Organizing Partners */}
                <section className="contactus-section">
                    <h2 className="contactus-h2">Organizing Partners</h2>

                    <div className="contactus-grid contactus-grid--two">
                        {/* SMVEC */}
                        <article className="contactus-card contactus-card--org">
                            <div className="contactus-org__row">
                                <h3 className="contactus-org__name">SMVEC</h3>
                                <span className="contactus-chip">Primary Organizer</span>
                            </div>

                            <p className="contactus-org__entity">Sri Manakula Vinayagar Engineering College</p>

                            <div className="contactus-list">
                                <div className="contactus-item">
                                    <span className="contactus-item__icon" aria-hidden="true">✉️</span>
                                    <a className="contactus-link" href="mailto:registrar@smvec.ac.in">
                                        registrar@smvec.ac.in
                                    </a>
                                </div>
                                <div className="contactus-item">
                                    <span className="contactus-item__icon" aria-hidden="true">📍</span>
                                    <span className="contactus-text">Puducherry, India</span>
                                </div>
                            </div>
                        </article>

                        {/* LLMatScale.ai */}
                        <article className="contactus-card contactus-card--org">
                            <div className="contactus-org__row">
                                <h3 className="contactus-org__name">LLMatScale.ai</h3>
                                <span className="contactus-chip contactus-chip--gold">Technology Partner</span>
                            </div>

                            <p className="contactus-org__entity">AI Innovation &amp; Scale Platform</p>

                            <div className="contactus-list">
                                <div className="contactus-item">
                                    <span className="contactus-item__icon" aria-hidden="true">✉️</span>
                                    <a className="contactus-link" href="mailto:hello@llmatscale.ai">
                                        hello@llmatscale.ai
                                    </a>
                                </div>
                                <div className="contactus-item">
                                    <span className="contactus-item__icon" aria-hidden="true">📍</span>
                                    <span className="contactus-text">Bangalore, India</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                {/* Section: Finale Venue */}
                <section className="contactus-section">
                    <h2 className="contactus-h2">Finale Venue</h2>

                    <article className="contactus-card contactus-card--venue">
                        <div className="contactus-venue__left">
                            <p className="contactus-muted">Onsite finale location and details</p>

                            <h3 className="contactus-venue__name">
                                Sri Manakula Vinayagar Engineering College
                            </h3>

                            <div className="contactus-list">
                                <div className="contactus-item">
                                    <span className="contactus-item__icon" aria-hidden="true"><MapPin /></span>
                                    <span className="contactus-text">
                                        Madagadipet, Puducherry – 605 107<br />Tamil Nadu, India
                                    </span>
                                </div>

                                <div className="contactus-item">
                                    <span className="contactus-item__icon" aria-hidden="true"><Trophy /></span>
                                    <span className="contactus-text">
                                        <b>Finale:</b> September 14–15, 2025
                                    </span>
                                </div>
                            </div>

                            <a
                                className="contactus-btn contactus-btn--primary"
                                href={`${VENUE_QUERY}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View on Map
                            </a>
                        </div>

                        <div className="contactus-venue__right">
                            <iframe
                                title="SMVEC Map"
                                className="contactus-map"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5144.152075208335!2d79.631931775059!3d11.914659888311942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5358c4d27d10a9%3A0x5013c5b96143ae32!2sSri%20Manakula%20Vinayagar%20Engineering%20College!5e1!3m2!1sen!2sin!4v1757133162537!5m2!1sen!2sin`}
                            />
                        </div>

                    </article>
                </section>
            </main>
            <Faq/>
            <Cta />
            <Footer1 />
        </>
    )
}

export default Index
