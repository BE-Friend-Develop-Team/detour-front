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

S.SchedulesContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 70%;
  margin: 0 auto;
`;

S.SchedulesTitle = styled.div`
  margin-bottom: 20px;
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  input[type="text"] {
    border: 2px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    font-size: 1em;
    transition: border-color 0.3s;
    &:focus {
      border-color: #5b9bd5;
      outline: none;
    }
  }
  span {
    font-size: 1em;
    color: #555;
  }

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

S.SchedulesCommentss = styled.div`
    display: flex;
    font-size: 1rem;
    font-weight: 500;
    margin-top: 0.5rem;
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
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  input[type="date"] {
    border: 2px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    font-size: 1em;
    transition: border-color 0.3s;
    &:focus {
      border-color: #5b9bd5;
      outline: none;
    }
  }
  span {
    font-size: 1em;
    color: #555;
  }
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
  background-color: rgba(0, 0, 0, 0.5); /* 배경색을 어둡게 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

S.Modal1 = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); // 배경을 반투명 검정으로
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; // 모달이 가장 위에 오도록
`;

S.ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 90%;
  max-width: 500px; /* 적절한 최대 너비를 설정 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 20px;
  }
  input {
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
  }
  button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #0056b3;
    }
  }
`;

S.ModalContent = styled.div`
    padding: 15px;
    flex-shrink: 0;
`;

S.ModalContent1 = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
    width: 100%;
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
  width: 400px;
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

S.ButtonsContainer = styled.div`
    display: flex;
    margin: 1rem 0; // 버튼과 다른 내용 사이에 여백 추가
`;

S.ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 600px;
    max-width: 100%;
    z-index: 2001;
`;
S.ModalContent1 = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 600px;
    max-width: 100%;
    z-index: 2001;
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
    margin-bottom: 0;
    h3 {
        margin: 0;
        font-size: 1.2em; /* 가장 큰 크기 */
        text-align: center; /* 제목을 가운데 정렬 */
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    button {
        background-color: #ffffff;
        color: black;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 0px;
        transition: background-color 0.3s ease;
        font-weight: bold;
        &:hover {
            background-color: #ffffff;
        }
    }
`;

S.ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px; /* h4와 h5 사이의 공백을 줄이기 위한 설정 */
    margin-top: 0; /* ModalHeader와의 공백을 없애기 위한 설정 */
    padding: 0; /* 필요에 따라 조정 */
    h4 {
        margin: 0;
        font-size: 0.7em; /* 중간 크기 */
        color: gray;
        text-align: left; /* 좌측 정렬 */
    }
    h5 {
        margin: 0; /* 제목과 nickname 사이에 공백 추가, 아래쪽에 약간의 여백 추가 */
        font-size: 0.8em; /* 두 번째로 큰 크기 */
        color: #333; /* 기본 텍스트 색상 */
        text-align: left; /* 좌측 정렬 */
        display: flex;
        align-items: center; /* 수직 가운데 정렬 */
    }
`;

S.UploadButtonImage = styled.img`
    width: 50px; /* 원하는 크기로 조정 */
    height: 50px; /* 원하는 크기로 조정 */
    cursor: pointer;
    margin-top: 20px;
`;

S.ImageUpload = styled.div`
  .image-container {
    display: flex;
    overflow-x: auto;
  }
  input {
    display: none;
  }
`;

S.ImagePreview =  styled.img`
    width: 300px;
    height: auto;
    object-fit: cover;
    margin: 5px;
`;

S.DescriptionInput = styled.textarea`
    width: 100%;
    height: 150px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

S.ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  button {
    background: ${theme.PALETTE.primary.main};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      color: ${theme.PALETTE.primary.dark};
    }
  }
`;

S.CloseButtonImage = styled.img`
    width: 30px;  // 원하는 너비로 설정
    height: 30px; // 원하는 높이로 설정
    object-fit: cover; // 이미지 비율에 맞게 잘림
    cursor: pointer; // 클릭 가능한 상태로 표시
`;

S.ImagePreviewWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

S.DeleteButtonImage = styled.img`
    position: absolute;
    top: 5px; 
    right: 5px;
    width: 30px; 
    height: 30px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.7); 
    border-radius: 50%;
    padding: 2px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
    transition: background-color 0.3s; 

    &:hover {
        background-color: rgba(255, 255, 255, 1); 
    }
    
`;

S.ScheduleText = styled.span`
    color: black; /* 검정색으로 설정 */
`;
S.UserName = styled.span`
    color: #4f1818; /* 빨간색으로 설정 */
    font-weight: bold;
`;



S.StyleButton1 = styled.div`
`
export const InvitedUser = styled.span`
  margin-left: 10px;
  color: #666;
  font-size: 0.875rem;
`;


S.CommentSection = styled.div`
  margin-top: 20px;
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
`;

S.CommentForm = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

S.CommentInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-right: 10px;
`;

S.CommentSubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

S.CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

S.CommentItem = styled.li`
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
`;

S.CommentAuthor = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
    color: dimgray;
`;

S.CommentContent = styled.p`
  margin-bottom: 5px;
`;

S.CommentDate = styled.p`
  font-size: 0.8em;
  color: #888;
`;

S.CommentEditForm = styled.form`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

S.CommentEditInput = styled.input`
    flex: 1;
    padding: 5px;
    margin-right: 10px;
`;

S.CommentEditButton = styled.button`
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    margin-right: 5px;

    &:hover {
        background-color: #45a049;
    }
`;


S.CommentActions = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
`;

S.CommentActionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 10px;
`;

S.DayText = styled.div`
    font-size: 0.875rem;
    font-weight: normal;
    color: #919191;
    margin-bottom: 10px;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
`;


export default S;
