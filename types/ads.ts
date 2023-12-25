export type Ads = {
  [key: string]: any;
  id?: string;
  name: string;
  url: string;
  bannerUrl: string;
  sequence: number;
  type: "half" | "full";
};
