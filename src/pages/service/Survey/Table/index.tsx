import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Modal, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';

import { openModal } from '@reduce/modals';

import useGetSurveys from '@hooks/queries/survey/useGetSurveys';

import { deleteSurvey } from '@api/survey';
import type { GetSurveysQuery } from '@api/survey/getSurveys';

import getIsResponseFalse from '@utils/getIsResponseFalse';

import Sort from '@components/Sort';
import TableHeader from '@components/TableHeader';
import Text from '@components/Text';

import type * as T from './type';

const PAGE_SIZE: number = 8;

function SurveyTable() {
  const dispatch = useDispatch();

  const [selectedSurveys, setSelectedSurveys] = useState<T.SurveyTableDataSource>([]);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [dir, setDir] = useState<GetSurveysQuery['dir']>('desc');

  const {
    data: surveys,
    isLoading,
    refetch,
  } = useGetSurveys({ q: searchValue, dir, limit: PAGE_SIZE });

  const columns: ColumnsType<T.SurveyTableData> = useMemo(() => {
    return [
      {
        key: 'title',
        dataIndex: 'title',
        title: '제목',
      },
      {
        key: 'author',
        dataIndex: 'author',
        title: '등록자',
        render: author => {
          return author?.user?.name || '알 수 없음';
        },
      },
      {
        key: 'finishedAt',
        dataIndex: 'finishedAt',
        title: () => {
          const toggleSort = () => setDir(dir === 'asc' ? 'desc' : 'asc');

          return <Sort title='종료일' dir={dir} onClick={toggleSort} />;
        },
        render: finishedAt => {
          return finishedAt ? dayjs(finishedAt).format('YYYY-MM-DD HH:mm') : '-';
        },
      },
      {
        key: 'status',
        dataIndex: 'status',
        title: '상태',
        render: (_, record) => {
          const isFinished = record.finishedAt ? new Date(record.finishedAt) < new Date() : false;
          return isFinished ? '종료' : '게시';
        },
      },
      {
        key: 'responseCount',
        dataIndex: 'responseCount',
        title: '응답수',
        render: responseCount => {
          return responseCount;
        },
      },
      {
        key: 'func',
        dataIndex: 'func',
        title: '추가기능',
        render: (_, { id }) => {
          const openUpdateSurveyModal = () =>
            dispatch(openModal({ name: 'updateSurvey', props: { surveyId: id } }));

          return (
            <Space>
              <Text underline={true} cursor='pointer' onClick={openUpdateSurveyModal}>
                수정
              </Text>
            </Space>
          );
        },
      },
    ];
  }, [surveys]);

  const dataSource: T.SurveyTableDataSource = useMemo(() => {
    return surveys.map(v => ({ ...v, key: v.id }));
  }, [surveys, searchValue]);

  const select = (data: T.SurveyTableData, selected: boolean) => {
    setSelectedSurveys(prevState => {
      if (selected) return [...prevState, data];

      const findIndex = prevState.findIndex(v => v.id === data.id);
      if (typeof findIndex === 'undefined') return prevState;

      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const selectAll = (selected: boolean, data: T.SurveyTableDataSource) => {
    setSelectedSurveys(prevState => (selected ? [...prevState, ...data.filter(v => v)] : []));
  };

  const openDeleteSurveyConfirm = () => {
    if (!selectedSurveys.length) {
      message.warning({ key: 'not-selected-surveys', content: '설문을 선택해주세요.' });
      return false;
    }

    Modal.confirm({
      title: '정말로 설문을 삭제하시겠습니까?',
      okText: '삭제',
      cancelText: '취소',
      onOk: async () => {
        console.log('OK');

        const selectedSurveyIds = selectedSurveys.map(({ id }) => id);
        const response = await deleteSurvey({ data: { surveyIds: selectedSurveyIds } });

        if (getIsResponseFalse(response)) return false;

        refetch();
        message.success('설문이 삭제되었습니다.');
      },
    });
  };

  const searchMember = (value: string) => {
    if (value.length < 2) {
      message.info('검색어는 2글자 이상이어야 합니다.');
      return false;
    }

    setPage(1);
    setSearchValue(value.length > 1 ? value : undefined);
  };

  const resetSearchValue = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!value && searchValue) {
      setPage(1);
      setSearchValue(undefined);
    }
  };

  return (
    <>
      <TableHeader
        buttons={[{ text: '삭제', buttonProps: { onClick: openDeleteSurveyConfirm } }]}
        searchInput={true}
        inputProps={{
          placeholder: '설문 검색',
          onChange: resetSearchValue,
          onSearch: searchMember,
        }}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedSurveys.map(v => v.key),
          onSelect: select,
          onSelectAll: selectAll,
        }}
        pagination={{
          current: page,
          position: ['bottomCenter'],
          total: dataSource.length,
          showSizeChanger: false,
          pageSize: PAGE_SIZE,
        }}
      />
    </>
  );
}

export default SurveyTable;
