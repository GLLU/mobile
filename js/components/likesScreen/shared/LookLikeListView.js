import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, FlatList } from 'react-native';
import {noop, isEmpty} from 'lodash';
import UserActionRow from "../../common/lists/UserActionRow";
import ListHeader from "../../common/lists/ListHeader";

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#e6e6e6'
  },
});

class LookLikeListView extends Component {

  static propTypes = {
    likes: React.PropTypes.array,
    onEndReached: React.PropTypes.func,
    headerData: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.renderListView = this.renderListView.bind(this);
    this.state = {
      isTrueEndReached: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.likes)) {
      this.setState({isTrueEndReached: true});
    }
  }

  renderListView() {
    return (
    <FlatList
      style={styles.container}
      data={this.props.likes}
      keyExtractor={(likes,index)=>likes.id!==-1?likes.id:index}
      renderItem={({item}) => <UserActionRow {...item} navigateTo={this.props.navigateTo}/>}
      onEndReached={this.state.isTrueEndReached? noop:this.props.onEndReached}
      onEndReachedThreshold={100}
    />
    );
  }

  render() {
    const count = this.props.headerData ? this.props.headerData : 0;
    return (
      <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
        <ListHeader goBack={this.props.goBack} count={count} title={`Likes`}/>
        {this.renderListView()}
      </View>
    );
  }
}

export default LookLikeListView;

