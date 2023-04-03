interface TagsProps {
  selected: { key: number; name: string }[];
  deselect: (key: number) => void;
  deselectAll: () => void;
}

export type { TagsProps };
