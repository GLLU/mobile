import { find } from "lodash";
import {Image} from 'react-native';
import * as userMapper from "./userMapper";
import { serializeItems } from './itemMapper';

const getCoverByMediaType = (type, coverList) => {
  if (type === 'video') {
    return find(coverList, x => x.version === 'large_720');
  }
  const cover = find(coverList, x => x.version === 'tiny');
  Image.prefetch(cover.url);
  return cover;
};

export function serializeLook(look) {
  const cover = getCoverByMediaType(look.cover.type,look.cover.list);
  return {
    liked: look.is_liked,
    description: look.description,
    uri: cover.url ? cover.url : null,
    mediumSizeUri: look.cover.type === 'video' ? null : find(look.cover.list, x => x.version === 'medium').url,
    width: cover ? cover.width : null,
    height: cover ? cover.height : null,
    coverType: look.cover.type,
    likes: look.likes,
    comments: look.comments,
    id: look.id,
    isFavorite: look.is_favorite,
    user: look.user,
  }
}

export function serializeLooks(looks) {
  const looksWithCover = _.filter(looks, (look) => look.cover ? look : null)
  return _.map(looksWithCover, look => serializeLook(look));
}
