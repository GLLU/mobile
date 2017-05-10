import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Dimensions, BackAndroid, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Header, Content, StyleProvider, getTheme } from 'native-base';
import styles from './styles';
import NavigationBarView from './NavigationBarView';
import SearchBarView from './SearchBarView';
import MainView from './MainView';
import Modal from 'react-native-modalbox';
import MyBodyModal from '../common/myBodyModal';
import { addNewLook, setUser, pushRoute, navigateTo, getNotifications, createInvitationCode } from '../../actions';
import glluTheme from '../../themes/gllu-theme';
import SelectPhoto from '../common/SelectPhoto';
import Gllu from '../common';
import * as _ from "lodash";

class FeedPage extends BasePage {

  static propTypes = {
    user: React.PropTypes.object,
    modalShowing: React.PropTypes.bool,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    setUser: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    addNewLook: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this._handleClosePhotoModal=this._handleClosePhotoModal.bind(this);
    this._handleOpenPhotoModal=this._handleOpenPhotoModal.bind(this);
    this.state = {
      name: '',
      searchTerm: '',
      searchStatus: false,
      photoModal: false,
      contentHeight: null
    };
  }

  componentDidMount() {
    this.props.createInvitationCode() // Will be removed in the future
  }

  componentWillMount() {

    if (!this.props.user || this.props.user.id == -1) {
      this.props.navigateTo('splashscreen');
    }
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if(this.state.photoModal) {
        this.setState({photoModal: false})
        return true;
      }
    });

    this.props.getNotifications() // can stay here, still thinking about it
  }

  setUser(name) {
    this.props.setUser(name);
  }

  goToAddNewItem(imagePath) {
    this.setState({photoModal: false}, () => {
      this.props.addNewLook(imagePath).then(() => {
        this.props.navigateTo('addItemScreen', 'feedscreen', { mode: 'create' });
      });
    })
  }

  _handleSearchStatus(newStatus) {
    const searchStatus = newStatus === 'close' ? false : !this.state.searchStatus;
    this.setState({searchStatus})
  }

  _handleOpenPhotoModal() {
    this.setState({photoModal: true});
  }

  _handleClosePhotoModal() {
    this.setState({photoModal: false});
  }

  _handleLayout(e) {
    const height = e.nativeEvent.layout.height;
    this.setState({contentHeight: height - glluTheme.toolbarHeight});
  }

  _clearFilter() {
    this.setState({searchTerm: ''})
  }

  _handleSearchInput(term) {
    this.setState({searchTerm: term})

  }

  render() {
    const modalStyle = {justifyContent: 'flex-start', alignItems: 'center'};
    let contentStyle = { flex: 1 };
    if (this.state.contentHeight) {
      _.merge(contentStyle, { height: this.state.contentHeight });
    }
    return (
      <Gllu.Container style={StyleSheet.flatten(styles.container)} onLayout={e => this._handleLayout(e)}>
        {!this.props.modalShowing ?
          <View style={[styles.mainNavHeader, {height: this.state.searchStatus ? 62.5 : 95}]}>
              <SearchBarView searchStatus={this.state.searchStatus} handleSearchStatus={() => this._handleSearchStatus(false)} handleSearchInput={(term) => this._handleSearchInput(term)} clearFilter={() => this._clearFilter()} handleOpenPhotoModal={this._handleOpenPhotoModal.bind(this)}/>
              {!this.state.searchStatus ?
                <NavigationBarView searchStatus={this.state.searchStatus} handleSearchStatus={() => this._handleSearchStatus(false)} handleOpenPhotoModal={this._handleOpenPhotoModal.bind(this)}/>
                :
                null
              }
          </View>
        :
          null
        }
        <StyleProvider style={getTheme(glluTheme)}>
        <Content
            scrollEnabled={false}
            contentContainerStyle={contentStyle}>
          <MainView searchStatus={this.state.searchStatus} searchTerm={this.state.searchTerm}/>
          <Modal isOpen={this.props.modalShowing} style={modalStyle}
            position={"top"}>
            <MyBodyModal />
          </Modal>
          <SelectPhoto photoModal={this.state.photoModal} addNewItem={this.goToAddNewItem.bind(this)} onRequestClose={this._handleClosePhotoModal}/>
        </Content>
        </StyleProvider>
      </Gllu.Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    pushRoute: (routeKey, route, key) => dispatch(pushRoute(routeKey, route, key)),
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    setUser: name => dispatch(setUser(name)),
    getNotifications: name => dispatch(getNotifications(name)),
    createInvitationCode: name => dispatch(createInvitationCode(name)),
  };
}

const mapStateToProps = state => ({
  user: state.user,
  navigation: state.cardNavigation,
  modalShowing: state.myBodyType.modalShowing
});

export default connect(mapStateToProps, bindActions)(FeedPage);
