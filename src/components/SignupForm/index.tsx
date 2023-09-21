import { FC } from 'react';
import { styled } from 'styled-components';
import Typography from '../Typography/Typography';

const Root = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 100px;
  border: 1px solid #151203;
  min-width: 300px;
  padding: 8px 8px 8px 16px;
`;

const Input = styled.input`
  all: unset;
`;

const SubmitButton = styled.button`
  border-radius: 18px;
  background: #00bf49;
  color: #fdfbf3;
  padding: 4px 16px;
  font-weight: 700;
`;

const SignupForm: FC = () => {
  return (
    <Root>
      <Typography textalign="center" fontWeight={400} role="label">
        Be a part of the fam{' '}
      </Typography>
      <InputWrapper role="input">
        <Input type="text" placeholder="Email" />
        <SubmitButton>Sign up</SubmitButton>
      </InputWrapper>
    </Root>
  );
};

export default SignupForm;
