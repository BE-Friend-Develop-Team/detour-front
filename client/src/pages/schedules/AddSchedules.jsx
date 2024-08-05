import React, { useState, useEffect } from "react";
import S from "./style";
import SearchLocation from "./SearchLocation";
import DetourButton from "../../components/button/DetourButton";
import { useNavigate } from "react-router-dom";

const { kakao } = window;

const AddSchedules = ({ title, startDate, endDate }) => {
    const navigate = useNavigate();
    const [cardLocations, setCardLocations] = useState({});
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [currentCardIndex, setCurrentCardIndex] = useState(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkKakaoMap = setInterval(() => {
            if (window.kakao && window.kakao.maps) {
                clearInterval(checkKakaoMap);
                const container = document.getElementById("map");
                const options = {
                    center: new kakao.maps.LatLng(35.8242238, 127.1479532),
                    level: 13,
                };
                const mapInstance = new kakao.maps.Map(container, options);
                setMap(mapInstance);
            }
        }, 100);

        return () => clearInterval(checkKakaoMap);
    }, []);

    const getDateRange = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const dates = [];
        let currentDate = startDate;

        while (currentDate <= endDate) {
            dates.push(currentDate.toISOString().substring(0, 10)); // ISO format
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    const dateRange = getDateRange(startDate, endDate);

    const onClickAddLocation = (cardIndex) => {
        setCurrentCardIndex(cardIndex);
        openSearch();
    };

    const openSearch = () => {
        setSearchVisible(true);
    };

    const closeSearch = () => {
        setSearchVisible(false);
        setSearchValue("");
    };

    const handleLocationSelect = (location) => {
        if (currentCardIndex !== null) {
            const position = new kakao.maps.LatLng(location.y, location.x);
            const marker = new kakao.maps.Marker({
                map: map,
                position: position,
                title: location.place_name,
            });

            marker.cardIndex = currentCardIndex;
            setMarkers((prevMarkers) => [...prevMarkers, marker]);

            map.panTo(position);

            setCardLocations((prevLocations) => {
                const newLocations = { ...prevLocations };
                newLocations[currentCardIndex] = [...(newLocations[currentCardIndex] || []), location];
                return newLocations;
            });
        }
        closeSearch();
    };

    const handleLocationDelete = (cardIndex, locIndex) => {
        const locationToDelete = cardLocations[cardIndex][locIndex];
        const markerToRemove = markers.find((m) => m.cardIndex === cardIndex && m.getTitle() === locationToDelete.place_name);
        if (markerToRemove) {
            markerToRemove.setMap(null);
            setMarkers((prevMarkers) => prevMarkers.filter((m) => m !== markerToRemove));
        }

        setCardLocations((prevLocations) => {
            const newLocations = { ...prevLocations };
            newLocations[cardIndex].splice(locIndex, 1);
            if (newLocations[cardIndex].length === 0) {
                delete newLocations[cardIndex];
            }
            return newLocations;
        });
    };

    const onClickGenerateSchedules = async () => {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            setIsLoading(true);

            // 1. Create schedule
            const scheduleResponse = await fetch('https://detourofficial.shop/api/schedules', {
                method: "POST",
                headers: {
                    "Authorization": accessToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    departureDate: new Date(startDate).toISOString(), // ISO format
                    arrivalDate: new Date(endDate).toISOString(), // ISO format
                }),
            });

            if (!scheduleResponse.ok) {
                throw new Error('일정 생성에 실패했습니다.');
            }
            const scheduleData = await scheduleResponse.json();
            const scheduleId = scheduleData.data.scheduleId;

            // 2. Create daily plans
            const totalDays = (new Date(endDate) - new Date(startDate)) / 86400000 + 1;

            for (let day = 1; day <= totalDays; day++) {
                const dailyPlanResponse = await fetch(`https://detourofficial.shop/api/schedules/${scheduleId}/dailyplans`, {
                    method: "POST",
                    headers: {
                        "Authorization": accessToken,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ day: day }),
                });

                if (!dailyPlanResponse.ok) {
                    throw new Error(`${day}일차 데일리플랜 생성에 실패했습니다.`);
                }
                const dailyPlanData = await dailyPlanResponse.json();
                const dailyPlanId = dailyPlanData.data.dailyPlanId;

                // 3. Create places and markers for each location
                for (const location of cardLocations[day - 1] || []) {
                    const placeResponse = await fetch("https://detourofficial.shop/api/place", {
                        method: "POST",
                        headers: {
                            "Authorization": accessToken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: location.place_name,
                            address: location.address_name,
                            telNumber: location.phone,
                        }),
                    });

                    if (!placeResponse.ok) {
                        throw new Error("Place 생성에 실패했습니다.");
                    }
                    const placeData = await placeResponse.json();
                    const placeId = placeData.data.placeId;

                    const markerResponse = await fetch(`https://detourofficial.shop/api/daily-plans/${dailyPlanId}/place/${placeId}/markers`, {
                        method: "POST",
                        headers: {
                            "Authorization": accessToken,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            latitude: location.y,
                            longitude: location.x,
                        }),
                    });

                    if (!markerResponse.ok) {
                        throw new Error("Marker 생성에 실패했습니다.");
                    }
                }
            }

            alert('여행 일정이 성공적으로 생성되었습니다!');
            navigate(`/schedules/${scheduleId}`);
        } catch (err) {
            setError('일정 생성 중 오류가 발생했습니다: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <S.AddSchedulesWrapper>
            <S.MapWrapper>
                <div id="map" style={{ width: '100%', height: '400px' }}></div>
            </S.MapWrapper>
            <S.DividerLine />
            <S.AddScheduleCardsWrapper>
                <S.AddScheduleCardsContainer>
                    {dateRange.map((date, index) => (
                        <S.AddScheduleCards key={index}>
                            <S.CardTitleContainer>
                                <S.CardTitle>DAY {index + 1}</S.CardTitle>
                                <S.CardDate>{date}</S.CardDate>
                            </S.CardTitleContainer>
                            <S.LocationContainerWrapper>
                                <S.LocationContainer>
                                    {(cardLocations[index] || []).map((location, locIndex) => (
                                        <S.LocationWrapper key={locIndex}>
                                            <S.Location>
                                                <S.LocationIndex>{locIndex + 1}</S.LocationIndex>
                                                <S.LocationName>{location.place_name}</S.LocationName>
                                            </S.Location>
                                            <S.LocationDelete onClick={() => handleLocationDelete(index, locIndex)}>&times;</S.LocationDelete>
                                        </S.LocationWrapper>
                                    ))}
                                    <S.PlusButtonWrapper>
                                        <S.PlusButton onClick={() => onClickAddLocation(index)}>+</S.PlusButton>
                                    </S.PlusButtonWrapper>
                                </S.LocationContainer>
                            </S.LocationContainerWrapper>
                        </S.AddScheduleCards>
                    ))}
                </S.AddScheduleCardsContainer>
            </S.AddScheduleCardsWrapper>
            <S.GenerateSchedulesCompleteButtonWrapper>
                <DetourButton
                    variant={"main"}
                    shape={"small"}
                    size={"medium"}
                    color={"black"}
                    border={"default"}
                    onClick={onClickGenerateSchedules}
                    disabled={isLoading}
                >
                    {isLoading ? '생성 중...' : '완료'}
                </DetourButton>
            </S.GenerateSchedulesCompleteButtonWrapper>
            {searchVisible && (
                <SearchLocation
                    onClose={closeSearch}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onSelectLocation={handleLocationSelect}
                />
            )}
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.AddSchedulesWrapper>
    );
};

export default AddSchedules;