import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const menuItems = [
  {
    name: "메뉴1",
    subItems: [
      { name: "섹션1", link: "/section1" },
      { name: "섹션2", link: "/section2" },
    ],
  },
  {
    name: "메뉴2",
    subItems: [
      { name: "test1", link: "/test1" },
      { name: "test2", link: "/test2" },
      { name: "test3", link: "/test3" },
      { name: "test4", link: "/test4" },
    ],
  },
  {
    name: "menu3",
    subItems: [
      { name: "section3", link: "/section3" },
      { name: "test5", link: "/test5" },
    ],
  },
];

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // 메뉴에 마우스가 들어왔을 때 호출되는 함수
  const handleMenuEnter = (index) => {
    setOpenMenu(index);
  };

  // 메뉴에 마우스가 나갔을 때 호출되는 함수
  const handleMenuLeave = () => {
    setOpenMenu(null);
  };

  // 모달을 토글하는 함수
  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  // 모달 클릭 시 호출되는 함수
  const handleModalItemClick = (e, link) => {
    e.stopPropagation();
    // 페이지 이동 로직 (React Router의 navigate 함수 사용 등)
    setIsModalOpen(false);
  };

  // 모달 외부 클릭 시 모달을 닫는 함수
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Wrapper>
      <header>
        <HWrapper>
          <div>
            <StyledLink to="/">
              <LogoImage src="/codingtest/logo.png" alt="로고" />
            </StyledLink>
          </div>

          <NavWrapper>
            <Menu>
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onMouseEnter={() => handleMenuEnter(index)}
                  onMouseLeave={handleMenuLeave}
                >
                  {item.name}
                  <SubMenu isOpen={openMenu === index}>
                    {item.subItems.map((subItem, subIndex) => (
                      <SubMenuList key={subIndex}>
                        <StyledLink to={subItem.link}>
                          {subItem.name}
                        </StyledLink>
                      </SubMenuList>
                    ))}
                  </SubMenu>
                </MenuItem>
              ))}
            </Menu>

            <HamburgerIcon
              src="/codingtest/modal.png"
              onClick={toggleModal}
            ></HamburgerIcon>
          </NavWrapper>
        </HWrapper>
      </header>

      <ModalOverlay isOpen={isModalOpen} />
      <ModalMenuWrapper isOpen={isModalOpen} ref={modalRef}>
        {menuItems.map((item, index) => (
          <ModalMenuItem key={index}>
            <ModalMenuItemTitle
              onClick={() => setOpenMenu(openMenu === index ? null : index)}
            >
              <StyledLink to={item.subItems[0].link}>{item.name}</StyledLink>
            </ModalMenuItemTitle>
            <ModalSubMenu isOpen={openMenu === index}>
              {item.subItems.map((subItem, subIndex) => (
                <ModalMenuList key={subIndex}>
                  <StyledLink
                    to={subItem.link}
                    onClick={(e) => handleModalItemClick(e, subItem.link)}
                  >
                    {subItem.name}
                  </StyledLink>
                </ModalMenuList>
              ))}
            </ModalSubMenu>
          </ModalMenuItem>
        ))}
      </ModalMenuWrapper>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  padding: 0 30px;
  background: rgba(255, 255, 255, 0.5); // 배경색 생기면 하얀색으로 바꾸기
  z-index: 1000;
  position: relative;
  border-bottom: 1px solid rgb(145, 223, 102);
`;

const HWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  height: 80px;
  margin: auto;
  z-index: 1001;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
`;

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  width: 250px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  position: relative;
  padding: 10px;
  cursor: pointer;

  z-index: 1002;

  &:hover {
    background: orange;
  }
`;

const SubMenu = styled.ul`
  /* display: ${(props) => (props.isOpen ? "block" : "none")}; */
  position: absolute;
  width: 100%;
  top: 100%;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  list-style: none;

  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.isOpen ? "0" : "-20px")});
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;

  z-index: 1003;
`;

const SubMenuList = styled.li`
  padding: 5px 0;
  &:hover {
    color: rgb(145, 223, 102);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: rgb(145, 223, 102);
  }
`;

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
`;

const HamburgerIcon = styled.img`
  display: none;
  width: 40px;
  height: 40px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ModalOverlay = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
  }
`;

const ModalMenuWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2000;
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
  }
`;

const ModalMenuItem = styled.div`
  margin-bottom: 10px;

  &:first-child {
    margin-top: 60px;
  }
`;

const ModalMenuItemTitle = styled.div`
  padding: 10px;
  cursor: pointer;
  color: #fff;
  border: 1px solid #fff;
  width: 100%;
`;

const ModalSubMenu = styled.div`
  max-height: ${(props) => (props.isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const ModalMenuList = styled.div`
  color: white;
  margin: 20px 0;
  cursor: pointer;

  &:hover {
    color: rgb(145, 223, 102);
  }
`;
