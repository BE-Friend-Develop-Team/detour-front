import React, { useEffect, useState } from 'react';
import S from './style';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import { ModalButton } from './style';

const TravelEasterEgg = ({ isActive }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (isActive) {
            const newItems = Array(20).fill().map((_, i) => ({
                id: i,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotation: Math.random() * 360,
                type: ['✈️', '🧳', '📷', '☂️', '🌴'][Math.floor(Math.random() * 5)]
            }));
            setItems(newItems);

            const interval = setInterval(() => {
                setItems(prevItems => prevItems.map(item => ({
                    ...item,
                    x: (item.x + Math.random() * 10 - 5 + window.innerWidth) % window.innerWidth,
                    y: (item.y + Math.random() * 10 - 5 + window.innerHeight) % window.innerHeight,
                    rotation: (item.rotation + 5) % 360
                })));
            }, 50);

            return () => clearInterval(interval);
        }
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {items.map(item => (
                <div
                    key={item.id}
                    className="absolute transition-all duration-300 ease-in-out text-4xl"
                    style={{
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        transform: `rotate(${item.rotation}deg)`
                    }}
                >
                    {item.type}
                </div>
            ))}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow text-xl font-bold text-blue-600">
                🌟 여행의 마법이 시작됐어요! 🌟
            </div>
        </div>
    );
};

