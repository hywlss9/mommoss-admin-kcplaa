import { useEffect, useState } from 'react';

import { Form } from 'antd';
import type { RadioChangeEvent } from 'antd';

import NumberTitle from '@components/NumberTitle';
import Radios from '@components/Radios';
import Text from '@components/Text';

import Group from './Group';
import Member from './Member';
import type * as T from './type';

const TARGET_RADIOS: { label: string; value: T.TargetType }[] = [
  { label: '전체', value: 'all' },
  { label: '발송그룹', value: 'group' },
  { label: '회원', value: 'member' },
];

function TargetSelect({
  member: { selectedMembers, setSelectedMembers },
  group: { selectedGroups, setSelectedGroups },
}: T.TargetSelectProps) {
  const [targetType, setTargetType] = useState<T.TargetType>('all');

  const handleTargetType = ({ target: { value } }: RadioChangeEvent) => setTargetType(value);

  useEffect(() => {
    switch (targetType) {
      case 'all': {
        setSelectedMembers && setSelectedMembers([]);
        setSelectedGroups && setSelectedGroups([]);
        return;
      }
      case 'group': {
        setSelectedMembers && setSelectedMembers([]);
        return;
      }
      case 'member': {
        setSelectedGroups && setSelectedGroups([]);
        return;
      }
    }
  }, [targetType]);

  return (
    <>
      <NumberTitle number={2} title='발송대상선택' />
      <Form.Item name='target' initialValue={targetType}>
        <Radios
          options={TARGET_RADIOS}
          type='button'
          size='large'
          value={targetType}
          onChange={handleTargetType}
          style={{ marginBottom: '16px' }}
        />
        {targetType === 'all' && (
          <Text size={12}>*전송 전 발송 대상과 내용에 이상이 없는지 확인해주세요.</Text>
        )}
        {targetType === 'group' && (
          <Group selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups} />
        )}
        {targetType === 'member' && (
          <Member selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers} />
        )}
      </Form.Item>
    </>
  );
}

export default TargetSelect;
