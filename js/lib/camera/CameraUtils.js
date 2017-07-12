import {NativeModules} from 'react-native';
const {CameraUtils} = NativeModules;


async function openCamera(allowVideo: boolean  = true) {
  console.log('12345666')
    return CameraUtils.openCamera(allowVideo);
}

async function takePicture(){
  const path = await openCamera(false);
  if(path){
    const formattedPath=path.replace('file://', '');
    return {
      path : formattedPath,
      type : 'multipart/form-data'
    }
  }
}

async function takeMedia() {
  const path= await openCamera(true);
  if(path){
    const formattedPath=path.replace('file://', '');
    return {
      type : path.search(".mp4") > -1 ? 'look[video]' : 'look[image]',
      localPath : path,
      path : formattedPath
    };
  }
}

export {openCamera, takePicture,takeMedia};