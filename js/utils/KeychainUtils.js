import { Image } from 'react-native';
import * as Keychain from 'react-native-keychain';
import * as selfRef from './KeychainUtils'

export default selfRef

export const saveApiKeyToKeychain = (email, api_key) => Keychain.setGenericPassword(email, api_key);

export const getKeychainData = () => Keychain.getGenericPassword();


export const resetKeychainData = () => Keychain.resetGenericPassword();