import React, { useState, useEffect, useRef } from "react";
import S from "./style";
import SearchLocation from "./SearchLocation";
import DetourButton from "../../components/button/DetourButton";
import { useNavigate, useParams } from "react-router-dom";
import LocationModal from "./LocationModal";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CustomButton from "../../components/button/CustomButton";
import ButtonWrapper from "../../components/button/ButtonWrapper";

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
            const response = await fetch(`http://localhost:8081/api/schedules/${scheduleId}/details`, {
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
            console.log(schedule);
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
            locations[index] = dailyPlan.markerList
                .sort((a, b) => a.markerIndex - b.markerIndex) // markerIndex에 따라 정렬
                .map(marker => ({
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

    const handleLocationClick = async (location, cardIndex) => {
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const dailyPlan = schedule.dailyPlanList[cardIndex];
            const response = await fetch(`http://localhost:8081/api/daily-plans/${dailyPlan.dailyPlanId}/markers/${location.markerId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            console.log(response);
            if (!response.ok) {
                throw new Error("마커 정보를 불러오는데 실패했습니다.");
            }

            const data = await response.json();
            const markerDetails = data.data;
            console.log("테스트"+ markerDetails);
            setSelectedLocation({
                ...location,
                cardIndex,
                markerId: markerDetails.markerId,
                content: markerDetails.content,
                images: markerDetails.images,
                name: markerDetails.name
            });
            setIsModalOpen(true);
        } catch (err) {
            setError('마커 정보를 불러오는 중 오류가 발생했습니다: ' + err.message);
        }
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

    const handleLocationDelete = async (cardIndex, locIndex) => {
        const locationToDelete = cardLocations[cardIndex][locIndex];

        const markerToRemove = markers.find(m =>
            m.getPosition().getLat() === parseFloat(locationToDelete.y) &&
            m.getPosition().getLng() === parseFloat(locationToDelete.x)
        );

        if (markerToRemove) {
            markerToRemove.setMap(null);
        }

        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/daily-plans/markers/${locationToDelete.markerId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error('마커 삭제에 실패했습니다.');
            }

            setMarkers(prevMarkers => prevMarkers.filter(m => m !== markerToRemove));
            setCardLocations(prevLocations => {
                const newLocations = { ...prevLocations };
                newLocations[cardIndex].splice(locIndex, 1);
                if (newLocations[cardIndex].length === 0) {
                    delete newLocations[cardIndex];
                }
                return newLocations;
            });

            alert('마커가 성공적으로 삭제되었습니다.');

            // 서버에서 최신 데이터를 가져와 동기화
            await fetchScheduleDetails();

        } catch (err) {
            setError('마커 삭제 중 오류가 발생했습니다: ' + err.message);
        }
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

            const response = await fetch(`http://localhost:8081/api/schedules/${scheduleId}`, {
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

            const response = await fetch(`http://localhost:8081/api/schedules/${scheduleId}`, {
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
            await fetchScheduleDetails();

            if (!response.ok) {
                throw new Error('일정 기간 업데이트에 실패했습니다.');
            }

        } catch (err) {
            setError('일정 기간 수정 중 오류가 발생했습니다: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getExistingMarkers = () => {
        const existingMarkers = new Set();
        schedule.dailyPlanList.forEach(dailyPlan => {
            dailyPlan.markerList.forEach(marker => {
                const markerKey = `${marker.latitude}-${marker.longitude}-${marker.name}`;
                existingMarkers.add(markerKey);
            });
        });
        return existingMarkers;
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

            const existingMarkers = getExistingMarkers();
            const newMarkers = [];
            Object.values(cardLocations).forEach(locations => {
                locations.forEach(location => {
                    const markerKey = `${location.y}-${location.x}-${location.place_name}`;
                    if (!existingMarkers.has(markerKey)) {
                        newMarkers.push(location);
                    }
                });
            });

            const existingPlaces = new Map();
            for (const dailyPlan of schedule.dailyPlanList) {
                for (const marker of dailyPlan.markerList) {
                    existingPlaces.set(marker.name, marker.placeId);
                }
            }

            const placeRequests = [];
            const placeMap = new Map();
            const uniqueLocations = new Set();

            for (const dailyPlan of schedule.dailyPlanList) {
                for (const location of cardLocations[dailyPlan.day - 1] || []) {
                    const locationKey = `${location.place_name}-${location.x}-${location.y}`;

                    if (!uniqueLocations.has(locationKey)) {
                        uniqueLocations.add(locationKey);

                        if (!placeMap.has(location.place_name)) {
                            if (existingPlaces.has(location.place_name)) {
                                placeMap.set(location.place_name, existingPlaces.get(location.place_name));
                            } else {
                                placeRequests.push(fetch("http://localhost:8081/api/place", {
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
            }

            await Promise.all(placeRequests);

            for (const dailyPlan of schedule.dailyPlanList) {
                for (const newMarker of cardLocations[dailyPlan.day - 1] || []) {
                    const placeId = placeMap.get(newMarker.place_name);

                    if (placeId) {
                        const markerRequest = {
                            latitude: newMarker.y,
                            longitude: newMarker.x,
                        };

                        const existingMarker = schedule.dailyPlanList[dailyPlan.day - 1].markerList.find(marker =>
                            marker.latitude === markerRequest.latitude && marker.longitude === markerRequest.longitude && marker.placeId === placeId
                        );

                        if (!existingMarker) {
                            const response = await fetch(`http://localhost:8081/api/daily-plans/${dailyPlan.dailyPlanId}/place/${placeId}/markers`, {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(markerRequest),
                            });

                            if (!response.ok) {
                                throw new Error('마커 업데이트에 실패했습니다.');
                            }
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

    const getDateForDay = (day) => {
        if (!schedule || !schedule.createdAt) return '';

        const startDate = new Date(schedule.createdAt);
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + day - 1);
        return getDateString(date);
    };

    const onDragEnd = async (result) => {
        if (!result.destination) {
            return;
        }
        const { source, destination } = result;
        const dayIndex = parseInt(source.droppableId.split('-')[1]);
        const newCardLocations = { ...cardLocations };
        const [reorderedItem] = newCardLocations[dayIndex].splice(source.index, 1);
        newCardLocations[dayIndex].splice(destination.index, 0, reorderedItem);
        setCardLocations(newCardLocations);

        try {
            const accessToken = localStorage.getItem('token')?.substring(7);
            const response = await fetch(`http://localhost:8081/api/daily-plans/${schedule.dailyPlanList[dayIndex].dailyPlanId}/markers/${reorderedItem.markerId}/transfer`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ markerIndex: destination.index }),
            });
            if (!response.ok) {
                throw new Error('마커 순서 변경에 실패했습니다.');
            }

        } catch (error) {
            console.error('마커 순서 변경 중 오류 발생:', error);
        }
    };

    const updateScheduleTitleAndPeriod = async () => {
        await updateScheduleTitle();
        await updateSchedulePeriod();
        await updateMarker();
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
                            onClick={() => alert("죄송합니다. 날짜는 변경 불가능합니다.")}
                            readOnly
                        />
                        <span> ~ </span>
                        <input
                            type="date"
                            value={endDate}
                            onClick={() => alert("죄송합니다. 날짜는 변경 불가능합니다.")}
                            readOnly
                        />
                    </S.SchedulesPeriodContainer>
                    <ButtonWrapper>
                        <CustomButton
                            variant="main"
                            shape="small"
                            size="medium"
                            color="black"
                            border="default"
                            onClick={updateScheduleTitleAndPeriod}
                            disabled={isLoading}
                        >
                            {isLoading ? '수정 중...' : '수정'}
                        </CustomButton>
                    </ButtonWrapper>
                    <S.PlanWrapper>
                        <S.MapWrapper>
                            <div id="map" style={{ width: '100%', height: '400px' }}></div>
                        </S.MapWrapper>
                    </S.PlanWrapper>
                    <S.DayText>
                        {`여행 코스를 자유롭게 조정하세요. 장소 이름을 드래그하여 순서를 바꿀 수 있습니다.`}
                    </S.DayText>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <S.CardsContainer>
                            {schedule.dailyPlanList.map((dailyPlan, index) => (
                                <S.Cards key={index}>
                                    <S.CardTitleContainer>
                                        <S.CardTitle>DAY {dailyPlan.day}</S.CardTitle>
                                        <S.CardDate>{getDateForDay(dailyPlan.day)}</S.CardDate>
                                    </S.CardTitleContainer>
                                    <Droppable droppableId={`day-${index}`}>
                                        {(provided) => (
                                            <S.LocationContainer
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {(cardLocations[index] || []).map((location, locIndex) => (
                                                    <Draggable key={location.markerId} draggableId={`${location.markerId}`} index={locIndex}>
                                                        {(provided) => (
                                                            <S.LocationWrapper
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
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
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </S.LocationContainer>
                                        )}
                                    </Droppable>
                                    <S.PlusButtonWrapper>
                                        <S.PlusButton onClick={() => onClickAddLocation(index)}>+</S.PlusButton>
                                    </S.PlusButtonWrapper>
                                </S.Cards>
                            ))}
                        </S.CardsContainer>
                    </DragDropContext>
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
                    userName={schedule.nickname}
                    departureDate = {schedule.createdAt}
                />
            )}
        </S.SchedulesWrapper>
    );
};

export default EditSchedules;