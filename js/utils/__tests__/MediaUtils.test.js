// @flow

import { isVideo } from '../MediaUtils';

jest.mock('react-native-fetch-blob', () => ({
  DocumentDir: () => {
  },
  polyfill: () => {
  },
}));

// Tests for isVideo function
describe('isVideo util', () => {
  const videoPath = 'martin.mp4';
  const imagePath = 'martin.jpg';
  const audioPath = 'martin.mp3';


  test(' video type', () => {
    expect(isVideo(videoPath)).toBeTruthy();
  });

  test(' image type', () => {
    expect(isVideo(imagePath)).toBeFalsy();
  });

  test(' audio type', () => {
    expect(isVideo(audioPath)).toBeFalsy();
  });
});
