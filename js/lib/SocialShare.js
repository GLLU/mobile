import Share from 'react-native-share';
import { ShareDialog } from 'react-native-fbsdk';
import Config from 'react-native-config';

class SocialShare {
  share(type = 'others', options = {}) {
    switch(type) {
      case 'facebook':
          this._shareFacebook();
        break;
      default:
        this._shareOthers(options);
        break;
    }
  }

  _handleShareSuccessful(result) {
    if (result.isCancelled) {
      console.log('Share cancelled');
    } else {
      console.log('Share success with postId: ' + result.postId);
    }
  }

  _shareOthers() {
    Share.open({
      message: 'Check out GLLU - Fashion that fits',
      url: Config.HOME_PAGE,
      title: 'Share your GLLU item',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
    })
    .then(this._handleShareSuccessful)
    .catch((error) => {
      console.log('Share fail with error: ', error);
    });
  }

  _shareFacebook() {
    const options = {
      url: Config.HOME_PAGE,
      message: 'Check out GLLU - Fashion that fits',
      social: 'facebook',
    };
    Share.shareSingle(options).catch((err) => {
      if (err) {
        console.log('facbeook share err', err, options);
        this._shareFacebookWeb(options);
      }
    });
  }

  _shareFacebookWeb(options) {
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: options.url,
      contentDescription: options.message,
    };

    ShareDialog.canShow(shareLinkContent).then((canShow) => {
      if (canShow) {
        return ShareDialog.show(shareLinkContent);
      }
    })
    .then(this._handleShareSuccessful)
    .catch(error => {
      alert('Share fail with error: ' + error);
    });
  }
}

export default new SocialShare();