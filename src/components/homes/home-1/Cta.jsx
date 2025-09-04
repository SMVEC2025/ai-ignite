import React from "react";

export default function Cta() {
  return (
    <div className="cta">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-12">
            <div className="cta-wrapper">
              <div className="ellipse item1" />
              <div className="ellipse item2" />
              <div className="ellipse item3" />
              <div className="ellipse item4" />
              <div className="cta-title">
                <h6>Ready to Shape the Future of AI?</h6>
                <h2>
                 Start Your Application 
                  <span className="animation-text">Today!</span>
                </h2>
              </div>
              <div className="cta-content">
                <p>
                 Join India's most prestigious GenAI hackathon and  <br />{" "}
                  showcase your innovative solutions
                </p>
                <div className="flex gap20">
                  <a href="#" className="tf-button style-1">
                    Apply Now <i className="icon-arrow-right2" />
                  </a>
                  <a href="#" className="tf-button style-1 active">
                    contact us <i className="icon-arrow-right2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
