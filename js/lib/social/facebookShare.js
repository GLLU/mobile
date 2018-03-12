import { ShareDialog } from 'react-native-fbsdk';

function _shareFacebook(shareData) {
  const options = mapShareDataToOptions(shareData);
  const shareLinkContent = {
    contentType: 'link',
    contentUrl: options.url,
    contentDescription: options.message,
  };

  ShareDialog.canShow(shareLinkContent).then((canShow) => {
    if (canShow) {
      return ShareDialog.show(shareLinkContent);
    }
  }).then((result) => {
    var logText = result.isCancelled ? 'Share cancelled' : `Share success with postId: ${result.postId}`;
  }).catch(error => {
  });
}

function mapShareDataToOptions(shareData) {
  return {
    url: shareData.url,
    message: shareData.text,
    social: 'facebook',
  };
}

export default _shareFacebook;