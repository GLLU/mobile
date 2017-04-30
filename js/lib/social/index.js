import nativeShare from './nativeShare'
import facebookShare from './facebookShare'
import Config from 'react-native-config';

class SocialShare {

    nativeShare(shareToken){
      const defaultShareData = {
        text: 'Check out GLLU - Fashion that fits! Here is your Invitation Code: '+shareToken,
        url: Config.HOME_PAGE
      };
        return nativeShare(defaultShareData);
    }

    facebookShare(shareToken){
      const defaultShareData = {
        text: 'Check out GLLU - Fashion that fits! Here is your Invitation Code: '+shareToken,
        url: Config.HOME_PAGE
      };
        return facebookShare(defaultShareData);
    }

}

export default new SocialShare();
