import React, { useState, useEffect } from "react";
import heic2any from 'heic2any';

import S from "./style";

const LocationModal = ({ isOpen, onClose, location, onSave, userName, departureDate }) => {
    const [description, setDescription] = useState(location.description || "");
    const [images, setImages] = useState(location.images || []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);

    useEffect(() => {
        if (isOpen) {
            setDescription(location.content || "");
            setImages(location.images || []);
            setNewImageFiles([]);
            setDeletedImages([]);
        }
    }, [isOpen, location]);

    const handleImageChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const convertedFiles = await Promise.all(files.map(async (file) => {
                if (file.type === 'image/heic') {
                    try {
                        const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg' });
                        return new File([convertedBlob], file.name.replace('.heic', '.jpg'), { type: 'image/jpeg' });
                    } catch (error) {
                        console.error("HEIC 변환 실패:", error);
                        return null;
                    }
                }
                return file;
            }));

            const validFiles = convertedFiles.filter(file => file !== null);
            const newImageFilesWithUrls = validFiles.map(file => ({
                file,
                url: URL.createObjectURL(file)
            }));
            setNewImageFiles(prevFiles => [...prevFiles, ...newImageFilesWithUrls]);
            setImages(prevImages => [...prevImages, ...newImageFilesWithUrls.map(item => item.url)]);
        }
    };

    const handleImageDelete = (imageUrl) => {
        setImages(prevImages => prevImages.filter(img => img !== imageUrl));

        const newFileIndex = newImageFiles.findIndex(item => item.url === imageUrl);
        if (newFileIndex !== -1) {
            setNewImageFiles(prevFiles => {
                const newFiles = [...prevFiles];
                newFiles.splice(newFileIndex, 1);
                return newFiles;
            });
            URL.revokeObjectURL(imageUrl);
        } else {
            setDeletedImages(prevDeleted => [...prevDeleted, imageUrl]);
        }
    };

    const handleSave = async () => {
        if (!location.markerId) {
            setError("Marker ID가 정의되지 않았습니다.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const accessToken = localStorage.getItem('token')?.substring(7);
            if (!accessToken) {
                throw new Error("로그인이 필요합니다.");
            }

            let uploadedImageUrls = [];
            if (newImageFiles.length > 0) {
                const formData = new FormData();
                newImageFiles.forEach(item => formData.append("file", item.file));

                const uploadResponse = await fetch(`https://detourofficial.shop/api/daily-plans/markers/${location.markerId}/files`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    body: formData,
                });
                if (!uploadResponse.ok) {
                    const errorData = await uploadResponse.json();
                    throw new Error(errorData.message || '이미지 업로드 중 오류가 발생했습니다.');
                }
                const uploadData = await uploadResponse.json();
                if (uploadData && uploadData.data) {
                    uploadedImageUrls = uploadData.data.map(item => item.imageUrl);
                } else {
                    throw new Error('서버 응답 형식이 올바르지 않습니다.');
                }
            }

            for (const imageUrl of deletedImages) {
                const encodedImageUrl = encodeURIComponent(imageUrl);
                await fetch(`https://detourofficial.shop/api/daily-plans/markers/${location.markerId}/files?fileUrl=${encodedImageUrl}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
            }

            const remainingImages = images.filter(img => !deletedImages.includes(img) && !newImageFiles.some(item => item.url === img));
            const requestData = {
                content: description,
                images: [...remainingImages, ...uploadedImageUrls],
            };
            const response = await fetch(`https://detourofficial.shop/api/daily-plans/markers/${location.markerId}/content`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '저장에 실패했습니다.');
            }
            const result = await response.json();
            console.log("저장 결과:", result);
            alert('저장되었습니다!');
            onSave({ ...location, description, images: requestData.images });
            onClose();
        } catch (err) {
            console.error("handleSave 에러:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            newImageFiles.forEach(item => URL.revokeObjectURL(item.url));
        };
    }, [newImageFiles]);

    if (!isOpen) return null;
    return (
        <S.ModalOverlay>
            <S.ModalContent>
                <S.ModalHeader>
                    <h3>{location.place_name}</h3>
                    <button className="close-button" onClick={onClose}>
                        <S.CloseButtonImage src="/images/modal/close.png" alt="Close" />
                    </button>
                </S.ModalHeader>
                <S.ModalBody>
                    <h4>{new Date(departureDate).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })}</h4>
                    <h5>
                        {userName && <S.UserName>{userName}</S.UserName>}
                        <S.ScheduleText>님의 일정</S.ScheduleText>
                    </h5>
                    <S.ImageUpload>
                        <label htmlFor="file-input">
                            <S.UploadButtonImage src="/images/schedule/파일선택.png" alt="파일 선택" />
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            accept="image/heic, image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        <div className="image-container">
                            {images.map((img, index) => (
                                <S.ImagePreviewWrapper key={index}>
                                    <S.ImagePreview src={img} alt={`Uploaded ${index}`} />
                                    <S.DeleteButtonImage
                                        src="/images/schedule/휴지통.png"
                                        alt="삭제"
                                        onClick={() => handleImageDelete(img)}
                                    />
                                </S.ImagePreviewWrapper>
                            ))}
                        </div>
                    </S.ImageUpload>
                    <S.DescriptionInput
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="해당 장소 방문 후기를 적어주세요."
                    />
                </S.ModalBody>
                <S.ModalFooter>
                    <button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? '저장 중...' : '등록'}
                    </button>
                </S.ModalFooter>
                {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            </S.ModalContent>
        </S.ModalOverlay>
    );
};

export default LocationModal;