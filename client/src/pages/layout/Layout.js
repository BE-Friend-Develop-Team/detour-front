import React, { useState, useEffect } from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const Layout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.login.currentUser);

    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = localStorage.getItem('token').substring(7);

            if (!accessToken) {
                console.error("엑세스 토큰을 찾을 수 없습니다.");
                navigate('/login');
                return;
            }

            try {
                const response = await fetch("http://52.78.2.148:80/api/users/profile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch profile");
                }

                const result = await response.json();
                console.log("result: ", result);

                setProfileData(result.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    useEffect(() => {
        if (!isLoading && profileData == null) {
            navigate('/login');
        }
    }, [isLoading, profileData, navigate]);

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('token');

            if (!accessToken) {
                throw new Error("로그인 상태가 아닙니다.");
            }

            // 서버에 로그아웃 요청 보내기
            const response = await fetch("http://52.78.2.148:80/api/users/logout", {
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
                            <span className="welcome-name">{profileData.nickname}</span>님 환영합니다💕
                            <a href="#" onClick={handleLogout}>로그아웃</a>
                        </S.UserContainer>
                    </div>
                    <S.Navbar>
                        <ul>
                            <li><a href="/schedules">💌일정 생성</a></li>
                            <li><a href="/trip" className="current-page">🛫여행 기록</a></li>
                            <li><a href="/profile">🚩마이페이지</a></li>
                            <li><a href="#">📃리뷰 남기기</a></li>
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
