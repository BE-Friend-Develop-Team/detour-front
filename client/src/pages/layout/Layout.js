import React from "react";
import S from "./style";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <S.Background>
            <S.Wrapper>
                <S.Header>
                    <S.HeaderContainer>
                        <S.MainLogo>
                            <img src={process.env.PUBLIC_URL + "/images/layout/Logo.png"} alt="Logo" />
                        </S.MainLogo>
                        <S.UserContainer>
                            <a href="#">이창봉님 환영합니다💕</a>
                            <a href="#">로그아웃</a>
                        </S.UserContainer>
                    </S.HeaderContainer>
                    <S.Navbar>
                        <ul>
                            <li>
                                <a href="#">💌일정 생성</a>
                            </li>
                            <li>
                                <a href="#">🛫여행 기록</a>
                            </li>
                            <li>
                                <a href="#">🚩마이페이지</a>
                            </li>
                            <li>
                                <a href="#">📃리뷰 남기기</a>
                            </li>
                        </ul>
                    </S.Navbar>
                </S.Header>
                <S.Main>
                    <Outlet />
                </S.Main>
                <S.Footer>
                    <p>&copy; 2024 DETOUR. All rights reserved.</p>
                </S.Footer>
            </S.Wrapper>
        </S.Background>
    );
};

export default Layout;
