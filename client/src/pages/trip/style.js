import styled from "styled-components";

const S = {};

S.Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 40px;
`;

S.SearchSection = styled.section`
    width: 100%;
    max-width: 800px;
    margin-bottom: 60px;
    text-align: center;

    h2 {
        font-size: 1.5rem;
        margin: 0 0 20px 0;
    }

    p {
        font-size: 0.75rem;
    }
`;

S.SearchBar = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;

    input {
        padding: 10px;
        font-size: 1.1em;
        width: 80%;
        max-width: 400px;
        border: none;
        border-radius: 20px;
        background-color: #fff5cc;
        color: rgb(27, 24, 24);
        text-align: center;
        font-family: 'Jua', sans-serif;
    }

    input::placeholder {
        color: rgb(65, 36, 36);
        font-size: 1.1em;
        font-family: 'Jua', sans-serif;
    }
`;

S.TripSection = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px; /* 공백을 늘림 */
    justify-content: center;
    padding: 20px;
`;

S.TripCard = styled.div`
    border: 4px solid #fdf5de;
    border-radius: 20px;
    overflow: hidden;
    width: 300px;
    min-height: 350px;
    background-color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    /* 입체감을 주기 위한 그림자 추가 */
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        /* 호버 시 그림자 확대 효과 */
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 16px 32px rgba(0, 0, 0, 0.2);
    }
`;

S.TripHeader = styled.div`
    padding: 15px;
    flex-shrink: 0;

    h3 {
        margin: 0;
        font-size: 1.2em; /* 가장 큰 크기 */
        text-align: center; /* 제목을 가운데 정렬 */
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    h4 {
        margin: 5px 0;
        font-size: 0.7em; /* 중간 크기 */
        color: gray;
        text-align: left; /* 좌측 정렬 */
    }

    h5 {
        margin: 16px 0 5px 0; /* 제목과 nickname 사이에 공백 추가, 아래쪽에 약간의 여백 추가 */
        font-size: 0.8em; /* 두 번째로 큰 크기 */
        color: #333; /* 기본 텍스트 색상 */
        text-align: left; /* 좌측 정렬 */
        display: flex;
        align-items: center; /* 수직 가운데 정렬 */
    }
`;

S.Nickname = styled.span`
    color: #4f1818; /* 빨간색으로 설정 */
    font-weight: bold;
`;

S.ScheduleText = styled.span`
    color: black; /* 검정색으로 설정 */
`;

S.TripImageWrapper = styled.div`
    width: 100%;
    height: 200px;
    border: 1px solid #c0c0c0; /* 프레임 색상 */
    border-radius: 10px; /* 프레임의 모서리 둥글기 */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

S.TripImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

S.TripFooter = styled.div`
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

S.LikeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    img {
        width: 24px;
        height: 24px;
    }
`;

S.LikeCount = styled.span`
    font-size: 1em;
    color: gray;
    margin-left: 8px;
`;

S.ViewCount = styled.span`
    font-size: 1em;
    color: gray;
`;

export default S;
