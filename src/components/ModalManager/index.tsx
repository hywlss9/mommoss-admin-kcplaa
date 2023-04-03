import { Fragment, Suspense } from 'react';

import { useSelector } from 'react-redux';

import type { RootState } from '@reduce';

import ApproveFamilyEventModal from '@components/Modals/ApproveFamilyEventModal';
import CreateAdminsModal from '@components/Modals/CreateAdminsModal';
import CreateAssociationMembersModal from '@components/Modals/CreateAssociationMembersModal';
import CreateAssociationModal from '@components/Modals/CreateAssociationModal';
import CreateMemberModal from '@components/Modals/CreateMemberModal';
import CreateMembersModal from '@components/Modals/CreateMembersModal';
import CreateNoticeCategoryModal from '@components/Modals/CreateNoticeCategoryModal';
import CreateOrganizationModal from '@components/Modals/CreateOrganizationModal';
import CreatePushCategoryModal from '@components/Modals/CreatePushCategoryModal';
import CreateVideoModal from '@components/Modals/CreateVideoModal';
import DeleteAdminConfirmModal from '@components/Modals/DeleteAdminConfirmModal';
import EditNoticeCategoryModal from '@components/Modals/EditNoticeCategoryModal';
import EditPushCategoryModal from '@components/Modals/EditPushCategoryModal';
import FailedPushListModal from '@components/Modals/FailedPushListModal';
import MoveAssociationMembersModal from '@components/Modals/MoveAssociationMembersModal';
import MoveOrganizationMembersModal from '@components/Modals/MoveOrganizationMembersModal';
import PushResultModal from '@components/Modals/PushResultModal';
import PushTestSendModal from '@components/Modals/PushTestSendModal';
import RejectedFamilyEventModal from '@components/Modals/RejectedFamilyEventModal';
import ShowRejectReasonModal from '@components/Modals/ShowRejectReasonModal';
import UpdateAdminModal from '@components/Modals/UpdateAdminModal';
import UpdateNoticeModal from '@components/Modals/UpdateNoticeModal';
import UpdateSurveyModal from '@components/Modals/UpdateSurveyModal';

function ModalManager() {
  const { openedModals } = useSelector((state: RootState) => state.modals);

  return (
    <Suspense>
      {openedModals.map(({ name, props }) => {
        return (
          <Fragment key={name}>
            {(() => {
              switch (name) {
                case 'approveFamilyEvent': {
                  return <ApproveFamilyEventModal {...props} />;
                }
                case 'createAdmins': {
                  return <CreateAdminsModal />;
                }
                case 'createAssociation': {
                  return <CreateAssociationModal />;
                }
                case 'createAssociationMembers': {
                  return <CreateAssociationMembersModal {...props} />;
                }
                case 'createNoticeCategory': {
                  return <CreateNoticeCategoryModal />;
                }
                case 'createOrganization': {
                  return <CreateOrganizationModal {...props} />;
                }
                case 'createPushCategory': {
                  return <CreatePushCategoryModal />;
                }
                case 'createMember': {
                  return <CreateMemberModal />;
                }
                case 'createMembers': {
                  return <CreateMembersModal />;
                }
                case 'createVideo': {
                  return <CreateVideoModal />;
                }
                case 'deleteAdminConfirm': {
                  return <DeleteAdminConfirmModal {...props} />;
                }
                case 'editCategory': {
                  return <EditPushCategoryModal />;
                }
                case 'editNoticeCategory': {
                  return <EditNoticeCategoryModal />;
                }
                case 'failedPushList': {
                  return <FailedPushListModal {...props} />;
                }
                case 'moveAssociationMembers': {
                  return <MoveAssociationMembersModal {...props} />;
                }
                case 'moveOrganizationMembers': {
                  return <MoveOrganizationMembersModal {...props} />;
                }
                case 'pushResult': {
                  return <PushResultModal {...props} />;
                }
                case 'pushTestSend': {
                  return <PushTestSendModal {...props} />;
                }
                case 'rejectedFamilyEvent': {
                  return <RejectedFamilyEventModal {...props} />;
                }
                case 'showRejectReason': {
                  return <ShowRejectReasonModal {...props} />;
                }
                case 'updateAdmin': {
                  return <UpdateAdminModal {...props} />;
                }
                case 'updateNotice': {
                  return <UpdateNoticeModal {...props} />;
                }
                case 'updateSurvey': {
                  return <UpdateSurveyModal {...props} />;
                }
                default: {
                  return <></>;
                }
              }
            })()}
          </Fragment>
        );
      })}
    </Suspense>
  );
}

export default ModalManager;
