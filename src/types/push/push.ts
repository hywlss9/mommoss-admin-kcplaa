import type { components } from '@type/model';
import type { Notice } from '@type/notice';
import type { Survey } from '@type/survey';

type PushCategory = components['schemas']['NotificationCategory'];

type SendPushData = components['schemas']['CreateNotificationDtoV1'] & {
  noticeId?: Notice['id'];
  surveyId?: Survey['id'];
};

type PushResult = components['schemas']['PushResult$Rz6hOg96mojDnrRas3i3wA'];

export type { PushCategory, SendPushData, PushResult };
