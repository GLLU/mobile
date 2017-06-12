import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment'
import { noop } from 'lodash'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
});

export default class CommentRow extends Component {

  constructor(props) {
    super(props);
    this._onUserPress = this._onUserPress.bind(this);
  }

  static propTypes = {
    style: React.PropTypes.any,
    id: React.PropTypes.number,
    created_at: React.PropTypes.string,
    user: React.PropTypes.object,
    look_id: React.PropTypes.number,
    body: React.PropTypes.string,
    //parent_id & children are used for hierarchical comments and therefore currently not relevant
    parent_id: React.PropTypes.number,
    children: React.PropTypes.array,
    onUserPress: React.PropTypes.func
  };

  static defaultProps = {
    style: {},
    id: -1,
    created_at: new Date(1970, 1, 1).toUTCString(),
    body: '',
    //parent_id & children are used for hierarchical comments and therefore currently not relevant
    parent_id: null,
    children: [],
    onUserPress: noop
  };

  _onUserPress() {
    this.props.onUserPress(this.props.user);
  }

  render() {
    const name = this.props.user?this.props.user.name:'';
    const avatar = this.props.user?this.props.user.avatar:{url:'https://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg'};
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onUserPress} style={{flex:2}} name="avatar">
          <Image resizeMode='cover' source={{ uri: avatar.url}} style={styles.photo}/>
        </TouchableOpacity>
        <View style={{flex:13, flexDirection:'column'}}>
          <View style={{flex:1, flexDirection:'row'}}>
            <TouchableOpacity style={{flex:3}} onPress={this._onUserPress}>
              <Text style={{fontWeight:'bold'}} name="name">
                {name}
              </Text>
            </TouchableOpacity>
            <Text style={{flex:2, fontSize:10, textAlign:'right'}} name="created_at">
              {moment(this.props.created_at).calendar()}
            </Text>
          </View>
          <Text style={{flex:1}} name="body">
            {this.props.body}
          </Text>
        </View>
      </View>
    );
  }
}










