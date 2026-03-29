import { motion } from 'motion/react';
import styled from 'styled-components';

const Dimmed = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 100;
`;
const ModalContainer = styled(motion.div)<{
    $width?: string;
    $height?: string;
}>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    height: ${(props) => props.$height};
    max-height: 70%;
    background-color: white;
    overflow: hidden;
    width: ${(props) => props.$width};
    min-width: 300px;

    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--color-gray-400);
        background-clip: padding-box;
        border-radius: var(--spacing-999);
    }

    ::-webkit-scrollbar-track {
        background-color: var(--color-gray-200);
    }
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 32px 25px;

    h1 {
        flex: 1;
    }
`;

const ModalContent = styled.div`
    flex: 1;
    padding: 0 32px;
`;

const ModalFooter = styled.div`
    display: flex;
    border-top: 1px solid var(--color-black);

    button {
        border: none;
        border-radius: 0;
    }
`;

export const ModalLayoutStyle = {
    Dimmed,
    ModalContainer,
    ModalHeader,
    ModalContent,
    ModalFooter,
};
