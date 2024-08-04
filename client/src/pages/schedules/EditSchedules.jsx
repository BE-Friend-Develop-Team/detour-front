import React, { useState, useEffect, useRef } from "react";
import S from "./style";
import SearchLocation from "./SearchLocation";
import DetourButton from "../../components/button/DetourButton";
import { useNavigate, useParams } from "react-router-dom";
import LocationModal from "./LocationModal";

const { kakao } = window;

const EditSchedules = () => {
    const { scheduleId } = useParams();
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState(null);
    const [cardLocations, setCardLocations] = useState({});
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [currentCardIndex, setCurrentCardIndex] = useState(null);
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        fetchScheduleDetails();
    }, [scheduleId]);

    useEffect(() => {
        if (schedule) {
            initializeMap();
            setTitle(schedule.title);
            // Use 'getDateString' function to ensure proper date formatting
            setStartDate(getDateString(new Date(schedule.departureDate)));
            setEndDate(getDateString(new Date(schedule.arrivalDate)));
        }
    }, [schedule]);

    const fetchScheduleDetails = async () => {
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`https://detourofficial.shop/api/schedules/${scheduleId}/details`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("일정 정보를 불러오는데 실패했습니다.");
            }
            const data = await response.json();
            setSchedule(data.data);
            initializeCardLocations(data.data);
        } catch (err) {
            setError('일정 정보를 불러오는 중 오류가 발생했습니다: ' + err.message);
        }
    };

    const getDateString = (date) => {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const initializeMap = () => {
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(35.8242238, 127.1479532),
            level: 13,
        };
        const map = new kakao.maps.Map(container, options);
        mapRef.current = map;

        if (schedule && schedule.dailyPlanList) {
            const newMarkers = schedule.dailyPlanList.flatMap((dayPlan) =>
                dayPlan.markerList.map((markerData) => {
                    const markerPosition = new kakao.maps.LatLng(markerData.latitude, markerData.longitude);
                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                        map: map,
                        title: markerData.name,
                    });

                    const infoWindow = new kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;">${markerData.name}</div>`,
                    });
                    kakao.maps.event.addListener(marker, "click", () => {
                        infoWindow.open(map, marker);
                    });

                    return marker;
                })
            );

            setMarkers(newMarkers);

            const bounds = new kakao.maps.LatLngBounds();
            newMarkers.forEach(marker => bounds.extend(marker.getPosition()));
            map.setBounds(bounds);
        }
    };

    const initializeCardLocations = (scheduleData) => {
        const locations = {};
        scheduleData.dailyPlanList.forEach((dailyPlan, index) => {
            locations[index] = dailyPlan.markerList.map(marker => ({
                place_name: marker.name,
                address_name: marker.address,
                markerId: marker.markerId,
                x: marker.longitude,
                y: marker.latitude,
            }));
        });
        setCardLocations(locations);
    };

    const onClickAddLocation = (cardIndex) => {
        setCurrentCardIndex(cardIndex);
        setSearchVisible(true);
    };

    const closeSearch = () => {
        setSearchVisible(false);
        setSearchValue("");
    };

    const handleLocationSelect = (location) => {
        if (currentCardIndex !== null && mapRef.current) {
            const position = new kakao.maps.LatLng(location.y, location.x);
            const marker = new kakao.maps.Marker({
                map: mapRef.current,
                position: position,
                title: location.place_name,
            });

            const infoWindow = new kakao.maps.InfoWindow({
                content: `<div style="padding:5px;">${location.place_name}</div>`,
            });
            kakao.maps.event.addListener(marker, "click", () => {
                infoWindow.open(mapRef.current, marker);
            });

            setMarkers(prevMarkers => [...prevMarkers, marker]);
            mapRef.current.panTo(position);

            setCardLocations(prevLocations => {
                const newLocations = { ...prevLocations };
                newLocations[currentCardIndex] = [...(newLocations[currentCardIndex] || []), location];
                return newLocations;
            });
        }
        closeSearch();
    };

    const handleLocationClick = (location, cardIndex) => {
        console.log(location);
        const markerId = schedule.dailyPlanList[cardIndex].markerList.find(marker =>
            marker.name === location.place_name &&
            marker.latitude === location.y &&
            marker.longitude === location.x
        )?.markerId;
        console.log("마커아이디: "+markerId);
        console.log("Location:", location);
        console.log("Card Index:", cardIndex);
        console.log("Markers List:", schedule.dailyPlanList[cardIndex].markerList);
        setSelectedLocation({ ...location, cardIndex, markerId });
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedLocation(null);
    };

    const handleSaveLocation = (updatedLocation) => {
        setCardLocations(prevLocations => {
            const newLocations = { ...prevLocations };
            const cardIndex = updatedLocation.cardIndex;
            const locationIndex = newLocations[cardIndex].findIndex(loc =>
                loc.place_name === updatedLocation.place_name &&
                loc.x === updatedLocation.x &&
                loc.y === updatedLocation.y
            );
            if (locationIndex !== -1) {
                newLocations[cardIndex][locationIndex] = updatedLocation;
            }
            return newLocations;
        });
        handleModalClose();
    };

    const handleLocationDelete = (cardIndex, locIndex) => {
        const locationToDelete = cardLocations[cardIndex][locIndex];
        const markerToRemove = markers.find(m =>
            m.getPosition().getLat() === parseFloat(locationToDelete.y) &&
            m.getPosition().getLng() === parseFloat(locationToDelete.x)
        );

        if (markerToRemove) {
            markerToRemove.setMap(null);
            setMarkers(prevMarkers => prevMarkers.filter(m => m !== markerToRemove));
        }

        setCardLocations(prevLocations => {
            const newLocations = { ...prevLocations };
            newLocations[cardIndex].splice(locIndex, 1);
            if (newLocations[cardIndex].length === 0) {
                delete newLocations[cardIndex];
            }
            return newLocations;
        });
    };

    const updateScheduleTitle = async () => {
        const accessToken = localStorage.getItem('token')?.substring(7);

        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            setIsLoading(true);

            const response = await fetch(`https://detourofficial.shop/api/schedules/${scheduleId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                throw new Error('일정 제목 업데이트에 실패했습니다.');
            }
        } catch (err) {
            setError('일정 제목 수정 중 오류가 발생했습니다: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateSchedulePeriod = async () => {
        const accessToken = localStorage.getItem('token')?.substring(7);

        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            setIsLoading(true);

            const response = await fetch(`https://detourofficial.shop/api/schedules/${scheduleId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    departureDate: new Date(startDate).toISOString(),
                    arrivalDate: new Date(endDate).toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error('일정 기간 업데이트에 실패했습니다.');
            }

        } catch (err) {
            setError('일정 기간 수정 중 오류가 발생했습니다: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateMarker = async () => {
        const accessToken = localStorage.getItem('token')?.substring(7);

        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            setIsLoading(true);

            // 1. Collect place creation requests
            const placeRequests = [];
            const placeMap = new Map(); // To map place names to IDs
            const uniqueLocations = new Set(); // To track unique locations

            for (const dailyPlan of schedule.dailyPlanList) {
                for (const location of cardLocations[dailyPlan.day - 1] || []) {
                    // Create a unique key based on location data
                    const locationKey = `${location.place_name}-${location.x}-${location.y}`;

                    if (!uniqueLocations.has(locationKey)) {
                        uniqueLocations.add(locationKey);

                        if (!placeMap.has(location.place_name)) {
                            placeRequests.push(fetch("https://detourofficial.shop/api/place", {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    name: location.place_name,
                                    address: location.address_name,
                                    telNumber: location.phone,
                                }),
                            }).then(async (response) => {
                                if (!response.ok) {
                                    throw new Error("Place 생성에 실패했습니다.");
                                }
                                const placeData = await response.json();
                                placeMap.set(location.place_name, placeData.data.placeId);
                            }));
                        }
                    }
                }
            }

            // Wait for all place creation requests to complete
            await Promise.all(placeRequests);

            // 2. Update markers with place IDs
            for (const dailyPlan of schedule.dailyPlanList) {
                for (const location of cardLocations[dailyPlan.day - 1] || []) {
                    const placeId = placeMap.get(location.place_name);

                    if (placeId) {
                        const response = await fetch(`https://detourofficial.shop/api/daily-plans/${dailyPlan.dailyPlanId}/place/${placeId}/markers`, {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${accessToken}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                latitude: location.y,
                                longitude: location.x,
                            }),
                        });

                        if (!response.ok) {
                            throw new Error('마커 업데이트에 실패했습니다.');
                        }
                    }
                }
            }

            alert('일정이 성공적으로 수정되었습니다!');
            navigate(`/schedules/${scheduleId}`);
        } catch (err) {
            setError('일정 수정 중 오류가 발생했습니다: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };


    const updateScheduleTitleAndPeriod = async () => {
        await updateScheduleTitle();
        await updateSchedulePeriod();
        await updateMarker();
    };

    const getDateForDay = (day) => {
        if (!schedule || !schedule.departureDate) return '';

        const startDate = new Date(schedule.departureDate);
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + day - 1);
        return getDateString(date);
    };

    return (
        <S.SchedulesWrapper>
            {schedule ? (
                <S.SchedulesContainer>
                    <S.SchedulesTitle>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="일정 제목을 입력하세요"
                        />
                    </S.SchedulesTitle>
                    <S.SchedulesPeriodContainer>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)-1}
                        />
                        <span> ~ </span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)-1}
                        />
                    </S.SchedulesPeriodContainer>
                    <DetourButton
                        variant="main"
                        shape="small"
                        size="medium"
                        color="black"
                        border="default"
                        onClick={updateScheduleTitleAndPeriod}
                        disabled={isLoading}
                    >
                        {isLoading ? '수정 중...' : '수정 완료'}
                    </DetourButton>
                    <S.PlanWrapper>
                        <S.MapWrapper>
                            <div id="map" style={{ width: '100%', height: '400px' }}></div>
                        </S.MapWrapper>
                        <S.DividerLine />
                        <S.CardsWrapper>
                            <S.CardsContainer>
                                {schedule.dailyPlanList.map((dailyPlan, index) => (
                                    <S.Cards key={index}>
                                        <S.CardTitleContainer>
                                            <S.CardTitle>DAY {dailyPlan.day}</S.CardTitle>
                                            <S.CardDate>{getDateForDay(dailyPlan.day)}</S.CardDate>
                                        </S.CardTitleContainer>
                                        <S.LocationContainerWrapper>
                                            <S.LocationContainer>
                                                {(cardLocations[index] || []).map((location, locIndex) => (
                                                    <S.LocationWrapper key={locIndex}>
                                                        <S.Location>
                                                            <S.LocationIndex>{locIndex + 1}</S.LocationIndex>
                                                            <S.LocationName
                                                                onClick={() => handleLocationClick(location, index)}
                                                            >
                                                                {location.place_name}
                                                            </S.LocationName>
                                                        </S.Location>
                                                        <S.LocationDelete onClick={() => handleLocationDelete(index, locIndex)}>&times;</S.LocationDelete>
                                                    </S.LocationWrapper>
                                                ))}
                                                <S.PlusButtonWrapper>
                                                    <S.PlusButton onClick={() => onClickAddLocation(index)}>+</S.PlusButton>
                                                </S.PlusButtonWrapper>
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
            {searchVisible && (
                <SearchLocation
                    onClose={closeSearch}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onSelectLocation={handleLocationSelect}
                />
            )}
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            {selectedLocation && (
                <LocationModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    location={selectedLocation}
                    onSave={handleSaveLocation}
                />
            )}
        </S.SchedulesWrapper>
    );
};

export default EditSchedules;
