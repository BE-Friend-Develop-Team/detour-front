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

S.Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    
    button {
        background-color: #e5e5e5;
        border: 1px solid #e5e5e5;
        color: white;
        padding: 8px 16px;
        margin: 0 4px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
        transition: background-color 0.3s ease, color 0.3s ease;
        
        &:hover {
            background-color: #e7c758;
            color: #333;
        }
        
        &:disabled {
            background-color: #e7c758;
            color: #888;
            cursor: not-allowed;
        }
    }
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
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    justify-content: center;
    padding: 20px;
`;

S.SortSection = styled.div`
    position: relative;
    right: -430px;
    width: auto;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    z-index: 10;

    label {
        margin-right: 10px;
        font-size: 1rem;
    }

    select {
        padding: 8px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        color: #333;
        cursor: pointer;
    }
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
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 16px 32px rgba(0, 0, 0, 0.2);
    }
`;

S.TripHeader = styled.div`
    padding: 15px;
    flex-shrink: 0;

    h3 {
        margin: 0;
        font-size: 1.2em;
        text-align: center;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    h4 {
        margin: 5px 0;
        font-size: 0.7em;
        color: gray;
        text-align: left;
    }

    h5 {
        margin: 16px 0 5px 0;
        font-size: 0.8em;
        color: #333;
        text-align: left;
        display: flex;
        align-items: center;
    }
`;

S.Nickname = styled.span`
    color: #4f1818;
    font-weight: bold;
`;

S.ScheduleText = styled.span`
    color: black;
`;

S.TripImageWrapper = styled.div`
    width: 100%;
    height: 200px;
    border: 1px solid #c0c0c0;
    border-radius: 10px;
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

S.EditImageButton = styled.button`
    position: absolute;
    top: 45px;
    right: 10px;
    background-color: #fff;
    border: 2px solid #ffffff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: #e5e5e5;
        border-color: #e3e3e3;
        color: #fff;
    }

    img {
        width: 20px;
        height: 20px;
    }
`;
export const ModalInput = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 1em;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
    outline: none;

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    }

    &::placeholder {
        color: #888;
    }
`;

export const ModalButton = styled.button`
    background-color: #f3d35f;
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #e7c758;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(240, 246, 194, 0.5);
    }
`;



export default S;
