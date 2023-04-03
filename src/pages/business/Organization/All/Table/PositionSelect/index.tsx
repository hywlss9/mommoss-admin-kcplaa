import { message } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useNavigate } from 'react-router-dom';

import useGetPositions from '@hooks/queries/group/useGetPositions';

import { updateMember } from '@api/group';

import Text from '@components/Text';

import * as S from './styled';
import type * as T from './type';

function PositionSelect({ memberId, refresh }: T.PositionSelectProps) {
  const navigate = useNavigate();

  const { data: positions, total, hasNextPage, fetchNextPage } = useGetPositions();

  const navigatePosition = () => navigate('/business/position');

  if (!positions.length) {
    return (
      <S.CreatePositionBox>
        <Text>아직 직위 설정이 되지 않았습니다.</Text>
        <Link to='/business/position'>직위 설정 하러가기</Link>
      </S.CreatePositionBox>
    );
  }

  return (
    <S.ChangePositionList>
      <InfiniteScroll
        dataLength={total}
        hasMore={!!hasNextPage}
        next={fetchNextPage}
        height={196}
        loader={<></>}>
        {positions.map(({ id, name }) => {
          const updatePosition = async () => {
            await updateMember({ path: { groupMemberId: memberId }, data: { positionId: id } });

            message.success('직위가 변경되었습니다.');
            refresh();
          };

          return (
            <S.ChangePositionItem key={id} onClick={updatePosition}>
              {name}
            </S.ChangePositionItem>
          );
        })}
      </InfiniteScroll>
      <S.Divider />
      <S.ChangePositionItem onClick={navigatePosition}>직급수정</S.ChangePositionItem>
    </S.ChangePositionList>
  );
}

export default PositionSelect;
