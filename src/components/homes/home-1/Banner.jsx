import React, { useState, useEffect, useContext } from "react";
import Counter from "../../../components/common/Counter";
import { Calendar, MapPin, Users, Sparkles, ArrowRight, Play,MoveRight } from 'lucide-react';
import { useAuth } from "../../../context/AuthContext";

export default function Banner() {

  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { session } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className="floating-element"
      style={{
        left: `${20 + (i * 15)}%`,
        top: `${30 + (i * 8)}%`,
        animationDelay: `${i * 0.5}s`,
        animationDuration: `${2 + (i * 0.3)}s`
      }}
    />
  ));
  return (
    <div className="wg-banner-1">
      <div className="bg-item">
        <div className="item-4 block-blur-2" />
        <div className="item-6 block-blur-4" />
      </div>
      <div className="themesflat-container">
        <div className="content">
          <div className="container">
            {/* Main Heading */}
            <div className="main-heading">
              <div className="event-badge">
                <div className="badge-icon">
                  <Sparkles size={25} color="#ffffffff" />
                </div>
                <span className="badge-text">NATIONAL LEVEL EVENT</span>
              </div>

              <h1 className="title">
                AI IGNITE
                <span className="animationtext letters rotate-3 animation-text tf-color">
                  <span className="cd-words-wrapper">
                    <span
                      className="item-text is-visible"
                      style={{ opacity: 1 }}
                    >
                      {"2025"
                        .split(" ")
                        .join("_")
                        .split("")
                        .map((elm, i) => (
                          <span
                            key={i}
                            className={`rorateLetterAnim ${elm == "_" ? "blankSpan" : ""
                              }`}
                            style={{ animationDelay: i * 0.07 + "s" }}
                          >
                            {elm == "_" ? " " : elm}
                          </span>
                        ))}
                    </span>
                  </span>
                </span>                </h1>

              <p className="subtitle">
                Empowering Innovation through Generative AI
              </p>
            </div>

            {/* Event Details */}
            <div className="event-details">
              <div className="event-card">
                <Calendar size={20} color="#d9f5f3ff" className="icon" />
                <span className="event-card-text">Sep 14–15, 2025</span>
              </div>

              <div className="event-card">
                <MapPin size={20} color="#d9f5f3ff" className="icon" />
                <span className="event-card-text">Hybrid Event</span>
              </div>

              <div className="event-card">
                <Users size={20} color="#d9f5f3ff" className="icon" />
                <span className="event-card-text">National Level</span>
              </div>
            </div>
          </div>
        </div>



        {
          !session && <div className="login-sinup-btns grid-button flex gap25 items-center justify-center">
            <a href="#" className="tf-button">
              <span>Sign Up With Google</span>
              <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4375 6.14062C11.4375 9.46875 9.16406 11.8125 5.8125 11.8125C2.57812 11.8125 0 9.23438 0 6C0 2.78906 2.57812 0.1875 5.8125 0.1875C7.35938 0.1875 8.69531 0.773438 9.70312 1.71094L8.10938 3.23438C6.04688 1.24219 2.20312 2.74219 2.20312 6C2.20312 8.03906 3.82031 9.67969 5.8125 9.67969C8.10938 9.67969 8.97656 8.03906 9.09375 7.17188H5.8125V5.17969H11.3438C11.3906 5.48438 11.4375 5.76562 11.4375 6.14062Z"
                  fill="white"
                />
              </svg>
            </a>
            {/* <span className="or-name">Or</span> */}
            <a href="#" className="tf-button active">
              <span>Sign Up With LinkedIn</span>
              <svg
                width={11}
                height={11}
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.34375 10.5H0.164062V3.49219H2.34375V10.5ZM1.24219 2.55469C0.5625 2.55469 0 1.96875 0 1.26562C0 0.585938 0.5625 0.0234375 1.24219 0.0234375C1.94531 0.0234375 2.50781 0.585938 2.50781 1.26562C2.50781 1.96875 1.94531 2.55469 1.24219 2.55469ZM10.4766 10.5H8.32031V7.10156C8.32031 6.28125 8.29688 5.25 7.17188 5.25C6.04688 5.25 5.88281 6.11719 5.88281 7.03125V10.5H3.70312V3.49219H5.78906V4.45312H5.8125C6.11719 3.91406 6.82031 3.32812 7.875 3.32812C10.0781 3.32812 10.5 4.78125 10.5 6.65625V10.5H10.4766Z"
                  fill="#696969"
                />
              </svg>
            </a>
          </div>
        }
        {session && (
          <div className="login-sinup-btns grid-button flex gap25 items-center justify-center">
            <a href="/team" className="tf-button">
              <span>Apply Now</span>
              <ArrowRight />
            </a>
          </div>
        )}
      </div>
    </div>



  );
}
