import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Directive, Field, GraphQLTimestamp, ObjectType } from 'type-graphql';
import {
  GraphQLID,
  GraphQLNonEmptyString,
  GraphQLPositiveInt,
  GraphQLURL,
  GraphQLUSCurrency,
} from '@libs/graphql';
import { Review } from '../review';
import { Inventory } from '../inventory';

@Entity('product')
@ObjectType('Product')
@Directive(`@key(fields: "id")`)
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  @Field(() => GraphQLID, { description: `Product identifier` })
  id!: string;

  @Column({ length: 256 })
  @Field(() => GraphQLNonEmptyString, { description: `Product name` })
  name!: string;

  @Column({ length: 512, nullable: true, default: undefined })
  @Field(() => GraphQLNonEmptyString, { nullable: true, description: `Product description` })
  description?: string;

  @Column({ length: 512, nullable: true, default: undefined })
  @Field(() => GraphQLURL, { nullable: true, description: `Product image` })
  image?: string;

  @Column()
  @Field(() => GraphQLPositiveInt, { description: `Product weight in grams` })
  weight!: number;

  @Column()
  @Field(() => GraphQLUSCurrency, { description: `Product price in cents` })
  price!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', update: false })
  @Field(() => GraphQLTimestamp, { description: `Product creation timestamp` })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  @Field(() => GraphQLTimestamp, { description: `Product last updated timestamp` })
  updatedAt!: Date;

  @OneToOne(() => Inventory, (inventory) => inventory.product)
  inventory!: Inventory;

  @RelationId((product: Product) => product.inventory)
  inventoryId!: string;

  @OneToMany(() => Review, (review) => review.product)
  reviews!: Review[];

  @RelationId((product: Product) => product.reviews)
  reviewsIds!: string[];
}
