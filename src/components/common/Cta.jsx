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
                <h6>Get More Update</h6>
                <h2>
                  Sign Up for Your Free <br />
                SMVEC <span className="animation-text">Account!</span>
                </h2>
              </div>
              <div className="cta-content">
                <p>
                  Sed ut perspiciatis unde omnis natus sit voluptate <br />
                  totam rem aperiam eaque inventore
                </p>
                <div className="flex gap20">
                  <a href="#" className="tf-button style-1">
                    Start Your Trial Now <i className="icon-arrow-right2" />
                  </a>
                  <a href="#" className="tf-button style-1 active">
                    Contact Us <i className="icon-arrow-right2" />
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
