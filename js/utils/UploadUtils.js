

export function formatAvatar(path){
  if(path){
    const formattedPath=path.replace('file://', '');
    return {
      path : formattedPath,
      type : 'multipart/form-data'
    }
  }
}

export function formatLook(path) {
  if(path){
    const formattedPath=path.replace('file://', '');
    return {
      type : path.search(".mp4") > -1 ? 'look[video]' : 'look[image]',
      localPath : path,
      path : formattedPath
    };
  }
}

export function convertDataURIToBinary(base64) {
  const raw = window.atob(base64);
  const rawLength = raw.length;
  let array = new Uint8Array(new ArrayBuffer(rawLength));

  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}