import {ClassConstructor, plainToInstance} from 'class-transformer';

export function fillObject<T, V>(dto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(dto, plainObject, {excludeExtraneousValues: true});
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

