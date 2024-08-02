import React, { useState, useEffect } from "react";
import S from "./style";
import SearchLocation from "./SearchLocation";
import DetourButton from "../../components/button/DetourButton";

// kakao maps api를 심어서 가져오면 window 전역객체에 들어간다
// 함수형 컴포넌트에서는 이걸 바로 인식하지 못하는경우가 있어서
// const {kakao} = window로 인지시키고 kakao객체를 뽑아쓴다
const { kakao } = window;

const AddSchedules = ({ title, startDate, endDate }) => {
    // 각 카드의 위치 배열을 저장하기 위한 상태
    const [cardLocations, setCardLocations] = useState({});
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [currentCardIndex, setCurrentCardIndex] = useState(null);
    const [map, setMap] = useState(null); // 지도 객체 상태
    const [markers, setMarkers] = useState([]); // 마커 객체 상태

    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(35.8242238, 127.1479532),
            level: 13,
        };
        const mapInstance = new kakao.maps.Map(container, options);
        setMap(mapInstance); // 지도 객체 저장
    }, []);

    const getDateRange = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const dates = [];
        let currentDate = startDate;

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
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
            // 지도에 마커 추가
            const position = new kakao.maps.LatLng(location.y, location.x);
            const marker = new kakao.maps.Marker({
                map: map,
                position: position,
                title: location.place_name,
            });

            // marker 객체에 cardIndex를 추가
            marker.cardIndex = currentCardIndex;
            setMarkers((prevMarkers) => [...prevMarkers, marker]);

            // 선택한 위치의 중심으로 지도 이동
            map.panTo(position);

            // 카드 위치 상태 업데이트
            setCardLocations((prevLocations) => {
                const newLocations = { ...prevLocations };
                newLocations[currentCardIndex] = [...(newLocations[currentCardIndex] || []), location];
                return newLocations;
            });
        }
        closeSearch();
    };

    const handleLocationDelete = (cardIndex, locIndex) => {
        // 해당 위치의 마커 삭제
        const locationToDelete = cardLocations[cardIndex][locIndex];
        const markerToRemove = markers.find((m) => m.cardIndex === cardIndex && m.getTitle() === locationToDelete.place_name);
        if (markerToRemove) {
            markerToRemove.setMap(null);
            setMarkers((prevMarkers) => prevMarkers.filter((m) => m !== markerToRemove));
        }

        // 카드 위치 상태 업데이트
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
        const scheduleData = {
            title: `${title}`,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            itinerary: Object.keys(cardLocations).map((key) => ({
                day: parseInt(key) + 1, // 1일부터 시작
                locations: cardLocations[key],
            })),
        };

        console.log(scheduleData);

        try {
            const response = await fetch("https://localhost:8081/api/schedules", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(scheduleData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Schedule saved successfully:", result);
            // navigate 일정 상세 페이지
        } catch (error) {
            console.error("Error saving schedule:", error);
        }
    };

    return (
        <S.AddSchedulesWrapper>
            <S.MapWrapper>
                <div id="map"></div>
            </S.MapWrapper>
            <S.DividerLine />
            <S.AddScheduleCardsWrapper>
                <S.AddScheduleCardsContainer>
                    {dateRange.map((date, index) => (
                        <S.AddScheduleCards key={index}>
                            <S.CardTitleContainer>
                                <S.CardTitle>DAY {index + 1}</S.CardTitle>
                                <S.CardDate>{date.toLocaleDateString()}</S.CardDate>
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
                <DetourButton variant={"main"} shape={"small"} size={"medium"} color={"black"} border={"default"} onClick={onClickGenerateSchedules}>
                    완료
                </DetourButton>
            </S.GenerateSchedulesCompleteButtonWrapper>
            {searchVisible && (
                <SearchLocation onClose={closeSearch} searchValue={searchValue} setSearchValue={setSearchValue} onSelectLocation={handleLocationSelect} />
            )}
        </S.AddSchedulesWrapper>
    );
};

export default AddSchedules;