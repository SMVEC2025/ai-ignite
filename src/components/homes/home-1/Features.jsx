import { listItems } from "../../../data/features";
import React from "react";

export default function Design() {
  return (
    <div className="wg-create-design pt-130">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-6">
            <div className="image">
              <div className="rectangle" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="content">
              <div className="heading-section wow fadeInUp style-2">
                <h6>About this Hackathon</h6>
                <div className="main-title">AI IGNITE 2025</div>
              </div>

              <p>
                <b className="p_color">AI IGNITE 2025</b> is a national-level hackathon that sparks innovation,
                challenges creativity, and fuels the next generation of AI leaders.
                From online shortlisting to onsite finale, it’s a journey where students,
                developers, and innovators come together to turn bold ideas into impactful
                solutions.
              </p>

              <ul className="list-item">
                <li>
                  <i className="icon-tick" />
                  3 Stages: Online Application, Virtual Mentoring & Onsite Finale
                </li>
                <li>
                  <i className="icon-tick" />
                  Solve real-world problems using AI, IoT, Robotics & Smart Tech
                </li>
                <li>
                  <i className="icon-tick" />
                  Mentorship from industry experts & academia
                </li>
                <li>
                  <i className="icon-tick" />
                  Exciting prizes, recognition & startup incubation opportunities
                </li>
              </ul>

              <a href="#register" className="tf-button type-2">
                <span>Register Now</span>
                <i className="icon-arrow-right2" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
