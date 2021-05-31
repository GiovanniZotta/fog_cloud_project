import Container from 'typedi';
import { Inventory } from '@libs/entities';
import { Product } from '../../entities';
import { InventoryService } from '../../services';

const inventoryService: InventoryService = !process.env.SCRIPT_GEN_GRAPHQL
  ? Container.get(InventoryService)
  : (undefined as unknown as InventoryService);

export async function resolveProductReference(
  reference: Pick<Product, 'id' | 'price' | 'weight'>,
): Promise<Product | undefined> {
  const inventory: Inventory | undefined = await inventoryService.readOneById(reference.id);

  if (!inventory) return undefined;

  return Object.assign(new Product(), <Product>{
    id: reference.id,
    price: reference.price,
    weight: reference.weight,
    quantity: inventory.quantity,
  });
}
