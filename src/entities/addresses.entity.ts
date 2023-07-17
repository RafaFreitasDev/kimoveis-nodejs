import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from "typeorm";
import RealEstate from "./realEstate.entity";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  street: string;

  @Column({ type: "varchar", length: 8 })
  zipCode: string;

  @Column({ type: "varchar", length: 7, nullable: true })
  number?: string | null | undefined;
  
  @Column({ type: "varchar", length: 120 })
  city: string;
  
  @Column({ type: "varchar", length: 2 })
  state: string;

  @OneToOne(()=>RealEstate, (realEstate) => realEstate.address)
  realState:RealEstate
}

export default Address;
