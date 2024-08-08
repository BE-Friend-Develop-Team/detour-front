import React, { useEffect, useState } from "react";
import S from "./style";
import { useParams, useNavigate } from "react-router-dom";
import { Button, StyledImg, ButtonText, InputField, ModalContent1 } from "../../components/button/ButtonStyled";
import LocationPlaceModal from './LocationPlaceModal';
import { useSelector } from "react-redux";

const { kakao } = window;

const SchedulesDetail = () => {
    const { scheduleId } = useParams();
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalPlaceOpen, setIsModalPlaceOpen] = useState(false);
    const [inviteUserId, setInviteUserId] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [error, setError] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [invitedUsers, setInvitedUsers] = useState([]);

    const currentUser = useSelector((state) => state.login.currentUser);
    const currentNickname = localStorage.getItem("nickname");

    const fetchScheduleDetail = async () => {
        const accessToken = localStorage.getItem("token")?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/schedules/${scheduleId}/details`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            const departureDate = new Date(result.data.departureDate);
            const arrivalDate = new Date(result.data.arrivalDate);

            const departureDateUTC = new Date(Date.UTC(departureDate.getFullYear(), departureDate.getMonth(), departureDate.getDate()));
            const arrivalDateUTC = new Date(Date.UTC(arrivalDate.getFullYear(), arrivalDate.getMonth(), arrivalDate.getDate()));

            const days = Math.ceil((arrivalDateUTC - departureDateUTC) / (1000 * 60 * 60 * 24)) + 1;

            const dailyPlanListWithDates = result.data.dailyPlanList.map((dayPlan, index) => {
                const planDate = new Date(departureDateUTC);
                planDate.setUTCDate(departureDateUTC.getUTCDate() + index);
                return {
                    ...dayPlan,
                    date: planDate.toISOString().substring(0, 10),
                };
            });

            setSchedule({
                ...result.data,
                departureDate: departureDateUTC.toISOString().substring(0, 10),
                arrivalDate: arrivalDateUTC.toISOString().substring(0, 10),
                dailyPlanList: dailyPlanListWithDates,
            });
        } catch (error) {
            console.error("Failed to fetch schedule detail:", error);
        }
    };

    const fetchInvitedUsers = async () => {
        const accessToken = localStorage.getItem("token")?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/schedules/${scheduleId}/invitation/users`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch invited users");
            }
            const result = await response.json();
            console.log("초대한 사용자 목록:", result.data); // 디버깅용 콘솔 로그
            setInvitedUsers(result.data);
        } catch (error) {
            console.error("Failed to fetch invited users:", error);
        }
    };

    useEffect(() => {
        fetchScheduleDetail();
        fetchInvitedUsers();
    }, [scheduleId]);

    useEffect(() => {
        if (schedule && schedule.dailyPlanList) {
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(35.8242238, 127.1479532),
                level: 13,
            };
            const mapInstance = new kakao.maps.Map(container, options);
            setMap(mapInstance);

            const newMarkers = schedule.dailyPlanList.flatMap((dayPlan) =>
                dayPlan.markerList.map((markerData) => {
                    const markerPosition = new kakao.maps.LatLng(markerData.latitude, markerData.longitude);
                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                        map: mapInstance,
                        title: markerData.name,
                    });

                    const infoWindow = new kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;">${markerData.name}</div>`,
                    });
                    kakao.maps.event.addListener(marker, "click", () => {
                        infoWindow.open(mapInstance, marker);
                    });

                    return marker;
                })
            );

            setMarkers(newMarkers);
        }
    }, [schedule]);

    const handleEditClick = () => {
        navigate(`/schedules/${scheduleId}/edit`);
    };

    const handleInviteClick = async () => {
        await fetchInvitedUsers(); // 모달 열 때 초대한 사용자 목록을 가져옵니다
        setIsModalOpen(true);
    };

    const handleInviteSubmit = async () => {
        const accessToken = localStorage.getItem("token")?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8081/api/schedules/${scheduleId}/invitation`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nickname: inviteUserId }),
            });
            if (!response.ok) {
                throw new Error("Invitation failed");
            }
            alert("초대가 성공적으로 전송되었습니다.");
            await fetchInvitedUsers();
            setInvitedUsers((prevUsers) => [...prevUsers, { nickname: inviteUserId }]); // 초대한 사용자 목록에 추가
            setIsModalOpen(false);
            setInviteUserId("");
        } catch (error) {
            console.error("Failed to invite user:", error);
            alert("초대 중 오류가 발생했습니다.");
        }
    };

    const handleLocationClick = async (location, cardIndex) => {
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }
        setIsModalPlaceOpen(true);
        try {
            const dailyPlan = schedule.dailyPlanList[cardIndex];
            const response = await fetch(`http://localhost:8081/api/daily-plans/${dailyPlan.dailyPlanId}/markers/${location.markerId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("마커 정보를 불러오는데 실패했습니다.");
            }
            const data = await response.json();
            setSelectedLocation({
                ...location,
                cardIndex,
                markerId: data.data.markerId,
                content: location.content,
                images: data.data.images,
                name: schedule.name,
                title: data.data.name
            });
            setSelectedUserName(schedule.nickname);
            setDepartureDate(schedule.departureDate);
        } catch (err) {
            setError('마커 정보를 불러오는 중 오류가 발생했습니다: ' + err.message);
        }
    };

    const handleCancelInvitation = async (nickname) => {
        const accessToken = localStorage.getItem("token")?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8081/api/schedules/${scheduleId}/invitation`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nickname }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "초대 취소 실패");
            }

            setInvitedUsers((prevUsers) => prevUsers.filter(user => user !== nickname));
            alert("초대가 성공적으로 취소되었습니다.");
        } catch (error) {
            console.error("Failed to cancel invitation:", error);
            alert(`초대 취소 중 오류가 발생했습니다: ${error.message}`);
        }
    };

// 예시: X 버튼 클릭 시 호출되는 함수
    const handleCancelClick = (nickname) => {
        handleCancelInvitation(nickname);
    };

    // const isInvited = invitedUsers.some(user => user.nickname === currentNickname) || currentNickname === schedule?.nickname;
  //  const isInvited = invitedUsers.includes(currentNickname);
    const isInvited = invitedUsers.some(user => user === currentNickname) || currentNickname === schedule?.nickname;

    console.log("Current Nickname:", currentNickname);
    console.log("Invited Users:", invitedUsers);
    console.log("Is Invited:", isInvited);
    console.log("Is Invited Check:", invitedUsers.some(user => user.nickname === currentNickname), "OR", currentNickname === schedule?.nickname);

    //  const isInvited = currentNickname === schedule?.nickname; // 게시글 작성자와 현재 로그인한 사용자의 닉네임 비교
    // const isInvited = invitedUsers.includes(currentNickname);


    return (
        <S.SchedulesWrapper>
            {schedule ? (
                <S.SchedulesContainer>
                    <S.SchedulesInformationContainer>
                        <S.SchedulesTitlePeriodContainer>
                            <S.SchedulesTitle>{schedule.title}</S.SchedulesTitle>
                            <S.SchedulesPeriodContainer>
                                <span>{`${schedule.departureDate} ~ ${schedule.arrivalDate}`}</span>
                            </S.SchedulesPeriodContainer>
                        </S.SchedulesTitlePeriodContainer>
                        <S.SchedulesLikesTravelersContainer>
                            <S.SchedulesLike>좋아요 : {schedule.likeCount || 0}</S.SchedulesLike>
                            <S.SchedulesTravlers>조회수 : {schedule.hits || 0}</S.SchedulesTravlers>
                        </S.SchedulesLikesTravelersContainer>
                    </S.SchedulesInformationContainer>
                    {isInvited && (
                        <S.ButtonsContainer>
                            <Button style={{ marginRight: '15px' }} onClick={handleEditClick}>
                                <StyledImg src="/images/schedule/수정3.png" alt="수정" />
                            </Button>
                            <Button onClick={handleInviteClick}>
                                <StyledImg src="/images/schedule/초대5.png" alt="초대" />
                            </Button>
                        </S.ButtonsContainer>
                    )}
                    <S.PlanWrapper>
                        <S.MapWrapper>
                            <div id="map"></div>
                        </S.MapWrapper>
                        <S.DividerLine />
                        <S.CardsWrapper>
                            <S.CardsContainer>
                                {schedule.dailyPlanList.map((dayPlan, index) => (
                                    <S.Cards key={index}>
                                        <S.CardTitleContainer>
                                            <S.CardTitle>DAY {index + 1}</S.CardTitle>
                                            <S.CardDate>{dayPlan.date}</S.CardDate>
                                        </S.CardTitleContainer>
                                        <S.LocationContainerWrapper>
                                            <S.LocationContainer>
                                                {dayPlan.markerList
                                                    .sort((a, b) => a.markerIndex - b.markerIndex)
                                                    .map((location, locIndex) => (
                                                        <S.LocationWrapper key={locIndex}>
                                                            <S.Location>
                                                                <S.LocationIndex>{locIndex + 1}</S.LocationIndex>
                                                                <S.LocationName
                                                                    onClick={() => handleLocationClick(location, index)}
                                                                >
                                                                    {location.name || "이름 없음"}
                                                                </S.LocationName>
                                                            </S.Location>
                                                        </S.LocationWrapper>
                                                    ))}
                                            </S.LocationContainer>
                                        </S.LocationContainerWrapper>
                                    </S.Cards>
                                ))}
                            </S.CardsContainer>
                        </S.CardsWrapper>
                    </S.PlanWrapper>
                </S.SchedulesContainer>
            ) : (
                <p>Loading...</p>
            )}
            {isModalOpen && (
                <S.Modal1>
                    <ModalContent1>
                        <h5>💌</h5>
                        <p style={{fontSize: '0.875rem', color: '#666', marginBottom: '20px'}}>
                            여행을 함께 떠날 사용자를 초대해 보세요!
                        </p>
                        <InputField
                            type="text"
                            value={inviteUserId}
                            onChange={(e) => setInviteUserId(e.target.value)}
                            placeholder="사용자 닉네임 입력"
                        />
                        <div style={{ marginTop: '10px' }}>
                            <ButtonText onClick={handleInviteSubmit}>
                                초대
                            </ButtonText>
                            <ButtonText onClick={() => setIsModalOpen(false)}>
                                닫기
                            </ButtonText>
                        </div>
                        {invitedUsers.length > 0 && (
                            <div style={{
                                marginTop: '20px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                maxWidth: '600px',
                                margin: '0 auto',
                                padding: '30px'
                            }}>
                                <h5 style={{
                                    fontSize: '1.25rem',
                                    color: '#333',
                                    marginBottom: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontFamily: '"Arial", sans-serif'
                                }}>
                                    👫 초대된 친구들
                                </h5>
                                <div>
                                    <ul style={{
                                        listStyleType: 'none',
                                        padding: '0',
                                        margin: '0'
                                    }}>
                                        {invitedUsers.map((user, index) => (
                                            <li key={index} style={{
                                                backgroundColor: '#ffffff',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '6px',
                                                padding: '10px',
                                                marginBottom: '8px',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '1rem',
                                                color: '#555',
                                                position: 'relative',
                                                fontFamily: '"Arial", sans-serif'
                                            }}>
                                                <span style={{
                                                    flexGrow: 1
                                                }}>
                                                    👤 {user}
                                                </span>
                                                <button
                                                    onClick={() => handleCancelClick(user)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: '#ff4d4d',
                                                        fontSize: '1.2rem',
                                                        transition: 'color 0.3s',
                                                        position: 'absolute',
                                                        right: '-30px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)'
                                                    }}
                                                    title="Remove"
                                                >
                                                    &times;
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </ModalContent1>
                </S.Modal1>
            )}
            {isModalPlaceOpen && (
                <LocationPlaceModal
                    isOpen={isModalPlaceOpen}
                    onClose={() => setIsModalPlaceOpen(false)}
                    location={selectedLocation}
                    onSave={(updatedLocation) => {
                        setSelectedLocation(updatedLocation);
                    }}
                    userName={selectedUserName}
                    departureDate={departureDate}
                    title={selectedLocation?.title}
                />
            )}
        </S.SchedulesWrapper>
    );
};
export default SchedulesDetail;
