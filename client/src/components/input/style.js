import styled, { css } from "styled-components";

const variantCSS = {
    white: css`
        background-color: ${({ theme }) => theme.PALETTE.white};
    `,
    main: css`
        background-color: ${({ theme }) => theme.PALETTE.primary["main"]};
    `,
    gray: css`
        background-color: ${({ theme }) => theme.PALETTE.gray["100"]};
    `,
};

const shapeCSS = {
    default: css``,
    medium: css`
        border-radius: 16px;
    `,
    large: css`
        border-radius: 4px;
    `,
    extraLarge: css`
        border-radius: 1.2rem;
    `,
};

const sizeCSS = {
    large: css`
        width: 20rem;
        height: 2rem;
    `,
    extraLarge: css`
        width: 24rem;
        height: 2.4rem;
    `,
};

const colorCSS = {
    white: css`
        color: ${({ theme }) => theme.PALETTE.white};
    `,
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

const Input = styled.input`
    ${({ variant }) => variantCSS[variant]}
    ${({ shape }) => shapeCSS[shape]}
    ${({ size }) => sizeCSS[size]}
    ${({ color }) => colorCSS[color]}
    ${({ border }) => borderCSS[border]}
    padding: 0 1rem;
`;

export default Input;
