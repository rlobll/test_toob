import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Test1 = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [autoplayOption, setAutoplayOption] = useState({
    delay: 3000, // 슬라이드 간의 지연 시간 (밀리초 단위, 3000ms = 3초)
    disableOnInteraction: false, // 사용자가 슬라이드를 조작한 후에도 자동 재생을 계속할지 여부
  });

  // 창 크기가 변경될 때 windowWidth 상태를 업데이트
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // windowWidth 상태가 변경될 때마다 autoplayOption 상태를 업데이트
  useEffect(() => {
    if (windowWidth >= 768 && windowWidth < 1280) {
      setAutoplayOption(false); // 768px 이상 1280px 미만에서는 자동 재생 비활성화
    } else {
      setAutoplayOption({
        delay: 3000,
        disableOnInteraction: false,
      });
    }
  }, [windowWidth]);
  return (
    <SwiperWrapper>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30} // 슬라이드 간의 간격 설정
        pagination={{ clickable: true }} // 페이지네이션 클릭 가능 설정
        // navigation
        loop={true} // 슬라이드를 무한 루프로 설정
        autoplay={autoplayOption} // autoplayOption을 설정
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide>
          <Section>
            <img src="/codingtest/icon_01.png" alt="아이콘1" />
          </Section>
        </SwiperSlide>
        <SwiperSlide>
          <Section>
            <img src="/codingtest/icon_02.png" alt="아이콘2" />
          </Section>
        </SwiperSlide>
        <SwiperSlide>
          <Section>
            <img src="/codingtest/icon_03.png" alt="아이콘3" />
          </Section>
        </SwiperSlide>
        <SwiperSlide>
          <Section>
            <img src="/codingtest/icon_04.png" alt="아이콘4" />
          </Section>
        </SwiperSlide>
        <SwiperSlide>
          <Section>
            <img src="/codingtest/icon_05.png" alt="아이콘5" />
          </Section>
        </SwiperSlide>
      </Swiper>
    </SwiperWrapper>
  );
};

export default Test1;

const SwiperWrapper = styled.div`
  height: 100vh;
  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-slide img {
    display: block;
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  z-index: 1;
`;

const Section = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;
