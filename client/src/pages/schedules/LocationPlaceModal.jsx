import React, { useState, useEffect } from "react";
import S from "./style";

const LocationPlaceModal = ({ isOpen, onClose, location, onSave, userName, departureDate, title, createdAt }) => {
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newImageFiles, setNewImageFiles] = useState([]);

    useEffect(() => {
        if (location) {
            setDescription(location.content || "");
            setImages(location.images || []);
        }
    }, [location]);

    if (!isOpen) return null;

    return (
        <S.ModalOverlay>
            <S.ModalContent>
                <S.ModalHeader>
                    <h3>{title || '장소 제목'}</h3>
                    <button className="close-button" onClick={onClose}>
                        <S.CloseButtonImage src="/images/modal/close.png" alt="Close"/>
                    </button>
                </S.ModalHeader>
                <S.ModalBody>
                    <h4>{new Date(createdAt).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</h4>
                    <h5>
                        {userName && <S.UserName>{userName}</S.UserName>}
                        <S.ScheduleText>님의 일정</S.ScheduleText>
                    </h5>
                    <S.ImageUpload>
                        <div className="image-container">
                            {images.length > 0 ? (
                                images.map((img, index) => (
                                    <S.ImagePreviewWrapper key={index}>
                                        <S.ImagePreview src={img} alt={`img-${index}`}/>
                                    </S.ImagePreviewWrapper>
                                ))
                            ) : (
                                <p>이미지가 없습니다.</p>
                            )}
                        </div>
                    </S.ImageUpload>
                    <S.DescriptionInput
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="아직 작성한 후기가 없습니다."
                    />
                </S.ModalBody>
                {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            </S.ModalContent>
        </S.ModalOverlay>
    );
};

export default LocationPlaceModal;