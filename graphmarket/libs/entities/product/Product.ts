import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Directive, Field, GraphQLTimestamp, ObjectType } from 'type-graphql';
import { GraphQLID, GraphQLNonEmptyString, GraphQLURL } from '@libs/graphql';

@Entity('product')
@ObjectType('Product')
@Directive(`@key(fields: "id")`)
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  @Field(() => GraphQLID, { description: `Product's identifier` })
  id!: string;

  @Column({ length: 256 })
  @Field(() => GraphQLNonEmptyString, { description: `Product's name` })
  name!: string;

  @Column({ length: 512, nullable: true, default: undefined })
  @Field(() => GraphQLNonEmptyString, { nullable: true, description: `Product's description` })
  description?: string;

  @Column({ length: 512, nullable: true, default: undefined })
  @Field(() => GraphQLURL, { description: `Product's image` })
  image!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', update: false })
  @Field(() => GraphQLTimestamp, { description: `Product's creation timestamp` })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  @Field(() => GraphQLTimestamp, { description: `Product's last updated timestamp` })
  updatedAt!: Date;
}
