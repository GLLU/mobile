import {Share} from 'react-native';

function _shareTextNative(shareData) {
    Share.share({
        message: `${ shareData.text } ${ shareData.url }`,
        url: shareData.url,
        title: 'inFash'
    }, {
        dialogTitle: 'Share inFash',
        excludedActivityTypes: [ /*here we can exclude sharing options on ios*/ ]
    })
        .then(this._logResult)
        .catch((error) => console.log(`error: ${ error.message }`));
}

function _logResult(result) {
    if (result.action === Share.sharedAction) {
        console.log(`shared with an activityType: ${result.activityType}`)
    }
    else {
        if (result.action === Share.dismissedAction) {
            console.log('dismissed');
        }
    }
}

export default _shareTextNative;