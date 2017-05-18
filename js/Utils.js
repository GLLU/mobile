import BugsnagUtils from "./utils/BugsnagUtils";
import FacebookUtils from "./utils/FacebookUtils";
import FormatUtils from "./utils/FormatUtils";
import KeychainUtils from "./utils/KeychainUtils";
import FetchUtils from "./utils/FetchUtils";
import MediaUtils from "./utils/MediaUtils";

export default class Utils {

  static format_measurement(value, measurements_scale) { return FormatUtils.format_measurement(value,measurements_scale); }

  static format_number(value) { return FormatUtils.format_number(value); }

  static saveApiKeyToKeychain(email, api_key) { return KeychainUtils.saveApiKeyToKeychain(email, api_key); }

  static getKeychainData() { return KeychainUtils.getKeychainData(); }

  static resetKeychainData() { return KeychainUtils.resetKeychainData(); }

  static getBugsnagClient() { return BugsnagUtils.getBugsnagClient() }

  static notifyRequestError(err, data, user) { return BugsnagUtils.notifyRequestError(err, data, user) }

  static loginWithFacebook() { return FacebookUtils.loginWithFacebook(); }

  static postMultipartForm(api_key, path, formData, fileField, file, method = 'POST') { return FetchUtils.postMultipartForm(api_key, path, formData, fileField, file, method); }

  static getLoaderImage() { return MediaUtils.getLoaderImage() }

  static isVideo(path) { return MediaUtils.isVideo(path) }

  static preloadLookImages(looks) { return MediaUtils.preloadLookImages(looks) }

  static preloadImages(urls) { return MediaUtils.preloadImages(urls) }
}