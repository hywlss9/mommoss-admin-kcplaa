import { useEffect, useState } from 'react';

import { Button, Modal, message } from 'antd';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { read, utils } from 'xlsx';
import type { WorkBook } from 'xlsx';

import { closeModal } from '@reduce/modals';

import useGetOrganization from '@hooks/queries/group/useGetOrganization';
import useGetPositions from '@hooks/queries/group/useGetPositions';

import { createMembers } from '@api/group';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import type { CreateMemberData } from '@type/group';

import BatchesMember from './BatchesMember';
import type { MemberData } from './BatchesMember/type';
import FileUpload from './FileUpload';
import PasswordCreateWay from './PasswordCreateWay';
import type * as T from './type';

function CreateMembersModal() {
  const dispatch = useDispatch();

  const { data: org } = useGetOrganization();
  const { data: positions } = useGetPositions();

  const [createPasswordType, setCreatePasswordType] = useState<T.CreatePasswordType>('auto');
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [rows, setRows] = useState<T.Rows>({
    existing: [],
    current: [],
  });
  const [selectedMemberKeys, setSelectedMemberKeys] = useState<number[]>([]);

  const csvFileToArray: (text: string) => T.Rows['existing'] = (text: string) => {
    const csvRows = text
      .slice(text.indexOf('\n') + 1)
      .split('\n')
      .filter(v => v);

    return csvRows.map((row, index) => {
      const [id, name, password, email, orgName, positionName] = row.split(',');
      //TODO: org, position이 Page가 있는데 find할때 나오지 않은 것은 어떻게 할 것인지, limit을 걍 엄청 많이 때리나
      const findOrgName: string | undefined = org.find(({ name }) => name === orgName)?.name;
      const findPositionName: string | undefined = positions.find(
        ({ name }) => name === positionName,
      )?.name;

      const organization: MemberData['organization'] =
        typeof findOrgName === 'undefined' ? undefined : findOrgName;
      const position: MemberData['position'] =
        typeof findPositionName === 'undefined' ? undefined : findPositionName;

      const uuid = uuidv4();
      const shortUuid = uuid.split('-')[0];

      return {
        id,
        name,
        email,
        organization,
        position,
        password: password ? password : createPasswordType === 'auto' ? shortUuid : '',
        key: index,
      };
    });
  };

  const convertCsv: (file: File) => Promise<T.Rows['existing']> = (file: File) => {
    return new Promise(resolve => {
      const fileReader = new FileReader();
      fileReader.onload = e => {
        const text = e?.target?.result as string;
        const result = csvFileToArray(text);
        console.log('csv', { result });
        return resolve(result);
      };
      fileReader.readAsText(file);
    });
  };

  const convertXlsx: (file: File) => Promise<
    | false
    | {
        header: string[];
        rows: string[][];
      }
  > = async (file: File) => {
    console.log('xlsx', { file });

    let wb: null | WorkBook = null;

    try {
      wb = read(await file.arrayBuffer());

      const data = utils
        .sheet_to_json<string[]>(wb.Sheets[wb.SheetNames[0]], { header: 1 })
        .filter(v => v.length > 0)
        .map(v => Array.apply('', v) as string[]);

      const header = data[0];
      const rows = data.filter((_, i) => i !== 0);

      return { header, rows };
    } catch (err) {
      console.log({ err });
      message.info('올바르지 않은 파일입니다.');
      return false;
    }
  };

  const upload = async (files: FileList) => {
    console.log({ files });

    if (!files[0]) return false;

    const file = files[0];
    const ext = file.name.split('.').pop();

    switch (ext) {
      case 'csv': {
        const dataSource: T.Rows['existing'] = await convertCsv(file);
        console.log({ dataSource });
        // return result;

        setSelectedMemberKeys(
          dataSource
            .filter(({ id, name, password }) =>
              createPasswordType === 'auto' ? id && name : id && name && password,
            )
            .map(({ key }) => key),
        );
        setRows({ existing: dataSource, current: dataSource });
        return;
      }
      case 'xlsx': {
        const result = await convertXlsx(file);
        if (!result) return;

        const { rows } = result;

        const dataSource: T.Rows['existing'] = rows.map(
          ([id, name, password, email, orgName, positionName], index) => {
            const uuid = uuidv4();
            const shortUuid = uuid.split('-')[0];

            const findOrgName: string | undefined = org.find(({ name }) => name === orgName)?.name;
            const findPositionName: string | undefined = positions.find(
              ({ name }) => name === positionName,
            )?.name;

            const organization: MemberData['organization'] =
              typeof findOrgName === 'undefined' ? undefined : findOrgName;
            const position: MemberData['position'] =
              typeof findPositionName === 'undefined' ? undefined : findPositionName;

            console.log({ password, organization, position });
            return {
              organization,
              position,
              key: index,
              password: password ? password : createPasswordType === 'auto' ? shortUuid : '',
              id: id || '',
              name: name || '',
              email: email || '',
            };
          },
        );

        setSelectedMemberKeys(
          dataSource
            .filter(({ id, name, password }) =>
              createPasswordType === 'auto' ? id && name : id && name && password,
            )
            .map(({ key }) => key),
        );

        setRows({ existing: dataSource, current: dataSource });
        return;
      }
    }
  };

  const create = async () => {
    console.log({ rows });
    const selectedFilterArr: MemberData[] = rows.current.filter(v =>
      selectedMemberKeys.includes(v.key),
    );

    const result: CreateMemberData[] = selectedFilterArr.map(
      ({ id, name, email, password, organization, position }) => {
        const findOrgId = org.find(({ name }) => name === organization)?.id;
        const findPositionId = positions.find(({ name }) => name === position)?.id;

        return {
          name: name as string,
          accountId: String(id),
          accountPassword: password as string,
          email,
          ...(typeof findOrgId === 'number' && { teamId: findOrgId }),
          ...(typeof findPositionId === 'number' && { positionId: findPositionId }),
        };
      },
    );

    const response = await createMembers({ data: { groupMembers: result } });
    console.log({ result, response });

    if (getIsResponseFalse(response)) return false;

    message.success('구성원 추가가 완료되었습니다.');
    trigger('SUCCESS_CREATE_MEMBERS');
    close();
  };

  const close = () => dispatch(closeModal('createMembers'));

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button key='send' type='primary' onClick={create}>
      추가
    </Button>,
  ];

  useEffect(() => {
    if (createPasswordType === 'auto') {
      const getUuid = () => {
        const uuid = uuidv4();
        return uuid.split('-')[0];
      };

      setRows(prevState => {
        const current = prevState.current.map(v => ({ ...v, password: getUuid() }));
        const existing = prevState.existing.map(v => ({ ...v, password: getUuid() }));
        return { current, existing };
      });
    }
  }, [createPasswordType]);

  return (
    <Modal
      open={true}
      className='create-members-modal'
      title='구성원 일괄 추가'
      footer={footerBtns}
      width='1000px'
      bodyStyle={{ overflowY: 'auto', maxHeight: '600px' }}
      onCancel={close}>
      <PasswordCreateWay type={createPasswordType} setType={setCreatePasswordType} />

      <FileUpload isUpload={isUpload} setIsUpload={setIsUpload} upload={upload} />

      <BatchesMember
        isUpload={isUpload}
        createPasswordType={createPasswordType}
        rows={rows}
        setRows={setRows}
        selectedMemberKeys={selectedMemberKeys}
        setSelectedMemberKeys={setSelectedMemberKeys}
      />
    </Modal>
  );
}

export default CreateMembersModal;
