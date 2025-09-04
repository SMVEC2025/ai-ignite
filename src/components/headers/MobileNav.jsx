"use client";
import { menuItems } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function MobileNav() {
  const parentRefs = useRef([]);

  const subMenuRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  useEffect(() => {
    parentRefs.current.forEach((el) => {
      el.classList.remove("active");
    });
    subMenuRefs.current.forEach((el) => {
      el.style.height = "0px";
      el.style.overflow = "hidden";
      el.style.transition = "all 0.5s ease-in-out";
      el.style.marginTop = "0px";
    });
    if (currentIndex !== -1) {
      parentRefs.current[currentIndex].classList.add("active");
      const element = subMenuRefs.current[currentIndex];
      element.style.height = element.scrollHeight + "px";
      element.style.overflow = "hidden";
      element.style.transition = "all 0.5s ease-in-out";
      element.style.marginBottom = "10px";
    }
  }, [currentIndex]);

  const pathname = usePathname();
  const isParentActive = (links) => {
    return links.some((elm) => elm.url.split("/")[1] == pathname.split("/")[1]);
  };
  return (
    <nav id="mobile-main-nav" className="mobile-main-nav">
      <ul id="menu-mobile-menu" className="menu">
        {menuItems.map((elm, i) => (
          <li
            key={i}
            ref={(el) => (parentRefs.current[i] = el)}
            className={`menu-item ${
              elm.subMenu ? "menu-item-has-children-mobile" : ""
            } 
            ${
              isParentActive(elm.subMenu ? elm.subMenu : [])
                ? "current-menu-item"
                : ""
            }
             ${
               elm.url?.split("/")[1] == pathname.split("/")[1]
                 ? "current-menu-item"
                 : ""
             }`}
          >
            {elm.hasChildren ? (
              <a
                onClick={() => setCurrentIndex((pre) => (pre == i ? -1 : i))}
                href={elm.url}
              >
                {elm.text}
              </a>
            ) : (
              <Link className={`menu-item`} href={elm.url}>
                {elm.text}
              </Link>
            )}
            {elm.subMenu ? (
              <ul
                className="sub-menu-mobile"
                ref={(el) => (subMenuRefs.current[i] = el)}
                style={{ display: "block" }}
              >
                {elm.subMenu.map((elm2, i2) => (
                  <li
                    key={i2}
                    className={`menu-item ${
                      elm2.url.split("/")[1] == pathname.split("/")[1]
                        ? "current-item"
                        : ""
                    }`}
                  >
                    <Link href={elm2.url}>{elm2.text}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
