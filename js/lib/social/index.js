import nativeShare from './nativeShare'
import facebookShare from './facebookShare'
import Config from 'react-native-config';

var defaultShareData = {
    text: 'Check out GLLU - Fashion that fits',
    url: Config.HOME_PAGE
};

class SocialShare {

    nativeShare(shareData = defaultShareData){
        return nativeShare(shareData);
    }

    facebookShare(shareData = defaultShareData){
        return facebookShare(shareData);
    }

}

export default new SocialShare();