         
import { partners } from "../../../data/partners";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
export default function Partners() {
  const swiperOptions = {
    loop: true,
    spaceBetween: 147,
    speed: 10000,
    slidesPerView: 5,
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 80,
      },
      500: {
        slidesPerView: 2,
        spaceBetween: 100,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
      1300: {
        slidesPerView: 5,
      },
    },
    modules: [Autoplay],
    autoplay: {
      delay: "0",
      disableOnInteraction: false,
    },
    observer: true,
    observeParents: true,
  };
  return (
    <div className="wg-partners">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-12">
            <div className="partners-inner">
              <Swiper
                {...swiperOptions}
                className="swiper-container e-resize"
                data-swiper=""
              >
                {partners.map((elm, i) => (
                  <SwiperSlide
                    key={i}
                    className="swiper-slide d-flex align-items-center my-auto"
                  >
                    <img
                      src={elm.src}
                      style={{ width: "200px", objectFit: "contain" }}
                      width={200}
                      height={60}
                      alt="image"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
