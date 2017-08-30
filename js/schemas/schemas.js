// @flow

import { schema } from 'normalizr';

const userPreProcessor = (entity, key = 'userId', value = 'user', shouldDeleteValue = true) => {
  const newEntity = {
    ...entity,
    [key]: entity[value],
  };
  if (shouldDeleteValue) {
    delete newEntity[value];
  }
  return newEntity;
};

export const userSchema = new schema.Entity('users', {}, { idAttribute: 'id' });

export const lookSchema = new schema.Entity('looks', { userId: userSchema }, {
  processStrategy: entity => userPreProcessor(entity),
});

export const followeeSchema = new schema.Entity('follows', { followeeId: userSchema, userId: userSchema }, {
  processStrategy: (entity) => {
    const followeePreprocessedEntity = userPreProcessor(entity, 'followeeId', 'followee');
    return userPreProcessor(followeePreprocessedEntity);
  },
});

export const notificationSchema = new schema.Entity('notifications', { initiatorId: userSchema, userId: userSchema }, {
  processStrategy: (entity) => {
    const notificationPreprocessedEntity = userPreProcessor(entity, 'initiatorId', 'initiator');
    return userPreProcessor(notificationPreprocessedEntity);
  },
});


export const commentSchema = new schema.Entity('comments', { userId: userSchema }, {
  processStrategy: entity => userPreProcessor(entity),
});

export const blockedSchema = new schema.Entity('blockedUsers', { userId: userSchema }, {
  processStrategy: entity => userPreProcessor(entity),
});

export const userLikeSchema = new schema.Entity('likes', { userId: userSchema }, {
  processStrategy: entity => userPreProcessor(entity),
});
