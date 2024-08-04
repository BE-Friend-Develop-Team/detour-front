import styled from "styled-components";
import theme from "../../global/theme";
import { flexCenter, flexCenterColumn } from "../../global/common";

const S = {};

S.GenerateSchedulesWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 40rem;
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
    margin-bottom: 2rem;
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

S.GenerateSchedulesCompleteButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
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

// AddSchedule

S.AddSchedulesWrapper = styled.div``;

S.MapWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;

    & #map {
        width: 50rem;
        height: 30rem;
        
    }
`;

S.DividerLine = styled.div`
    margin-top: 4rem;
    width: 100%;
    height: 0.125rem;
    background-color: ${theme.PALETTE.gray[300]};
`;

S.AddScheduleCardsWrapper = styled.div`
    overflow-x: scroll;
`;

S.AddScheduleCardsContainer = styled.div`
    display: inline-flex;
`;

S.AddScheduleCards = styled.div`
    width: 20rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    margin: 4rem 2rem;
    padding: 1rem;
    background-color: ${theme.PALETTE.background.main};
    border-radius: 4px;
`;

S.CardsWrapper = styled.div`
    overflow-x: scroll;
`;

S.CardsContainer = styled.div`
    display: inline-flex;
`;

S.Cards = styled.div`
    width: 20rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    margin: 4rem 2rem;
    padding: 1rem;
    background-color: ${theme.PALETTE.background.main};
    border-radius: 4px;
`;

S.CardTitleContainer = styled.div`
    display: flex;
    align-items: baseline;
`;

S.CardTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    margin-right: 1rem;
`;

S.CardDate = styled.h5`
    font-size: 0.8rem;
    font-weight: 500;
`;

S.LocationContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 25.5rem;
    overflow-y: auto;
`;

S.LocationContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
`;

S.LocationWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 4rem;
    align-items: center;
`;

// 이미지 업로드 영역
const ImageUpload = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="file"] {
    margin-bottom: 10px;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
`;

S.Location = styled.div`
    display: flex;
    align-items: center;
    width: 16.5rem;
`;

S.LocationIndex = styled.div`
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.PALETTE.secondary.sub};
    border-radius: 50%;
`;

S.LocationName = styled.span`
    cursor: pointer;  // 추가된 부분
    &:hover {
        text-decoration: underline;
    }
`;
S.LocationDelete = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin-bottom: 0.375rem;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    cursor: pointer;
`;

S.PlusButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

S.PlusButton = styled.div`
    width: 2rem;
    height: 2rem;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.PALETTE.secondary.sub};
    height: 2rem;
    border-radius: 50%;
    cursor: pointer;
`;

// SearchLocation
S.SearchLocationModal = styled.div`
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

S.SearchLocationContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${theme.PALETTE.white};
    border-radius: 10px;
    max-width: 30rem;
    width: 100%;
    height: 25rem;
    padding: 20px;
    position: relative;
`;

S.SearchInputContainer = styled.div`
    margin: 1rem 0;
    position: relative;
`;

S.SearchIcon = styled.div`
    font-size: 1.5rem;
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 0.25rem;
    right: 0.5rem;
    cursor: pointer;
`;

S.SearchLocationListContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 20rem;
    width: 24rem;
    overflow-y: auto;
`;

S.SearchLocationListContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
`;

S.SearchLocation = styled.div`
    height: 3rem;
    width: 100%;
    margin-bottom: 0.5rem;
    background-color: ${theme.PALETTE.background.yellow};
    border-radius: 4px;
`;

// SchedulesDetail
S.PlanWrapper = styled.div``;

S.SchedulesInformationContainer = styled.div`
    display: flex;
`;

S.SchedulesTitlePeriodContainer = styled.div`
    width: 65%;
`;
S.SchedulesLikesTravelersContainer = styled.div`
    width: 35%;
`;

S.SchedulesLike = styled.div`
    display: flex;
    font-size: 1rem;
    font-weight: 500;
    margin-top: 1rem;
`;

S.SchedulesTravlers = styled.div`
    display: flex;
    font-size: 1rem;
    font-weight: 500;
    margin-top: 2rem;
`;

// SchedulesDetail
S.SchedulesWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 40rem;
    padding: 20px;
    margin-top: 40px;
`;

S.SchedulesContainer = styled.div`
    width: 80%;
`;

S.SchedulesTitle = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    cursor: pointer;
`;

S.SchedulesInput = styled.input`
    margin: 0;
    padding: 0;
    height: 2rem;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    background-color: transparent;
`;

S.SchedulesPeriodContainer = styled.div`
    display: flex;
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 2rem;
`;

// EditSchedules에 필요한 추가 스타일 컴포넌트

S.EditSchedulesWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 40rem;
    padding: 20px;
    margin-top: 40px;
`;

S.EditScheduleCardsWrapper = styled.div`
    overflow-x: scroll;
    width: 100%;
`;

S.EditScheduleCardsContainer = styled.div`
    display: inline-flex;
`;

S.EditScheduleCards = styled.div`
    width: 20rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    margin: 4rem 2rem;
    padding: 1rem;
    background-color: ${theme.PALETTE.background.main};
    border-radius: 4px;
`;

S.UpdateScheduleButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    & button {
        margin-top: 2rem;
        font-size: 1rem;
    }
`;

S.ErrorMessage = styled.div`
    color: red;
    text-align: center;
    margin-top: 1rem;
`;

// SchedulesDetail에 필요한 추가 스타일 컴포넌트

S.SchedulesInformationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
`;

S.SchedulesTitlePeriodContainer = styled.div`
    flex: 1;
`;

S.SchedulesLikesTravelersContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

S.SchedulesLike = styled.div`
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
`;

S.SchedulesTravlers = styled.div`
    font-size: 1rem;
    font-weight: 500;
`;

// 초대 모달을 위한 스타일
S.Modal = styled.div`
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
`;

S.ModalContent = styled.div`
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        margin-bottom: 20px;
    }

    input {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    button {
        margin-top: 10px;
    }
`;

// Styles for LocationModal
S.LocationModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
`;

S.LocationModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${theme.PALETTE.white};
    border-radius: 10px;
    max-width: 30rem;
    width: 100%;
    padding: 20px;
    position: relative;
    z-index: 2001;

    h2 {
        margin-bottom: 20px;
    }

    input {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    button {
        margin-top: 10px;
    }
`;

S.ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
`;

S.ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 100%;
    z-index: 2001;
`;

S.ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h2 {
        margin: 0;
    }
    button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    }
`;

S.ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

S.ImageUpload = styled.div`
    input {
        display: none;
    }
    img {
        width: 100%;
        height: auto;
        margin-top: 10px;
    }
`;

S.DescriptionInput = styled.textarea`
    width: 100%;
    height: 100px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

S.ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    button {
        background: #007bff;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
`;


export default S;