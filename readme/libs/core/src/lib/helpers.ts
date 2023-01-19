import {plainToInstance, ClassConstructor} from 'class-transformer';
import {extname} from 'path';
import * as crypto from 'crypto';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export const editFileName = (req, file, callback) => {
  const fileName = crypto.randomUUID();
  const fileExtName = extname(file.originalname);
  callback(null, `${fileName}${fileExtName}`);
};
