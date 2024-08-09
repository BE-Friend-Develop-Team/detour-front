import React, { useEffect, useState } from "react";
import S from "./style";
import DetourButton from "../../components/button/DetourButton";
import Calendar from "./Calendar";
import AddSchedules from "./AddSchedules";

const GenerateSchedules = () => {
    const [isInput, setIsInput] = useState(false);
    const [title, setTitle] = useState("제목을 입력하세요");
    const [period, setPeriod] = useState("여행 기간을 선택하세요");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [addSchedulesVisible, setAddSchedulesVisible] = useState(false);

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


    const onClickShowAddSchedules = () => {
        console.log(title);
        console.log(startDate);
        console.log(endDate);

        if (!startDate || !endDate) {
            alert("여행 기간을 선택해 주세요.");
            return;
        }

        setAddSchedulesVisible(true);
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
                {addSchedulesVisible ? (
                    <AddSchedules title={title} startDate={startDate} endDate={endDate} />
                ) : (
                    <S.GenerateSchedulesButtonWrapper>
                        <DetourButton variant={"main"} shape={"small"} size={"medium"} color={"black"} border={"default"} onClick={onClickShowAddSchedules}>
                            여행 일정 만들기
                        </DetourButton>
                    </S.GenerateSchedulesButtonWrapper>
                )}
                {calendarVisible && <Calendar onClose={() => closeCalendar()} onSelectDates={handleSelectDates} />}
            </S.GenerateSchedulesContainer>
        </S.GenerateSchedulesWrapper>
    );
};

export default GenerateSchedules;