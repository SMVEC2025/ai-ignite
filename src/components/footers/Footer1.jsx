import { imageSources } from "../../data/avaters";
import React from "react";
import { Link } from "react-router-dom";
import { socialMediaIcons } from "../../data/socials";

import { menuItems, menuItems2, menuItems3 } from "../../data/footer";
export default function Footer1() {
  return (
    <footer id="footer">
      
      <div className="themesflat-container">
        <div className="row">
          <div className="col-12">
            <div className="footer-top">
              <div className="logo-footer" id="logo-footer">
                <Link href={`/`}>
                  <img
                    id="logo_footer"
                    src="/logo.png"
                    alt="image"
                    width={166}
                    height={40}
                    data-retina="/assets/images/logo/logo@2x.png"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <p className="text">
              At vero eoset accusamus et iusto <br /> odio dignissimos ducimus
              blanditiis praesentium voluptatu dele
            </p>
            <ul className="wg-social">
              {socialMediaIcons.map((icon, index) => (
                <li key={index}>
                  <a href={icon.href} className={icon.className} />
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-2">
            <div className="footer-title ml-35">Product</div>
            <ul className="wg-menu ml-35">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-2">
            <div className="footer-title">Company</div>
            <ul className="wg-menu">
              {menuItems2.map((item, index) => (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
         
          <div className="col-md-3">
            <div className="footer-title ml--3">Newsletter</div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="comment-form mt-40 ml--3"
            >
              <fieldset className="email">
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  className="style-1 mb-10"
                  name="email"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <div className="">
                <button className="" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-12">
            <div className="footer-bottom">
              <p className="text mb-0">
                Copyright @{new Date().getFullYear()},{" "}
                <a className="tf-color" href="#">
                  SMVEC
                </a>{" "}
                All Rights Reserved
              </p>
              <ul className="">
                <li>
                  <a href="#">Terms Of Use </a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
