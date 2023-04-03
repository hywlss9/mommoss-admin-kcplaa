import type { CreateBannerData } from '@api/banner/createBanner';

type BannerData = CreateBannerData & { file: File | null };

type BannerDataKey = keyof BannerData;

export type { BannerData, BannerDataKey };
