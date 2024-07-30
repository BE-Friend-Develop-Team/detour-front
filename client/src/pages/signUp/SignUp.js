import React, { useState } from "react";
import S from "./style";
import Input from "../../components/input/style";
import DetourButton from "../../components/button/DetourButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const navigate = useNavigate();
    const [isAdminChecked, setIsAdminChecked] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm({ mode: "onSubmit" });

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

        console.log(data);

        const response = await fetch("http://localhost:8081/api/users/signup", {
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
        console.log("Form data:", data);
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

    return (
        <S.Background>
            <S.YellowBackground />
            <S.WhiteBackground />
            <S.Wrapper>
                {/* 링크 눌렀을때 로그인 이동 */}
                <S.SignUpLogoWrapper>
                    <Link to={"/login"} onClick={handleOnClickLogin}>
                        <img src={process.env.PUBLIC_URL + "/images/signUp/Logo.png"} />
                    </Link>
                </S.SignUpLogoWrapper>
                <S.CatchphraseWrapper>
                    <img src={process.env.PUBLIC_URL + "/images/signUp/Catchphrase.png"} />
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
                                {/* {errors?.loginId?.type === "duplicate" && <S.ErrorMessage>중복된 아이디 입니다</S.ErrorMessage>} */}
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
                            />
                            <S.ErrorMessageWrapper>
                                {errors?.email?.type === "pattern" && <S.ErrorMessage>이메일 양식에 맞게 입력해주세요</S.ErrorMessage>}
                                {errors?.email?.type === "required" && <S.ErrorMessage>이메일을 입력해주세요</S.ErrorMessage>}
                                {/* {errors?.email?.type === "duplicate" && <S.ErrorMessage>중복된 이메일 입니다</S.ErrorMessage>} */}
                            </S.ErrorMessageWrapper>
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
                                {/* {errors?.nickname?.type === "duplicate" && <S.ErrorMessage>중복된 닉네임 입니다</S.ErrorMessage>} */}
                            </S.ErrorMessageWrapper>
                        </S.SignUpLabel>
                        {/* <S.SignUpLabel></S.SignUpLabel> */}
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
                            <DetourButton variant={"gray"} shape={"small"} size={"small"} color={"black"} border={"gray"} disabled={isSubmitting}>
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
