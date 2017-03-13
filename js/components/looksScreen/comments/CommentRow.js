import React, { Component } from 'react';
import { View, Image, Text, TouchableHighlight, StyleSheet } from 'react-native';
import moment from 'moment'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom:10,
    paddingTop:10,
  },
  photo: {
    flex: 1,
    width: 50,
    height: 50,
    borderRadius: 25
  },
});

export default class CommentRow extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    style: React.PropTypes.oneOfType([React.PropTypes.style, React.PropTypes.object]),
    id: React.PropTypes.number,
    created_at: React.PropTypes.string,
    user: React.PropTypes.object,
    look_id: React.PropTypes.number,
    body: React.PropTypes.string,
    //parent_id & children are used for hierarchical comments and therefore currently not relevant
    parent_id: React.PropTypes.number,
    children: React.PropTypes.array
  };

  static defaultProps = {
    style: {},
    id: -1,
    created_at: new Date(1970,1,1).toUTCString(),
    body: '',
    user: {
      id:681,
      avatar:{url:"https://cdn1.gllu.com/uploads/user/user-681/avatar/IMG-20170224-WA0020.jpeg"},
      name: 'itzik kala'
    },
    //parent_id & children are used for hierarchical comments and therefore currently not relevant
    parent_id: null,
    children: []
  };

  render() {
    var readableDate=moment(this.props.created_at).calendar();
    return (
      <View style={styles.container}>
        <View style={{flex:2}} name="avatar">
          <Image resizeMode='cover' source={{ uri: this.props.user.avatar.url}} style={styles.photo}/>
        </View>
        <View style={{flex:12, flexDirection:'column'}}>
          <View style={{flex:1, flexDirection:'row'}}>
            <Text style={{flex:8}} name="name">
              {this.props.user.name}
            </Text>
            <Text style={{flex:4}} name="created_at">
              {readableDate}
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










