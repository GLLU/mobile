import RNFetchBlob from 'react-native-fetch-blob'

const {fs} = RNFetchBlob;

export const downloadAsBase64 = (uri) => {
  return new Promise((resolve, reject) => {
    let imagePath = null;
    RNFetchBlob
      .config({
        fileCache: true
      })
      .fetch('GET', uri)
      // the image is now dowloaded to device's storage
      .then((res) => {
        // the image path you can use it directly with Image component
        imagePath = res.path();
        return res.readFile('base64')
      })
      .then((base64Data) => {
        // here's base64 encoded image
        resolve(base64Data);
        // remove the file from storage
        fs.unlink(imagePath);
      })
      .catch(reject);
  });
};