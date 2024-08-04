import React, { useState } from "react";
import S from "./style";

const LocationModal = ({ isOpen, onClose, location, onSave }) => {
    const [description, setDescription] = useState(location.description || "");
    const [image, setImage] = useState(location.image || null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSave =  async () => {
        if (!location.markerId) {
            setError("Marker ID가 정의되지 않았습니다.");
            return;
        }

        setIsLoading(true);
        setError(null);

        // Create FormData to send image and description
        const formData = new FormData();
        formData.append("description", description);
        if (image) {
            formData.append("image", image);  // Make sure to adjust this if image is not a file object
        }

        try {
            const accessToken = localStorage.getItem('token')?.substring(7);
            if (!accessToken) {
                throw new Error("로그인이 필요합니다.");
            }

            const requestData = {
                content: description,
            };

            // Create FormData to send image and description
            const formData = new FormData();
            formData.append("description", description);
            // If image is a file object, you need to append it as well
            // Here assuming image is a file object. If not, adjust accordingly
            if (image instanceof File) {
                formData.append("image", image);
            }

            console.log(location);

            const response = await fetch(`https://detourofficial.shop/api/markers/${location.markerId}/content`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('저장에 실패했습니다.');
            }

            const result = await response.json();
            alert('저장되었습니다!');
            onSave({ ...location, description, image });
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <S.ModalOverlay>
            <S.ModalContent>
                <S.ModalHeader>
                    <h2>{location.place_name}</h2>
                    <button onClick={onClose}>X</button>
                </S.ModalHeader>
                <S.ModalBody>
                    <S.ImageUpload>
                        <input type="file" onChange={handleImageChange} />
                        {image && <img src={image} alt="Uploaded" />}
                    </S.ImageUpload>
                    <S.DescriptionInput
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="여기에 입력하세요"
                    />
                </S.ModalBody>
                <S.ModalFooter>
                    <button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? '저장 중...' : '등록'}
                    </button>
                </S.ModalFooter>
            </S.ModalContent>
        </S.ModalOverlay>
    );
};

export default LocationModal;
