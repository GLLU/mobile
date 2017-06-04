'use strict';

import React, { Component } from 'react';
import { Dimensions,ListView, Image, StyleSheet, TouchableOpacity, Text,View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { followUpdate, unFollowUpdate } from '../../../actions';
import ListViewHeader from './ListViewHeader';
import FollowRow from './LikeRow';

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#e6e6e6'
  },
});

class FollowListView extends Component {

  static propTypes = {
    likes: React.PropTypes.array,
    onEndReached: React.PropTypes.func,
    headerData: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.renderListView = this.renderListView.bind(this);
    const ds = new ListView.DataSource({rowHasChanged: this.rowHasChanged});
    this.state = {
      dataSource: ds.cloneWithRows(props.likes),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.likes !== this.props.likes) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.likes)
      })
    }
  }

  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  onUserNavigate(user) {
    this.props.navigateTo('profileScreen', user);
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
      />
    );
  }

  render() {
    const count = this.props.headerData ? this.props.headerData : 0;
    return (
      <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
        <ListViewHeader goBack={this.props.goBack} count={count} title={`Likes`}/>
        {this.renderListView()}
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    followUpdate: (id) => dispatch(followUpdate(id)),
    unFollowUpdate: (id) => dispatch(unFollowUpdate(id))
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(FollowListView);

