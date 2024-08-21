import {
  Repository,
  DataSource,
  ObjectLiteral,
  EntityTarget,
  DeepPartial,
  FindManyOptions,
} from 'typeorm';
import { processError } from './constants';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(
    private readonly entityTarget: EntityTarget<T>,
    protected readonly dataSource: DataSource,
  ) {
    super(entityTarget, dataSource.createEntityManager());
  }

  async findAllGeneric(options?: FindManyOptions<T>): Promise<T[]> {
    return this.find(options);
  }

  async removeGeneric(id: string) {
    try {
      const entity = await this.findGeneric({ id });
      if (entity) {
        await this.remove(entity);

        return id;
      }

      throw new Error('404');
    } catch (error) {
      processError(error, 'Object');
    }
  }

  async updateGeneric(id: string, updateEntityDto: DeepPartial<T>) {
    try {
      const entity = await this.findGeneric({ id });

      if (!entity) throw new Error('404');

      const updatedEntity = { ...entity, ...updateEntityDto };

      return await this.save(updatedEntity);
    } catch (error) {
      processError(error, 'Object');
    }
  }

  /**
   * Where object must follow this structure:
   *
   * *To find by object ID and user ID use this structure*
   *
   * ```js
   * {
   *   id: id,
   *   user: { id: userId },
   * };
   * ```
   *
   * *To find by object ID only use this structure:*
   *
   * ```js
   * { id };
   * ```
   *
   * @param where - where clause
   * @returns - Found entity
   */
  async findGeneric(where: any): Promise<T | null> {
    return await this.findOne({
      where,
    });
  }

  /**
   *
   * @returns - Found rows of entity
   */
  async findAll() {
    return await this.find();
  }
}
