import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { Inventory } from '@libs/entities';
import { GraphQLID } from '@libs/graphql';
import { InventoryService } from '../../services';
import { InventoryUpdateInput } from '../inputs';
import { ReadInventoriesArgs } from '../args';

@Resolver(Inventory)
@Service()
export class InventoryResolver {
  @Inject()
  private readonly inventoryService!: InventoryService;

  @Query(() => Inventory, {
    nullable: true,
    description: `Return the inventory that matches the id`,
  })
  inventory(@Arg('id', () => GraphQLID) id: string): Promise<Inventory | undefined> {
    return this.inventoryService.readOneById(id);
  }

  @Query(() => [Inventory], { description: `Return all inventories` })
  inventories(@Args() args: ReadInventoriesArgs): Promise<Inventory[]> {
    return this.inventoryService.read(args);
  }

  @Mutation(() => Inventory, { description: `Update the inventory` })
  updateInventory(
    @Arg('id', () => GraphQLID) id: string,
    @Arg('data', () => InventoryUpdateInput) data: InventoryUpdateInput,
  ): Promise<Inventory> {
    return this.inventoryService.update(id, data);
  }
}
