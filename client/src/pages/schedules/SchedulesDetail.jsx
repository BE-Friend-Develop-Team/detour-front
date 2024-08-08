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
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState("");
    const currentNickname = localStorage.getItem("nickname");
    const [invitedUsers, setInvitedUsers] = useState([]);
    const currentUser = useSelector((state) => state.login.currentUser);

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
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();

            const departureDate = new Date(result.data.departureDate);
            const arrivalDate = new Date(result.data.arrivalDate);

            if (isNaN(departureDate.getTime()) || isNaN(arrivalDate.getTime())) {
                throw new Error("Invalid date format received from server");
            }

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
        console.log("Invited Users Updated:", invitedUsers);
    }, [invitedUsers]);

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
            setNewComment("");
        } catch (error) {
            console.error("Failed to submit comment:", error);
        }
        await fetchComments();
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
                const errorData = await response.json();
                if (errorData.message === "이미 해당 일정에 초대된 사용자입니다.") {
                    throw new Error("이미 초대된 사용자입니다.");
                } else {
                    throw new Error(errorData.message || "Invitation failed");
                }
            }
            alert("초대가 성공적으로 전송되었습니다.");
            await fetchInvitedUsers();
            setInvitedUsers((prevUsers) => [...prevUsers, { nickname: inviteUserId }]); // 초대한 사용자 목록에 추가
            setIsModalOpen(false);
            setInviteUserId("");
        } catch (error) {
            console.error("Failed to invite user:", error);
            if (error.message === "이미 해당 일정에 초대된 사용자입니다.") {
                alert("이미 초대된 사용자입니다.");
            } else {
                alert(`초대 중 오류가 발생했습니다: ${error.message}`);
            }
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
            const markerDetails = data.data;
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

    const handleDeleteSchedule = async() => {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }
        if (!window.confirm("정말로 이 일정을 삭제하시겠습니까?")) {
            return;
        }
        console.log("scheduleId", scheduleId);

        try {
            const response = await fetch(`http://localhost:8081/api/schedules/${scheduleId}`, {
                method: "DELETE",
                headers: {
                    Authorization: accessToken,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("일정 삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("Failed to delete schedule:", error);
        }
        navigate('/mytrip');
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
                            <S.SchedulesCommentss>댓글 : {comments.length || 0}</S.SchedulesCommentss>
                        </S.SchedulesLikesTravelersContainer>
                    </S.SchedulesInformationContainer>
                    {isInvited && (
                        <S.ButtonsContainer>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Button style={{marginRight: '15px'}} onClick={handleEditClick}>
                                    <StyledImg src="/images/schedule/수정3.png" alt="수정"/>
                                </Button>
                                <span style={{color: '#c9c8c8', fontSize: '0.76rem'}}>수정</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginRight: '12px'
                            }}>
                                <Button onClick={handleInviteClick}>
                                    <StyledImg src="/images/schedule/초대5.png" alt="초대"/>
                                </Button>
                                <span style={{color: '#c9c8c8', fontSize: '0.76rem'}}>초대</span>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Button onClick={handleDeleteSchedule}>
                                    <StyledImg src="/images/schedule/삭제3.png" alt="삭제"/>
                                </Button>
                                <span style={{color: '#c9c8c8', fontSize: '0.76rem'}}>삭제</span>
                            </div>
                        </S.ButtonsContainer>
                    )}
                    <S.PlanWrapper>
                        <S.MapWrapper>
                            <div id="map"></div>
                        </S.MapWrapper>
                        <S.DividerLine/>
                        <S.CardsWrapper>
                            <S.DayText>
                                {`장소 이름을 클릭하여 여행 기록을 확인해보세요.`}
                            </S.DayText>
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
                                    <S.CommentAuthor>👤 {comment.nickname}</S.CommentAuthor>
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
                                            <S.CommentDate>
                                                {comment.createdAt && !isNaN(Date.parse(comment.createdAt))
                                                    ? new Date(comment.createdAt).toLocaleString()
                                                    : '날짜 표시 안됨'}
                                            </S.CommentDate>                                      {currentNickname === comment.nickname && (
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
                                            )}
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