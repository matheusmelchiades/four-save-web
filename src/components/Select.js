import { Select } from '@material-ui/core';
import styled from "styled-components";

const SelectStyled = styled(Select)`
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #08505B !important;
    }
`;

export default SelectStyled;
