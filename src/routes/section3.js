import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Section3 = () => {
  //Second
  // 현재 상태를 관리하는 state ('default', 'hovered', 'notHovered')
  const [state, setState] = useState("default");
  // 현재 스타일을 관리하는 state
  const [style, setStyle] = useState({
    // 초기 배경색 (오렌지)
    backgroundColor: "#f90",
    // 초기 테두리 없음
    border: "none",
  });

  // state가 변경될 때마다 스타일 업데이트
  useEffect(() => {
    if (state === "default") {
      setStyle({
        backgroundColor: "#f90", //오렌지 배경
        border: "none", // 테두리 없음
      });
    } else if (state === "hovered") {
      setStyle({
        backgroundColor: "#2ca", //민트색 배경
        border: "20px solid #00c", //파란색 테두리
      });
    } else if (state === "notHovered") {
      setStyle({
        backgroundColor: "#0c0", //초록색 배경
        border: "20px solid #c00", // 빨간색 테두리
      });
    }
  }, [state]);

  //마우스가 요소에 들어갔을 때 호출되는 함수
  const handleMouseEnter = () => {
    setState("hovered");
  };

  //마우스가 요소에서 나갔을 때 호출되는 함수
  const handleMouseLeave = () => {
    setState("notHovered");
    // 1초 후 기본 상태로 돌아가도록 설정
    setTimeout(() => setState("default"), 1000);
  };

  //Third
  // 총 클릭 수를 저장하는 state
  const [totalClicks, setTotalClicks] = useState(0);
  // 3번 div 클릭 수를 저장하는 state
  const [blockClicks, setBlockClicks] = useState(0);

  useEffect(() => {
    // localStorage에서 저장된 총 클릭 수를 불러옴
    // const storedTotalClicks = localStorage.getItem("totalClicks");
    // if (storedTotalClicks) {
    //   setTotalClicks(parseInt(storedTotalClicks, 10));
    // }

    // 페이지 어디든 클릭 시 실행되는 함수
    const handleClick = () => {
      setTotalClicks((prevClicks) => {
        const newClicks = prevClicks + 1;
        // localStorage.setItem("totalClicks", newClicks.toString());
        return newClicks;
      });
    };

    document.addEventListener("click", handleClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // 3번 div 클릭 시 실행되는 함수
  const handleDivClick = () => {
    setBlockClicks((prevClicks) => prevClicks + 1);
  };

  return (
    <Wrapper>
      <Section>
        <First>
          1<TextOverlay>Hello World</TextOverlay>
        </First>
      </Section>
      <Section>
        <Second
          backgroundColor={style.backgroundColor}
          border={style.border}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          2
        </Second>
      </Section>
      <Section>
        <Third onClick={handleDivClick}>
          <ThirdBlock totalClicks={totalClicks}>3-1</ThirdBlock>
          <ThirdBlock blockClicks={blockClicks}>3-2</ThirdBlock>
        </Third>
      </Section>
    </Wrapper>
  );
};

export default Section3;

const Wrapper = styled.div`
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;

  @media (max-width: 1280px) {
    gap: 20px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }

  z-index: 1;
`;

// 전체를 감싸는 컨테이너 스타일
const Section = styled.div`
  text-align: center;
  border: 2px solid #000;
`;

const First = styled.div`
  width: 200px;
  height: 200px;
  background: #000;
  color: #fff;
  transition: 600ms;
  position: relative;
  overflow: hidden;
`;

const TextOverlay = styled.div`
  position: absolute;
  width: calc(100% - 4px); // border를 고려하여 너비 조정
  height: calc(100% - 4px); // border를 고려하여 높이 조정
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -100%;
  left: 0;
  opacity: 0;
  transition: all 600ms;

  ${First}:hover & {
    bottom: 0;
    opacity: 1;
  }

  ${First}:not(:hover) & {
    bottom: 100%;
    opacity: 0;
  }

  @media (max-width: 1280px) {
    // 1280px 이하에서는 오버레이 효과를 비활성화
    display: none;
  }
`;

// 동적 스타일을 적용할 수 있는 내부 컴포넌트
const Second = styled.div`
  width: 200px;
  height: 200px;
  background: #f90; // 기본 배경색 (오렌지)
  // 테두리를 너비/높이에 포함
  box-sizing: border-box;

  @media (min-width: 1281px) {
    // 동적 배경색
    background: ${(props) => props.backgroundColor};
    // 동적 테두리
    border: ${(props) => props.border};
  }
`;

// 3번 div의 스타일
const Third = styled.div`
  width: 200px;
  height: 200px;
  background: #aaa;
  position: relative;

  // 1280px 이하에서 나타날 숫자 3을 위한 스타일
  &::before {
    content: "3";
    position: absolute;
    left: 50%;
    transform: translate(-50%, -10%);
    display: none; // 기본적으로는 숨김

    @media (max-width: 1280px) {
      display: block; // 1280px 이하에서 보이게 함
    }
  }
`;

// 3-1과 3-2 블록의 공통 스타일
const ThirdBlock = styled.div`
  width: 200px;
  height: 100px;
  position: relative;

  // 첫 번째 ThirdBlock(3-1)에 적용되는 스타일
  &:first-of-type::before {
    // 총 클릭 수 표시
    content: "${(props) => props.totalClicks}";
    position: absolute;
    top: 50%;
    left: 50%;
    // 정중앙에 위치
    transform: translate(-50%, -50%);
  }

  // 두 번째 ThirdBlock(3-2)에 적용되는 스타일
  &:last-of-type::after {
    // 3번 div 클릭 수 표시
    content: "${(props) => props.blockClicks}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 1280px) {
    // 1280px 이하에서는 클릭 후 나타나는 횟수 비활성화
    display: none;
  }
`;
