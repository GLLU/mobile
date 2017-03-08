import {Share} from 'react-native';
import { ShareDialog } from 'react-native-fbsdk';
import Config from 'react-native-config';

class SocialShare {

    share() {
        this._shareText();
    }

  shareSpecific(type) {
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
        console.log('facbeook shareSpecific err', err, options);
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
      var logText= result.isCanceled ? 'Share cancelled' : `Share success with postId: ${result.postId}`;
      console.log(logText);
    }).catch(error => {
      console.log(`Share fail with error: ${error}`);
    });
  }

    _shareText() {
      var post={
        text: 'Check out GLLU - Fashion that fits',
        url: Config.HOME_PAGE
      };
        Share.share({
            message: `${post.text} ${post.url}`,
            url: post.url,
            title: 'GLLU'
        }, {
            dialogTitle: 'Share GLLU',
            excludedActivityTypes: [/*here we can exclude sharing options on ios*/],
            tintColor: 'green'
        })
            .then(this._logResult)
            .catch((error) => console.log(`error: ${error.message}`));
    }

    _logResult(result) {
      if (result.action === Share.sharedAction) {
          console.log(`shared with an activityType: ${result.activityType}`)
      }
      else {
        if (result.action === Share.dismissedAction) {
              console.log('dismissed');
          }
      }
    }

}

export default new SocialShare();