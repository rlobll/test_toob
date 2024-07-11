import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Section1 = () => {
  return (
    <SwiperWrapper>
      <SwiperContainer>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={0} // 슬라이드 간의 간격 설정
          slidesPerView={1} // 한 번에 보여줄 슬라이드 수 설정
          pagination={{ clickable: true }} // 페이지네이션 클릭 가능 설정
          // navigation
          // direction={"vertical"} 아래서 위로 사진이 움직임
          autoplay={{
            delay: 3000, // 3초마다 슬라이드 변경
            disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
          }}
          loop={true} // 마지막 슬라이드에서 첫 슬라이드로 순환
          effect="fade" // 부드러운 페이드 효과를 위해 추가
        >
          <SwiperSlide>
            <Section>
              <img src="/codingtest/photo_01.jpg" alt="사진1" />
            </Section>
          </SwiperSlide>
          <SwiperSlide>
            <Section>
              <img src="/codingtest/photo_02.jpg" alt="사진2" />
            </Section>
          </SwiperSlide>
          <SwiperSlide>
            <Section>
              <img src="/codingtest/photo_03.jpg" alt="사진3" />
            </Section>
          </SwiperSlide>
        </Swiper>
      </SwiperContainer>
    </SwiperWrapper>
  );
};

export default Section1;

const SwiperWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  z-index: 1;
`;

const SwiperContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

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
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;
