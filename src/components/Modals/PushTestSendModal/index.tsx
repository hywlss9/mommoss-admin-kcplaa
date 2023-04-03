import { useMemo, useState } from 'react';

import { Button, Modal, Table, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { closeModal } from '@reduce/modals';

import useGetGroupMembers from '@hooks/queries/group/useGetGroupMembers';

import { postPush } from '@api/push';

import getIsResponseFalse from '@utils/getIsResponseFalse';

import type * as T from './type';

const columns: ColumnsType<T.TestMemberTableData> = [
  { title: '아이디', dataIndex: 'id', key: 'id' },
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => {
      return record?.user?.name || '-';
    },
  },
  {
    title: '직위',
    dataIndex: 'position',
    key: 'position',
    render: (_, record) => {
      return record?.position?.name || '직위 없음';
    },
  },
  // { title: '기기', dataIndex: 'device', key: 'device' },
];

function PushTestSendModal(props: T.PushTestSendModalProps) {
  const { push } = props;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);

  const { data: members } = useGetGroupMembers({ type: 'organization', page });

  const [selectedTestMembers, setSelectedTestMembers] = useState<T.TestMemberTableDataArr>([]);

  const dataSource: T.TestMemberTableDataArr = useMemo(() => {
    return members
      .filter(({ roles }) =>
        roles.map(({ name }) => name === '관리자' || name === '최고 관리자').includes(true),
      )
      .map(v => ({ ...v, key: v.id }));
  }, [members]);

  const select = (data: T.TestMemberTableData, selected: boolean) => {
    setSelectedTestMembers(prevState => {
      if (selected) return [...prevState, data];

      const findIndex = prevState.findIndex(v => v.id === data.id);
      if (typeof findIndex === 'undefined') return prevState;

      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const selectAll = (selected: boolean, data: T.TestMemberTableDataArr) => {
    setSelectedTestMembers(prevState => (selected ? [...prevState, ...data.filter(v => v)] : []));
  };

  const close = () => dispatch(closeModal('pushTestSend'));

  const submit = async () => {
    if (selectedTestMembers.length < 0) {
      message.warning('테스트 알림을 발송할 멤버를 선택해주세요.');
      return;
    }

    //TODO: gruop,members 잘 섞어서 push 안에 넣어줘야함
    console.log({
      ...push,
      groupMemberIds: selectedTestMembers.map(({ id }) => id),
    });

    const response = await postPush({
      data: {
        ...push,
        groupMemberIds: selectedTestMembers.map(({ id }) => id),
      },
    });

    if (getIsResponseFalse(response)) return false;

    message.success(
      push.sendAt
        ? '테스트 알림메시지 예약 발송이 저장되었습니다.'
        : '테스트 알림메시지가 전송되었습니다.',
    );
    close();
    navigate('/service/push?menu=situation');
  };

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button key='send' type='primary' onClick={submit}>
      발송
    </Button>,
  ];

  return (
    <Modal
      {...props}
      open={true}
      title='테스트 발송'
      footer={footerBtns}
      width='800px'
      onCancel={close}>
      <Table
        columns={columns}
        dataSource={dataSource}
        sticky={true}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedTestMembers.map(v => v.key),
          onSelect: select,
          onSelectAll: selectAll,
        }}
        pagination={{
          position: ['bottomCenter'],
          total: dataSource.length,
          showSizeChanger: false,
          onChange: setPage,
        }}
      />
    </Modal>
  );
}

export default PushTestSendModal;
