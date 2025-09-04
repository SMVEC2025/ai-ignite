"use client";
import Accordion from "../../../components/common/Accordion";
import { useState } from "react";

export default function Faq() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="faqs-wrap">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section text-center wow fadeInUp">
                <h6>FAQs</h6>
                <div className="main-title">
                  Frequently Asked questions
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="flat-accordion">
                <Accordion />
              </div>
            </div>
            
          </div>
        </div>
      </div>
      {/* <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="Y8XpQpW5OVY"
        onClose={() => setOpen(false)}
      /> */}
    </>
  );
}
