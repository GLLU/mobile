// @flow
import { Platform } from 'react-native';

export function formatAvatar(path: string): any {

  if (path) {
    const formattedPath = Platform.OS === 'ios' ? path.replace('file://', '') : path;

    return {
      path: formattedPath,
      type: 'multipart/form-data',
    };
  }
}

export function formatLook(path: string): any {
  if (path) {
    const formattedPath = path.replace('file://', '');
    return {
      type: path.search('.mp4') > -1 ? 'look[video]' : 'look[image]',
      localPath: path,
      path: formattedPath,
    };
  }
}
