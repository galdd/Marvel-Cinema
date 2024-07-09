import {
  Button,
  Card,
  Classes,
  Elevation,
  FormGroup,
  Intent,
} from '@blueprintjs/core';

import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import useGenerateId from '../../../utils/hooks/forms/useGenerateId';
import { signinUser, userSelector, clearState } from '../../../redux/userSlice';
import { AppDispatch } from '../../../redux/store';

import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { borderRadius } from '@mui/system';
interface FormData {
  email: string;
  password: string;
}

const Form = styled.form`
  margin: auto;
`;

const Heading = styled.strong.attrs({ className: Classes.HEADING })`
  display: block;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`;

const LargeFormGroup = styled(FormGroup)`
  .bp3-label {
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
const Signin = () => {
  const dispatch: AppDispatch = useDispatch();
  const { formState, handleSubmit, register } = useForm<FormData>();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  const generateId = useGenerateId();

  const onSubmit = async ({ email, password }: FormData) => {
    await dispatch(signinUser({ email, password }));
  };

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearState());
  //   };
  // }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
    }
  }, [isError, isSuccess]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card elevation={Elevation.TWO}>
          <Heading> </Heading>
          <LargeFormGroup label="Email" labelFor={generateId('email')}>
            <input
            style={{borderRadius:'0px'}}
              autoFocus
              disabled={formState.isSubmitting}
              id={generateId('email')}
              {...register('email')}
            />
          </LargeFormGroup>
          <LargeFormGroup label="Password" labelFor={generateId('password')}>
            <input
            style={{borderRadius:'0px'}}
              disabled={formState.isSubmitting}
              id={generateId('password')}
              type="password"
              {...register('password')}
            />
          </LargeFormGroup>
          <Button
            intent={Intent.PRIMARY}
            large
            loading={formState.isSubmitting}
            type="submit"
          >
            Login
          </Button>
        </Card>
      </Form>
    </Wrapper>
  );
};

export default Signin;
