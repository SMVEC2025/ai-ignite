import { faqs } from "../../data/faq";
import React, { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
export default function Accordion({
  faqData = faqs,
  toggleClass = "flat-toggle",
}) {
  const parentRefs = useRef([]);
  const questionRefs = useRef([]);
  const answerRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    questionRefs.current.forEach((el) => {
      el.classList.remove("active");
    });
    parentRefs.current.forEach((el) => {
      el.classList.remove("active");
    });
    answerRefs.current.forEach((el) => {
      el.style.height = "0px";
      el.style.overflow = "hidden";
      el.style.transition = "all 0.5s ease-in-out";
      el.style.marginBottom = "0px";
    });
    if (currentIndex !== -1) {
      questionRefs.current[currentIndex].classList.add("active");
      parentRefs.current[currentIndex].classList.add("active");
      const element = answerRefs.current[currentIndex];
      element.style.height = element.scrollHeight + "px";
      element.style.overflow = "hidden";
      element.style.transition = "all 0.5s ease-in-out";
      element.style.marginBottom = "1.55em";
    }
  }, [currentIndex]);
  return (
    <>
      {faqData.map((elm, index) => (
        <div
          ref={(el) => (parentRefs.current[index] = el)}
          key={index}
          className={`${toggleClass} active wow fadeInUp`}
          onClick={() => {
            setCurrentIndex((pre) => (pre == index ? -1 : index));
          }}
          style={{ cursor: "pointer" }}
        >
          <h4
            ref={(el) => (questionRefs.current[index] = el)}
            className="toggle-title active"
          >
            {elm.title}
            <span className="arrowicon"><ArrowDown /></span>

          </h4>
          <div
            ref={(el) => (answerRefs.current[index] = el)}
            className="toggle-content"
            style={{ display: "block" }}
          >
            <p>{elm.content}</p>
          </div>
        </div>
      ))}
    </>
  );
}
