import { Movie } from "./movie";

export type ReleaseScheduleData = {
  [key: string]: any;
  monday: ReleaseSchedule[];
  thursday: ReleaseSchedule[];
  wednesday: ReleaseSchedule[];
  tuesday: ReleaseSchedule[];
  friday: ReleaseSchedule[];
  saturday: ReleaseSchedule[];
  sunday: ReleaseSchedule[];
};

export type ReleaseSchedule = {
  [key: string]: any;
  id?: string;
  type: string;
  day: string;
  movie: Movie;
};
