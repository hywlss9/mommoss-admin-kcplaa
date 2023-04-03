import { useState } from 'react';

import { Switch } from 'antd';

import * as C from '@components/Common';

import * as S from './styled';

import AdminTable from './Table';

function AdminSetting() {
  return (
    <C.Container>
      <C.Title>관리자 설정</C.Title>
      <AdminTable />
    </C.Container>
  );
}

export default AdminSetting;
