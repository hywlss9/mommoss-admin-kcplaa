import { useEffect, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

import { Input, Modal, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import useGetPositions from '@hooks/queries/group/useGetPositions';

import { createPosition, deletePosition, updatePosition } from '@api/group';

import { ReactComponent as Arrow } from '@assets/icons/arrow.svg';
import { ReactComponent as Trash } from '@assets/icons/trash.svg';

import * as S from './styled';

function List() {
  const {
    data: positions,
    total,
    isRefetching,
    isFetchedAfterMount,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useGetPositions();

  const [newPositionName, setNewPositionName] = useState<string>('');
  const [editPositionName, setEditPositionName] = useState<{ [key in number]: string }>({});

  const handleNewPositionName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setNewPositionName(value);

  const createOnPressEnter = async ({
    nativeEvent: { isComposing },
  }: KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    if (!newPositionName) {
      message.warning('직위명을 입력해주세요.');
      return;
    }

    await createPosition({ data: { name: newPositionName } });

    message.success('직위가 추가되었습니다.');
    setNewPositionName('');
    refetch();
  };

  useEffect(() => {
    const positionsNameObjFromArr = positions.reduce(
      (o, { id, name }) => Object.assign(o, { [id]: name }),
      {},
    );
    setEditPositionName(positionsNameObjFromArr);
  }, [isRefetching, isFetchedAfterMount]);

  return (
    <S.Container>
      <S.Header>
        <S.Row>
          <S.Index>순서</S.Index>
          <S.Name>이름</S.Name>
          {/* <S.ButtonBox>이동</S.ButtonBox> */}
        </S.Row>
      </S.Header>
      <S.Body>
        <InfiniteScroll
          dataLength={total}
          hasMore={!!hasNextPage}
          next={fetchNextPage}
          height={positions.length > 9 ? 57 * 9 : 0}
          loader={<></>}>
          {positions.map(({ id, name }, index) => {
            const upDisabled = index === 1;
            const downDisabled = index === positions.length;

            const handlePositionName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
              setEditPositionName(prevState => ({ ...prevState, [id]: value }));
            };

            const resetName = () => {
              setEditPositionName(prevState => ({ ...prevState, [id]: name }));
            };

            const updateName = async ({
              nativeEvent: { isComposing },
            }: KeyboardEvent<HTMLInputElement>) => {
              if (isComposing) return;

              console.log(editPositionName[id]);

              if (!editPositionName[id]) {
                message.warning({
                  key: 'EMPTY_POSITION_NAME',
                  content: '변경할 이름을 정확히 입력해주세요.',
                });
                return false;
              }

              await updatePosition({
                path: { positionId: id },
                data: { name: editPositionName[id] },
              });

              message.success('직위 이름이 변경되었습니다.');
              refetch();
            };

            const deleter = () => {
              Modal.confirm({
                title: '정말로 해당 직위를 삭제하시겠습니까?',
                okText: '삭제',
                cancelText: '취소',
                onOk: async () => {
                  console.log('OK');
                  await deletePosition({ path: { positionId: id } });

                  refetch();
                  message.success('직위가 삭제되었습니다.');
                },
                onCancel: () => {
                  console.log('Cancel');
                },
              });
            };

            return (
              <S.Row key={id}>
                <S.Index>{index + 1}</S.Index>
                <S.Name>
                  <Input
                    value={editPositionName[id]}
                    onChange={handlePositionName}
                    onBlur={resetName}
                    onPressEnter={updateName}
                  />
                </S.Name>
                <S.ButtonBox>
                  <S.DeleteBox onClick={deleter}>
                    <Trash />
                  </S.DeleteBox>
                  {/* <S.Upbutton disabled={upDisabled} onClick={upper}>
                  <Arrow />
                </S.Upbutton>
                <S.Downbutton disabled={downDisabled} onClick={downer}>
                  <Arrow />
                </S.Downbutton> */}
                </S.ButtonBox>
              </S.Row>
            );
          })}
        </InfiniteScroll>
        <S.Row>
          <S.Index />
          <S.Name>
            <Input
              placeholder='직위명을 입력하세요.'
              value={newPositionName}
              onChange={handleNewPositionName}
              onPressEnter={createOnPressEnter}
            />
          </S.Name>
          <S.ButtonBox>
            <S.DeleteBox onClick={() => setNewPositionName('')}>
              <Trash />
            </S.DeleteBox>
          </S.ButtonBox>
        </S.Row>
      </S.Body>
    </S.Container>
  );
}

export default List;
