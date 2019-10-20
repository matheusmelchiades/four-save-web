import { TextField } from  '@material-ui/core';
import styled from "styled-components";

const TextFieldStyled = styled(TextField)`
    .Mui-focused {
        color: #0B8C75 !important;
    }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #0B8C75;
    }
`;

export default TextFieldStyled;
