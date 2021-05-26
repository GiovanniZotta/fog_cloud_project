import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Directive, Field, GraphQLTimestamp, ObjectType } from 'type-graphql';
import { GraphQLID, GraphQLNonEmptyString } from '@libs/graphql';
import { Product } from '../product';

@Entity('review')
@ObjectType('Review')
@Directive(`@key(fields: "id")`)
export class Review {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  @Field(() => GraphQLID, { description: `Review identifier` })
  id!: string;

  @Column({ length: 64, default: undefined })
  @Field(() => GraphQLNonEmptyString, { description: `Review title` })
  title!: string;

  @Column({ length: 256, nullable: true, default: undefined })
  @Field(() => GraphQLNonEmptyString, { nullable: true, description: `Review body` })
  body?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', update: false })
  @Field(() => GraphQLTimestamp, { description: `Review creation timestamp` })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  @Field(() => GraphQLTimestamp, { description: `Review last updated timestamp` })
  updatedAt!: Date;

  @ManyToOne(() => Product, (product) => product.reviews, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @RelationId((review: Review) => review.product)
  @Field(() => GraphQLID, { description: `Review product identifier` })
  productId!: string;
}
