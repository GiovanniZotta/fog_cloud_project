import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { Inventory } from '@libs/entities';
import { InventoryUpdateInput } from '../graphql/inputs';
import { ReadInventoriesArgs } from '../graphql/args';
import { InventoryRepository } from '../repositories';
import { logger } from '../logger';

@Service()
export class InventoryService {
  @InjectRepository()
  private readonly inventoryRepository!: InventoryRepository;

  @Transactional({ propagation: Propagation.REQUIRED })
  public async create(
    inventory: Pick<Inventory, 'productId' | 'weight' | 'price' | 'quantity'>,
  ): Promise<Inventory> {
    const newInventory: Inventory = await this.inventoryRepository.create(inventory);

    logger.info(`Created inventory ${newInventory.productId}`);

    return newInventory;
  }

  @Transactional({ propagation: Propagation.SUPPORTS })
  public readOneById(id: string): Promise<Inventory | undefined> {
    return this.inventoryRepository.readOneById(id);
  }

  @Transactional({ propagation: Propagation.SUPPORTS })
  public async read(options: ReadInventoriesArgs): Promise<Inventory[]> {
    const test = await this.inventoryRepository.read(options);
    return test;
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  public async update(id: string, inventory: InventoryUpdateInput): Promise<Inventory> {
    const inventoryUpdated: Inventory = await this.inventoryRepository.update(id, inventory);

    logger.info(`Updated inventory ${id}`);

    return inventoryUpdated;
  }

  @Transactional({ propagation: Propagation.REQUIRED })
  public async delete(id: string): Promise<Inventory> {
    const inventory: Inventory = await this.inventoryRepository.delete(id);

    logger.info(`Deleted inventory ${id}`);

    return inventory;
  }
}
