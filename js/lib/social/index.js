import nativeShare from './nativeShare'
import facebookShare from './facebookShare'
import Config from 'react-native-config';
import i18n from 'react-native-i18n';

class SocialShare {

  generateShareMessage(text = 'Check out inFash - Fashion that fits', url = Config.HOME_PAGE) {
    return {
      text,
      url
    }
  }

  generateShareLookMessage(lookId: number) {
    return {
      text: i18n.t('SHARE_LOOK'),
      url: `${Config.HOME_PAGE}looks/${lookId}`,
    };
  }

  nativeShare(shareData) {
    const data = shareData || this.generateShareMessage();
    return nativeShare(data);
  }

  facebookShare(shareData) {
    const data = shareData || this.generateShareMessage();
    return facebookShare(data);
  }

}

export default new SocialShare();
