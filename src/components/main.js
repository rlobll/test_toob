import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <main>
      <Wrapper>
        <Name>
          과제전형
          <br />
          김은비
        </Name>
      </Wrapper>
    </main>
  );
};

export default Main;

const Wrapper = styled.div`
  // 디바이스 높이를 가득 채움
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;
`;

const Name = styled.span`
  font-size: 5rem;
  text-align: center;
  margin: auto;
  cursor: pointer;

  &:hover {
    color: #555;
  }
`;
