import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

import { Tree as AntdTree, Input, message } from 'antd';
import type { DataNode } from 'antd/lib/tree';

import useGetOrganization from '@hooks/queries/group/useGetOrganization';

import { off, on } from '@utils/globalEvents';

import type { Organization } from '@type/group';

import OrgTitleBox from './OrgTitleBox';
import * as S from './styled';
import type * as T from './type';

function Tree({ setSelectedOrganizationId, height }: T.OrganizationTreeProps) {
  const [searchValue, setSearchValue] = useState<string | undefined>();

  const { data: org, refetch, fetchNextPage } = useGetOrganization({ q: searchValue });

  const selectOrganization = (selectedKeys: any) => setSelectedOrganizationId(selectedKeys[0]);

  const searchOrg = (value: string) => {
    if (value.length < 2) {
      message.info('검색어는 2글자 이상이어야 합니다.');
      return false;
    }

    setSearchValue(value.length > 1 ? value : undefined);
  };

  const resetSearchValue = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (!value) setSearchValue(undefined);
  };

  const treeData = useMemo(() => {
    const dataNodeArr: T.OrganizationToDataNode[] = org.map(org => {
      const { id, parentId, allMemberCount } = org;
      return {
        parentId,
        allMemberCount,
        key: id,
        title: <OrgTitleBox org={org} />,
        children: [],
      };
    });
    const map: { [key in number]: Organization['id'] } = {};
    const roots: DataNode[] = [];
    let i: number = 0;

    for (i = 0; i < dataNodeArr.length; i += 1) {
      map[dataNodeArr[i].key as number] = i; // initialize the map
      dataNodeArr[i].children = []; // initialize the children
    }
    console.log({ dataNodeArr, map });
    dataNodeArr.forEach(data => {
      console.log({ data });
      const { key, title, children, parentId } = data;
      if (typeof parentId === 'number' && dataNodeArr[map[parentId]]) {
        dataNodeArr[map[parentId]].children.push(data);
      } else {
        roots.push({ key, title, children });
      }
    });

    console.log({ roots });

    return roots;
  }, [org]);

  useEffect(() => {
    on('RELEASE_ORGANIZATION_MEMBER', refetch);
    on('SUCCESS_MOVE_ORGANIZATION_MEMBERS', refetch);
    on('REFETCH_FROM_ORG_TITLE_BOX', refetch);
    on('SUCCESS_CREATE_ORGANIZATION', refetch);
    return () => {
      off('RELEASE_ORGANIZATION_MEMBER', refetch);
      off('SUCCESS_MOVE_ORGANIZATION_MEMBERS', refetch);
      off('REFETCH_FROM_ORG_TITLE_BOX', refetch);
      off('SUCCESS_CREATE_ORGANIZATION', refetch);
    };
  }, []);

  return (
    <S.Container>
      <Input.Search placeholder='조직명 검색' onChange={resetSearchValue} onSearch={searchOrg} />
      <S.OrganizationBox>
        <S.TreeBox height={height}>
          <AntdTree
            showLine={true}
            treeData={treeData}
            blockNode={true}
            height={height ?? 400}
            onSelect={selectOrganization}
            onScroll={({ currentTarget: { scrollTop, scrollHeight, clientHeight } }) => {
              if (scrollHeight - 15 === clientHeight + scrollTop) fetchNextPage();
            }}
          />
        </S.TreeBox>
        {/* <S.Footer>
          <S.FooterButtonBox>
            <Button type='primary'>조직 저장하기</Button>
          </S.FooterButtonBox>
        </S.Footer> */}
      </S.OrganizationBox>
    </S.Container>
  );
}

export default Tree;
