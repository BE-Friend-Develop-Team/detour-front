import styled from 'styled-components';

const Button = styled.button`
    background: none;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
`;

const StyledImg = styled.img`
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    padding: 0;
`;

const ButtonText = styled.button`
    background: #e08383;
    border: 1px solid #e08383;
    color: white;
    font-size: 1rem;
    text-align: center;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    margin: 8px;
    text-decoration: none;

    &:hover {
        background: #efc3c3;
        border-color: #efc3c3;
    }
`;

const InputField = styled.input`
    width: 80%;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
    margin-bottom: 10px;
    box-sizing: border-box;
    outline: none;

    &:focus {
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
    }
`;

const ModalContent1 = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

export { Button, StyledImg, ButtonText, InputField, ModalContent1 };
