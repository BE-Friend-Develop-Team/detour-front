import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    text-align: center;
    position: relative;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    animation: slide-in 0.3s ease-out;

    @keyframes slide-in {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: url('/images/modal/close.png') no-repeat center center;
    background-size: cover;
    border: none;
    width: 35px;
    height: 35px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        opacity: 0.8;
    }

    &:focus {
        outline: none;
    }
`;

const ModalTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 1.5em;
    color: #333;
`;

const Input = styled.input`
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

const SubmitButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #0056b3;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
    }
`;

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <ModalBackground>
            <ModalContent>
                <CloseButton onClick={onClose} />
                <ModalTitle>새 이미지를 입력하세요</ModalTitle>
                {children}
            </ModalContent>
        </ModalBackground>
    );
};

export default Modal;
