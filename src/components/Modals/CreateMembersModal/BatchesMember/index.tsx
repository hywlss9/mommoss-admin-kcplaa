import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { AutoComplete, Input, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import update from 'immutability-helper';

import useGetOrganization from '@hooks/queries/group/useGetOrganization';
import useGetPositions from '@hooks/queries/group/useGetPositions';
import useGetRoles from '@hooks/queries/group/useGetRoles';

import colors from '@constants/colors';

import NumberTitle from '@components/NumberTitle';
import Text from '@components/Text';

import ExclamationMark from '@assets/icons/exclamation-mark.png';

import type { Get } from '@type/util';

import * as S from './styled';
import type * as T from './type';

const REQUIRE_DOT_MARGIN_RIGHT = { marginRight: '2px' };

function BatchesMember({
  isUpload,
  createPasswordType,
  rows,
  setRows,
  selectedMemberKeys,
  setSelectedMemberKeys,
}: T.BatchesMemberProps) {
  const [orgSearchValue, setOrgSearchValue] = useState<string | undefined>();
  const [positionsSearchValue, setPositionsSearchValue] = useState<string | undefined>();

  const { data: org } = useGetOrganization({
    q: typeof orgSearchValue === 'string' && orgSearchValue.length < 3 ? undefined : orgSearchValue,
  });
  const { data: positions } = useGetPositions({
    q:
      typeof positionsSearchValue === 'string' && positionsSearchValue.length < 3
        ? undefined
        : positionsSearchValue,
  });

  const orgSelectData: T.SelectOption[] = useMemo(() => {
    return org.map(({ id, name }) => ({ value: String(id), label: name }));
  }, [org]);

  const positionsSelectData: T.SelectOption[] = useMemo(() => {
    return positions.map(({ id, name }) => ({ value: String(id), label: name }));
  }, [positions]);

  const columns: ColumnsType<Get<T.MemberDataSource>> = useMemo(() => {
    return [
      {
        key: 'id',
        dataIndex: 'id',
        title: (
          <Text>
            <Text
              block={false}
              size={12}
              color={colors.RED_ORIGIN}
              style={REQUIRE_DOT_MARGIN_RIGHT}>
              *
            </Text>
            아이디
          </Text>
        ),
        width: '15%',
        ellipsis: true,
        render: (text, { key }, index) => {
          const onChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
            emtpyRequiredSpliceSelected('id', key, value);

            handleDataSource({ name, value, index });
          };

          if (!text) {
            return (
              <S.NotValueBox>
                <Input
                  placeholder='미입력'
                  name='id'
                  defaultValue={rows.current[key]['id']}
                  onChange={onChange}
                />
                {!rows.current[key]['id'] && <img src={ExclamationMark} alt='ExclamationMark' />}
              </S.NotValueBox>
            );
          }
          return <>{text}</>;
        },
      },
      {
        key: 'name',
        dataIndex: 'name',
        title: (
          <Text>
            <Text
              block={false}
              size={12}
              color={colors.RED_ORIGIN}
              style={REQUIRE_DOT_MARGIN_RIGHT}>
              *
            </Text>
            이름
          </Text>
        ),
        width: '10%',
        ellipsis: true,
        render: (text, { key }, index) => {
          const onChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
            emtpyRequiredSpliceSelected('name', key, value);

            handleDataSource({ name, value, index });
          };

          if (!text)
            return (
              <S.NotValueBox>
                <Input
                  placeholder='미입력'
                  name='name'
                  defaultValue={rows.current[key]['name']}
                  onChange={onChange}
                />
                {!rows.current[key]['name'] && <img src={ExclamationMark} alt='ExclamationMark' />}
              </S.NotValueBox>
            );
          return <>{text}</>;
        },
      },
      {
        key: 'email',
        dataIndex: 'email',
        title: '이메일',
        width: '20%',
        ellipsis: true,
        render: (text, record, index) => {
          const onChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
            handleDataSource({ name, value, index });

          if (!text)
            return (
              <Input
                placeholder='미입력'
                name='email'
                defaultValue={rows.current[record.key]?.['email']}
                onChange={onChange}
              />
            );
          return <>{text}</>;
        },
      },
      {
        key: 'password',
        dataIndex: 'password',
        title: (
          <Text>
            <Text
              block={false}
              size={12}
              color={colors.RED_ORIGIN}
              style={REQUIRE_DOT_MARGIN_RIGHT}>
              *
            </Text>
            비밀번호
          </Text>
        ),
        width: '20%',
        render: (_, { key }) => {
          if (createPasswordType === 'auto') {
            return <Input.Password value={rows.existing[key].password} />;
          }

          const handlePassword = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            emtpyRequiredSpliceSelected('password', key, value);

            setRows(prevState =>
              update(prevState, {
                current: {
                  [key]: {
                    password: {
                      $set: value,
                    },
                  },
                },
              }),
            );
          };

          return <Input value={rows.current[key].password} onChange={handlePassword} />;
        },
      },
      {
        key: 'organization',
        dataIndex: 'organization',
        title: '소속',
        width: '20%',
        ellipsis: true,
        render: (text, record) => {
          const orgSelect = (_: any, { label }: T.SelectOption) => {
            setOrgSearchValue(label);
            setRows(prevState =>
              update(prevState, {
                current: {
                  [record.key]: {
                    organization: {
                      $set: label,
                    },
                  },
                },
              }),
            );
          };

          return (
            <AutoComplete
              style={{ width: '100%' }}
              placeholder='소속을 입력하세요'
              options={orgSelectData}
              value={text}
              onChange={setOrgSearchValue}
              onSelect={orgSelect}
            />
          );
        },
      },
      {
        key: 'position',
        dataIndex: 'position',
        title: '직위',
        width: '15%',
        ellipsis: true,
        render: (text, record) => {
          const positionSelect = (_: any, { label }: T.SelectOption) => {
            setPositionsSearchValue(label);
            setRows(prevState =>
              update(prevState, {
                current: {
                  [record.key]: {
                    position: {
                      $set: label,
                    },
                  },
                },
              }),
            );
          };

          return (
            <AutoComplete
              style={{ width: '100%' }}
              placeholder='직위을 입력하세요'
              options={positionsSelectData}
              value={text}
              onChange={setPositionsSearchValue}
              onSelect={positionSelect}
            />
          );
        },
      },
    ];
  }, [createPasswordType, org, positions, selectedMemberKeys]);

  const emtpyRequiredSpliceSelected = (
    type: 'id' | 'name' | 'password',
    key: number,
    value: string,
  ) => {
    const findIndex = selectedMemberKeys.findIndex(v => v === key);
    const { id, password, name } = rows.current[key];

    if (findIndex > -1 && !value) {
      setSelectedMemberKeys(prevState =>
        update(prevState, {
          $splice: [[findIndex, 1]],
        }),
      );
    }

    if (findIndex < 0 || !value) return;

    const selectKey = () => setSelectedMemberKeys(prevState => [...prevState, key]);

    switch (type) {
      case 'id': {
        name && password && selectKey();
        return;
      }
      case 'name': {
        id && password && selectKey();
        return;
      }
      case 'password': {
        id && name && selectKey();
        return;
      }
    }
  };

  const handleDataSource = ({
    name,
    value,
    index,
  }: {
    name: string;
    value: string;
    index: number;
  }) => {
    setRows(prevState =>
      update(prevState, {
        current: {
          [index]: {
            [name]: {
              $set: value,
            },
          },
        },
      }),
    );
  };

  const select = (data: Get<T.MemberDataSource>, selected: boolean) => {
    console.log({ data, selected });

    if (selected) {
      const { key } = data;
      const { id, name, password } = rows.current[key];
      console.log(rows.current[key]);

      if (!id || !name || !password) {
        message.warning('아이디, 이름, 비밀번호가 입력되지 않았습니다.');
        return false;
      }
    }

    setSelectedMemberKeys(prevState => {
      if (selected) return [...prevState, data.key];

      const findIndex = prevState.findIndex(key => key === data.key);
      if (typeof findIndex === 'undefined') return prevState;

      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  const selectAll = (selected: boolean, data: T.MemberDataSource) => {
    setSelectedMemberKeys(prevState =>
      selected ? [...prevState, ...data.filter(v => v).map(v => v.key)] : [],
    );
  };

  return (
    <>
      <NumberTitle number={3} title='구성원 일괄 추가' />
      {isUpload && (
        <Table
          columns={columns}
          dataSource={rows.existing}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedMemberKeys,
            onSelect: select,
            onSelectAll: selectAll,
          }}
          pagination={{
            pageSize: 6,
            position: ['bottomCenter'],
            total: rows.existing.length,
            showSizeChanger: false,
          }}
        />
      )}
    </>
  );
}

export default BatchesMember;
