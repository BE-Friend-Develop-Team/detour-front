import styled from "styled-components";

const S = {};

S.Main = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

S.Section = styled.section`
    width: 100%;
    max-width: 800px;
    margin-bottom: 40px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    &.profile {
        background-color: #fff5cc;
    }
`;

S.SectionTitle = styled.h2`
    border-bottom: 2px solid #ff6600;
    display: inline-block;
    margin-bottom: 20px;
`;

S.ProfileInfo = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

S.ProfilePicture = styled.div`
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin-right: 20px;
    }
`;

S.ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

S.ProfileDetailItem = styled.p`
    display: flex;
    align-items: center;
    font-size: 18px;
    margin: 10px 0;

    span {
        font-weight: bold;
        margin-left: 10px;
        color: #555;
    }

    button {
        margin-left: 10px;
    }
`;

S.DeleteAccountButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 20px;
    background-color: transparent;
    color: black;
    border: none;
    padding: 5px 5px;
    font-size: 16px;
    cursor: pointer;
    text-decoration: underline;
    border-radius: 5px;
    box-shadow: none;

    &:hover {
        color: white;
        background-color: #cc0000;
    }
`;

S.TripsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

S.ViewAllButton = styled.button`
    color: #ff6600;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #fff5cc;
    }
`;

S.Trips = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
`;

S.TripArticle = styled.article`
    border: 1px solid #ddd;
    padding: 0;
    text-align: center;
    width: 30%;
    box-sizing: border-box;
    background-color: white;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    flex-direction: column;
`;

S.ImageContainer = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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

S.TitleContainer = styled.div`
    bottom: 10px;
    left: 10px;
    width: calc(100% - 20px);
    background-color: white;
    padding: 10px;
    border-radius: 5px;
`;

S.TripTitle = styled.h4`
    margin: 0;
    font-size: 16px;
    color: #333;
`;

S.Modal = styled.div`
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
    justify-content: center;
    align-items: center;
`;

S.ModalContent = styled.div`
    background-color: #fff5cc;
    padding: 20px;
    border: 1px solid #888;
    width: 90%;
    max-width: 500px;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

S.CloseButton = styled.span`
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;

    &:hover,
    &:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`;

S.EditSection = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 20px;
    box-sizing: border-box;
    margin: 0;

    h3 {
        margin-bottom: 20px;
        text-align: center;
    }

    input {
        width: 100%;
        margin-bottom: 15px;
    }
`;

S.ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 20px;

    button {
        margin-left: 10px;
    }
`;

S.LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.2rem;
    margin-top: 2rem;
`;

S.ErrorMessage = styled.div`
    text-align: center;
    font-size: 0.8rem;
    color: red;
    margin-bottom: 1.5rem;
`;

export default S;