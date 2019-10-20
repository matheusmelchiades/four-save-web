import { Button } from '@material-ui/core';
import styled from "styled-components";

const ButtonStyled = styled(Button)`
    background: #0B8C75 !important;
    color: #ffffff !important;
    &.MuiButton-containedPrimary {
        background-color: #0B8C75 !important;
        color: #ffffff !important;
    }
    &.MuiButton-outlinedPrimary:hover,
    &.MuiButton-containedPrimary:hover {
        background-color: #0B8C75 !important;
    }
`;

export default ButtonStyled;
