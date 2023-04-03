import { useEffect, useMemo } from 'react';

import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import type { PushResult } from '@type/push';

import type * as T from './type';

function FaildPushListModal({ pushDetail, ...props }: T.FailedPushListModalProps) {
  const dispatch = useDispatch();

  const dataSource: T.FailedPushListDataSource = useMemo(() => {
    console.log({ pushDetail });
    if (!pushDetail.results) return [];

    const failList = pushDetail.results.filter(
      ({ status }) => status === 'error' || status === 'rejected',
    );

    return failList.map(v => ({ ...v, key: v.id }));
  }, [pushDetail]);

  const columns: ColumnsType<PushResult> = [
    {
      title: '아이디',
      dataIndex: 'id',
      width: '15%',
      render: id => {
        return id;
      },
    },
    {
      title: '이름',
      dataIndex: 'name',
      width: '15%',
      render: (_, record) => {
        const { groupMemberId } = record;
        const findMember = pushDetail.groupMembers.find(({ id }) => id === groupMemberId);
        return <>{findMember?.user?.name || ''}</>;
      },
    },
    {
      title: '기기',
      dataIndex: 'device',
      width: '15%',
      render: (_, record) => {
        const { groupMemberId } = record;
        const findResult = pushDetail.results.find(
          result => result.groupMemberId === groupMemberId,
        );

        return <>{findResult?.device?.alias || ''}</>;
      },
    },
    {
      title: '휴대폰',
      dataIndex: 'phone',
      width: '15%',
      render: (_, record) => {
        const { groupMemberId } = record;
        const findMember = pushDetail.groupMembers.find(({ id }) => id === groupMemberId);
        return <>{findMember?.user?.phone || ''}</>;
      },
    },
    {
      title: '실패사유',
      dataIndex: 'failInfo',
      width: '40%',
      render: (_, { failure }) => {
        return failure?.error || '-';
      },
    },
  ];

  const close = () => dispatch(closeModal('failedPushList'));

  useEffect(() => {
    console.log({ dataSource });
  }, [dataSource]);

  return (
    <Modal
      {...props}
      open={true}
      title='발송 실패 정보'
      footer={null}
      width='800px'
      onCancel={close}>
      <Table columns={columns} dataSource={dataSource} sticky={true} scroll={{ y: 450 }} />
    </Modal>
  );
}

export default FaildPushListModal;
