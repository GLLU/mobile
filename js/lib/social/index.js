import nativeShare from './nativeShare'
import facebookShare from './facebookShare'
import Config from 'react-native-config';
import { isEmpty } from "lodash";

class SocialShare {

  generateShareMessage(message){
    const text = isEmpty(message)? 'Check out GLLU - Fashion that fits':message;
    return {
      text,
      url: Config.HOME_PAGE
    }
  }

  nativeShare(shareData){
    const data= isEmpty(shareData)? this.generateShareMessage():shareData;
    return nativeShare(data);
  }

  facebookShare(shareData){
    const data= isEmpty(shareData)? this.generateShareMessage():shareData;
    return facebookShare(data);
  }

}

export default new SocialShare();
