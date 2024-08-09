import React, { useState, useEffect } from "react";
import S from "./style";
import Input from "../../components/input/style";
import DetourButton from "../../components/button/DetourButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const navigate = useNavigate();
    const [isAdminChecked, setIsAdminChecked] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false);
    const [timer, setTimer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(180);
    const [emailError, setEmailError] = useState("");
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [authCode, setAuthCode] = useState("");
    const [authCodeError, setAuthCodeError] = useState("");
    const [isAuthCodeDisabled, setIsAuthCodeDisabled] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        trigger,
        watch,
    } = useForm({ mode: "onSubmit" });

    const email = watch("email");

    const idRegex = /^[a-z0-9]{4,10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const signUpUser = async (data) => {
        const payload = {
            loginId: data.loginId,
            password: data.password,
            email: data.email,
            nickname: data.nickname,
            isAdmin: data.isAdmin,
        };

        if (isAdminChecked) {
            payload.adminToken = data.adminToken;
        }

        const response = await fetch("https://detourofficial.shop/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || "Sign Up failed");
        }

        return response.json();
    };

    const onSubmit = async (data) => {
        try {
            await signUpUser(data);
            navigate("/login");
        } catch (error) {
            console.error("Error during Sign Up", error);
        }
    };

    const handleOnClickLogin = () => {
        navigate("/login");
    };

    const startTimer = async () => {
        const isValidEmail = await trigger("email");

        if (!isValidEmail) {
            setEmailError("올바른 이메일 양식을 입력하세요");
            return;
        }

        setEmailError("");

        const userEmail = watch("email");

        setIsSendingEmail(true);
        try {
            const response = await fetch("https://detourofficial.shop/api/users/send-certification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "인증 이메일 전송에 실패하였습니다.");
            }

            const result = await response.json();
            console.log(result.message);

            setTimeLeft(180);
            setIsEmailVerified(true);
            setIsAuthCodeVerified(false);
            setTimer(setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsEmailVerified(false);
                        setIsSendingEmail(false);
                        return 180;
                    }
                    return prevTime - 1;
                });
            }, 1000));
        } catch (error) {
            setEmailError(error.message || "인증 이메일 전송에 실패하였습니다.");
            setIsSendingEmail(false);
        }
    };

    const verifyAuthCode = async () => {
        if (!authCode) {
            setAuthCodeError("인증번호를 입력해 주세요");
            return;
        }

        try {
            const userEmail = watch("email");

            const response = await fetch(`https://detourofficial.shop/api/users/verify?certificationNumber=${authCode}&email=${userEmail}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "인증번호 검증에 실패하였습니다.");
            }

            const result = await response.json();

            console.log(result.message);

            if (timer) {
                clearInterval(timer);
                setTimer(null);
            }

            setIsAuthCodeDisabled(true);
            setAuthCode("");
            setAuthCodeError("");

            setIsAuthCodeVerified(true);
        } catch (error) {
            setAuthCodeError(error.message || "인증번호 검증에 실패하였습니다.");
        }
    };

    useEffect(() => {
        if (!isEmailVerified) {
            clearInterval(timer);
        }
    }, [isEmailVerified, timer]);

    return (
        <S.Background>
            <S.YellowBackground />
            <S.WhiteBackground />
            <S.Wrapper>
                <S.SignUpLogoWrapper>
                    <Link to={"/login"} onClick={handleOnClickLogin}>
                        <img src={process.env.PUBLIC_URL + "/images/signUp/Logo.png"} alt="Logo" />
                    </Link>
                </S.SignUpLogoWrapper>
                <S.CatchphraseWrapper>
                    <img src={process.env.PUBLIC_URL + "/images/signUp/Catchphrase.png"} alt="Catchphrase" />
                </S.CatchphraseWrapper>
                <S.SignUpFormContainer>
                    <S.SignUpForm onSubmit={handleSubmit(onSubmit)}>
                        <S.SignUpLabel htmlFor="loginId">
                            <Input
                                {...register("loginId", {
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
                                {errors?.loginId?.type === "pattern" && (
                                    <S.ErrorMessage>아이디는 영어 소문자와 숫자만, 최소 4자에서 최대 10자 사이여야 합니다</S.ErrorMessage>
                                )}
                                {errors?.loginId?.type === "required" && <S.ErrorMessage>아이디를 입력해주세요</S.ErrorMessage>}
                            </S.ErrorMessageWrapper>
                        </S.SignUpLabel>
                        <S.SignUpLabel htmlFor="password">
                            <Input
                                {...register("password", {
                                    required: true,
                                    pattern: {
                                        value: passwordRegex,
                                    },
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
                                {errors?.password?.type === "pattern" && (
                                    <S.ErrorMessage>
                                        비밀번호는 영어 대문자, 소문자, 숫자, 특수문자가 모두 포함되고, 8자에서 15자 사이여야 합니다
                                    </S.ErrorMessage>
                                )}
                                {errors?.password?.type === "required" && <S.ErrorMessage>비밀번호를 입력해주세요</S.ErrorMessage>}
                            </S.ErrorMessageWrapper>
                        </S.SignUpLabel>
                        <S.SignUpLabel htmlFor="email">
                            <S.EmailInputWrapper>
                                <Input
                                    {...register("email", {
                                        required: true,
                                        pattern: {
                                            value: emailRegex,
                                        },
                                    })}
                                    variant={"white"}
                                    shape={"large"}
                                    size={"large"}
                                    color={"black"}
                                    border={"gray"}
                                    placeholder="이메일을 입력하세요"
                                    disabled={isEmailVerified || isSendingEmail}
                                />
                                <DetourButton
                                    variant={"gray"}
                                    shape={"small"}
                                    size={"small"}
                                    color={"black"}
                                    border={"gray"}
                                    disabled={isEmailVerified || isSendingEmail}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        startTimer();
                                    }}
                                >
                                    이메일 인증하기
                                </DetourButton>
                            </S.EmailInputWrapper>
                            <S.ErrorMessageWrapper>
                                {emailError ? (
                                    <S.ErrorMessage>{emailError}</S.ErrorMessage>
                                ) : (
                                    <>
                                        {errors?.email?.type === "pattern" && (
                                            <S.ErrorMessage>이메일 양식에 맞게 입력해주세요</S.ErrorMessage>
                                        )}
                                        {errors?.email?.type === "required" && (
                                            <S.ErrorMessage>이메일을 입력해주세요</S.ErrorMessage>
                                        )}
                                    </>
                                )}
                            </S.ErrorMessageWrapper>
                            {isEmailVerified && !isAuthCodeVerified && (
                                <>
                                    <S.AuthCodeWrapper>
                                        <S.SignUpLabel htmlFor="authCode">
                                            <Input
                                                value={authCode}
                                                onChange={(e) => setAuthCode(e.target.value)}
                                                variant={"white"}
                                                shape={"large"}
                                                size={"large"}
                                                color={"black"}
                                                border={"gray"}
                                                placeholder="인증번호를 입력하세요"
                                                disabled={isAuthCodeDisabled}
                                            />
                                            <S.ErrorMessageWrapper>
                                                {authCodeError && <S.ErrorMessage>{authCodeError}</S.ErrorMessage>}
                                            </S.ErrorMessageWrapper>
                                        </S.SignUpLabel>
                                        <DetourButton
                                            variant={"gray"}
                                            shape={"small"}
                                            size={"small"}
                                            color={"black"}
                                            border={"gray"}
                                            onClick={verifyAuthCode}
                                            disabled={isAuthCodeDisabled}
                                        >
                                            인증번호 확인
                                        </DetourButton>
                                    </S.AuthCodeWrapper>
                                    <S.TimerWrapper>
                                        {timeLeft > 0 ? (
                                            <S.TimerText>남은 시간: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</S.TimerText>
                                        ) : (
                                            <S.ErrorMessage>이메일을 다시 입력해 주세요</S.ErrorMessage>
                                        )}
                                    </S.TimerWrapper>
                                </>
                            )}
                            {isAuthCodeVerified && (
                                <S.SuccessMessage>이메일 인증에 성공하였습니다!</S.SuccessMessage>
                            )}
                        </S.SignUpLabel>
                        <S.SignUpLabel htmlFor="nickname">
                            <Input
                                {...register("nickname", { required: true })}
                                variant={"white"}
                                shape={"large"}
                                size={"large"}
                                color={"black"}
                                border={"gray"}
                                placeholder="닉네임을 입력하세요"
                            />
                            <S.ErrorMessageWrapper>
                                {errors?.nickname?.type === "required" && <S.ErrorMessage>닉네임을 입력해주세요</S.ErrorMessage>}
                            </S.ErrorMessageWrapper>
                        </S.SignUpLabel>
                        <S.ForAdminLabel>
                            <input type="checkbox" onChange={(e) => setIsAdminChecked(e.target.checked)} />
                            <span>관리자</span>
                        </S.ForAdminLabel>
                        {isAdminChecked ? (
                            <S.SignUpLabel htmlFor="adminToken">
                                <Input
                                    {...register("adminToken", { required: isAdminChecked })}
                                    variant={"white"}
                                    shape={"large"}
                                    size={"large"}
                                    color={"black"}
                                    border={"gray"}
                                    placeholder="관리자 키를 입력하세요"
                                />
                                <S.ErrorMessageWrapper>
                                    {errors?.adminToken?.type === "required" && <S.ErrorMessage>관리자 키를 입력해주세요</S.ErrorMessage>}
                                </S.ErrorMessageWrapper>
                            </S.SignUpLabel>
                        ) : (
                            <S.AdminInputDiv />
                        )}
                        <S.SignUpButtonWrapper>
                            <DetourButton
                                variant={"gray"}
                                shape={"small"}
                                size={"small"}
                                color={"black"}
                                border={"gray"}
                                disabled={isSubmitting || !isEmailVerified || !isAuthCodeVerified}
                            >
                                회원가입
                            </DetourButton>
                        </S.SignUpButtonWrapper>
                    </S.SignUpForm>
                </S.SignUpFormContainer>
            </S.Wrapper>
        </S.Background>
    );
};

export default SignUp;
