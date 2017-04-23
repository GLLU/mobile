'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Container, Header, Content, View } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
import { popRoute, replaceAt, navigateTo, followUpdate, unFollowUpdate, goToNotificationSubjectScreen, markAsReadNotifications } from '../../../actions';

import ListViewHeader from './ListViewHeader';
import FollowRow from './FollowRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e6e6e6',
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
    console.log('follow',nextProps)
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

  onUserNavigate(props) {
    if(props.action_kind === 'Follow') {
      this.props.popRoute(this.props.navigation.key);
      this.props.popRoute(this.props.navigation.key);
      this.props.navigateTo('profileScreen', `feedscreen`, props);
    } else  {
      console.log('propssss',props)
      this.props.goToNotificationSubjectScreen(props.go_to_object.id, props.id);
    }

  }

  onMarkAsReadPress(props) {
    console.log('props',props)
    this.props.markAsReadNotifications(props.id)
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
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <FollowRow onMarkAsReadPress={this.onMarkAsReadPress.bind(this)} onUserPress={this.onUserNavigate.bind(this)} onFollowPress={this.toggleFollowAction.bind(this)} {...data}/>}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
        enableEmptySections={true}
        onEndReached={this.state.isTrueEndReached? _.noop:this.props.onEndReached}
        onEndReachedThreshold={100}
      />
    );
  }

  render() {
    console.log('rendered')
    const count = this.props.headerData.count ? this.props.headerData.count : null
    return (
      <View>
        <ListViewHeader count={count} title={`My ${this.props.headerData.mode}`}/>
        {this.props.headerData.count > 0 ? this.renderListView() : this.renderListView()}
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
    unFollowUpdate: (id) => dispatch(unFollowUpdate(id)),
    goToNotificationSubjectScreen: (id) => dispatch(goToNotificationSubjectScreen(id)),
    markAsReadNotifications: (id) => dispatch(markAsReadNotifications(id))
  };
}

const mapStateToProps = state => {
  return {
    navigation: state.cardNavigation,
  }
};

export default connect(mapStateToProps, bindAction)(FollowListView);

