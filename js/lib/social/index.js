import nativeShare from './nativeShare';
import facebookShare from './facebookShare';
import Config from 'react-native-config';
import i18n from 'react-native-i18n';

class SocialShare {

  generateShareMessage(text = 'Check out inFash - Fashion that fits', url = Config.HOME_PAGE) {
    return {
      text: `${text} ${url}`,
      url,
    };
  }

  generateShareLookMessage(lookId: number, previewUrl: string) {
    const lookUrl = `${Config.HOME_PAGE}looks/${lookId}`;
    if (previewUrl) {
      return {
        text: `${i18n.t('SHARE_LOOK')} ${lookUrl}`,
        url: previewUrl,
      };
    }
    return {
      text: `${i18n.t('SHARE_LOOK')} ${lookUrl}`,
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
