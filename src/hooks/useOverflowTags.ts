import { useEffect, useState } from 'react';

function useOverflowTags(uuid: string): [boolean, number] {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [showTagCount, setShowTagCount] = useState<number>(0);

  useEffect(() => {
    const container = document.querySelector(`.tags_container__${uuid}`);
    const countBox = document.querySelector(`.tags_count-box__${uuid}`);
    const tagBox = document.querySelector(`.tags_box__${uuid}`);

    if (!container || !countBox || !tagBox) return;

    const tags = tagBox.children;
    const width = container.clientWidth - countBox.clientWidth - 22;
    const tagsWidth = tagBox.clientWidth + 50;

    if (width <= tagsWidth) {
      setIsOverflow(true);
      setShowTagCount(tags.length);
      return;
    }

    return () => {
      setIsOverflow(false);
      setShowTagCount(0);
    };
  });

  return [isOverflow, showTagCount];
}

export default useOverflowTags;
