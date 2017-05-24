import { Image } from 'react-native';
import * as _ from 'lodash';
import * as selfRef from './MediaUtils'

export default selfRef

const loadersArr = ['#e1f7d5', '#ffbdbd', '#c9c9ff', '#f1cbff', '#f6dbdb', '#f2e3c6', '#d3ece1', '#c2eec7', '#eed2e8', '#4e4e56', '#da635d', '#dcd0c0', '#b1938b', '#06b8d2', '#98f2e1']

export const getLoaderImage = () => loadersArr[Math.floor(Math.random() * loadersArr.length)];

export const isVideo = (path) => {
  const fileTypesArr = ['.jpg', '.png']
  let type;
  for (let i = 0; i < fileTypesArr.length; i++) {
    type = path.search(fileTypesArr[i]) > -1;
    if (type) {
      return false
    }
  }
  return true
}

export const preloadLookImages = (looks) => {
  const coverUrls = looks.map(look => look.cover.type === "image" ? _.find(look.cover.list, x => x.version === 'medium').url : _.find(look.cover.list, x => x.version === 'large_720').url);
  return preloadImages(coverUrls);
}

export const preloadImages = (urls) => {
  return Promise.all(
    urls.map(url => {
      if (url.search(".mp4") > -1) {
        return url
      } else {
        return Image.prefetch(url)
      }
    })
  );
}