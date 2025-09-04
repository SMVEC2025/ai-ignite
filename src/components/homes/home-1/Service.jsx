import React from "react";
import {TvMinimal,Trophy,Users,Cpu } from 'lucide-react';
const services = [
  {
    id: 1,
    iconClass: <TvMinimal />,
    text: "Expert Mentorship",
    subtitle:"Get guidance from industry leaders and AI experts"
  },
  {
    id: 2,
    iconClass: <Trophy />,
    text: "Amazing Prizes",
    subtitle:"Win exciting rewards and recognition for innovation"
  },
  {
    id: 3,
    iconClass: <Users />,
    text: "Network Building",
    subtitle:"Connect with like-minded innovators and industry professionals"
  },
  {
    id: 4,
    iconClass: <Cpu />,
    text: "Cutting-edge Tools",
    subtitle:"Access to latest AI APIs, cloud credits, and development resources"
  },
  
];
export default function Helpfull() {
  return (
    <div className="helpful pt-130">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center wow fadeInUp">
              <h6>Event Highlights</h6>
              <div className="main-title">
                Discover More Helpful Social Media <br /> Artificial{" "}
              </div>
            </div>
          </div>
          {services.map((elm, i) => (
            <div key={i} className="col-xl-3 col-md-3 col-6">
              <div className="wg-helpful text-center">
                <div className="image">
                  <span>{elm.iconClass}</span>
                  {/* <span className={elm.iconClass} /> */}
                </div>
                <h5>
                 {elm.text}
                </h5>
                <p>{elm.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
