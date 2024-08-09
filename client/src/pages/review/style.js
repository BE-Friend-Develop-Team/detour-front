import styled from 'styled-components';

const S = {};

S.Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin: 40px auto;
    max-width: 1000px;
    width: 100%;
`;

S.FormContainer = styled.div`
    padding: 20px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: auto;
`;

S.ImageTitle = styled.img`
    width: 100%;
    max-width: 100px;
    height: auto;
    margin-bottom: 20px;
`;

S.InputField = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .hint {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 10px;
        text-align: center;
    }

    label {
        font-weight: bold;
        margin-bottom: 8px;
        color: #333;
    }

    input, textarea {
        width: 100%;
        max-width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        font-family: Arial, sans-serif;
    }

    textarea {
        height: 120px;
        resize: both;
    }
`;

S.CenteredFields = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
`;

S.SubmitButton = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background: #3498db;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background: #2980b9;
    }
`;

S.SearchSection = styled.section`
    width: 100%;
    max-width: 800px;
    margin-bottom: 60px;
    text-align: center;
`;

S.ReviewSection = styled.section`
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #fafafa;
`;

S.AverageRating = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #f39c12;
`;

S.ReviewCount = styled.div`
    font-size: 1.1rem;
    margin-bottom: 25px;
    color: #555;
`;

S.ReviewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

S.ReviewItem = styled.div`
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    position: relative;

    & + & {
        border-top: 1px solid #ddd;
    }
`;

S.ReviewContent = styled.div`
    display: flex;
    flex-direction: column;
`;

S.UserName = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
`;

S.ReviewDate = styled.div`
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 5px;
`;

S.ReviewStars = styled.div`
    font-size: 1.2rem;
    color: gold;
    margin-bottom: 5px;
`;

S.ReviewText = styled.div`
    font-size: 1rem;
    color: #444;
`;

S.Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;

    button {
        padding: 5px 10px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #fff;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:disabled {
            background: #f0f0f0;
            cursor: not-allowed;
        }

        &:hover:not(:disabled) {
            background: #ddd;
        }
    }
`;

export default S;
