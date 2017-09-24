import { Share } from 'react-native';

function _shareTextNative(shareData) {
  Share.share({
    message: shareData.text,
    url: shareData.url,
    title: 'inFash'
  }, {
    dialogTitle: 'Share inFash',
    excludedActivityTypes: [/*here we can exclude sharing options on ios*/]
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