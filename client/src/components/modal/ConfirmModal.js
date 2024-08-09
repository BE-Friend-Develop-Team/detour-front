// src/components/modal/ConfirmModal.js
import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Ensure modal is above other content */
`;

const ModalContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
    z-index: 1001; /* Ensure content is above the overlay */
`;

const ModalButton = styled.button`
    margin: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    background: ${({ confirm }) => (confirm ? '#3498db' : '#e74c3c')};
    color: #fff;

    &:hover {
        background: ${({ confirm }) => (confirm ? '#2980b9' : '#c0392b')};
    }
`;

const ConfirmModal = ({ onConfirm, onCancel }) => {
    return (
        <ModalOverlay>
            <ModalContent>
                <h3>한 번 작성한 리뷰는 수정할 수 없습니다</h3>
                <div>
                    <ModalButton confirm onClick={onConfirm}>등록</ModalButton>
                    <ModalButton onClick={onCancel}>취소</ModalButton>
                </div>
            </ModalContent>
        </ModalOverlay>
    );
};

export default ConfirmModal;
