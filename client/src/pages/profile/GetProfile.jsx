import React, {useEffect, useState} from "react";
import S from "./style";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import DetourButton from "../../components/button/DetourButton";
import Input from "../../components/input/style";
import {setUser} from "../../modules/login";
import { useForm } from "react-hook-form";

const GetProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.login.currentUser);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [newNickname, setNewNickname] = useState(currentUser?.nickname || "");
    const [newEmail, setNewEmail] = useState(currentUser?.email || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [likedSchedules, setLikedSchedules] = useState([]);

    const handleViewAllClick = (path) => {
        navigate(path);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError: setFormError,
    } = useForm({ mode: "onSubmit" });

    const idRegex = /^[a-z0-9]{4,10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    useEffect(() => {
        fetchProfile();
        fetchUserSchedules();
        fetchUserLikedSchedules();
    }, []);

    const fetchProfile = async () => {
        setIsLoading(true);
        setError(null);

        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch("http://52.78.2.148:80/api/users/profile", {
                method: "GET",
                headers: {
                    "Authorization": accessToken
                },
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "프로필 정보를 가져오는데 실패했습니다.");
            }

            const result = await response.json();
            setProfileData(result.data);
            dispatch(setUser(result.data));
        } catch (error) {
            console.error("Error fetching profile:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserSchedules = async () => {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch("http://52.78.2.148:80/api/schedules/users?page=1", {
                method: "GET",
                headers: {
                    "Authorization": accessToken
                },
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "일정 정보를 가져오는데 실패했습니다.");
            }

            const result = await response.json();
            console.log("Liked schedules:", result);
            setSchedules(result.data.slice(0, 3)); // 앞에 있는 3개의 값만 저장
        } catch (error) {
            console.error("Error fetching schedules:", error);
            setError(error.message);
        }
    };

    const fetchUserLikedSchedules = async () => {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch("http://52.78.2.148:80/api/schedules/users/likes?page=1", {
                method: "GET",
                headers: {
                    "Authorization": accessToken
                },
            });

            if (!response.ok) {
                throw new Error("좋아요 한 일정 정보를 가져오는데 실패했습니다.");
            }

            const result = await response.json();
            console.log("Liked schedules:", result);
            setLikedSchedules(result.data.slice(0, 3)); // 앞에 있는 3개의 값만 저장
        } catch (error) {
            console.error("Error fetching liked schedules:", error);
            setError(error.message);
        }
    };

    const openModal = (content) => {
        setModalContent(content);
        setNewNickname("");
        setNewEmail("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent("");
        setNewNickname("");
        setNewEmail("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    };

    const handleEditNickname = () => {
        setNewNickname(profileData.nickname);
        openModal("edit-nickname");
    };

    const handleEditEmail = () => {
        setNewEmail(profileData.email);
        openModal("edit-email");
    };

    const handleEditPassword = () => {
        openModal("edit-password");
    };

    const handleSave = async () => {
        const accessToken = localStorage.getItem('token');
        let endpoint = '';
        let method = 'PATCH';
        let data = {};

        switch (modalContent) {
            case "edit-nickname":
                if (!newNickname.trim()) {
                    setFormError("newNickname", {
                        type: "manual",
                        message: "닉네임에 공백이 포함될 수 없습니다.",
                    });
                    return;
                }
                endpoint = '/api/users/profiles/nickname';
                data = { nickname: newNickname };
                break;
            case "edit-email":
                endpoint = '/api/users/profiles/email';
                data = { email: newEmail };
                break;
            case "edit-password":
                if (!passwordRegex.test(newPassword)) {
                    setFormError("newPassword", {
                        type: "manual",
                        message: "비밀번호는 8~15자리이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
                    });
                    return;
                }

                if (newPassword !== confirmNewPassword) {
                    setFormError("confirmNewPassword", {
                        type: "manual",
                        message: "새 비밀번호와 비밀번호 확인이 일치하지 않습니다.",
                    });
                    return;
                }

                endpoint = '/api/users/profiles/password';
                data = {
                    password: currentPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword
                };
                break;
            default:
                return;
        }

        try {
            const response = await fetch(`http://52.78.2.148:80${endpoint}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": accessToken
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                if (response.status === 400 && result.errors) {
                    // Validation 오류 처리
                    result.errors.forEach(error => {
                        alert(error.defaultMessage);
                    });
                } else {
                    throw new Error(result.message || "정보 수정에 실패했습니다.");
                }
            } else if (result.statusCode === 200) {
                alert(result.message);
                await fetchProfile();  // 프로필 정보 다시 불러오기
                closeModal();
            } else {
                throw new Error(result.message || "정보 수정에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert(error.message);
        }
    };

    const handleDeleteAccount = () => {
        navigate("/withdraw");
    };

    if (isLoading) {
        return <S.LoadingMessage>프로필 정보를 불러오는 중입니다...</S.LoadingMessage>;
    }

    if (error) {
        return <S.ErrorMessage>{error}</S.ErrorMessage>;
    }

    if (!profileData) {
        return <S.ErrorMessage>프로필 정보를 불러올 수 없습니다.</S.ErrorMessage>;
    }

    return (
        <S.Main>
            <S.Section className="profile">
                <S.SectionTitle>😊 나의 프로필</S.SectionTitle>
                <S.ProfileInfo>
                    <S.ProfilePicture>
                        <img src={process.env.PUBLIC_URL + "/images/profile/profile.jpeg"} alt="Profile" />
                    </S.ProfilePicture>
                    <S.ProfileDetails>
                        <S.ProfileDetailItem>
                            아이디 <span>{profileData.loginId}</span>
                        </S.ProfileDetailItem>
                        <S.ProfileDetailItem>
                            닉네임 <span>{profileData.nickname}</span>
                            <DetourButton onClick={handleEditNickname} variant="yellow" shape="small" size="small" color="black" border="gray">
                                변경
                            </DetourButton>
                        </S.ProfileDetailItem>
                        <S.ProfileDetailItem>
                            이메일 <span>{profileData.email}</span>
                            <DetourButton onClick={handleEditEmail} variant="yellow" shape="small" size="small" color="black" border="gray">
                                변경
                            </DetourButton>
                        </S.ProfileDetailItem>
                        <S.ProfileDetailItem>
                            비밀번호 <span>********</span>
                            <DetourButton onClick={handleEditPassword} variant="yellow" shape="small" size="small" color="black" border="gray">
                                변경
                            </DetourButton>
                        </S.ProfileDetailItem>
                    </S.ProfileDetails>
                </S.ProfileInfo>
                <S.DeleteAccountButton onClick={handleDeleteAccount}>계정 탈퇴</S.DeleteAccountButton>
            </S.Section>

            <S.Section className="trips-collection">
                <S.TripsHeader>
                    <S.SectionTitle>📅 내 일정 모음</S.SectionTitle>
                    <S.ViewAllButton onClick={() => handleViewAllClick("/mytrip")}>전체보기</S.ViewAllButton>
                </S.TripsHeader>
                <S.Trips>
                    {schedules.map((schedule) => (
                        <S.TripArticle key={schedule.scheduleId}>
                            <S.ImageContainer>
                                <img src={schedule.imageUrl} alt={schedule.title} />
                                <S.TripLocation>{schedule.title}</S.TripLocation>
                                <S.DetailButton>상세보기</S.DetailButton>
                            </S.ImageContainer>
                            <S.TitleContainer>
                                <S.TripTitle>{schedule.title}</S.TripTitle>
                            </S.TitleContainer>
                        </S.TripArticle>
                    ))}
                </S.Trips>
            </S.Section>

            <S.Section className="favorite-trips">
                <S.TripsHeader>
                    <S.SectionTitle>❤️ 내가 좋아요 한 일정 모음</S.SectionTitle>
                    <S.ViewAllButton onClick={() => handleViewAllClick("/mylike")}>전체보기</S.ViewAllButton>
                </S.TripsHeader>
                <S.Trips>
                    {likedSchedules.map((schedule) => (
                        <S.TripArticle key={schedule.scheduleId}>
                            <S.ImageContainer>
                                <img src={schedule.imageUrl} alt={schedule.title} />
                                <S.TripLocation>{schedule.title}</S.TripLocation>
                                <S.DetailButton>상세보기</S.DetailButton>
                            </S.ImageContainer>
                            <S.TitleContainer>
                                <S.TripTitle>{schedule.title}</S.TripTitle>
                            </S.TitleContainer>
                        </S.TripArticle>
                    ))}
                </S.Trips>
            </S.Section>

            {isModalOpen && (
                <S.Modal id="modal">
                    <S.ModalContent>
                        <S.CloseButton onClick={closeModal}>×</S.CloseButton>
                        {modalContent === "edit-nickname" && (
                            <S.EditSection id="edit-nickname">
                                <h3>닉네임 변경</h3>
                                <Input
                                    value={newNickname}
                                    onChange={(e) => setNewNickname(e.target.value)}
                                    variant="white"
                                    shape="small"
                                    size="small"
                                    color="black"
                                    border="gray"
                                    placeholder="변경할 닉네임을 입력해주세요"
                                />
                                {errors.newNickname && <S.ErrorMessage>{errors.newNickname.message}</S.ErrorMessage>}
                                <S.ButtonContainer>
                                    <DetourButton onClick={handleSave} variant="yellow" shape="small" size="small" color="black" border="gray">
                                        확인
                                    </DetourButton>
                                    <DetourButton onClick={closeModal} variant="gray" shape="small" size="small" color="black" border="gray">
                                        취소
                                    </DetourButton>
                                </S.ButtonContainer>
                            </S.EditSection>
                        )}
                        {modalContent === "edit-email" && (
                            <S.EditSection id="edit-email">
                                <h3>이메일 변경</h3>
                                <form onSubmit={handleSubmit(handleSave)}>
                                    <Input
                                        {...register("newEmail", {
                                            required: true,
                                            pattern: {
                                                value: emailRegex,
                                                message: "유효한 이메일 주소 형식을 입력해주세요."
                                            }
                                        })}
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        variant="white"
                                        shape="small"
                                        size="small"
                                        color="black"
                                        border="gray"
                                        placeholder="변경할 이메일을 입력해주세요"
                                    />
                                    {errors.newEmail && <S.ErrorMessage>{errors.newEmail.message}</S.ErrorMessage>}
                                    <S.ButtonContainer>
                                        <DetourButton type="submit" variant="yellow" shape="small" size="small"
                                                      color="black" border="gray">
                                            확인
                                        </DetourButton>
                                        <DetourButton onClick={closeModal} variant="gray" shape="small" size="small"
                                                      color="black" border="gray">
                                            취소
                                        </DetourButton>
                                    </S.ButtonContainer>
                                </form>
                            </S.EditSection>
                        )}
                        {modalContent === "edit-password" && (
                            <S.EditSection id="edit-password">
                                <h3>비밀번호 변경</h3>
                                <form onSubmit={handleSubmit(handleSave)}>
                                    <Input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        variant="white"
                                        shape="small"
                                        size="small"
                                        color="black"
                                        border="gray"
                                        placeholder="현재 비밀번호를 입력해주세요"
                                    />
                                    <Input
                                        type="password"
                                        {...register("newPassword", {
                                            required: true,
                                            pattern: {
                                                value: passwordRegex,
                                                message: "비밀번호는 8~15자리이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
                                            }
                                        })}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        variant="white"
                                        shape="small"
                                        size="small"
                                        color="black"
                                        border="gray"
                                        placeholder="새 비밀번호를 입력해주세요"
                                    />
                                    {errors.newPassword && <S.ErrorMessage>{errors.newPassword.message}</S.ErrorMessage>}
                                    <Input
                                        type="password"
                                        {...register("confirmNewPassword", {
                                            required: true
                                        })}
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        variant="white"
                                        shape="small"
                                        size="small"
                                        color="black"
                                        border="gray"
                                        placeholder="새 비밀번호를 다시 입력해주세요"
                                    />
                                    {errors.confirmNewPassword && <S.ErrorMessage>{errors.confirmNewPassword.message}</S.ErrorMessage>}
                                    <S.ButtonContainer>
                                        <DetourButton type="submit" variant="yellow" shape="small" size="small" color="black" border="gray">
                                            확인
                                        </DetourButton>
                                        <DetourButton onClick={closeModal} variant="gray" shape="small" size="small" color="black" border="gray">
                                            취소
                                        </DetourButton>
                                    </S.ButtonContainer>
                                </form>
                            </S.EditSection>
                            )}
                    </S.ModalContent>
                </S.Modal>
            )}
        </S.Main>
    );
};

export default GetProfile;