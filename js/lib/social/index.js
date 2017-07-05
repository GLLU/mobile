import nativeShare from './nativeShare'
import facebookShare from './facebookShare'
import Config from 'react-native-config';

class SocialShare {

  generateShareMessage(text = 'Check out inFash - Fashion that fits', url = Config.HOME_PAGE) {
    return {
      text,
      url
    }
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
