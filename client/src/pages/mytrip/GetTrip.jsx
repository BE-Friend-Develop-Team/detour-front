import React, { useState, useEffect } from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/style";
import { useSelector, useDispatch } from "react-redux";

const GetTrip = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.login.currentUser);

    const [newNickname, setNewNickname] = useState(currentUser?.nickname || "");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scheduleData, setScheduleData] = useState(null);

    useEffect(() => {
        fetchTrip();
    }, []);

    const fetchTrip = async () => {
        setIsLoading(true);
        setError(null);

        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch("http://localhost:8081/api/schedules/users?page=1", {
                method: "GET",
                headers: {
                    "Authorization": accessToken
                },
            });

            console.log(response, "response data");
            console.log(response.ok);

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "스케줄 정보를 가져오는데 실패했습니다.");
            }

            const result = await response.json();
            console.log(result);
            setScheduleData(result.data);

        } catch (error) {
            console.error("Error fetching profile:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <S.LoadingMessage>스케줄 정보를 불러오는 중입니다...</S.LoadingMessage>;
    }

    const toggleLike2 = async (scheduleId, liked, likeId) => {
        try {
            const accessToken = localStorage.getItem('token');

            if (!accessToken) {
                setError("로그인이 필요합니다.");
                navigate('/login');
                return;
            }

            console.log("1 - " + "scheduleId : " + scheduleId + ", liked : " + liked + ", likeId : " + likeId);

            if (liked == true) {
                console.log("2 - " + "scheduleId : " + scheduleId + ", liked : " + liked + ", likeId : " + likeId);
                let likeIdresult = null
                if(likeId == null) {
                    const response2 = await fetch(`http://localhost:8081/api/schedules/likes/${scheduleId}`, {
                        method: "GET",
                        headers: {
                            "Authorization": accessToken
                        },
                    });

                    console.log(response2, "response2");

                    const result = await response2.json();
                    console.log("likeId : " + result.data.likeId);
                    likeIdresult = result.data.likeId

                    console.log("3 - " + "scheduleId : " + scheduleId + ", liked : " + liked + ", likeId : " + likeIdresult);
                    const response = await fetch(`http://localhost:8081/api/schedules/likes/${likeIdresult}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": accessToken
                        }
                    });
                    const result2 = await response.json();
                    console.log(result2);
                    console.log("4 - " + "scheduleId : " + scheduleId + ", liked : " + liked + ", likeId : " + likeId);
                }
            } else {
                console.log("5 - " + "scheduleId : " + scheduleId + ", liked : " + liked + ", likeId : " + likeId);
                const response = await fetch(`http://localhost:8081/api/schedules/${scheduleId}/likes`, {
                    method: "POST",
                    headers: {
                        "Authorization": accessToken
                    }
                });
                console.log("6 - " + "scheduleId : " + scheduleId + ", liked : " + liked + ", likeId : " + likeId);
                const result = await response.json();
                console.log(result);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            alert(error.message);
        } finally {
            fetchTrip();
        }
    }

    const toggleLike = async (scheduleId, liked, likeId) => {
        try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }
        console.log("scheduleId : " + scheduleId);

        let result = null;
        console.log(likeId);
        if(likeId == null) {
            const response2 = await fetch(`http://localhost:8081/api/schedules/likes/${scheduleId}`, {
                method: "GET",
                headers: {
                    "Authorization": accessToken
                },
            });

            console.log(response2, "response2");

            result = await response2.json();
            console.log(result, "result");
            console.log("likeId : " + result.data.likeId);
            likeId = result.data.likeId
        }

        if (!scheduleId) {
            console.error('ScheduleId가 null이거나 정의되지 않았습니다.');
            return;
        }

        console.log(`scheduleId: ${scheduleId}, current isLiked: ${liked}`);


            const url = liked
                ? `http://localhost:8081/api/schedules/likes/${likeId}`
                : `http://localhost:8081/api/schedules/${scheduleId}/likes`;
            console.log(likeId);
            console.log("liked : " + liked);
            const method = liked ? 'DELETE' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    "Authorization": accessToken,
                    "Content-Type": "application/json"
                },
            });


            if (response.status === 404 && !liked) {
                alert('좋아요 상태가 올바르지 않습니다.');
                return;
            }

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Network response was not ok');
            }

            const responseData = await response.json();
            setScheduleData(prevTrips =>
                prevTrips.map(trip =>
                    scheduleData.scheduleId === scheduleId
                        ? {
                            ...trip,
                            liked: !liked,
                            likeId: !liked ? responseData.data?.likeId : null,
                            likeCount: trip.likeCount + (liked ? -1 : 1)
                        }
                        : trip
                )
            );
        } catch (error) {
            console.error('Error toggling like:', error);
            alert(error.message);
        }
    };

    return (
        <S.GenerateMyTripWrapper>
            <S.GenerateMyTripContainer>
                <S.GenerateMyTripTitle>
                    ✈️ 내 일정 모음
                </S.GenerateMyTripTitle>
                <S.searchbar>
                    <Input
                        value={newNickname}
                        onChange={(e) => setNewNickname(e.target.value)}
                        variant="main"
                        shape="medium"
                        size="extraLarge"
                        color="black"
                        border="gray"
                        placeholder={"검색어를 입력해주세요."}
                    />
                    🔍
                </S.searchbar>
                <S.scheduleWrap>
                    {scheduleData.map(schedule => (
                        <S.ScheduleItem key={schedule.scheduleId}>
                            <S.ScheduleTitle>{schedule.title}</S.ScheduleTitle>
                            <S.ScheduleImage><img src={schedule.mainImage}/></S.ScheduleImage>
                            <S.ScheduleDetails>좋아요 {schedule.likeCount}</S.ScheduleDetails>
                            <S.LikeButton
                                onClick={() => {
                                    if (schedule.scheduleId) {
                                        toggleLike2(schedule.scheduleId, schedule.liked, schedule.likeId);
                                    } else {
                                        console.error('Trip ID is missing');
                                    }
                                }}
                            >
                                <img
                                    src={schedule.liked ? '/images/trip/heart.png' : '/images/trip/noheart.png'}
                                    alt="Like"
                                    style={{ width: '24px', height: '24px' }}
                                />
                                <S.LikeCount>{schedule.likeCount || 0}</S.LikeCount>
                            </S.LikeButton>
                            <S.ScheduleDetails>조회수 {schedule.hits}</S.ScheduleDetails>
                        </S.ScheduleItem>
                    ))}
                </S.scheduleWrap>
            </S.GenerateMyTripContainer>
        </S.GenerateMyTripWrapper>
    );
};

export default GetTrip;