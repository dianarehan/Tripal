import { faqData } from "./tourSingleContent";
import React, { useState } from "react";

export default function Faq() {
  const [currentActiveFaq, setCurrentActiveFaq] = useState(0);
  return (
    <>
      {faqData.map((elm, i) => (
        <div key={i} className="col-12">
          <div
            className={`accordion__item px-20 py-15 border-1 rounded-12 ${
              currentActiveFaq == i ? "is-active" : ""
            } `}
          >
            <div
              className="accordion__button d-flex items-center justify-between"
              onClick={() => setCurrentActiveFaq((pre) => (pre == i ? -1 : i))}
            >
              <div className="button text-16 text-dark-1">{elm.question}</div>

              <div className="accordion__icon size-30 flex-center bg-light-2 rounded-full"style={{color:'var(--color-stone)'}}>
                <i className="icon-plus" style={{color:'var(--color-light-purple)'}}></i>
                <i className="icon-minus"style={{color:'var(--color-light-purple)'}}></i>
              </div>
            </div>

            <div
              className="accordion__content"
              style={currentActiveFaq == i ? { maxHeight: "150px" } : {}}
            >
              <div className="pt-20">
                <p>{elm.answer}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
