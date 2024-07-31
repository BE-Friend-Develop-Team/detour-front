import React, { useEffect, useState } from "react";
import S from "./style";
import DetourButton from "../../components/button/DetourButton";
import Calendar from "./Calendar";

const GenerateSchedules = () => {
    const [isInput, setIsInput] = useState(false);
    const [title, setTitle] = useState("여행 이름");
    const [period, setPeriod] = useState("여행 기간을 선택하세요");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [calendarVisible, setCalendarVisible] = useState(false);

    const onClickChangeAsInput = () => {
        setIsInput(true);
    };

    useEffect(() => {
        console.log(isInput);
        console.log(title);
    }, [isInput]);

    const onChangeSetTitle = (e) => {
        setTitle(e.target.value);
    };

    const onKeyDownSetDiv = (e) => {
        if (e.key === "Enter") {
            setIsInput(false);
        }
    };

    const onBlurSetDiv = (e) => {
        setIsInput(false);
    };

    const onClickSetCalendar = () => {
        setCalendarVisible(true);
    };

    // 여행일정 만들기 버튼 눌렀을 때, 저장된 title, startDate, endDate를 title, departualDate, arrivalDate로 fetch요청

    const onClickGenerateSchedules = async () => {
        console.log(title);
        console.log(startDate);
        console.log(endDate);

        const accessToken = localStorage.getItem('token').substring(7);

        if (!startDate || !endDate) {
            alert("여행 기간을 선택해 주세요.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8081/api/schedules", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    title: title,
                    departureDate: startDate ? startDate.toISOString() : null,
                    arrivalDate: endDate ? endDate.toISOString() : null,
                }),
            });

            console.log(response, "response data");
            console.log(response.ok);

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "Request failed");
            }

            return response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSelectDates = (start, end) => {
        const startDate = new Date(start);
        const endDate = end ? new Date(end) : null;

        if (startDate && endDate) {
            setPeriod(`${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`);
            setStartDate(startDate);
            setEndDate(endDate);
        } else if (startDate) {
            setPeriod(startDate.toLocaleDateString());
            setStartDate(startDate);
        }
        closeCalendar();
    };

    const closeCalendar = () => {
        setCalendarVisible(false);
    };

    return (
        <S.GenerateSchedulesWrapper>
            <S.GenerateSchedulesContainer>
                {!isInput ? (
                    <S.GenerateSchedulesTitle onClick={onClickChangeAsInput}>{title}</S.GenerateSchedulesTitle>
                ) : (
                    <S.GenerateSchedulesInput value={title} onChange={onChangeSetTitle} onKeyDown={onKeyDownSetDiv} onBlur={onBlurSetDiv} />
                )}

                <S.SelectPeriodContainer>
                    <span>{period}</span>
                    <S.CalendarButton onClick={onClickSetCalendar}>🗓️</S.CalendarButton>
                </S.SelectPeriodContainer>
                <S.GenerateSchedulesButtonWrapper>
                    {/* 여행일정 만들기 클릭시 fetch요청 */}
                    <DetourButton variant={"main"} shape={"small"} size={"medium"} color={"black"} border={"default"} onClick={onClickGenerateSchedules}>
                        여행일정 만들기
                    </DetourButton>
                </S.GenerateSchedulesButtonWrapper>
                {calendarVisible && <Calendar onClose={() => closeCalendar()} onSelectDates={handleSelectDates} />}
            </S.GenerateSchedulesContainer>
        </S.GenerateSchedulesWrapper>
    );
};

export default GenerateSchedules;
