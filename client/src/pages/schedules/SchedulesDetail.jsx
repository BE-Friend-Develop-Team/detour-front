import React, { useEffect, useState } from "react";
import S from "./style";
import { useParams, useNavigate } from "react-router-dom";
import { Button, StyledImg, ButtonText, InputField, ModalContent1 } from "../../components/button/ButtonStyled";
import LocationPlaceModal from './LocationPlaceModal';

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
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState("");

    const fetchScheduleDetail = async () => {
        const accessToken = localStorage.getItem("token").substring(7);
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
                    "Content-Type": "application/json",
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

    useEffect(() => {
        fetchScheduleDetail();
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

    useEffect(() => {
        if (scheduleId) {
            fetchComments();
        }
    }, [scheduleId]);

    const fetchComments = async () => {
        const accessToken = localStorage.getItem("token")?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8081/api/schedules/${scheduleId}/comments`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("댓글을 불러오는데 실패했습니다.");
            }
            const data = await response.json();
            setComments(data.data.map(comment => ({
                id: comment.commentId,
                content: comment.content,
                nickname: comment.nickname
            })));
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem("token")?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8081/api/schedules/${scheduleId}/comments`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: newComment }),
            });
            if (!response.ok) {
                throw new Error("댓글 작성에 실패했습니다.");
            }
            const data = await response.json();
            setComments([data.data, ...comments]);
            // setNewComment("");
        } catch (error) {
            console.error("Failed to submit comment:", error);
        }
    };

    const handleEditComment = (commentId, content) => {
        setEditingCommentId(commentId);
        setEditedCommentContent(content);
    };

    const handleUpdateComment = async (commentId) => {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            console.log("accessToken not set");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/schedules/comments/${commentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": accessToken
                },
                body: JSON.stringify({
                    content: editedCommentContent
                }),
            });
            if (!response.ok) {
                throw new Error("댓글 수정에 실패했습니다.");
            }
            const data = await response.json();
            setComments(comments.map(comment =>
                comments.id === commentId ? {...comment, content: editedCommentContent} : comment
            ));
            setEditingCommentId(null);
            // 수정 후 수정한 댓글이 보이도록 새로고침
            await fetchComments();
        } catch (error) {
            console.error("Failed to update comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }
        if (!window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:8081/api/schedules/comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: accessToken,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("댓글 삭제에 실패했습니다.");
            }
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };

    const handleEditClick = () => {
        navigate(`/schedules/${scheduleId}/edit`);
    };

    const handleInviteClick = () => {
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
            console.log("응답 상태:", response.status);
            if (!response.ok) {
                throw new Error("마커 정보를 불러오는데 실패했습니다.");
            }
            const data = await response.json();
            const markerDetails = data.data;
            setSelectedLocation({
                ...location,
                cardIndex,
                markerId: markerDetails.markerId,
                content: location.content,
                images: markerDetails.images,
                name: schedule.name,
                title: markerDetails.name
            });
            setSelectedUserName(schedule.nickname);
            setDepartureDate(schedule.departureDate);
        } catch (err) {
            setError('마커 정보를 불러오는 중 오류가 발생했습니다: ' + err.message);
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
                                <span>{`${schedule.departureDate} ~ ${schedule.arrivalDate}`}</span>
                            </S.SchedulesPeriodContainer>
                        </S.SchedulesTitlePeriodContainer>
                        <S.SchedulesLikesTravelersContainer>
                            <S.SchedulesLike>좋아요 : {schedule.likeCount || 0}</S.SchedulesLike>
                            <S.SchedulesTravlers>조회수 : {schedule.hits || 0}</S.SchedulesTravlers>
                            <S.SchedulesCommentss>댓글 : {comments.length || 0}</S.SchedulesCommentss>
                        </S.SchedulesLikesTravelersContainer>
                    </S.SchedulesInformationContainer>
                    <S.ButtonsContainer>
                        <Button style={{ marginRight: '15px' }} onClick={handleEditClick}>
                            <StyledImg src="/images/schedule/수정3.png" alt="수정" />
                        </Button>
                        <Button onClick={handleInviteClick}>
                            <StyledImg src="/images/schedule/초대5.png" alt="초대" />
                        </Button>
                    </S.ButtonsContainer>
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
                        {/*==== 여기 댓글 여기 ====*/}
                        <S.CommentSection>
                            <S.CommentForm onSubmit={handleCommentSubmit}>
                                <S.CommentInput
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="댓글을 입력하세요"
                                />
                                <S.CommentSubmitButton type="submit">댓글 작성</S.CommentSubmitButton>
                            </S.CommentForm>
                        </S.CommentSection>
                        <S.CommentList>
                            {comments.map((comment) => (
                                <S.CommentItem key={comment.id}>
                                    <S.CommentAuthor>👤 {comment.id}</S.CommentAuthor>
                                    {editingCommentId === comment.id ? (
                                        <S.CommentEditForm onSubmit={(e) => {
                                            e.preventDefault();
                                            handleUpdateComment(comment.id);
                                        }}>
                                            <S.CommentEditInput
                                                value={editedCommentContent}
                                                onChange={(e) => setEditedCommentContent(e.target.value)}
                                            />
                                            <S.CommentEditButton type="submit">저장</S.CommentEditButton>
                                            <S.CommentEditButton onClick={() => setEditingCommentId(null)}>취소</S.CommentEditButton>
                                        </S.CommentEditForm>
                                    ) : (
                                        <>
                                            <S.CommentContent>{comment.content}</S.CommentContent>
                                            <S.CommentDate>{new Date(comment.createdAt).toLocaleString()}</S.CommentDate>
                                            <S.CommentActions>
                                                <S.CommentActionButton onClick={() => {
                                                    handleEditComment(comment.id, comment.content);
                                                }}>
                                                    <img src="/images/schedule/댓글 수정.png" alt="수정" width="20" height="20" />
                                                </S.CommentActionButton>
                                                <S.CommentActionButton onClick={() => handleDeleteComment(comment.id)}>
                                                    <img src="/images/schedule/댓글 삭제.png" alt="삭제" width="20" height="20" />
                                                </S.CommentActionButton>
                                            </S.CommentActions>
                                        </>
                                    )}
                                </S.CommentItem>
                            ))}
                        </S.CommentList>
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
                    </ModalContent1>
                </S.Modal1>
            )}
            {isModalPlaceOpen && (
                <LocationPlaceModal
                    isOpen={isModalPlaceOpen}
                    onClose={() => setIsModalPlaceOpen(false)}
                    location={selectedLocation} // 올바른 location을 전달
                    onSave={(updatedLocation) => {
                        // 위치 업데이트 처리
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