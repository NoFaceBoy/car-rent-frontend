import styled from "styled-components";

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  // min-width: 300px;

  .error {
    color: red;
  }

  label {
    color: white;
  }
`;

export const FieldRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  label {
    color: white;
  }
`;

export const TermsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  label {
    color: white;
  }
`;

export default FieldWrapper;
