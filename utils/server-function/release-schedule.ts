import { prisma } from "@/prisma/prisma-client";
import { ReleaseScheduleData } from "@/types/release-schedule";
import { getPrismaJson } from "./global";

export const getReleaseSchedule = async () => {
  try {
    const result = await prisma.releaseSchedule.findMany({
      include: {
        movie: {
          include: {
            season: {
              include: {
                movie: true,
                episode: true,
              },
            },
          },
        },
      },
    });
    let finalResult: ReleaseScheduleData = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    for await (let schedule of result) {
      finalResult = {
        ...finalResult,
        [schedule.day]:
          finalResult[schedule.day].length > 0
            ? [...finalResult[schedule.day], schedule]
            : [schedule],
      };
    }
    return getPrismaJson(finalResult);
  } catch (err) {
    throw new Error("getReleaseSchedule Error~");
  }
};
