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

  generateProductItemShareMessage(lookId: number, message: string, previewUrl: string) {
    const lookUrl = `${Config.HOME_PAGE}looks/${lookId}`;
    if (previewUrl) {
      return {
        text: `${message} ${lookUrl}`,
        url: previewUrl,
      };
    }
    return {
      text: `${message} ${lookUrl}`,
    };
  }

  generateSocialShareMessage(lookId: number, message: string, previewUrl: string) {
    const lookUrl = `${Config.HOME_PAGE}looks/${lookId}`;
    if (previewUrl) {
      return {
        text: `${message} ${lookUrl}`,
        url: previewUrl,
      };
    }
    return {
      text: `${message} ${lookUrl}`,
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
