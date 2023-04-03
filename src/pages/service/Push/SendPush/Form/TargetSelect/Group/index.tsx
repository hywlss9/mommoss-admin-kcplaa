import { useEffect, useState } from 'react';

import { Select } from 'antd';
import update from 'immutability-helper';

import type { Target } from '@pages/service/Push/SendPush/Form/type';

import { ReactComponent as Trash } from '@assets/icons/trash.svg';

import * as S from './styled';
import type * as T from './type';

function Group({
  selectedGroups: _selectedGroups,
  setSelectedGroups: _setSelectedGroups,
}: T.GroupProps) {
  const [targets, setTargets] = useState<Target[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<Target[]>(_selectedGroups || []);

  const selectGroup = (_: any, data: any) => {
    const findData = targets.find(target => target.id === Number(data.key));
    if (!findData) return;

    setSelectedGroups(prevState => [...prevState, findData]);
  };

  const removeGroup = (id: any) => {
    setSelectedGroups(prevState => {
      const findIndex = prevState.findIndex(v => v.id === id);
      return update(prevState, {
        $splice: [[findIndex, 1]],
      });
    });
  };

  useEffect(() => {
    setTargets([
      {
        id: 0,
        title: '서울지역',
      },
      {
        id: 1,
        title: '경기지역',
      },
      {
        id: 2,
        title: '강원지역',
      },
      {
        id: 3,
        title: '충청지역',
      },
      {
        id: 4,
        title: '가나다라4',
      },
      {
        id: 5,
        title: '가나다라5',
      },
      {
        id: 6,
        title: '가나다라6',
      },
      {
        id: 7,
        title: '가나다라7',
      },
      {
        id: 8,
        title: '가나다라8',
      },
      {
        id: 9,
        title: '가나다라9',
      },
      {
        id: 10,
        title: '가나다라10',
      },
    ]);
  }, []);

  return (
    <S.SelectBox>
      <Select placeholder='발송그룹 선택' value={null} onSelect={selectGroup}>
        {targets.map(({ id, title }) => (
          <Select.Option key={id} value={title}>
            {title}
          </Select.Option>
        ))}
      </Select>
      <S.SelectedList>
        {selectedGroups.map(({ id, title }) => {
          const remove = () => removeGroup(id);

          return (
            <S.SelectedItem key={id}>
              {title}
              <Trash onClick={remove} />
            </S.SelectedItem>
          );
        })}
      </S.SelectedList>
    </S.SelectBox>
  );
}

export default Group;
