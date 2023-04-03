import { Fragment, useMemo } from 'react';

import { v4 as uuidv4 } from 'uuid';

import useOverflowTags from '@hooks/useOverflowTags';

import { ReactComponent as Close } from '@assets/icons/close.svg';

import * as S from './styled';
import type * as T from './type';

function TableTags({ selected, deselect, deselectAll }: T.TagsProps) {
  const uuid = useMemo(() => uuidv4(), []);

  const [isOverflow, showTagCount] = useOverflowTags(uuid);

  return (
    <S.Container className={`tags_container__${uuid}`}>
      <S.SelectCountBox className={`tags_count-box__${uuid}`}>
        선택 {selected.length}
        {selected.length > 0 && <Close onClick={deselectAll} />}
      </S.SelectCountBox>
      <S.TagBox className={`tags_box__${uuid}`}>
        {selected.map(({ key, name }, index) => {
          if (isOverflow && index + 1 >= showTagCount) return <Fragment key={key} />;

          const remove = () => deselect(key);

          return (
            <S.Tag key={key}>
              {name}
              <Close onClick={remove} />
            </S.Tag>
          );
        })}
      </S.TagBox>
      {isOverflow && selected.length + 1 - showTagCount > 0 && (
        <S.OverflowText>외 {selected.length + 1 - showTagCount}명</S.OverflowText>
      )}
    </S.Container>
  );
}

export default TableTags;
