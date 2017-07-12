

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