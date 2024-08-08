import React, { useState, useEffect } from "react";
import S from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Lottie from 'react-lottie';
import { useSpring, animated } from 'react-spring'; // react-spring 추가
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserStatus } from "../../modules/login";
import axios from "axios";
import heartAnimation from './heart.json'; // 하트 애니메이션 JSON 파일 임포트

const Layout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation(); // useLocation 훅 사용

    const [isLoading, setIsLoading] = useState(true);
    const [storedUser, setStoredUser] = useState(null);
    const [showHearts, setShowHearts] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('nickname');
        setStoredUser(storedUser);
        if (storedUser == null) {
            navigate("/login");
        }
        setIsLoading(false);
    }, []);

    const kakaoLogout = (kakaoToken) => {
        axios({
            method: 'POST',
            url: 'https://kapi.kakao.com/v1/user/logout',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${kakaoToken}`
            },
        }).catch((e) => {
            console.log('e : ', e)
            // 이미 만료된 토큰일 경우
            if (e.response.data.code === -401) {
                window.location.href = '/'
            }
        })
    }


    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            const kakaoToken = localStorage.getItem('Kakao-Token');

            if (!accessToken) {
                throw new Error("로그인 상태가 아닙니다.");
            }

            console.log(kakaoToken);

            if (kakaoToken) {
                console.log("카카오 로그아웃 로직 실행");
                kakaoLogout(kakaoToken);
            }

            // 서버에 로그아웃 요청 보내기
            const response = await fetch("http://localhost:8081/api/users/logout", {
                method: "POST",
                headers: {
                    "Authorization": accessToken,
                    "Kakao-Token": kakaoToken,
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

    const handleInputClick = () => {
        setShowHearts(true);
        setShowMessage(true);
        setTimeout(() => {
            setShowHearts(false);
            setShowMessage(false);
        }, 3000); // 3초 후에 하트 애니메이션 및 메시지 끄기
    };

    const messageAnimation = useSpring({
        opacity: showMessage ? 1 : 0,
        transform: showMessage ? 'translateY(0)' : 'translateY(-20px)'
    });

    const heartOptions = {
        loop: true,
        autoplay: true,
        animationData: heartAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
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
                            <input type="text" placeholder="💬" onClick={handleInputClick} />
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
                            <li><a href="/review" className={location.pathname === '/review' ? 'current-page' : ''}>📃리뷰 남기기</a></li>
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
            {showHearts && <Lottie options={heartOptions} height={400} width={400} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }} />} {/* 하트 애니메이션 */}
            {/* 메시지 컴포넌트 */}
        </S.Background>
    );
};

export default Layout;
