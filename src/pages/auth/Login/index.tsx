import { useState } from 'react';
import type { ChangeEvent } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Spin, message } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { setToken } from '@reduce/auth';

import { login } from '@api/auth/login';

import getIsResponseFalse from '@utils/getIsResponseFalse';

import * as S from './styled';

function Login() {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState<{ id: string; password: string }>({
    // id: '',
    // password: '',

    // 테스트용
    id: 'master@ablestor.com',
    password: 'asdf1234!',
  });
  const [hasKeepLogin, setHasKeepLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLoginData = loginData.id && loginData.password;

  const handleValue = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
    setLoginData(prevState => ({ ...prevState, [name]: value }));

  const handleHasKeepLogin = ({ target: { checked } }: CheckboxChangeEvent) =>
    setHasKeepLogin(checked);

  const submit = async () => {
    console.log('submit', { loginData });
    setIsLoading(true);

    const { id, password } = loginData;
    const uuid = localStorage.getItem('login-uuid') || uuidv4();
    const response = await login({ id, password, uuid, platform: 'web' });

    setIsLoading(false);

    console.log({ response });

    if (getIsResponseFalse(response)) {
      message.error('로그인에 실패하였습니다.');
      return;
    }

    const { accessToken, refreshToken } = response;

    dispatch(setToken({ accessToken }));
    localStorage.setItem('login-uuid', uuid);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('keepLogin', hasKeepLogin ? 'true' : 'false');
  };

  return (
    <S.Container>
      <S.FormContainer>
        <h2>로그인</h2>
        <Form onFinish={submit}>
          <Form.Item name='username' initialValue={loginData.id}>
            <Input name='id' placeholder='사용자 계정' onChange={handleValue} />
          </Form.Item>
          <Form.Item name='password' initialValue={loginData.password}>
            <Input type='password' name='password' placeholder='비밀번호' onChange={handleValue} />
          </Form.Item>
          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox value={hasKeepLogin} onChange={handleHasKeepLogin}>
              접속 유지하기
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' disabled={!isLoginData}>
              {isLoading ? <Spin indicator={<LoadingOutlined spin={true} />} /> : '로그인'}
            </Button>
          </Form.Item>
        </Form>
      </S.FormContainer>
    </S.Container>
  );
}

export default Login;
