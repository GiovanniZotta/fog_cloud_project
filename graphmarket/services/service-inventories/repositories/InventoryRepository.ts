import { AbstractRepository, EntityRepository } from 'typeorm';
import { Inventory } from '@libs/entities';
import { InventoryUpdateInput } from '../graphql/inputs';
import { ReadInventoriesArgs } from '../graphql/args';

@EntityRepository(Inventory)
export class InventoryRepository extends AbstractRepository<Inventory> {
  public create(
    inventory: Pick<Inventory, 'productId' | 'weight' | 'price' | 'quantity'>,
  ): Promise<Inventory> {
    return this.repository.save({
      product: { id: inventory.productId },
      price: inventory.price,
      quantity: inventory.quantity,
      weight: inventory.weight,
    });
  }

  public readOneById(id: string): Promise<Inventory | undefined> {
    return this.repository.findOne(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public read(_options: ReadInventoriesArgs = {}): Promise<Inventory[]> {
    return this.repository.find();
  }

  public async update(id: string, inventory: InventoryUpdateInput): Promise<Inventory> {
    // Check if inventory exists
    await this.repository.findOneOrFail(id);

    // Update and return
    return this.repository.save({
      product: { id },
      ...(inventory.price && { price: inventory.price }),
      ...(inventory.quantity && { quantity: inventory.quantity }),
      ...(inventory.weight && { weight: inventory.weight }),
    });
  }

  public async delete(id: string): Promise<Inventory> {
    // Check if inventory exists
    const inventory: Inventory = await this.repository.findOneOrFail(id);

    // Delete
    await this.repository.delete(id);

    // Return deleted inventory
    return inventory;
  }
}
