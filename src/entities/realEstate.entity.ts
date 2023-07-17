import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn,  ManyToOne, OneToMany } from "typeorm";
import Address from "./addresses.entity";
import Category from "./categories.entity";
import Schedule from "./schedules.entity";

@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type:"boolean", default:false })
  sold: boolean;

  @Column({ type:"decimal", precision:12, scale:2, default:0 })
  value: number | string;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn({ type: "date" })
  createdAt: string | null | undefined;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string | null | undefined;

  @OneToOne(()=>Address, (address)=>address.realState)
  @JoinColumn()
  address:Address

  @ManyToOne(()=>Category, (category)=>category.realEstate)
  category:Category

  @OneToMany(()=>Schedule, schedule=>schedule.realEstate)
  schedules:Schedule[]
}

export default RealEstate;