// @flow

import {connect} from 'react-redux';
import asScreen from '../common/containers/Screen';
import UploadLookScreen from './UploadLookScreen';
import Utils from '../../utils';
import {
  updateLookItem,
  publishLookItem,
  createLookItem,
  setTagPosition,
  removeLookItem
} from '../../actions/uploadLook';
import {
  getFeed,
  clearFeed,
} from '../../actions/feed';
import {
  getUserLooks,
} from '../../actions/looks';

function mapDispatchToProps(dispatch) {
  return {
    updateLookItem: look => dispatch(updateLookItem(look)),
    publishLookItem: look => dispatch(publishLookItem(look)),
    createLookItem: (item, position) => dispatch(createLookItem(item, position)),
    removeLookItem: (itemId) => dispatch(removeLookItem(itemId)),
    setTagPosition: position => dispatch(setTagPosition(position)),
    getFeed: query => dispatch(getFeed(query)),
    clearFeed: () => dispatch(clearFeed()),
    getUserLooks: data => dispatch(getUserLooks(data)),
  };
}

const mapStateToProps = (state) => {
  const {lookId, image, items, localFilePath} = state.uploadLook;
  const isVideo = Utils.isVideo(image);
  return {
    lookId,
    isVideo,
    filePath: isVideo && localFilePath ? localFilePath : image,
    items,
    state: state.uploadLook.state,
    categories: state.filters.categories,
    currentFeedQuery: state.feed.query,
    userId: state.user.id,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(asScreen(UploadLookScreen));
