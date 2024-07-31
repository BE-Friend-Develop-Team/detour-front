import styled from "styled-components";
import theme from "../../global/theme";
import { flexCenter, flexCenterColumn } from "../../global/common";

const S = {};

S.GenerateSchedulesWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 40px;
`;

S.GenerateSchedulesContainer = styled.div`
    width: 80%;
`;

S.GenerateSchedulesTitle = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    cursor: pointer;
`;

S.GenerateSchedulesInput = styled.input`
    margin: 0;
    padding: 0;
    height: 2rem;
    font-size: 2rem;
    font-weight: 600;
    /* border: none; */
    margin-bottom: 2rem;

    /* border: none; */
    background-color: transparent;
`;

S.SelectPeriodContainer = styled.div`
    display: flex;
    font-size: 1.5rem;
    font-weight: 500;
`;

S.CalendarButton = styled.div`
    margin-left: 0.5rem;
    font-size: 1.5rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

S.GenerateSchedulesButtonWrapper = styled.div`
    display: flex;
    justify-content: center;

    & button {
        margin-top: 2rem;
        font-size: 1rem;
    }
`;
// Calendar

S.CalendarModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

S.CalendarModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${theme.PALETTE.white};
    border-radius: 10px;
    max-width: 30rem;
    width: 100%;
    padding: 20px;
    position: relative;
`;

S.SpanClose = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
`;

S.CalendarHeader = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
`;

S.CalendarControls = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    & button {
        margin: 2rem;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
    }
`;

S.DaysOfWeek = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 10px;
`;

S.CalendarDays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;

    & .day {
        text-align: center;
        padding: 10px;
        cursor: pointer;
        border-radius: 5px;
    }

    & .selected {
        background-color: ${theme.PALETTE.background.main};
        color: ${theme.PALETTE.black};
    }

    & .day .empty {
        background-color: transparent;
        cursor: default;
    }
`;

S.SelectButton = styled.button`
    display: block;
    width: 4rem;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #f0f0f0;
    cursor: pointer;
    font-size: 16px;

    & :hover {
        background-color: #e0e0e0;
    }
`;

export default S;
