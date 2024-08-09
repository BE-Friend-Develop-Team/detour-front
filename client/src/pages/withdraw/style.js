import styled from "styled-components";
import theme from "../../global/theme";
import { flexCenter, flexCenterColumn } from "../../global/common";

const S = {};

export default S;

S.Main = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

S.ProfileSection = styled.section`
    width: 100%;
    max-width: 800px;
    margin-bottom: 40px;

    background-color: #fff5cc;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

S.ProfileSectionH2 = styled.h2`
    border-bottom: 1.5px solid #ff6600;
    display: inline-block;
    margin-bottom: 30px;
    font-size: 1.5em;
    font-weight: bold;
`;

S.ProfileDetails = styled.div`
    background-color: #fff5cc;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

S.NicknameContainer = styled.div`
    background-color: white;
    padding: 20px;
    padding-left: 50px;
    padding-right: 50px;
    border-radius: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

S.NicknameContainerSpan = styled.span`
    font-size: 1.1em;
    font-weight: bold;
    margin-right: 10px;
    flex-shrink: 0;
`;

S.NicknameValue = styled.span`
    font-size: 1.2em;
    font-weight: bold;
    flex-grow: 1;
    text-align: right;
`;

S.NicknameLabel = styled.span`
    font-size: 1.1em;
    font-weight: bold;
    margin-right: 10px;
    flex-shrink: 0;
    color: #7D7D7D;
`;

S.VirticalLine = styled.span`
    width: 1.5px;
    height: 30px;
    margin: 0 10px;
    color: #7D7D7D;
`;

S.DeleteAccountContainer = styled.div`
    text-align: center;
    margin-top: 20px;
`;

S.DeleteAccountContainerH3 = styled.h3`
    margin-bottom: 15px;
`;

S.DeleteAccountContainerInput = styled.input`
    width: 100%;
    max-width: 300px;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
`;

S.WithdrawButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

S.WithdrawButtonPrimary = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    background-color: #ff6600;
    color: white;
`;

S.WithdrawButtonSecondary = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    
    background-color: #ccc;
    color: #333;
`;

S.WithdrawModal = styled.div`
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
`;

S.WithdrawModalContent = styled.div`
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

S.WithdrawModalH3 = styled.h3`
    margin-bottom: 15px;
`;


