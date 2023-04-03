import { Suspense, useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import type { RootState } from '@reduce';
import { setGroup } from '@reduce/group';

import { getToken } from '@api/auth/getToken';
import { getGroupInfo, getGroups } from '@api/group';

import { getHasKeepLogin, getRefreshToken } from '@utils/localStorage';
import logout from '@utils/logout';

import GlobalHeader from '@components/GlobalHeader';
import GlobalNav from '@components/GlobalNav';
import ModalManager from '@components/ModalManager';

import Association from '@pages/address-book/Association';
import AssociationMembers from '@pages/address-book/AssociationMembers';
import Login from '@pages/auth/Login';
import NotFount from '@pages/auth/NotFound';
import AdminSetting from '@pages/business/AdminSetting';
import Info from '@pages/business/Info';
import Members from '@pages/business/Members';
import Organization from '@pages/business/Organization';
import Position from '@pages/business/Position';
import FamilyEvent from '@pages/service/FamilyEvent';
import Notice from '@pages/service/Notice';
import Push from '@pages/service/Push';
import Survey from '@pages/service/Survey';
import Videos from '@pages/service/Videos';

const LOADING_SPIN_PROPS: { style: CSSProperties; spin: boolean } = {
  style: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
    fontSize: 50,
  },
  spin: true,
};

function Router() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshToken = getRefreshToken();

  const isLogin = useMemo(() => {
    return accessToken || refreshToken ? true : false;
  }, [accessToken, refreshToken]);

  const successLogin = () => {
    const _getGroups = async () => {
      const response = await getGroups();

      if (!response || response.rows.length === 0) return false;

      await _getGroupInfo(response.rows[0].id);
    };

    const _getGroupInfo = async (groupId: number) => {
      const response = await getGroupInfo({ path: { groupId } });

      if (!response) return false;

      dispatch(setGroup(response));
    };

    _getGroups();
  };

  useEffect(() => {
    const checkIsLogin = async () => {
      console.log('router check ', { accessToken, isLogin, isLoading });
      if (accessToken) return;
      setIsLoading(true);

      const hasKeepLogin = getHasKeepLogin();

      if (!hasKeepLogin && (isLogin || window.location.pathname !== '/')) {
        logout();
        return;
      }

      if (!accessToken && refreshToken) {
        console.log('try get accessToken from refreshToken');
        await getToken().then(response => {
          const { accessToken } = response;
          setIsLoading(false);

          if (!accessToken) {
            message.error({
              content: '보안 토큰이 만료되었습니다. 다시 로그인해주세요.',
              key: 'expired-token',
            });
            logout();
            return;
          }
          console.log('success get accessToken', { response, accessToken });
        });
      }

      setIsLoading(false);
    };

    checkIsLogin();
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    successLogin();
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className='wrap'>
        <Spin
          className='getToken-loading-spin'
          tip='로딩중...'
          indicator={<LoadingOutlined {...LOADING_SPIN_PROPS} />}
        />
      </div>
    );
  }

  return (
    <div className={classNames('wrap', { isLogin })}>
      <Suspense
        fallback={<Spin tip='로딩중...' indicator={<LoadingOutlined {...LOADING_SPIN_PROPS} />} />}>
        <BrowserRouter>
          {isLogin && (
            <>
              <GlobalHeader />
              <GlobalNav />
            </>
          )}
          <Routes>
            {isLogin ? (
              <>
                <Route path='/' element={<Navigate to='/business' replace={true} />} />

                {/* 사업장 관리 | business */}
                <Route path='/business' element={<Navigate to='/business/info' replace={true} />} />
                <Route path='/business/info' element={<Info />} />
                <Route path='/business/member' element={<Members />} />
                <Route path='/business/organization' element={<Organization />} />
                <Route path='/business/position' element={<Position />} />
                <Route path='/business/admin-setting' element={<AdminSetting />} />

                {/* 주소록 관리 | address-book */}
                <Route
                  path='/address-book'
                  element={<Navigate to='/address-book/association-members' replace={true} />}
                />
                <Route path='/address-book/association-members' element={<AssociationMembers />} />
                <Route path='/address-book/association' element={<Association />} />

                {/* 서비스 관리 | service */}
                <Route path='/service' element={<Navigate to='/service/push' replace={true} />} />
                <Route path='/service/push' element={<Push />} />
                <Route path='/service/notice' element={<Notice />} />
                <Route path='/service/survey' element={<Survey />} />
                <Route path='/service/videos' element={<Videos />} />
                <Route path='/service/family-event' element={<FamilyEvent />} />

                <Route path='/*' element={<NotFount />} />
              </>
            ) : (
              <>
                <Route path='/' element={<Login />} />
                <Route path='/*' element={<Navigate to='/' replace={true} />} />
              </>
            )}
          </Routes>
          <ModalManager />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default Router;
