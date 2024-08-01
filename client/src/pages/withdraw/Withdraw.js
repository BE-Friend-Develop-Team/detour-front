import React, {useState} from "react";
import S from "./style";
import {useNavigate} from "react-router-dom";

const Withdraw = () => {

    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const [profileData] = useState(null);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmDelete = () => {
        if (password.trim() === "") {
            alert("비밀번호를 입력해주세요.");
            return;
        }
        setIsModalOpen(true);
    };

    const handleCancelDelete = () => {
        alert("계정 탈퇴가 취소되었습니다.");
        navigate("/"); // Navigate to the main page
    };

    const handleFinalConfirm = async () => {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            console.log("accessToken not set");
        }

        try {
            console.log('Access Token:', accessToken);
            console.log('Password:', password);
            // Mock API call for account deletion
            const response = await fetch("http://localhost:8081/api/users/withdrawal", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": accessToken
                },
                body: JSON.stringify({
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete account");
            }

            alert("계정이 성공적으로 탈퇴되었습니다.");
            setIsModalOpen(false);
            navigate("/login"); // 계정 탈퇴 시 로그인 페이지로 이동
        } catch (error) {
            console.error("Error during account deletion:", error);
            alert("계정 탈퇴에 실패했습니다.");
        }
    };

    const handleFinalCancel = () => {
        setIsModalOpen(false);
    };

    const handleModalClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            setIsModalOpen(false);
        }
    };


    return (
        <S.Main>
            <S.ProfileSection>
                <S.ProfileSectionH2>❌ 계정 탈퇴</S.ProfileSectionH2>
                <S.ProfileDetails>
                    <S.NicknameContainer>
                        <S.NicknameContainerSpan>
                            <S.NicknameLabel>계정 닉네임</S.NicknameLabel>
                            <S.VirticalLine>ㅣ</S.VirticalLine>
                            <S.NicknameValue>이창봉</S.NicknameValue> {/*{profileData.nickname*/}
                        </S.NicknameContainerSpan>
                    </S.NicknameContainer>
                </S.ProfileDetails>
                <S.DeleteAccountContainer>
                    <S.DeleteAccountContainerH3>계정 탈퇴를 위해 비밀번호를 입력해주세요</S.DeleteAccountContainerH3>
                    <S.DeleteAccountContainerInput
                        type={"password"}
                        id={"passwordInput"}
                        placeholder={"비밀번호를 입력하세요"}
                        onChange={handlePasswordChange}>
                    </S.DeleteAccountContainerInput>
                    <S.WithdrawButtonContainer>
                        <S.WithdrawButtonPrimary onClick={handleConfirmDelete}>탈퇴하기</S.WithdrawButtonPrimary>
                        <S.WithdrawButtonSecondary onClick={handleCancelDelete}>취소</S.WithdrawButtonSecondary>
                    </S.WithdrawButtonContainer>
                </S.DeleteAccountContainer>
            </S.ProfileSection>

            {isModalOpen && (
                <S.WithdrawModal onClick={handleModalClickOutside}>
                    <S.WithdrawModalContent>
                        <S.WithdrawModalH3>정말 탈퇴하시겠습니까?</S.WithdrawModalH3>
                        <S.WithdrawButtonContainer>
                            <S.WithdrawButtonPrimary onClick={handleFinalConfirm}>예</S.WithdrawButtonPrimary>
                            <S.WithdrawButtonSecondary onClick={handleFinalCancel}>아니오</S.WithdrawButtonSecondary>
                        </S.WithdrawButtonContainer>
                    </S.WithdrawModalContent>
                </S.WithdrawModal>
            )}
        </S.Main>
    );
};

export default Withdraw;
