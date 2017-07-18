import { find } from "lodash";
import {Image} from 'react-native';
import * as userMapper from "./userMapper";

const getCoverByMediaType = (type, coverList) => {
  if (type === 'video') {
    return find(coverList, x => x.version === 'large_720');
  }
  const cover = find(coverList, x => x.version === 'medium');
  Image.prefetch(cover.url);
  return cover;
};

export function serializeLook(look) {
  const cover = getCoverByMediaType(look.cover.type,look.cover.list);
  return {
    liked: look.is_liked,
    type: look.user_size.body_type,
    uri: cover.url ? cover.url : null,
    width: cover ? cover.width : null,
    height: cover ? cover.height : null,
    coverType: look.cover.type,
    preview: look.cover.thumbnail_url || '',
    ...userMapper.map(look.user),
    ...look,
  }
}

export function serializeLooks(looks) {
  return _.map(looks, look => serializeLook(look));
}
