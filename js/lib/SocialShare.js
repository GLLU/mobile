import Share from 'react-native-share';
import { ShareDialog } from 'react-native-fbsdk';
import Config from 'react-native-config';

class SocialShare {
  share(type) {
    switch(type) {
      case 'facebook':
          this._shareFacebook();
        break;
      default:
        console.log('invalid type');
        break;
    }
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
    }).then((result) => {
      if (result.isCancelled) {
        console.log('Share cancelled');
      } else {
        console.log('Share success with postId: ' + result.postId);
      }
    }).catch(error => {
      alert('Share fail with error: ' + error);
    });
  }
}

export default new SocialShare();