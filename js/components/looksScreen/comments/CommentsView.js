import React, { Component } from 'react';
import { Animated, ListView,  View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import * as _ from 'lodash'
import CommentsViewHeader from './CommentsViewHeader'
import CommentInput from './CommentInput'
import CommentRow from './CommentRow'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  headerContainer: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#f2f2f2'
  },
  commentsCountContainer:{
    justifyContent:'center',
    flex:1,
    backgroundColor: '#00D7B2',
    paddingTop: 10,
    paddingBottom: 10,
  },
  commentsCountText:{
    color:'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center'
  },
  showAllContainer:{
    paddingLeft: 12,
    flex:3,
  },
  viewTitle:{
    paddingLeft: 12,
    flex:12,
    fontWeight:'bold',
    textAlign: 'left'

  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e6e6e6',
  },
});

export default class CommentsView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: this.rowHasChanged});
    this._renderFooter=this._renderFooter.bind(this);
    this._pushComment=this._pushComment.bind(this);
    this.state = {
      fadeAnimContent: new Animated.Value(-300),
      dataSource: ds.cloneWithRows(props.comments),
      comments:props.comments,
      isTrueEndReached: false
    };
  }

  static propTypes = {
    style: React.PropTypes.oneOfType([React.PropTypes.style, React.PropTypes.object]),
    isHidden: React.PropTypes.bool,
    comments: React.PropTypes.array
  };

  static defaultProps = {
    style: {},
    isHidden: true,
    count:48,
    comments:[]
  };

  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  _animateShow() {
    Animated.spring(          // Uses easing functions
      this.state.fadeAnimContent,    // The value to drive
      {
        toValue: 0,
        friction: 9
      }            // Configuration
    ).start();
  }

  _animateHide() {
    Animated.spring(          // Uses easing functions
      this.state.fadeAnimContent,    // The value to drive
      {
        toValue: -300,
        friction: 9
      }            // Configuration
    ).start();
  }

  _pushComment(value){
    const comment={
      "id": -1,
      "created_at": new Date().toUTCString(),
      "user_id": this.props.user_id||1,
      "look_id": this.props.look_id||1,
      //parent_id is used for hierarchical comments and therefore currently not relevant
      "parent_id": null,
      "body": value,
      "children": []
    };
    const comments = _.union(this.state.comments,[comment]);
    const ds = this.state.dataSource;
    this.setState({comments:comments,dataSource:ds.cloneWithRows(comments)})
  }

  _renderFooter(){
    return (
      <View style={{flexDirection:'column', backgroundColor:'#ADADAD'}}>
        <View style={{flex:1}} name="spacer"/>
        <CommentInput onSendPress={this._pushComment} style={{flex:2}}/>
        <View style={{flex:1}} name="spacer"/>
      </View>
    );
  }

  componentWillReceiveProps(nextProps){
    if(!_.isEmpty(nextProps.comments)){
      this.setState({comments:nextProps.comments});
    }
  }

  render() {
    if (this.props.isHidden) {
      this._animateHide()
    }
    else {
      this._animateShow()
    }
    return (
      <Animated.View style={[{bottom: this.state.fadeAnimContent},this.props.style,styles.container]}>
        <ListView
          style={{flex:1}}
          dataSource={this.state.dataSource}
          renderRow={(data) => <CommentRow {...data}/>}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
          enableEmptySections={true}
          renderHeader={()=><CommentsViewHeader count={this.props.count}/>}
          renderFooter={()=>this._renderFooter()}
        />
        <View style={{height:70}}/>
      </Animated.View>
    );
  }
}