// @flow

import {connect} from 'react-redux';
import asScreen from '../common/containers/Screen';
import UploadLookScreen from './UploadLookScreen';
import Utils from '../../utils';
import {
  createLookItem,
  setTagPosition,
  removeLookItem,
  publishLook,
  clearUploadLook,
  addDescription,
} from '../../actions/uploadLook';
import {
  getBestMatchFeed,
  clearFeed,
} from '../../actions/feed';
import {
  getUserLooks,
} from '../../actions/looks';
import { showFatalError } from '../../actions/errorHandler';

function mapDispatchToProps(dispatch) {
  return {
    publishLookItem: () => dispatch(publishLook()),
    createLookItem: (item, position) => dispatch(createLookItem(item, position)),
    removeLookItem: (itemId) => dispatch(removeLookItem(itemId)),
    setTagPosition: position => dispatch(setTagPosition(position)),
    getFeed: query => dispatch(getBestMatchFeed(query)),
    addDescription: (description) => dispatch(addDescription(description)),
    clearFeed: () => dispatch(clearFeed()),
    getUserLooks: data => dispatch(getUserLooks(data)),
    clearUploadLook: () => dispatch(clearUploadLook()),
    showErrorMessage: errorMessage => dispatch(showFatalError(errorMessage)),
  };
}

const mapStateToProps = (state, ownProps) => {
  const {lookId, image, items, isUploading} = state.uploadLook;

  if (!image){
    return {};
  }

  const isVideo = Utils.isVideo(image);
  return {
    mode: ownProps.navigation.state.params.mode,
    lookId,
    isVideo,
    filePath: image,
    items,
    state: state.uploadLook.state,
    categories: state.filters.categories,
    currentFeedQuery: state.feed.bestMatch.query,
    userId: state.user.id,
    lookDescription: state.uploadLook.description,
    isUploading,
    description: state.uploadLook.description
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(asScreen(UploadLookScreen));
