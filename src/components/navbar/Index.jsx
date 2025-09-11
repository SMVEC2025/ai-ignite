import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Menu, X, LogOut } from "lucide-react"
import { useAuth } from "../../context/AuthContext";
import { MdOutlineLogout } from "react-icons/md";
import { logout } from "../../lib/logout";
import { useNavigate, Link } from "react-router-dom";
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
        } finally {
            setShowProfile(false);
        }
    }
    async function handleLogout() {
        try {
            await logout(nav)

        } catch (err) {
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
                    <li><Link className="nav__link" to="/">Home</Link></li>
                    <li><Link className="nav__link" to="/team">Team</Link></li>
                    <li><Link className="nav__link" to="/timeline">Timeline</Link></li>
                    <li><Link className="nav__link" to="/problem-statement">Problems</Link></li>
                    {/* <li><Link className="nav__link" to="/resources">Resources</Link></li>
                    <li><Link className="nav__link" to="/sessions">Sessions</Link></li>
                    <li><Link className="nav__link" to="/mentors">Mentors</Link></li> */}
                    {/* <li><Link className="nav__link" to="/community">Community</Link></li> */}
                    <li><Link className="nav__link" to="/announcements">Announcements</Link></li>
                    <li><Link className="nav__link" to="/contact-us">Contact</Link></li>
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
                            <span className="profile">{session?.user?.email[0]}</span>{session?.user?.email}
                        </a>
                        <button className="nav__close" onClick={close}>
                            <X />
                        </button>
                    </div>

                    <ul className="nav__drawerLinks" onClick={close}>
                        <li><Link className="nav__link" to="/">Home</Link></li>
                        <li><Link className="nav__link" to="/team">Team</Link></li>
                        <li><Link className="nav__link" to="/timeline">Timeline</Link></li>
                        <li><Link className="nav__link" to="/problem-statement">Problems</Link></li>
                        {/* <li><Link className="nav__link" to="/resources">Resources</Link></li>
                        <li><Link className="nav__link" to="/sessions">Sessions</Link></li>
                        <li><Link className="nav__link" to="/mentors">Mentors</Link></li> */}
                        {/* <li><Link className="nav__link" to="/community">Community</Link></li> */}
                        <li><Link className="nav__link" to="/announcements">Announcements</Link></li>
                        <li><Link className="nav__link" to="/contact-us">Contact Us</Link></li>
                    </ul>
                    <a className="log-out" onClick={handleLogout}>Log Out</a>
                    <a className="nav__drawerCTA" href="#" onClick={close}>Apply Now</a>
                </aside>
            </>

        </header>
    );
}
