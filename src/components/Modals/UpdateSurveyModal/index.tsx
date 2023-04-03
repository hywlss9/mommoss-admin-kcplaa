import { useEffect, useState } from 'react';

import { Editor } from '@ablestor/ablestor-survey';
import type { EditorType } from '@ablestor/ablestor-survey';
import { Button, Modal, Popover, message } from 'antd';
import { useDispatch } from 'react-redux';

import { closeModal } from '@reduce/modals';

import {
  createSurveyQuestion,
  deleteSurveyQuestion,
  getSurveyDetail,
  updateSurvey,
  updateSurveyQuestion,
} from '@api/survey';

import getIsResponseFalse from '@utils/getIsResponseFalse';
import { trigger } from '@utils/globalEvents';

import SurveySetting from '@pages/service/Survey/WriteSurvey/Form/Setting';
import type { SurveySettingModel } from '@pages/service/Survey/WriteSurvey/Form/type';

import * as S from './styled';
import type * as T from './type';

function UpdateSurveyModal({ surveyId }: T.UpdateSurveyModalProps) {
  const dispatch = useDispatch();

  const [survey, setSurvey] = useState<T.UpdateSurveyData | undefined>();
  const [updatedSurvey, setUpdatedSurvey] = useState<T.UpdateSurveyData | undefined>();
  const [surveySetting, setSurveySetting] = useState<SurveySettingModel>({
    multiple: false,
    editable: false,
    secure: false,
    visible: true,
  });
  const [addQuestionArr, setAddQuestionArr] = useState<EditorType.ISurveyResult['questions']>([]);
  const [updateQuestionArr, setUpdateQuestionArr] = useState<T.GetSurveyDetailQuestionArr>([]);
  const [deleteQuestionArr, setDeleteQuestionArr] = useState<T.GetSurveyDetailQuestionArr>([]);

  const changeSurvey = (result: EditorType.ISurveyResult) => {
    if (!survey || !updatedSurvey) return false;
    const { questions } = result;
    console.log({ result });

    const getUpdateQuestions = questions.filter(v => 'id' in v) as T.GetSurveyDetailQuestionArr;
    const getAddQuestions = questions.filter(v => !('id' in v));
    const getDeleteQuestions = survey.questions.filter(
      question =>
        typeof question?.id === 'number' &&
        !getUpdateQuestions.map(({ id }) => id).includes(question?.id),
    ) as T.GetSurveyDetailQuestionArr;

    console.log({ getAddQuestions, getUpdateQuestions, getDeleteQuestions });
    setUpdatedSurvey(result);
    setAddQuestionArr(getAddQuestions);
    setUpdateQuestionArr(getUpdateQuestions);
    setDeleteQuestionArr(getDeleteQuestions);
  };

  const close = () => dispatch(closeModal('updateSurvey'));

  const update = async () => {
    if (!updatedSurvey) return;
    console.log({
      updatedSurvey: { ...updatedSurvey, ...surveySetting },
      addQuestionArr,
      updateQuestionArr,
      deleteQuestionArr,
    });

    const response = await updateSurvey({
      path: { surveyId },
      data: { ...updatedSurvey, ...surveySetting },
    });

    if (getIsResponseFalse(response)) {
      message.error('설문 수정에 실패했습니다.');
      return false;
    }

    for await (const question of updateQuestionArr) {
      await updateSurveyQuestion({
        path: { surveyId, questionId: question.id },
        data: { ...question, index: question.order },
      });
    }
    for await (const question of addQuestionArr) {
      await createSurveyQuestion({
        path: { surveyId },
        data: { ...question, index: question.order },
      });
    }
    for await (const question of deleteQuestionArr) {
      await deleteSurveyQuestion({ path: { surveyId, questionId: question.id } });
    }

    trigger('SUCCESS_UPDATE_SURVEY');

    message.success('설문 수정이 완료되었습니다.');

    close();
  };

  useEffect(() => {
    const _getSurveyDetail = async () => {
      const response = await getSurveyDetail({ path: { surveyId } });

      if (getIsResponseFalse(response)) return false;
      console.log({ response });
      const {
        description,
        questions,
        order,
        multiple,
        editable,
        secure,
        startedAt,
        finishedAt,
        maxResponses,
        visible,
      } = response;
      const orderQuestions = questions.map(
        ({ id, title, description, required, type, format }, i) => ({
          id,
          title: title || '',
          description: description || '',
          required,
          type,
          format: format || {},
          order: order.findIndex(v => v === id),
        }),
      ) as EditorType.ISurveyContent;

      const result = { ...response, description: description || '', questions: orderQuestions };

      setSurvey(result);
      setUpdatedSurvey(result);
      setSurveySetting({
        multiple,
        editable,
        secure,
        visible,
        startedAt: startedAt || undefined,
        finishedAt: finishedAt || undefined,
        maxResponses: maxResponses ?? undefined,
      });
    };

    _getSurveyDetail();
    console.log({ surveyId });
  }, [surveyId]);

  const footerBtns = [
    <Button key='cancel' onClick={close}>
      취소
    </Button>,
    <Button key='ok' type='primary' onClick={update}>
      저장
    </Button>,
  ];

  return (
    <Modal
      open={true}
      title='설문 수정'
      footer={footerBtns}
      width='800px'
      bodyStyle={{
        overflowY: 'auto',
        width: 'calc(100% + 15px)',
        maxHeight: '600px',
        paddingTop: 0,
        paddingRight: '15px',
      }}
      onCancel={close}>
      {updatedSurvey && (
        <S.Container>
          <Popover
            placement='bottomRight'
            trigger='click'
            overlayStyle={{ minWidth: '500px' }}
            content={
              <SurveySetting surveySetting={surveySetting} setSurveySetting={setSurveySetting} />
            }>
            <Button type='link'>설문 설정</Button>
          </Popover>
          <Editor
            blackList={['time', 'date']}
            defaultValue={updatedSurvey}
            onChange={changeSurvey}
          />
        </S.Container>
      )}
    </Modal>
  );
}

export default UpdateSurveyModal;
