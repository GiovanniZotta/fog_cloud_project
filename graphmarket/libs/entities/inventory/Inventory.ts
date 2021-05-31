import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Directive, Field, GraphQLTimestamp, ObjectType } from 'type-graphql';
import {
  GraphQLID,
  GraphQLNonNegativeInt,
  GraphQLPositiveInt,
  GraphQLUSCurrency,
} from '@libs/graphql';
import { Product } from '../product';

@Entity('inventory')
@Check(`"weight" > 0`)
@Check(`"price" > 0`)
@Check(`"quantity" >= 0`)
@ObjectType('Inventory')
@Directive(`@key(fields: "productId")`)
export class Inventory {
  @OneToOne(() => Product, { primary: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Index()
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @RelationId((inventory: Inventory) => inventory.product)
  @Field(() => GraphQLID, { description: `Inventory identifier which is the product identifier` })
  productId!: string;

  @Column()
  @Field(() => GraphQLNonNegativeInt, { description: `Product quantity` })
  quantity!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', update: false })
  @Field(() => GraphQLTimestamp, { description: `Inventory creation timestamp` })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  @Field(() => GraphQLTimestamp, { description: `Inventory last updated timestamp` })
  updatedAt!: Date;
}
