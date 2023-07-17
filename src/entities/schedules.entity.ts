import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import RealEstate from "./realEstate.entity";
import User from "./users.entity";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({type:"date"})
  date: string | Date;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(()=>RealEstate, realEstate=>realEstate.schedules)
  realEstate:RealEstate

  @ManyToOne(()=>User, user=>user.schedules)
  user:User
}

export default Schedule;