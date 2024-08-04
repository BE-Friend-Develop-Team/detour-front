import React, { useEffect, useState } from 'react';
import S from "./style";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getTopSchedules();
    }, []);

    const getTopSchedules = async () => {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/schedules/ranking`, {
                method: "GET",
                headers: {
                    "Authorization": accessToken,
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) {
                throw new Error("Failed to get top ranking schedules");
            }

            const responseJson = await response.json();
            const topScheduleIds = responseJson.data;

            const fetchScheduleDetails = async (scheduleId) => {
                const detailResponse = await fetch(`http://localhost:8081/api/schedules/${scheduleId}/details`, {
                    method: "GET",
                    headers: {
                        "Authorization": accessToken,
                        "Content-Type": "application/json"
                    },
                });
                if (!detailResponse.ok) {
                    throw new Error(`Failed to get details for schedule ${scheduleId}`);
                }
                const detailJson = await detailResponse.json();
                return detailJson.data;
            };

            const scheduleDetails = await Promise.all(topScheduleIds.map(fetchScheduleDetails));
            setRankings(scheduleDetails);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <S.Main>
            <S.PopularSection>
                <S.PopularH1>🔥요즘 핫한 국내 여행 랭킹</S.PopularH1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <S.RankingGrid>
                        {rankings.map((ranking, index) => (
                            <S.TripCard key={ranking.scheduleId || `ranking-${index}`}>
                                <S.TripImageWrapper>
                                    <S.TripImage src={ranking.imageUrl} alt={ranking.title} />
                                    <S.TripLocation>{index + 1}등</S.TripLocation>
                                    <S.DetailButton>둘러보기</S.DetailButton>
                                </S.TripImageWrapper>
                                <S.TripFooter>
                                    <h3>{ranking.title}</h3>
                                </S.TripFooter>
                            </S.TripCard>
                        ))}
                    </S.RankingGrid>
                )}
            </S.PopularSection>
        </S.Main>
    );
};

export default Main;