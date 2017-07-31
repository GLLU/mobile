'use strict';

import {connect} from 'react-redux';
import {getLookLikes, initLookLikes} from '../../actions';
import asScreen from "../common/containers/Screen"
import SearchScreen from "./SearchScreen"

function bindAction(dispatch) {
  return {
    getLookLikes: (id, pageNumber, pageSize) => dispatch(getLookLikes(id, pageNumber, pageSize)),
    initLookLikes: () => dispatch(initLookLikes()),
  };
}

const mapStateToProps = state => {
  return {
    likes: state.lookLikes.lookLikesData,
  }
};

export default asScreen(connect(mapStateToProps, bindAction)(asScreen(SearchScreen)));