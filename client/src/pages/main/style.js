import styled from "styled-components";
import theme from "../../global/theme";
import { flexCenter, flexCenterColumn } from "../../global/common";

const S = {};

S.Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 40px;
`;

S.PopularSection = styled.section`
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 60px;
`;

S.PopularH1 = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    padding: 20px;
    text-align: left;
    width: 100%;
`;

S.RankingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
`;

S.TripCard = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

S.TripHeader = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8f8;

    h3 {
        margin: 0;
        font-size: 1rem;
    }

    span {
        font-weight: bold;
        color: black;
    }
`;

S.TripImageWrapper = styled.div`
    width: 100%;
    height: 200px;
    overflow: hidden;

    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

S.TripImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

S.TripFooter = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8f8;

    span {
        font-size: 0.9rem;
        color: #666;
    }
`;

S.TripLocation = styled.h3`
    margin: 0;
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
`;

S.LoadingText = styled.p`
    font-size: 1rem;
    color: #666;
    text-align: center;
    margin-top: 20px;
`;

S.ArticleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

S.PopularArticle = styled.article`
    position: relative;
    width: 20rem;
    height: 12rem;
    margin: 2rem;
    & img {
        width: 100%;
        height: 100%;
    }
`;

S.PopularArticleH4 = styled.h4`
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: ${theme.FONT_SIZE.h4};
    color: ${theme.PALETTE.white};
`;

S.PopularArticleButtonWrapper = styled.div`
    position: absolute;
    bottom: 1.5rem;
    left: 1rem;
`;

S.SearchSection = styled.section`
    width: 100%;
    max-width: 800px;
    margin-bottom: 60px;
    text-align: center;

    & h2 {
        font-size: 1.5rem;
        margin: 0 0 20px 0;
    }

    & p {
        font-size: 0.75rem;
    }
`;

S.SearchBar = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

S.SearchButton = styled.button`
    height: 2.4rem;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 20px;
    & img {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
    }
`;

S.DetailButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: #ff9933;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    opacity: 0.95;

    &:hover {
        background-color: #ffcc99;
        opacity: 1;
    }
`;

export default S;