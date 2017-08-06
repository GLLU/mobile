import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FollowView from '../../profileScreen/follows/FollowView'
import {connect} from "react-redux";
import {followUpdate, unFollowUpdate} from "../../../actions/follows";
import {noop} from "lodash";
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';
import Fonts from '../../../styles/Fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: generateAdjustedSize(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textContainer: {
    flex: 7,
    flexDirection: 'column',
    marginLeft: generateAdjustedSize(12),
  },
  followName: {
    flex: 0.5,
    color: 'black',
    fontSize: generateAdjustedSize(14),
    fontFamily: Fonts.contentFont,
    alignSelf: 'flex-start'
  },
  followUsername: {
    flex: 0.5,
    color: '#00a9ff',
    fontSize: generateAdjustedSize(14),
    fontFamily: Fonts.contentFont,
    alignSelf: 'flex-start'
  },
  photoContainer: {
    flex: 2,
  },
  photo: {
    flex: 1,
    width: generateAdjustedSize(40),
    height: generateAdjustedSize(40),
    borderRadius: generateAdjustedSize(20)
  },
  followView: {
    flex: 3
  }
});

class UserActionRow extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    username: React.PropTypes.string,
    aboutMe: React.PropTypes.string,
    avatar: React.PropTypes.object,
    userId: React.PropTypes.number,
    is_following: React.PropTypes.bool,
    navigateTo: React.PropTypes.func
  };

  static defaultProps = {
    navigateTo: noop
  }

  constructor(props) {
    super(props);
    this.renderFollowText = this.renderFollowText.bind(this);
    this.renderFollowView = this.renderFollowView.bind(this);
    this.onFollowPress = this.onFollowPress.bind(this);
    this.state = {
      isFollowing: props.isFollowing
    }
  }

  onUserPress() {
    this.props.navigateTo('profileScreen', this.props);
  }

  onFollowPress(user, shouldFollow) {
    let data = {id: user.id};
    if (shouldFollow) {
      this.props.followUpdate(data);
    }
    else {
      this.props.unFollowUpdate(data);
    }
    this.setState({isFollowing: shouldFollow})
  }

  renderFollowText() {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.followName}>{this.props.name}</Text>
        <Text style={styles.followUsername}>@{this.props.username}</Text>
      </View>
    )
  }

  renderFollowView() {
    if (this.props.isMe) {
      return <View name="can't follow me" style={styles.followView}/>;
    }
    return <FollowView onPress={this.onFollowPress} style={styles.followView}
                       user={{id: this.props.userId, isFollowing: this.state.isFollowing}}/>
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onUserPress.bind(this)} style={[styles.container, this.props.style]}>
        <View style={styles.photoContainer}>
          <Image resizeMode='cover' source={{uri: this.props.avatar.url}} style={styles.photo}/>
        </View>
        {this.renderFollowText()}
        {this.renderFollowView()}
      </TouchableOpacity>
    )
  }
}

function bindAction(dispatch) {
  return {
    followUpdate: (id) => dispatch(followUpdate(id)),
    unFollowUpdate: (id) => dispatch(unFollowUpdate(id))
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(UserActionRow);