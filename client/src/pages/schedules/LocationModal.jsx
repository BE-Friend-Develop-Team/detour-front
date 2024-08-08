import React, { useState, useEffect } from "react";
import S from "./style";
const LocationModal = ({ isOpen, onClose, location, onSave, userName, departureDate }) => {
    const [description, setDescription] = useState(location.description || "");
    const [images, setImages] = useState(location.images || []); // 초기 상태를 location.images로 설정
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newImageFiles, setNewImageFiles] = useState([]);
    useEffect(() => {
        setDescription(location.content || "");
        setImages(location.images || []);
    }, [location]);
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            setNewImageFiles(prevFiles => [...prevFiles, ...files]);
            // 이미지 미리보기 설정
            const imagePreviews = files.map(file => URL.createObjectURL(file));
            setImages(prevImages => [...prevImages, ...imagePreviews]);
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
            // 이미지 업로드
            let uploadedImageUrls = [];
            if (newImageFiles.length > 0) {
                const formData = new FormData();
                newImageFiles.forEach(file => formData.append("file", file)); // 'files'라는 키로 각 파일 전송
                console.log(`폼데이터 파일 개수: ${newImageFiles.length}`);
                for (let [key, file] of formData.entries()) {
                    if (file instanceof File) {
                        console.log(`키: ${key}, 파일 이름: ${file.name}, 파일 크기: ${file.size} bytes`);
                    } else {
                        console.log(`키: ${key}, 값: ${file}`);
                    }
                }
                try {
                    const uploadResponse = await fetch(`http://localhost:8081/api/daily-plans/markers/${location.markerId}/files`, {
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
                        console.log("업로드된 이미지 url 배열:", uploadedImageUrls);
                    } else {
                        throw new Error('서버 응답 형식이 올바르지 않습니다.');
                    }
                } catch (uploadError) {
                    console.error("이미지 업로드 중 오류:", uploadError);
                    throw uploadError;
                }
            }
            // 마커 정보 저장
            const requestData = {
                content: description,
                images: [...(location.images || []), ...uploadedImageUrls],
            };
            const response = await fetch(`http://localhost:8081/api/daily-plans/markers/${location.markerId}/content`, {
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
    const handleImageDelete = async (imageUrl) => {
        setIsLoading(true);
        setError(null);
        try {
            const accessToken = localStorage.getItem('token')?.substring(7);
            if (!accessToken) {
                throw new Error("로그인이 필요합니다.");
            }
            const encodedImageUrl = encodeURIComponent(imageUrl);
            const response = await fetch(`http://localhost:8081/api/daily-plans/markers/${location.markerId}/files?fileUrl=${encodedImageUrl}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '이미지 삭제에 실패했습니다.');
            }
            setImages(prevImages => prevImages.filter(img => img !== imageUrl));
            alert('이미지가 삭제되었습니다.');
        } catch (err) {
            console.error("handleImageDelete 에러:", err);
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
                    <h3>{location.place_name}</h3>
                    <button className="close-button" onClick={onClose}>
                        <S.CloseButtonImage src="/images/modal/close.png" alt="Close"/>
                    </button>
                </S.ModalHeader>
                <S.ModalBody>
                    <h4>{departureDate}</h4>
                    <h5>
                        {userName && <S.UserName>{userName}</S.UserName>}
                        <S.ScheduleText>님의 일정</S.ScheduleText>
                    </h5>
                    <S.ImageUpload>
                        <label htmlFor="file-input">
                            <S.UploadButtonImage src="/images/schedule/파일선택.png" alt="파일 선택"/>
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
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