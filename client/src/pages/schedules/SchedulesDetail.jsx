import React, { useEffect, useState } from "react";
import S from "./style";
import { useParams, useNavigate } from "react-router-dom";
import DetourButton from "../../components/button/DetourButton";

const { kakao } = window;

const SchedulesDetail = () => {
    const { scheduleId } = useParams();
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inviteUserId, setInviteUserId] = useState("");

    const fetchScheduleDetail = async () => {
        const accessToken = localStorage.getItem("token").substring(7);
        try {
            const response = await fetch(`https://detourofficial.shop/api/schedules/${scheduleId}/details`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setSchedule(result.data);
        } catch (error) {
            console.error("Failed to fetch schedule detail:", error);
        }
    };

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

    useEffect(() => {
        fetchScheduleDetail();
    }, []);

    const handleEditClick = () => {
        navigate(`/schedules/${scheduleId}/edit`);
    };

    const handleInviteClick = () => {
        setIsModalOpen(true);
    };

    const handleInviteSubmit = async () => {
        const accessToken = localStorage.getItem("token").substring(7);
        try {
            const response = await fetch(`https://detourofficial.shop/api/schedules/${scheduleId}/invitation`, {
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
            setIsModalOpen(false);
            setInviteUserId("");
        } catch (error) {
            console.error("Failed to invite user:", error);
            alert("초대 중 오류가 발생했습니다.");
        }
    };

    return (
        <S.SchedulesWrapper>
            {schedule ? (
                <S.SchedulesContainer>
                    <S.SchedulesInformationContainer>
                        <S.SchedulesTitlePeriodContainer>
                            <S.SchedulesTitle>{schedule.title}</S.SchedulesTitle>
                            <S.SchedulesPeriodContainer>
                                <span>{`${new Date(schedule.departureDate).toLocaleDateString()} ~ ${new Date(schedule.arrivalDate).toLocaleDateString()}`}</span>
                            </S.SchedulesPeriodContainer>
                        </S.SchedulesTitlePeriodContainer>
                        <S.SchedulesLikesTravelersContainer>
                            <S.SchedulesLike>좋아요: {schedule.likeCount || 0}</S.SchedulesLike>
                            <S.SchedulesTravlers>조회수: {schedule.hits || 0}</S.SchedulesTravlers>
                        </S.SchedulesLikesTravelersContainer>
                    </S.SchedulesInformationContainer>
                    <DetourButton
                        variant="main"
                        shape="small"
                        size="medium"
                        color="black"
                        border="default"
                        onClick={handleEditClick}
                    >
                        수정
                    </DetourButton>
                    <DetourButton
                        variant="main"
                        shape="small"
                        size="medium"
                        color="black"
                        border="default"
                        onClick={handleInviteClick}
                    >
                        초대
                    </DetourButton>
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
                                            <S.CardTitle>DAY {dayPlan.day}</S.CardTitle>
                                            <S.CardDate>{new Date(schedule.departureDate).toLocaleDateString()}</S.CardDate>
                                        </S.CardTitleContainer>
                                        <S.LocationContainerWrapper>
                                            <S.LocationContainer>
                                                {dayPlan.markerList.map((location, locIndex) => (
                                                    <S.LocationWrapper key={locIndex}>
                                                        <S.Location>
                                                            <S.LocationIndex>{locIndex + 1}</S.LocationIndex>
                                                            <S.LocationName>{location.name}</S.LocationName>
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
                <S.Modal>
                    <S.ModalContent>
                        <h2>사용자 초대</h2>
                        <input
                            type="text"
                            value={inviteUserId}
                            onChange={(e) => setInviteUserId(e.target.value)}
                            placeholder="사용자 아이디 입력"
                        />
                        <DetourButton onClick={handleInviteSubmit}>초대하기</DetourButton>
                        <DetourButton onClick={() => setIsModalOpen(false)}>닫기</DetourButton>
                    </S.ModalContent>
                </S.Modal>
            )}
        </S.SchedulesWrapper>
    );
};

export default SchedulesDetail;