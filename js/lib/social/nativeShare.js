import Share from 'react-native-share';

function _shareTextNative(shareData) {
  Share.open({
    message: shareData.text,
    url: shareData.url,
    title: 'inFash'
  })
    .then(this._logResult)
    .catch((error) => console.log(`error: ${ error.message }`));
}

function _logResult(result) {
  if (result.action === Share.sharedAction) {
  }
  else {
    if (result.action === Share.dismissedAction) {
    }
  }
}

export default _shareTextNative;