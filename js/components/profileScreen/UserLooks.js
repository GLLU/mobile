'use strict';

import React, { Component } from 'react';
import { View, Text,Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {  Icon } from 'native-base';
import _ from 'lodash';
import VideoWithCaching from "../common/media/VideoWithCaching";
import ImageWrapper from '../common/media/ImageWrapper'
import MediaContainer from '../common/MediaContainer';
const deviceWidth = Dimensions.get('window').width;
import ParisAdjustableMessage from '../paris/ParisAdjustableMessage';

class UserLooks extends Component {

  static propTypes = {
    userLooks: React.PropTypes.array,
    handleSwipeTab: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    userId: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    this._handleEditPress = this._handleEditPress.bind(this)
    this.state = {
      filterHeight: 0,
      flatLooksLeft: _.filter(props.userLooks,(look,index)=>index%2===0),
      flatLooksRight: _.filter(props.userLooks,(look,index)=>index%2===1),
      itemScreenLook: 0,
      photoModal: false,
      isMyProfile: this.props.isMyProfile,
      isLoading: false,
      noMoreData: false,
      isRefreshing: false,
      currentScrollPosition: 0,
      loadingMore: false,
      totalLooks: 0
    };
    this.currPosition = 0
    this.contentHeight = 0
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userLooks !== this.props.userLooks){
      this.setState({flatLooksLeft: _.filter(nextProps.userLooks,(look,index)=>index%2===0), flatLooksRight: _.filter(nextProps.userLooks,(look,index)=>index%2===1), loadingMore: false, totalLooks: nextProps.meta.total_count})
    }

    if(nextProps.clearedField){
      this.contentHeight = 0
      this.contentHeight = 0
      this.currPosition = 0
      this.setState({noMoreData: false})
    }
    if(nextProps) {

    }

  }

  componentDidMount() {
    let that = this
    setInterval(function(){ that.handleScrollPositionForVideo(); }, 1000);
  }

  handleScrollPositionForVideo() {
    if(this.state.currentScrollPosition !== this.currPosition) {
      this.setState({currentScrollPosition: this.currPosition})
    }
  }

  _handleEditPress(look) {
    this.props.editNewLook(look.id).then(() => {
      this.props.navigateTo('addItemScreen',{ mode: 'edit' });
    });
  }

  renderLookStatus(look) {
    return (
      <View style={[{position: 'absolute', left: 0, padding: 3}, look.coverType === 'video' ? {top: 30} : {top: 15}]}>
        <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, backgroundColor: '#00D7B2'}}/>
        <Text style={{color: '#fff', fontSize: 10, flex: 1, backgroundColor: 'transparent'}}>{look.state}</Text>
      </View>
    )
  }

  renderEmptyView() {
    return(
      <View>
        <ParisAdjustableMessage text={'Sorry, no looks available yet'}/>
      </View>
    )
  }

  renderEditLookBtn(look) {
    return (
      <TouchableOpacity onPress={() =>this._handleEditPress(look)} style={[{position: 'absolute', right: 0, height: 30, width: 30, zIndex: 1, backgroundColor:'#00d7b2',alignItems:'center'}, look.coverType === 'video' ? {top: 30} : {top: 15}]}>
        <Icon name='ios-create-outline' style={{color: '#000'}} size={28}/>
      </TouchableOpacity>

    )
  }

  _renderLooks(looks) {
    return _.map(looks, (look) => {
      return (
        <MediaContainer look={look}
                        currScroll={this.props.currentScrollPosition}
                        likeUpdate={this.props.likeUpdate}
                        unLikeUpdate={this.props.likeUpdate}
                        navigateTo={this.props.navigateTo}
                        sendParisMessage={this.props.showParisBottomMessage}
                        key={look.id}
                        shouldOptimize={this.state.flatLooksLeft.length>20}
                        showMediaGrid={false}
                        fromScreen={'profileScreen'}>
          { this.state.isMyProfile ? this.renderEditLookBtn(look) : null}
          { this.state.isMyProfile ? this.renderLookStatus(look) : null}
        </MediaContainer>
      );
    });
  }

  render() {
    console.log('total',this.state.totalLooks, 'isLoading ',!this.props.isLoading)
    if(this.state.totalLooks === 0 && !this.props.isLoading){
      return this.renderEmptyView()
    } else {
      return (
        <View style={styles.tab}>
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', width: deviceWidth, justifyContent: 'flex-end',  alignSelf: 'center', }}>
            <View style={{flex: 0.5, flexDirection: 'column', padding: 0, paddingHorizontal: 0, margin:0}}>
              {this._renderLooks(this.state.flatLooksLeft)}
            </View>
            <View style={{flex: 0.5, flexDirection: 'column', padding: 0, paddingHorizontal: 0, margin:0}}>
              {this._renderLooks(this.state.flatLooksRight)}
            </View>
          </View>
        </View>
      )}
    }

}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#FFFFFF'
  },
  mainGrid: {
    backgroundColor: '#FFFFFF',
    marginTop: -10
  },
});

export default UserLooks;
