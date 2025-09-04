import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Menu, X, LogOut } from "lucide-react"
import { useAuth } from "../../context/AuthContext";
import { MdOutlineLogout } from "react-icons/md";
import { logout } from "../../lib/logout";
import { useNavigate } from "react-router-dom";
export default function Index() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { session } = useAuth()
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef(null);
    const nav = useNavigate();

    // Scroll listener
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 200);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close on Escape
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
    }, [open]);

    const close = () => setOpen(false);
    console.log(session?.user?.email[0])
    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    async function handleLogout() {
        try {
          await logout(nav)

        } catch (err) {
            console.log(err)
        } finally {
            setShowProfile(false);
        }
    }
    return (
        <header className={`nav-header ${scrolled ? "scrolled" : ""}`}>
            {session && (
                <div className="nav-profile-holder" ref={profileRef}>
                    <div className="nav-icon" onClick={() => setShowProfile(!showProfile)}>{session?.user?.email[0]}</div>
                    {showProfile && (
                        <div className="nav-profile-text">
                            <ul>
                                <li>{session?.user?.email}</li>
                                <li onClick={() => nav("/team")}>My Team</li>
                                <li onClick={handleLogout} className="logout">Logout <MdOutlineLogout /></li>
                            </ul>

                        </div>
                    )}
                </div>
            )}
            <nav className="nav">
                {/* Brand */}
                <a className="nav__brand" href="/" aria-label="Homepage">
                    <img src="/logo.png" alt="" />
                </a>
                {/* Desktop links */}
                <ul className="nav__links">
                    <li><a className="nav__link" href="/">Home</a></li>
                    <li><a className="nav__link" href="/team">Team</a></li>
                    <li><a className="nav__link" href="/timeline">Timeline</a></li>
                    <li><a className="nav__link" href="problem-statement">Problems</a></li>
                    <li><a className="nav__link" href="/resources">Resources</a></li>
                    <li><a className="nav__link" href="/sessions">Sessions</a></li>
                    <li><a className="nav__link" href="/mentors">Mentors</a></li>
                    <li><a className="nav__link" href="/community">Community</a></li>
                    <li><a className="nav__link" href="/announcements">Announcements</a></li>
                    <li><a className="nav__link" href="/contact-us">Contact</a></li>
                </ul>

                {/* CTA (desktop) */}
                <a className="nav__cta" href="/apply">Apply Now</a>

                {/* Hamburger */}
                <button
                    className="nav__hamburger"
                    onClick={() => setOpen(true)}
                >
                    <Menu />

                </button>
            </nav>

            {/* Mobile Overlay */}
            <>
                <div className={`nav__overlay ${open ? "is-open" : ""}`} onClick={close} />


                <aside className={`nav__drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
                    <div className="nav__drawerTop">
                        <a className="nav__brand" href="/" onClick={close}>
                            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 2l7.5 4.33v11.34L12 22l-7.5-4.33V6.33L12 2z" fill="currentColor" />
                            </svg>
                            <span className="nav__brandText">YourBrand</span>
                        </a>
                        <button className="nav__close" onClick={close}>
                            <X />
                        </button>
                    </div>

                    <ul className="nav__drawerLinks" onClick={close}>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about-us">About</a></li>
                        <li><a href="#">Programs</a></li>
                        <li><a href="#">Research</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>

                    <a className="nav__drawerCTA" href="#" onClick={close}>Apply Now</a>
                </aside>
            </>

        </header>
    );
}
