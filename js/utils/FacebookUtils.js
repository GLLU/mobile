import { difference } from 'lodash';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class FacebookUtils {

  static loginWithFacebook() {
    return new Promise((resolve, reject) => {
      let PERMISSIONS = ["email", "public_profile"];
      LoginManager.logInWithReadPermissions(PERMISSIONS).then(
        (result) => {
          if (result.isCancelled) {
            alert('Login cancelled');
          } else {
            const diffPermissions = difference(PERMISSIONS, result.grantedPermissions);
            if (diffPermissions.length === 0) {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  const infoRequest = new GraphRequest('/me?fields=id,name,email,gender', null, (error, result) => {
                    if (error) {
                      alert(`Failed to retrieve user info: ${JSON.stringify(error)}`);
                    } else {
                      const jsonData = {
                        access_token: data["accessToken"],
                        expiration_time: data["expirationTime"],
                        data: result
                      };
                      resolve(jsonData)
                    }
                  });
                  new GraphRequestManager().addRequest(infoRequest).start();
                }
              );
            } else {
              alert(`Missing permissions: ${diffPermissions.join(', ')}`);
              reject(`Missing permissions: ${diffPermissions.join(', ')}`)
            }
          }
        },
        (error) => {
          alert('Login fail with error: ' + error);
          reject('Login fail with error: ' + error)
        }
      );
    })
  }

}