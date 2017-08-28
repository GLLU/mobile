// @flow

import { schema } from 'normalizr';

const userPreProcessor=(entity)=> {
  const newEntity={
    ...entity,
    userId:entity.user
  };
  delete newEntity.user;
  return newEntity;
};

const user = new schema.Entity('users', {}, { idAttribute: 'id' });

export const lookSchema = new schema.Entity('looks', {userId:user}, {
  processStrategy: userPreProcessor,
});
