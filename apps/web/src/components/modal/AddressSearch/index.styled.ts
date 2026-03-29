import styled from 'styled-components';

import Typography from '@/components/Common/Typography';
import { typographyTypeStyle } from '@/components/Common/Typography/index.styled';
import { flex, fontWeight } from '@/styles/mixin';
import { mediaQueries } from '@/utils/mediaQuery';

const Container = styled.div`
    width: 100%;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    ${mediaQueries.SM} {
        max-width: 500px;
        width: 500px;
    }
`;

const SearchInputForm = styled.form`
    display: flex;
    gap: 10px;
    position: relative;
`;

const Input = styled.input`
    width: 100%;
    height: 44px;
    background-color: var(--color-gray-200);
    border-radius: 6px;
    padding: 0 50px 0 16px;
    ${typographyTypeStyle['t8']};

    ${mediaQueries.SM} {
        height: 55px;
        padding: 0 60px 0 16px;
    }
`;

const SearchButton = styled.button`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);

    svg {
        width: 24px;
        height: 24px;
    }

    ${mediaQueries.SM} {
        svg {
            width: auto;
            height: auto;
        }
    }
`;

const AddressList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const AddressListItem = styled.li`
    border-bottom: 1px solid var(--color-gray-300);

    > button {
        display: flex;
        justify-content: start;
        align-items: start;
        flex-direction: column;
        gap: 8px;
        padding-bottom: 20px;
    }
`;

const ZipCode = styled(Typography)`
    color: var(--color-main);
`;

const Address = styled(Typography)`
    color: var(--color-black);
    display: flex;
    align-items: start;
    gap: 8px;
    color: var(--color-gray-700);
    ${fontWeight.medium};
    text-align: left;

    > span {
        width: 60px;
        min-width: 60px;
        ${flex};
        height: fit-content;
        border: 1px solid var(--color-gray-400);
        border-radius: 5px;
        color: var(--color-black);
    }

    &:lang(en),
    &:lang(jp) {
        text-align: center;
    }
`;

const PagingContainer = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 14px 0;
    border-top: 1px solid var(--color-gray-300);

    button {
        border-radius: 50% !important;
    }

    ${mediaQueries.SM} {
        position: static;
        padding: 0;
        border-top: none;
        padding-top: 20px;
    }
`;

export const AddressSearchModalStyle = {
    Container,
    SearchInputForm,
    Input,
    SearchButton,
    AddressList,
    AddressListItem,
    ZipCode,
    Address,
    PagingContainer,
};
