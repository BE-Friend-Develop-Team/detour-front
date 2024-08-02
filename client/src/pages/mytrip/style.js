import styled from "styled-components";

const S = {};

S.GenerateMyTripWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 40px;
`;

S.GenerateMyTripContainer = styled.div`
    width: 80%;
`;

S.GenerateMyTripTitle = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    cursor: pointer;
    text-align: center;
`;

S.searchbar = styled.div`
  width: 100%;
  margin-bottom: 60px;
  text-align: center;
`;

S.scheduleWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  justify-content: center;
  padding: 20px;
`

S.ScheduleItem = styled.div`
  border: 4px solid #fdf5de;
  border-radius: 20px;
  overflow: hidden;
  width: 300px;
  min-height: 350px;
  background-color: white;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

S.ScheduleTitle = styled.div`
  padding: 15px;
  text-align: center;
  flex-shrink: 0;
  margin: 0;
  font-size: 1.5em;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

S.ScheduleImage = styled.div`
  
  img {
    width: 90%;
    height: 200px;
    object-fit: cover;
    display: block;
    margin: 0 auto;
  }
`
S.LikeButton = styled.div`
`

S.LikeCount = styled.div``


S.ScheduleDetails = styled.div`
  font-size: 1rem;
  color: #555;
`;

S.LoadingMessage = styled.div`
  font-size: 1rem;
  color: #555;
`;

export default S;