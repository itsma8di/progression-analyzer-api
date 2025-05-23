import { Model, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import { ICrudDB } from "../types/ICrudDB";

class CrudDBBase<T> implements ICrudDB<T> {
  constructor(private model: Model<T>) {}
  async create(data: T): Promise<T> {
    try {
      const newData = await this.model.create(data);
      return newData;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async read<ID = string | number>(id: ID): Promise<T> {
    try {
      const readData = await this.model.findById(id);
      return readData as T;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async readByQuery(query: FilterQuery<T>): Promise<T[]> {
    try {
      const readData = await this.model.find(query);
      return readData as T[];
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async readAll(): Promise<T[]> {
    try {
      const readData = await this.model.find();
      return readData as T[];
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async update<ID = string | number>(id: ID, data: Partial<T>): Promise<T> {
    try {
      const updateData = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updateData as T;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async updateByQuery(query: UpdateQuery<T>, data: Partial<T>): Promise<T> {
    try {
      const updateData = await this.model.updateMany(query, data);
      return updateData as T;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async updateOneByQuery(
    query: UpdateQuery<T>,
    data: Partial<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    try {
      const updateData = await this.model.findOneAndUpdate(query, data, {
        new: options?.new || true,
      });
      return updateData as T;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async delete<ID = string | number>(id: ID): Promise<T> {
    try {
      const deleteData = await this.model.findByIdAndDelete(id);
      return deleteData as T;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async deleteByQuery(query: FilterQuery<T>): Promise<T> {
    try {
      const deleteData = await this.model.deleteMany(query);
      return deleteData as T;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async deleteByOne(query: FilterQuery<T>): Promise<T> {
    try {
      const deleteData = await this.model.findOneAndDelete(query);
      return deleteData as T;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  getModel(): Model<T> {
    return this.model;
  }
}

export default CrudDBBase;
