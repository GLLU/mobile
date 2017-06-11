import { find } from "lodash";
import {Image} from 'react-native';

const getCoverByMediaType = (type, coverList) => {
  if (type === 'video') {
    return find(coverList, x => x.version === 'large_720');
  }
  const cover = find(coverList, x => x.version === 'medium');
  Image.prefetch(cover.url);
  return cover;
};

export function map(look) {
  const cover = getCoverByMediaType(look.cover.type,look.cover.list);
  return {
    liked: look.is_liked,
    type: look.user_size.body_type,
    uri: cover.url ? cover.url : null,
    width: cover ? cover.width : null,
    height: cover ? cover.height : null,
    coverType: look.cover.type,
    avatar: look.user.avatar,
    name: look.user.name,
    username: look.user.username,
    about_me: look.user.about_me,
    ...look
  }
}


