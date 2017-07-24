import React, { Component } from 'react';
import { Dimensions, BackAndroid, View, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import MainBarView from './MainBarView';
import MainView from './MainView';
import BodyTypePicker from '../myBodyType/BodyTypePicker';
import { addNewLook, setUser, getNotifications, createInvitationCode } from '../../actions';
import asScreen from "../common/containers/Screen"
import { hideBodyTypeModal } from "../../actions/myBodyType";
import { noop } from "lodash";
import { openCamera } from '../../lib/camera/CameraUtils';
import { formatLook } from '../../utils/UploadUtils';
const cameraIcon = require('../../../images/icons/camera_green-circle.png');

class FeedPage extends Component {

  static propTypes = {
    user: React.PropTypes.object,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    setUser: React.PropTypes.func,
    addNewLook: React.PropTypes.func,
    hideBodyTypeModal: React.PropTypes.func
  }

  static defaultProps= {
    hideBodyTypeModal: noop,
    addNewLook: noop
  }

  constructor(props) {
    super(props);
    this._handleSearchStatus=this._handleSearchStatus.bind(this);
    this._clearFilter=this._clearFilter.bind(this);
    this._onPickBodyType=this._onPickBodyType.bind(this);
    this.goToAddNewItem=this.goToAddNewItem.bind(this);
    this.closeModal=this.closeModal.bind(this);
    this.uploadLook = this.uploadLook.bind(this);
    this.state = {
      name: '',
      searchTerm: '',
      searchStatus: false,
      contentHeight: null
    };
  }

  componentDidMount() {
    //this.props.createInvitationCode() // Will be removed in the future
  }

  componentWillMount() {

    if (!this.props.user || this.props.user.id === -1) {
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

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  setUser(name) {
    this.props.setUser(name);
  }

  goToAddNewItem(imagePath) {
    this.props.addNewLook(imagePath).then(() => {
      this.props.navigateTo('addItemScreen',{ mode: 'create' });
    });
  }

  _handleSearchStatus(newStatus) {
    const searchStatus = !this.state.searchStatus;
    this.setState({searchStatus})
  }

  _clearFilter() {
    this.setState({searchTerm: ''})
  }

  _handleSearchInput(term) {
    this.setState({searchTerm: term})
  }

  _onPickBodyType(){
    this.props.hideBodyTypeModal();
    this.props.navigateTo('myBodyMeasure')
  }

  closeModal() {
    this.props.logEvent('Feedscreen', {name: 'Hard close bodyType modal'});
    this.props.hideBodyTypeModal()
  }

  async uploadLook() {
    this.props.logEvent('Feedscreen', { name: 'Open Camera click' });
    const path = await openCamera(true);
    const file = formatLook(path);
    if (file) {
      this.goToAddNewItem(file);
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={[styles.mainNavHeader]}>
            <MainBarView user={this.props.user} navigateTo={this.props.navigateTo} addNewItem={this.uploadLook} gotNewNotifications={this.props.gotNewNotifications} searchStatus={this.state.searchStatus} handleSearchStatus={this._handleSearchStatus} handleSearchInput={(term) => this._handleSearchInput(term)} clearFilter={this._clearFilter}/>
            {/*{!this.state.searchStatus ?*/}
              {/*<NavigationBarView />*/}
              {/*:*/}
              {/*null*/}
            {/*}*/}
          </View>
          <MainView navigateTo={this.props.navigateTo} searchStatus={this.state.searchStatus} searchTerm={this.state.searchTerm}/>
          <View style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
            <TouchableOpacity transparent onPress={this.uploadLook}>
              <Image source={cameraIcon} style={styles.btnImage} />
            </TouchableOpacity>
          </View>
          <Modal animationType='slide' visible={this.props.modalShowing} style={{justifyContent: 'flex-start', alignItems: 'center'}} onRequestClose={this.closeModal}>
            <BodyTypePicker goBack={this.props.hideBodyTypeModal} onPick={this._onPickBodyType}/>
          </Modal>
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    hideBodyTypeModal: () => dispatch(hideBodyTypeModal()),
    setUser: name => dispatch(setUser(name)),
    getNotifications: name => dispatch(getNotifications(name)),
  };
}

const mapStateToProps = state => ({
  user: state.user,
  modalShowing: state.myBodyType.modalShowing,
  gotNewNotifications: state.notifications.newNotifications
});

export default connect(mapStateToProps, bindActions)(asScreen(FeedPage));
