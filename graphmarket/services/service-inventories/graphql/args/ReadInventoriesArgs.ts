import { ArgsType } from 'type-graphql';
import { Inventory } from '@libs/entities';
@ArgsType()
export class ReadInventoriesArgs implements Partial<Inventory> {}
