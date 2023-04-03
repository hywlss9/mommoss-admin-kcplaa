/**
 * Get\<T\> T가 배열일 경우 배열을 벗긴 타입을 return
 */
type Get<T> = T extends (infer U)[] ? U : never;

/**
 * server model header에서 'x-group-id'를 제외하고 return
 */
type OmitGroupIdInHeader<T> = Omit<T, 'x-group-id'>;

/**
 * \<NavMenu \\>의 key type을 넣으면 나머지를 return
 */
type NavMenuItems<T> = { key: T; label: string; badge?: number }[];

export type { Get, OmitGroupIdInHeader, NavMenuItems };
