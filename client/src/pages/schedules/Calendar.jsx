import React, { useEffect, useState } from "react";
import S from "./style";

const Calendar = ({ onClose, onSelectDates }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState("");

    useEffect(() => {
        if (startDate && endDate) {
            setSelectedDates(`${startDate} - ${endDate}`);
            console.log(startDate);
            console.log(endDate);
        } else if (startDate) {
            setSelectedDates(startDate);
            console.log(startDate);
        }
    }, [startDate, endDate]);

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        const days = [];
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(<div key={`empty-${i}`} className="day empty"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
            const isSelected =
                (startDate && endDate && new Date(dateStr) >= new Date(startDate) && new Date(dateStr) <= new Date(endDate)) ||
                dateStr === startDate ||
                dateStr === endDate;
            days.push(
                <div key={dateStr} className={`day${isSelected ? " selected" : ""}`} onClick={() => handleDateClick(dateStr)}>
                    {i}
                </div>
            );
        }

        return (
            <>
                <S.CalendarHeader>
                    {year}년 {month + 1}월
                </S.CalendarHeader>
                <S.DaysOfWeek>
                    {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                        <div key={index}>{day}</div>
                    ))}
                </S.DaysOfWeek>
                <S.CalendarDays>{days}</S.CalendarDays>
            </>
        );
    };

    const handleDateClick = (selectedDate) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(selectedDate);
            setEndDate(null);
        } else if (startDate && !endDate) {
            if (new Date(selectedDate) < new Date(startDate)) {
                setStartDate(selectedDate);
                setEndDate(null);
            } else if (getDaysDifference(startDate, selectedDate) <= 10) {
                setEndDate(selectedDate);
            } else {
                alert("여행 날짜는 최대 10일까지 설정 가능합니다.");
            }
        }
    };

    const getDaysDifference = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const timeDiff = Math.abs(endDate - startDate);
        return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    };

    return (
        <S.CalendarModal>
            <S.CalendarModalContent>
                <S.SpanClose onClick={onClose}>&times;</S.SpanClose>
                <S.CalendarControls>
                    <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>&lt;</button>
                    <div id="calendar-container">{renderCalendar()}</div>
                    <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>&gt;</button>
                </S.CalendarControls>
                <S.SelectButton onClick={() => onSelectDates(startDate, endDate)}>선택</S.SelectButton>
            </S.CalendarModalContent>
        </S.CalendarModal>
    );
};

export default Calendar;
