import type { GetFamiyEventResponse } from '@api/event/getFamilyEvent';

interface ApproveFamilyEventModalProps {
  event: GetFamiyEventResponse;
  radioOptions: radioOptions[];
}

interface radioOptions {
  disabled: boolean;
  label: string;
  value: string;
}

export type { ApproveFamilyEventModalProps, radioOptions };
