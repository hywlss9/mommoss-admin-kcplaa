import { authenticateRequest } from '@api/authenticateRequest';

import type { operations } from '@type/model';
import type { SendPushData } from '@type/push';
import type { OmitGroupIdInHeader } from '@type/util';

type PostPushData = Omit<SendPushData, 'noticeId' | 'surveyId'>;
type PostPushHeaders =
  operations['AdminNotificationController_sendNotification']['parameters']['header'];

interface PostPushProps {
  data: PostPushData;
  headers?: OmitGroupIdInHeader<PostPushHeaders>;
}

type PostSurveysResponse = unknown;

export async function postPush({
  data,
  headers,
}: PostPushProps): Promise<PostSurveysResponse | false> {
  const response = await authenticateRequest<PostSurveysResponse>({
    method: 'post',
    url: `/api/v1/admin/notifications`,
    headers,
    data,
  });

  console.log('postPush', { response });
  return response;
}

export type { PostPushData };
