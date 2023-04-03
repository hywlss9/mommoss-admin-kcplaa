import { useEffect, useState } from 'react';

import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as AddressBook } from '@assets/icons/address-book.svg';
import { ReactComponent as Business } from '@assets/icons/business.svg';
import { ReactComponent as Star } from '@assets/icons/star.svg';

import * as S from './styled';

function GlobalNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const [splitPath, setSplitPath] = useState<string[]>(location.pathname.split('/'));
  const [openedMenu, setOpenedMenu] = useState<string[]>([splitPath[1]]);

  const onClickMenu = ({ key }: any) => navigate(key);

  const items = [
    {
      key: 'business',
      label: '사업장관리',
      icon: <Business />,
      children: [
        {
          key: '/business/info',
          label: '사업장정보',
          onClick: onClickMenu,
        },
        {
          key: '/business/member',
          label: '구성원',
          onClick: onClickMenu,
        },
        {
          key: '/business/organization',
          label: '조직도',
          onClick: onClickMenu,
        },
        {
          key: '/business/position',
          label: '직위',
          onClick: onClickMenu,
        },
        {
          key: '/business/admin-setting',
          label: '관리자설정',
          onClick: onClickMenu,
        },
      ],
    },
    {
      key: 'address-book',
      label: '주소록 관리',
      icon: <AddressBook />,
      children: [
        {
          key: '/address-book/association-members',
          label: '회원 관리',
          onClick: onClickMenu,
        },
        {
          key: '/address-book/association',
          label: '회원 그룹 관리',
          onClick: onClickMenu,
        },
      ],
    },
    {
      key: 'service',
      label: '서비스 관리',
      icon: <Star />,
      children: [
        {
          key: '/service/push',
          label: '알림메시지',
          onClick: onClickMenu,
        },
        {
          key: '/service/notice',
          label: '공지',
          onClick: onClickMenu,
        },
        {
          key: '/service/survey',
          label: '설문',
          onClick: onClickMenu,
        },
        {
          key: '/service/videos',
          label: '동영상게시판',
          onClick: onClickMenu,
        },
        {
          key: '/service/family-event',
          label: '경조사',
          onClick: onClickMenu,
        },
        // {
        //   key: '/service/personal-record',
        //   label: '인명록',
        //   onClick: onClickMenu,
        // },
      ],
    },
  ];

  useEffect(() => {
    setSplitPath(location.pathname.split('/'));
  }, [location]);

  useEffect(() => {
    setOpenedMenu(prevState => {
      const isOpened = prevState.includes(splitPath[1]);
      return isOpened ? prevState : [...prevState, splitPath[1]];
    });
  }, [splitPath]);

  return (
    <S.Container className='global'>
      <Menu
        items={items}
        mode='inline'
        selectedKeys={[location.pathname ? splitPath.filter((_, i) => i < 3).join('/') : '']}
        openKeys={openedMenu}
        onOpenChange={setOpenedMenu}
      />
    </S.Container>
  );
}

export default GlobalNav;
