export type FishListDto = {
  id: number;
  name: string;
};

export type FishCountDto = {
  totalFishes: number;
};

export type FishDto = {
  fishList: Array<FishListDto>;
  fishCounts: FishCountDto;
};
