import React, { useEffect } from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DetourButton from "../../components/button/DetourButton";
import Input from "../../components/input/style";
import { useForm } from "react-hook-form";
import { setUser, setUserStatus } from "../../modules/login";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.login.currentUser);
    const userStatus = useSelector((state) => state.login.isLogin);

    // 로그인이 되어있을 시 메인페이지로 이동
    useEffect(() => {
        console.log(userStatus);
        if (userStatus) {
            navigate("/");
        }
    }, [userStatus, navigate]);

    // useForm
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isSubmitted, errors },
        setError,
    } = useForm({ mode: "onSubmit" });

    // id 정규식
    const idRegex = /^[a-z0-9]{4,10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;

    // 로그인 눌렀을 시 fetch
    const onSubmit = async (data) => {
        try {
            // fetch 날리는 주소 체크후 수정해야함
            const response = await fetch("http://52.78.2.148:80/api/users/login", {
                // const response = await fetch("http://localhost:8000/user/passportLogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    loginId: data.id,
                    password: data.password,
                }),
            });
            console.log(response, "response data");
            console.log(response.ok);

            console.log([...response.headers.entries()]);

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "Login failed");
            }

            const authHeader = response.headers.get('Authorization');
            console.log(authHeader);
            const result = await response.json();
            console.log(result);
            console.log(result.user);

            let { token, user } = result;
            console.log(token, user);
            // store에 로그인 데이터 업데이트
            dispatch(setUser(result.user));
            dispatch(setUserStatus(true));
            localStorage.setItem("token", authHeader);
            // 메인 페이지로 이동
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Error during login:", error);
            setError("id", {
                type: "mismatch",
                message: "아이디 또는 비밀번호가 일치하지 않습니다.",
            });
            setError("password", {
                type: "mismatch",
                message: "아이디 또는 비밀번호가 일치하지 않습니다.",
            });
        }
    };

    // 회원가입으로 이동
    const onClickSignUp = () => {
        navigate("/signUp");
    };

    // 카카오 로그인
    const onClickKakaoSignUp = () => {
        const kakaoAuthURL = `http://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
        window.location.href = kakaoAuthURL;
        console.log("Kakao Client ID:", process.env.REACT_APP_KAKAO_CLIENT_ID);
        console.log("Kakao Redirect URI:", process.env.REACT_APP_KAKAO_REDIRECT_URI);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            const getKakaoToken = async () => {
                try {
                    // 백엔드에서 인증 코드로 JWT를 요청
                    const response = await fetch(`http://52.78.2.148:80/api/users/login/oauth2/code/kakao?code=${code}`, {
                        method: "GET",
                        credentials: "include",
                    });

                    if (response.ok) {
                        const result = await response.json();
                        const { data: token } = result; // JWT 토큰을 받아옵니다.

                        if (token) {
                            localStorage.setItem("token", token); // 로컬 스토리지에 JWT 토큰 저장
                            dispatch(setUserStatus(true)); // 사용자 로그인 상태 업데이트
                            navigate("/", { replace: true }); // 홈 페이지로 리다이렉트
                        } else {
                            console.error("JWT token is missing from the response");
                        }
                    } else {
                        console.error("Kakao login failed");
                    }
                } catch (error) {
                    console.error("Error fetching Kakao token:", error);
                }
            };
            getKakaoToken();
        }
    }, [navigate, dispatch]);

    return (
        <S.Background>
            <S.YellowBackground />
            <S.WhiteBackground />
            <S.Wrapper>
                <S.CharacterWrapper>
                    <img src={process.env.PUBLIC_URL + "/images/login/Character.png"} alt="character" />
                </S.CharacterWrapper>
                <S.LogoWrapper>
                    <img src={process.env.PUBLIC_URL + "/images/login/Logo.png"} alt="logo" />
                </S.LogoWrapper>
                <S.LoginFormWrapper>
                    <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <S.LoginInputContainer>
                            <Input
                                {...register("id", {
                                    required: true,
                                    pattern: {
                                        value: idRegex,
                                    },
                                })}
                                variant={"white"}
                                shape={"large"}
                                size={"large"}
                                color={"black"}
                                border={"gray"}
                                placeholder="아이디를 입력하세요"
                            />
                            <S.ErrorMessageWrapper>
                                {errors?.id?.type === "required" && <S.ErrorMessage>아이디를 입력해주세요!</S.ErrorMessage>}
                                {errors?.id?.type === "mismatch" && <S.ErrorMessage>아이디 또는 비밀번호를 확인해주세요!</S.ErrorMessage>}
                            </S.ErrorMessageWrapper>
                            <Input
                                {...register("password", {
                                    required: true,
                                })}
                                type="password"
                                variant={"white"}
                                shape={"large"}
                                size={"large"}
                                color={"black"}
                                border={"gray"}
                                placeholder="비밀번호를 입력하세요"
                            />
                            <S.ErrorMessageWrapper>
                                {errors?.password?.type === "required" && <S.ErrorMessage>비밀번호를 입력해주세요!</S.ErrorMessage>}
                                {errors?.password?.type === "mismatch" && <S.ErrorMessage>아이디 또는 비밀번호를 확인해주세요!</S.ErrorMessage>}
                            </S.ErrorMessageWrapper>
                        </S.LoginInputContainer>
                        <S.LoginButtonContainer>
                            <DetourButton type="submit" variant={"gray"} shape={"small"} size={"small"} color={"black"} border={"gray"} disabled={isSubmitting}>
                                로그인
                            </DetourButton>
                            <DetourButton type="button" variant={"gray"} shape={"small"} size={"small"} color={"black"} border={"gray"} onClick={onClickSignUp}>
                                회원가입
                            </DetourButton>
                        </S.LoginButtonContainer>
                        <S.KakaoLoginButtonWrapper>
                            <DetourButton type="button" variant={"kakao"} shape={"large"} size={"large"} color={"black"} border={"default"} onClick={onClickKakaoSignUp}>
                                카카오 로그인
                            </DetourButton>
                        </S.KakaoLoginButtonWrapper>
                    </S.LoginForm>
                </S.LoginFormWrapper>
            </S.Wrapper>
        </S.Background>
    );
};

export default Login;
