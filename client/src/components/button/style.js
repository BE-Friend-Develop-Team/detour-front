import styled, { css } from "styled-components";

const variantCSS = {
    main: css`
        background-color: ${({ theme }) => theme.PALETTE.background["main"]};
    `,
    kakao: css`
        background-color: ${({ theme }) => theme.PALETTE.background["kakao"]};
    `,
    gray: css`
        background-color: ${({ theme }) => theme.PALETTE.background["gray"]};
    `,
};

const shapeCSS = {
    default: css``,
    tiny: css`
        border-radius: 4px;
    `,
    small: css`
        border-radius: 8px;
    `,
    medium: css`
        border-radius: 4px;
    `,
    large: css`
        border-radius: 4px;
    `,
};

const sizeCSS = {
    tiny: css`
        width: 4rem;
        height: 2rem;
    `,
    small: css`
        width: 6.75rem;
        height: 2rem;
    `,
    medium: css`
        width: 10rem;
        height: 3.5rem;
    `,
    large: css`
        width: 20rem;
        height: 2rem;
    `,
};

const colorCSS = {
    black: css`
        color: ${({ theme }) => theme.PALETTE.black};
    `,
};

const borderCSS = {
    default: css`
        border: none;
    `,
    gray: css`
        border: 1px solid ${({ theme }) => theme.PALETTE.background["gray"]};
    `,
    black: css`
        border: 1px solid ${({ theme }) => theme.PALETTE.black};
    `,
};

const Button = styled.button`
    ${({ variant }) => variantCSS[variant]}
    ${({ shape }) => shapeCSS[shape]}
    ${({ size }) => sizeCSS[size]}
    ${({ color }) => colorCSS[color]}
    ${({ border }) => borderCSS[border]}

    cursor: pointer;
`;

export default Button;
