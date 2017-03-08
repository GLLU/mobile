import { ShareDialog } from 'react-native-fbsdk';

function _shareFacebook(shareData) {
    const options = mapShareDataToOptions(shareData);
    const shareLinkContent = {
        contentType: 'link',
        contentUrl: options.url,
        contentDescription: options.message,
    };

    ShareDialog.canShow(shareLinkContent).then((canShow) => {
        if (canShow) {
            return ShareDialog.show(shareLinkContent);
        }
    }).then((result) => {
        var logText = result.isCancelled ? 'Share cancelled' : `Share success with postId: ${result.postId}`;
        console.log(logText);
    }).catch(error => {
        console.log(`Share fail with error: ${error}`);
    });
}

function mapShareDataToOptions(shareData){
    return {
        url: shareData.url,
        message: `${ shareData.text } ${ shareData.url }`,
        social: 'facebook',
    };
}

export default _shareFacebook;