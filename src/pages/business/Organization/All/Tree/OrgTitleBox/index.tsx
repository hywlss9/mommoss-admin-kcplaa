import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';

import { Input, Modal, message } from 'antd';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import { deleteOrganization, updateOrganization } from '@api/group';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import PencilImg from '@assets/icons/blue-pencil.png';
import { ReactComponent as Check } from '@assets/icons/check.svg';
import plusImg from '@assets/icons/green-plus.png';
import XImg from '@assets/icons/red-x.png';

import * as S from './styled';
import type * as T from './type';

function OrgTitleBox({ org }: T.OrgTitleBoxProps) {
  const { id, name, allMemberCount, default: isDefault } = org;

  const dispatch = useDispatch();

  const [updateOrg, setUpdateOrg] = useState<{ id: number | undefined; name: string }>({
    id: undefined,
    name: '',
  });

  const isUpdating = updateOrg.id === id;

  const initUpdateOrg = () => setUpdateOrg({ id, name });
  const resetUpdateOrg = () => setUpdateOrg({ id: undefined, name: '' });

  const openUpdateOrgName = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    initUpdateOrg();
  };
  const closeUpdateOrgName = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    resetUpdateOrg();
  };

  const handleUpdateOrgName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setUpdateOrg(prevState => ({ ...prevState, name: value }));

  const cencelUpdateOrg = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 27) resetUpdateOrg();
  };

  const updateOrgUpdate = async ({
    nativeEvent: { isComposing },
  }: KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    console.log({ updateOrg });
    const { id, name } = updateOrg;

    if (typeof id === 'undefined') return false;

    const response = await updateOrganization({ path: { teamId: id }, data: { name } });

    if (getIsResponseFalse(response)) return false;

    message.success('조직이 수정되었습니다.');

    resetUpdateOrg();
    trigger('REFETCH_FROM_ORG_TITLE_BOX');
  };

  const openDeleteOrgConfirm = () => {
    Modal.confirm({
      title: `정말로 ${name} 조직을 삭제하시겠습니까?`,
      okText: '삭제',
      cancelText: '취소',
      onOk: async () => {
        const response = await deleteOrganization({ path: { teamId: id } });

        if (getIsResponseFalse(response)) return false;

        message.success(
          <>
            <strong>{name}</strong> 조직을 삭제하였습니다.
          </>,
        );
        trigger('REFETCH_FROM_ORG_TITLE_BOX');
        trigger('SUCCESS_DELETE_ORGANIZATION');
      },
    });
  };

  const openCreateOrgModal = () =>
    dispatch(openModal({ name: 'createOrganization', props: { parentId: id } }));

  return (
    <S.OrgTtile>
      {isDefault ? (
        <>
          {name}({allMemberCount})
          <img src={plusImg} alt='하위 조직 추가' onClick={openCreateOrgModal} />
        </>
      ) : isUpdating ? (
        <S.NotSelectOrgBox onClick={e => e.stopPropagation()}>
          <Input
            defaultValue={name}
            onChange={handleUpdateOrgName}
            onKeyUp={cencelUpdateOrg}
            onPressEnter={updateOrgUpdate}
          />
          <Check onClick={updateOrgUpdate} />
          <img src={XImg} alt='취소' onClick={closeUpdateOrgName} />
        </S.NotSelectOrgBox>
      ) : (
        <>
          {name}({allMemberCount})
          <S.NotSelectOrgBox onClick={e => e.stopPropagation()}>
            <img src={PencilImg} alt='조직 이름 수정' onClick={openUpdateOrgName} />
            <img src={plusImg} alt='하위 조직 추가' onClick={openCreateOrgModal} />
            <img src={XImg} alt='조직 삭제' onClick={openDeleteOrgConfirm} />
          </S.NotSelectOrgBox>
        </>
      )}
    </S.OrgTtile>
  );
}

export default OrgTitleBox;
