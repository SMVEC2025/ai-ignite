import Breadcrumbs from "../../components/common/BreadCrumbs";

export default function ProblemStatements({ items = SAMPLE_ITEMS, onSelect }) {
    return (
        <>
            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                ]}
                current="Problem Statements"
                subtitle="Stay up to date with the latest updates."
            />    <main className="ps-page">


                <section className="ps-grid">
                    {items.map((p) => (
                        <article key={p.id} className="ps-card">
                            <div className="ps-card__top">
                                <div className="ps-chips">
                                    <span className="ps-chip ps-chip--outline">{p.category}</span>
                                    <span className={`ps-chip ${p.difficulty.toLowerCase()}`}>
                                        {p.difficulty}
                                    </span>
                                </div>

                            </div>

                            <h3 className="ps-card__title">{p.title}</h3>
                            <p className="ps-card__by">by {p.organizer}</p>

                            <p className="ps-card__desc">{p.description}</p>

                            <div className="ps-tags">
                                {p.tags.map((t, i) => (
                                    <span key={i} className="ps-tag">{t}</span>
                                ))}
                            </div>

                            <hr className="ps-divider" />

                            <div className="ps-card__bottom">
                                <div className="ps-reward">
                                    <span className="ps-reward__label">Rewards</span>
                                    <span className="ps-reward__value">{p.rewards}</span>
                                </div>

                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </>
    );
}

/* Sample data you can replace with Supabase fetch */
const SAMPLE_ITEMS = [
    {
        id: "1",
        category: "Agriculture",
        difficulty: "Medium",
        title: "AI-Powered Crop Disease Detection",
        organizer: "AgroTech Solutions",
        description:
            "Develop a GenAI solution to identify crop diseases using smartphone cameras and provide treatment recommendations to farmers.",
        tags: ["Computer Vision", "Mobile App", "Agriculture"],
        rewards: "₹50,000 + Internship",
        bookmarked: false,
    },
    {
        id: "2",
        category: "Healthcare",
        difficulty: "Hard",
        title: "Smart Medical Diagnosis Assistant",
        organizer: "MedCare Innovations",
        description:
            "Create an AI assistant that can analyze medical symptoms and provide preliminary diagnosis suggestions for rural healthcare centers.",
        tags: ["NLP", "Medical AI", "Diagnostics"],
        rewards: "₹75,000 + Research Collaboration",
        bookmarked: true,
    },
    {
        id: "3",
        category: "Education",
        difficulty: "Medium",
        title: "Personalized Learning Path Generator",
        organizer: "EduNext Technologies",
        description:
            "Build a GenAI system that creates customized learning paths based on student's learning style, pace, and knowledge gaps.",
        tags: ["Educational AI", "Personalization", "LLM"],
        rewards: "₹40,000 + Mentorship Program",
        bookmarked: false,
    },
    {
        id: "4",
        category: "Agriculture",
        difficulty: "Hard",
        title: "Smart Agriculture Supply Chain Optimizer",
        organizer: "FarmChain Logistics",
        description:
            "Design an AI solution to optimize the agriculture supply chain, reducing waste and improving farmer income through better market predictions.",
        tags: ["Supply Chain", "Predictive Analytics", "Optimization"],
        rewards: "₹60,000 + Partnership Opportunity",
        bookmarked: false,
    },
];