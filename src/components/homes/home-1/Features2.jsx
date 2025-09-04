import { listItems2 } from "../../../data/features";
import React from "react";

export default function Design2() {
  return (
    <div className="wg-create-design style-1">
      <img
        className="item1 block-star"
        src="/assets/images/item-background/start.png"
        width={100}
        height={100}
        alt="image"
      />
      <div className="item2 block-blur-1" />
      <div className="item3 block-blur-2" />
      <div className="item4 block-blur-3" />
      <div className="item5 block-blur-4" />
      <img
        className="item6"
        src="/assets/images/item-background/dot.png"
        width={463}
        height={300}
        alt="image"
      />
      <div className="themesflat-container">
        <div className="row">
          <div className="col-lg-5 ">
            <div className="content">
              <div className="heading-section wow fadeInUp">
                <h6>Create Amazing Design</h6>
                <div className="main-title">
                  Online, Intuitive Design <br /> Editor{" "}
                  <span className="animation-text">Integration</span>
                </div>
              </div>
              <p className="">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti
                dolores et quas molestias excepturi sint occaecati cupiditate
                provident, similique sunt in culpa qui officia deserunt mollitia
              </p>
              <ul className="list-item">
                {listItems2.map((elm, i) => (
                  <li key={i}>
                    <i className="icon-check" />
                    {elm.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-7 ">
            <div className="image">
              <img
                className="img-01"
                src="/assets/images/bg-section/image-03.png"
                alt="image"
                width={640}
                height={540}
              />
              <img
                className="img-02"
                src="/assets/images/bg-section/image-04.png"
                alt="image"
                width={345}
                height={345}
              />
              <img
                className="img-03"
                src="/assets/images/item-background/dot.png"
                alt="image"
                width={463}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
