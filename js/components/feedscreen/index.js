import React, { Component } from 'react';
import BasePage from '../common/base/BasePage';
import { Dimensions, BackAndroid, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import NavigationBarView from './NavigationBarView';
import SearchBarView from './SearchBarView';
import MainView from './MainView';
import Modal from 'react-native-modalbox';
import BodyTypePicker from '../myBodyType/BodyTypePicker';
import { addNewLook, setUser, getNotifications, createInvitationCode } from '../../actions';
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
    addNewLook: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this._handleClosePhotoModal=this._handleClosePhotoModal.bind(this);
    this._handleOpenPhotoModal=this._handleOpenPhotoModal.bind(this);
    this._handleSearchStatus=this._handleSearchStatus.bind(this);
    this._clearFilter=this._clearFilter.bind(this);
    this.goToAddNewItem=this.goToAddNewItem.bind(this);
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

    if (!this.props.user || this.props.user.id === -1) {
      this.navigateTo('splashscreen');
    }
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if(this.state.photoModal) {
        this.setState({photoModal: false})
        return true;
      }
    });

    this.props.getNotifications() // can stay here, still thinking about it
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  setUser(name) {
    this.props.setUser(name);
  }

  goToAddNewItem(imagePath) {
    this.setState({photoModal: false}, () => {
      this.props.addNewLook(imagePath).then(() => {
        this.navigateTo('addItemScreen',{ mode: 'create' });
      });
    })
  }

  _handleSearchStatus(newStatus) {
    const searchStatus = !this.state.searchStatus;
    this.setState({searchStatus})
  }

  _handleOpenPhotoModal() {
    this.setState({photoModal: true});
  }

  _handleClosePhotoModal() {
    this.setState({photoModal: false});
  }
  _clearFilter() {
    this.setState({searchTerm: ''})
  }

  _handleSearchInput(term) {
    this.setState({searchTerm: term})

  }

  render() {
    return (
      <View style={styles.container}>
          <View style={[styles.mainNavHeader, {height: this.state.searchStatus ? 62.5 : 100}]}>
            <SearchBarView searchStatus={this.state.searchStatus} handleSearchStatus={this._handleSearchStatus} handleSearchInput={(term) => this._handleSearchInput(term)} clearFilter={this._clearFilter}/>
            {!this.state.searchStatus ?
              <NavigationBarView navigateTo={this.navigateTo} addNewItem={this.goToAddNewItem} handleOpenPhotoModal={this._handleOpenPhotoModal}/>
              :
              null
            }
          </View>
          <MainView navigateTo={this.navigateTo} searchStatus={this.state.searchStatus} searchTerm={this.state.searchTerm}/>
          <Modal isOpen={this.props.modalShowing} style={{justifyContent: 'flex-start', alignItems: 'center'}}
            position={"top"}>
            <BodyTypePicker onPick={()=>this.navigateTo('myBodyMeasure')}/>
          </Modal>
          <SelectPhoto photoModal={this.state.photoModal} addNewItem={this.goToAddNewItem} onRequestClose={this._handleClosePhotoModal}/>
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    setUser: name => dispatch(setUser(name)),
    getNotifications: name => dispatch(getNotifications(name)),
    createInvitationCode: name => dispatch(createInvitationCode(name)),
  };
}

const mapStateToProps = state => ({
  user: state.user,
  modalShowing: state.myBodyType.modalShowing
});

export default connect(mapStateToProps, bindActions)(FeedPage);
