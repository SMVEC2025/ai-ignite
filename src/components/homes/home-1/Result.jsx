import Counter from "../../../components/common/Counter";
import React from "react";

export default function Result() {
  return (
    <div className="wg-result pt-130">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center wow fadeInUp">
              <div className="sub-title">
                Professionals &amp; teams choose SMVEC
              </div>
              <div className="main-title">
                Best Experience &amp; Power Ai Content&nbsp;
                <br /> Generator That Delivers{" "}
                <span className="animation-text">Premium Results</span>
              </div>
            </div>
            <div className="counter text-center">
              <div className="number-counter">
                <Counter parentClass={"number"} max={9684201} min={1684201} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
