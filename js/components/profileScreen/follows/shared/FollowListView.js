import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, FlatList } from 'react-native';
import {noop, isEmpty} from 'lodash';
import UserActionRow from "../../../common/lists/UserActionRow";
import ListHeader from "../../../common/lists/ListHeader";

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#e6e6e6'
  },
});

class FollowListView extends Component {

  static propTypes = {
    follows: React.PropTypes.array,
    onEndReached: React.PropTypes.func,
    headerData: React.PropTypes.object,
    renderEmpty: React.PropTypes.func
  };

  static defaultProps = {
    renderEmpty: _.noop
  };

  constructor(props) {
    super(props);
    this.renderListView = this.renderListView.bind(this);
    this.state = {
      isTrueEndReached: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.follows)) {
      this.setState({isTrueEndReached: true});
    }
  }

  renderListView() {
    return (
    <FlatList
      style={styles.container}
      data={this.props.follows}
      keyExtractor={(follow,index)=>follow.id!==-1?follow.id:index}
      renderItem={({item}) => <UserActionRow {...item} navigateTo={this.props.navigateTo}/>}
      onEndReached={this.state.isTrueEndReached? noop:this.props.onEndReached}
      onEndReachedThreshold={100}
    />
    );
  }

  render() {
    const count = this.props.headerData.count ? this.props.headerData.count : 0;
    return (
      <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
        <ListHeader goBack={this.props.goBack} count={count} title={`My ${this.props.headerData.mode}`}/>
        {this.props.headerData.count > 0 ? this.renderListView() : this.props.renderEmpty()}
      </View>
    );
  }
}

export default FollowListView;

