import Container from 'typedi';
import { Inventory } from '@libs/entities';
import { InventoryService } from '../../services';

const inventoryService: InventoryService = !process.env.SCRIPT_GEN_GRAPHQL
  ? Container.get(InventoryService)
  : (undefined as unknown as InventoryService);

export async function resolveInventoryReference(
  reference: Pick<Inventory, 'productId'>,
): Promise<Inventory | undefined> {
  return inventoryService.readOneById(reference.productId);
}
