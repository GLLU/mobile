'use strict';

import React, { Component } from 'react';
import { Dimensions,ListView, Image, StyleSheet, TouchableOpacity, Text,View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { popRoute, replaceAt, navigateTo, followUpdate, unFollowUpdate } from '../../../../actions';
import ListViewHeader from './ListViewHeader';
import FollowRow from './FollowRow';

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
    const ds = new ListView.DataSource({rowHasChanged: this.rowHasChanged});
    this.state = {
      dataSource: ds.cloneWithRows(props.follows),
      isTrueEndReached: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(nextProps.follows)) {
      this.setState({isTrueEndReached: true});
    }
    if (nextProps.follows !== this.props.follows) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.follows)
      })
    }
  }

  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  onUserNavigate(user) {
    this.props.popRoute(this.props.navigation.key);
    this.props.popRoute(this.props.navigation.key);
    this.props.navigateTo('profileScreen', `feedscreen`, user);
  }

  toggleFollowAction(user, shouldFollow) {
    let data = {id: user.id};
    if (shouldFollow) {
      this.props.followUpdate(data);
    }
    else {
      this.props.unFollowUpdate(data);
    }
  }

  renderListView() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => <FollowRow onUserPress={this.onUserNavigate.bind(this)} onFollowPress={this.toggleFollowAction.bind(this)} {...data}/>}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
        enableEmptySections={true}
        onEndReached={this.state.isTrueEndReached? _.noop:this.props.onEndReached}
        onEndReachedThreshold={100}
      />
    );
  }

  render() {
    const count = this.props.headerData.count ? this.props.headerData.count : 0;
    return (
      <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
        <ListViewHeader count={count} title={`My ${this.props.headerData.mode}`}/>
        {this.props.headerData.count > 0 ? this.renderListView() : this.props.renderEmpty()}
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    followUpdate: (id) => dispatch(followUpdate(id)),
    unFollowUpdate: (id) => dispatch(unFollowUpdate(id))
  };
}

const mapStateToProps = state => {
  return {
    navigation: state.cardNavigation,
  }
};

export default connect(mapStateToProps, bindAction)(FollowListView);

