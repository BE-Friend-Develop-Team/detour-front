import React, { useState, useEffect } from "react";
import S from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserStatus } from "../../modules/login";

const Layout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation(); // useLocation 훅 사용

    const [isLoading, setIsLoading] = useState(true);
    const [storedUser, setStoredUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('nickname');
        setStoredUser(storedUser);
        if (storedUser == null) {
            navigate("/login");
        }
        setIsLoading(false);
    }, []);

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('token');

            if (!accessToken) {
                throw new Error("로그인 상태가 아닙니다.");
            }

            // 서버에 로그아웃 요청 보내기
            const response = await fetch("http://localhost:8081/api/users/logout", {
                method: "POST",
                headers: {
                    "Authorization": accessToken,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("로그아웃 요청에 실패했습니다.");
            }

            const result = await response.json();
            console.log(result.message);

            // 로컬 스토리지에서 토큰 삭제
            localStorage.removeItem('token');

            // 로그인 페이지로 리디렉션
            navigate('/login');
        } catch (error) {
            console.error("로그아웃 중 오류 발생:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <S.Background>
            <S.Wrapper>
                <S.Header>
                    <div className="header-top">
                        <S.MainLogo>
                            <a href="/"><img src={process.env.PUBLIC_URL + "/images/layout/Logo.png"} alt="Logo" /></a>
                        </S.MainLogo>
                        <S.SearchBarTop>
                            <input type="text" placeholder="🔍 내용을 입력해 주세요" />
                        </S.SearchBarTop>
                        <S.UserContainer>
                            <span className="welcome-name">{storedUser}</span>님 환영합니다💕
                            <a href="#" onClick={handleLogout}>로그아웃</a>
                        </S.UserContainer>
                    </div>
                    <S.Navbar>
                        <ul>
                            <li><a href="/schedules" className={location.pathname === '/schedules' ? 'current-page' : ''}>💌일정 생성</a></li>
                            <li><a href="/trip" className={location.pathname === '/trip' ? 'current-page' : ''}>🛫여행 기록</a></li>
                            <li><a href="/profile" className={location.pathname === '/profile' ? 'current-page' : ''}>🚩마이페이지</a></li>
                            <li><a href="/reviews" className={location.pathname === '/reviews' ? 'current-page' : ''}>📃리뷰 남기기</a></li>
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
