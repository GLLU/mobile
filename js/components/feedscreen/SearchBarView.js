import React, { Component } from 'react';
import { StyleSheet, Image, Platform,View , TouchableWithoutFeedback, TouchableOpacity, InteractionManager } from 'react-native'
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import navigateTo from '../../actions/sideBarNav';
import BaseComponent from '../common/BaseComponent';
import SearchBar from './SearchBar';

const homeIcon = require('../../../images/icons/blackLogo.png');

const styles = StyleSheet.create({
  navigationBar: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    paddingLeft: 0,
    marginBottom: 5
  },
  btnProfile: {
    paddingVertical: 0,
    paddingHorizontal: 7,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  btnFilter: {
    paddingVertical: 0,
    alignItems: 'center',
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  btnCamera: {
  },
  btnImage: {
    height: 22,
    width: 22,
    marginBottom: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  normalBtn: {
    fontSize: 24
  },
  wallet: {
    paddingTop: (Platform.OS === 'ios' ? 10 : 0),
    marginTop: 5,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#757575'
  },
});

class SearchBarView extends BaseComponent {
  static propTypes = {
    user: React.PropTypes.object,
    handleSearchStatus: React.PropTypes.func,
    handleOpenPhotoModal: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      hasNotify: false,
      searchStatus: false
    };
  }

  goToProfile() {
    this.logEvent('Feedscreen', { name: 'Profile click' });
    this.props.navigateTo('profileScreen', 'feedscreen', this.props.user);
  }

  openCamera() {
    this.logEvent('Feedscreen', { name: 'Open Camera click' });
    this.props.handleOpenPhotoModal();
  }

  openSearch() {
    this.props.handleSearchStatus();
    this.setState({searchStatus: !this.state.searchStatus})
    this.logEvent('Feedscreen', { name: 'Search click' });
  }

  render() {
    return(
      <View style={styles.navigationBar}>
        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.btnProfile}>
            <Image source={homeIcon} style={styles.btnImage} />
          </View>
        </View>
        <View style={{flexGrow: 10, flexDirection: 'row', justifyContent: 'center', }}>
          <SearchBar handleSearchInput={(term) => this.props.handleSearchInput(term)}
                     clearText={this.props.clearText} />
        </View>
        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableWithoutFeedback transparent onPress={() => this.openSearch()} style={styles.btnFilter}>
            <Icon name={this.state.searchStatus ? "ios-close-circle-outline" : "ios-options-outline" } style={StyleSheet.flatten(styles.smallBtn)}/>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
  };
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
};

export default connect(mapStateToProps, bindActions)(SearchBarView);