const TripList = ({ search }) => {
    const [trips, setTrips] = useState(null);
    const [sortBy, setSortBy] = useState('최신');
    const [error, setError] = useState(null);
    const [editingImage, setEditingImage] = useState(null);
    const [newImageFile, setNewImageFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 상태 추가
    const [easterEggActive, setEasterEggActive] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTrips();
    }, [sortBy, search, currentPage]);


    const handlePageChange = (pageNumber) => {

        setCurrentPage(pageNumber);

    };

    const fetchTrips = async () => {
        console.log('fetchTrips called with search:', search);
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/schedules?page=${currentPage}&sortBy=${sortBy}&search=${encodeURIComponent(search)}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Network response was not ok');
            }

            const result = await response.json();
            console.log("data:", JSON.stringify(result, null, 2));
            setTrips(result.data.content);

            setTotalPages(result.data.totalPages);
        } catch (error) {
            console.error('Error fetching trips:', error);
            setError(error.message);
        }
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const toggleLike = async (scheduleId, liked, likeId) => {
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        if (!scheduleId) {
            console.error('Schedule ID is undefined or null');
            return;
        }

        console.log(`scheduleId: ${scheduleId}, current isLiked: ${liked}`);

        try {
            if (liked && !likeId) {
                const response2 = await fetch(`http://localhost:8081/api/schedules/likes/${scheduleId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                });

                const result = await response2.json();
                likeId = result.data.likeId;
            }

            const url = liked
                ? `http://localhost:8081/api/schedules/likes/${likeId}`
                : `http://localhost:8081/api/schedules/${scheduleId}/likes`;
            const method = liked ? 'DELETE' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
            });

            if (response.status === 404 && !liked) {
                alert('좋아요 상태가 올바르지 않습니다.');
                return;
            }

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Network response was not ok');
            }

            const responseData = await response.json();
            setTrips(prevTrips =>
                prevTrips.map(trip =>
                    trip.scheduleId === scheduleId
                        ? {
                            ...trip,
                            liked: !liked,
                            likeId: !liked ? responseData.data?.likeId : null,
                            likeCount: trip.likeCount + (liked ? -1 : 1)
                        }
                        : trip
                )
            );
        } catch (error) {
            console.error('Error toggling like:', error);
            alert(error.message);
        }
    };

    const handleImageEdit = (scheduleId) => {
        setEditingImage(scheduleId);
        setNewImageFile(null); // 파일 선택 상태 초기화
        setModalOpen(true); // 모달 열기
    };

    const submitNewImage = async () => {
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        if (!editingImage || !newImageFile) {
            console.error('Missing image data');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', newImageFile); // key를 'file'로 수정

            const response = await fetch(`http://localhost:8081/api/schedules/${editingImage}/files`, { // URL 수정
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Network response was not ok';

                if (errorMessage.includes('해당 일정에 존재하지 않는 일행입니다')) {
                    alert('해당 게시글 작성자만 수정할 수 있습니다.');
                } else {
                    alert('이미지 업로드 중 오류가 발생했습니다.');
                }
                return;
            }

            const responseData = await response.json();
            setTrips(prevTrips =>
                prevTrips.map(trip =>
                    trip.scheduleId === editingImage
                        ? { ...trip, imageUrl: responseData.data.imageUrl }
                        : trip
                )
            );

            setEditingImage(null);
            setModalOpen(false); // 모달 닫기
        } catch (error) {
            console.error('Error updating image:', error);
            alert("업로드 가능 이미지 용량 크기를 초과했습니다.");
        }
    };

    const handleCardClick = (scheduleId) => {
        navigate(`/schedules/${scheduleId}`);
    };

        const activateEasterEgg = () => {
        setClickCount(prev => {
            if (prev + 1 >= 10) {
                setEasterEggActive(true);
                setTimeout(() => setEasterEggActive(false), 4000);
                return 0;
            }
            return prev + 1;
        });
    };

    return (
        <div>
            <TravelEasterEgg isActive={easterEggActive} />
            <S.SortSection onClick={activateEasterEgg}>
                <label htmlFor="sortBy"></label>
                <select id="sortBy" value={sortBy} onChange={handleSortChange}>
                    <option value="최신">최신순</option>
                    <option value="좋아요">좋아요순</option>
                </select>
            </S.SortSection>
            <S.TripSection>
                {trips ? (
                    trips.map((trip) => (
                        <S.TripCard
                            key={trip.scheduleId || `trip-${Math.random()}`}
                            onClick={() => handleCardClick(trip.scheduleId)}
                        >
                            <S.TripHeader>
                                <h3>{trip.title}</h3>
                                <h5>
                                    <S.Nickname>{trip.nickname}</S.Nickname>
                                    <S.ScheduleText>님의 일정</S.ScheduleText>
                                </h5>
                                <h4>{trip.departureDate}</h4>
                            </S.TripHeader>
                            <S.TripImageWrapper>
                                <S.TripImage src={trip.imageUrl} alt={trip.title} />
                                <S.EditImageButton onClick={(e) => { e.stopPropagation(); handleImageEdit(trip.scheduleId); }}>
                                    <img src="/images/modal/사진수정4.png" alt="Edit" />
                                </S.EditImageButton>
                            </S.TripImageWrapper>
                            <S.TripFooter>
                                <S.LikeButton
                                    onClick={(e) => { e.stopPropagation(); toggleLike(trip.scheduleId, trip.liked, trip.likeId); }}
                                >
                                    <img
                                        src={trip.liked ? '/images/trip/heart.png' : '/images/trip/noheart.png'}
                                        alt="Like"
                                        style={{ width: '24px', height: '24px' }}
                                    />
                                    <S.LikeCount>{trip.likeCount || 0}</S.LikeCount>
                                </S.LikeButton>
                                <S.ViewCount>조회수 {trip.hits || 0}</S.ViewCount>
                            </S.TripFooter>
                        </S.TripCard>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </S.TripSection>
            <S.Pagination>
                {Array.from({length:totalPages}, (_, index) => (
                    <button
                        key = {index+1}
                        onClick={() => handlePageChange(index+1)}
                        disabled={index+1 === currentPage}
                    >
                        {index+1}
                    </button>
                ))}
            </S.Pagination>

            {/* 모달 컴포넌트 추가 */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>이미지 업로드</h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImageFile(e.target.files[0])}
                />
                <ModalButton onClick={submitNewImage}>제출</ModalButton>
            </Modal>
        </div>
    );
};

export default TripList;
