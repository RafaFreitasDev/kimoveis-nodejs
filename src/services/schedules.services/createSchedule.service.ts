import { And, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import {
  TScheduleRequest,
} from "../../interfaces/schedules.interfaces";
import { AppError } from "../../error";

export const createScheduleService = async (
  scheduleData: TScheduleRequest,
  userId: number
): Promise<Schedule> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const property = await realEstateRepository.findOneBy({
    id: scheduleData.realEstateId,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!property) {
    throw new AppError("RealEstate not found", 404);
  }

  if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(scheduleData.hour)) {
    const horaMin = "08:00";
    const horaMax = "18:00";

    const horaInserida = new Date(`2000-01-01 ${scheduleData.hour}`);
    const horaLimiteMin = new Date(`2000-01-01 ${horaMin}`);
    const horaLimiteMax = new Date(`2000-01-01 ${horaMax}`);

    if (horaInserida >= horaLimiteMin && horaInserida <= horaLimiteMax) {
      scheduleData.date = scheduleData.date;
    } else {
      throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
    }
  }

  const dataInserida = new Date(scheduleData.date);

  if (dataInserida.getDay() === 6 || dataInserida.getDay() === 0) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const findDate = scheduleData.realEstateId;
  const findHour = scheduleData.hour;
  const realEstateId = property.id
  

  const findScheduleSamePropertyAndDateAndTime: Schedule | null =
    await scheduleRepository
      .createQueryBuilder("sch")
      .where("sch.date = :findDate", { findDate })
      .where("sch.hour = :findHour", { findHour })
      .where("sch.realEstateId = :realEstateId", { realEstateId })
      .getOne();

  if (findScheduleSamePropertyAndDateAndTime) {
    throw new AppError("Schedule to this real estate at this date and time already exists", 409);
  }

  const findScheduleSameUserAndDateAndTime: Schedule | null =
    await scheduleRepository
      .createQueryBuilder("sch")
      .where("sch.date = :findDate", { findDate })
      .where("sch.hour = :findHour", { findHour })
      .where("sch.userId = :userId", { userId })
      .getOne();

  if (findScheduleSameUserAndDateAndTime) {
    throw new AppError("User schedule to this real estate at this date and time already exists", 409);
  }

  const scheduleRepositoryData = {
    date: scheduleData.date,
    hour: scheduleData.hour,
    realEstate: property,
    user: user!,
  };

  const schedule: Schedule = scheduleRepository.create(scheduleRepositoryData);
  await scheduleRepository.save(schedule);

  return schedule;
};
