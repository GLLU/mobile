// @flow

import {connect} from 'react-redux';
import asScreen from '../common/containers/Screen';
import UploadLookScreen from './UploadLookScreen';
import Utils from '../../utils';
import {
  updateLookItem,
  publishLookItem,
} from '../../actions/uploadLook';
import {
  createLookItem,
  setTagPosition,
  removeLookItem,
  publishLook,
  clearUploadLook
} from '../../actions/uploadLookB';
import {
  getBestMatchFeed,
  clearFeed,
} from '../../actions/feed';
import {
  getUserLooks,
} from '../../actions/looks';

function mapDispatchToProps(dispatch) {
  return {
    publishLookItem: () => dispatch(publishLook()),
    createLookItem: (item, position) => dispatch(createLookItem(item, position)),
    removeLookItem: (itemId) => dispatch(removeLookItem(itemId)),
    setTagPosition: position => dispatch(setTagPosition(position)),
    getFeed: query => dispatch(getBestMatchFeed(query)),
    clearFeed: () => dispatch(clearFeed()),
    getUserLooks: data => dispatch(getUserLooks(data)),
    clearUploadLook: () => dispatch(clearUploadLook()),
  };
}

const mapStateToProps = (state) => {
  const {lookId, image, items, localFilePath, isUploading} = state.uploadLook;
  const isVideo = Utils.isVideo(image);
  return {
    lookId,
    isVideo,
    filePath: image,
    items,
    state: state.uploadLook.state,
    categories: state.filters.categories,
    currentFeedQuery: state.feed.bestMatch.query,
    userId: state.user.id,
    isUploading
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(asScreen(UploadLookScreen));
