import { useEffect, useState } from 'react';

import type { components } from '@type/model';

type Member = components['schemas']['GroupMember$fHAmNkAPk0-687kF9K8QAA'];

function useIsDiligence(member: Member) {
  const [isDiligence, setIsDiligence] = useState<boolean>(false);

  useEffect(() => {
    const outstandingMonth = member.user?.kcplaaMember?.outstandingMonth;
    const payEntranceFee = member.user?.kcplaaMember?.payEntranceFee;

    const result = typeof outstandingMonth === 'number' && outstandingMonth < 6 && !!payEntranceFee;

    setIsDiligence(result);
  }, [member]);

  return isDiligence;
}

export default useIsDiligence;
