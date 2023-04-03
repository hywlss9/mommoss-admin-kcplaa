import type { GetFamilyEventResponse } from '@api/event/getFamilyEvent';

interface ApproveFamilyEventModalProps {
  event: GetFamilyEventResponse;
  radioOptions: radioOptions[];
}

interface radioOptions {
  disabled: boolean;
  label: string;
  value: string;
}

export type { ApproveFamilyEventModalProps, radioOptions };
