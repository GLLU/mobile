
import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Container, View } from 'native-base';
import styles from './styles';
import NavigationBarView from './NavigationBarView';
import MainView from './MainView';
import Modal from 'react-native-modalbox';
import MyBodyModal from '../common/myBodyModal';
import { addNewLook, setUser, pushRoute, navigateTo } from '../../actions';
import SearchBar from './SearchBar';
import glluTheme from '../../themes/gllu-theme';
import SelectPhoto from './SelectPhoto';

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
    this.state = {
      name: '',
      searchTerm: '',
      searchStatus: false,
      photoModal: false,
    };

    this.notifyError(new Error("Test Error Utils"));
  }

  componentWillMount() {
    if (!this.props.user || this.props.user.id == -1) {
      this.props.navigateTo('splashscreen');
    }
  }

  setUser(name) {
    this.props.setUser(name);
  }

  goToAddNewItem(imagePath) {
    this.setState({photoModal: false}, () => {
      this.props.addNewLook(imagePath).then(() => {
        this.props.navigateTo('tagItemScreen', 'feedscreen');
      });  
    })
  } 

  _handleSearchInput(searchTerm) {
    this.setState({
      searchTerm
    })
  }

  _handleSearchStatus(newStatus) {
    const searchStatus = newStatus === 'close' ? false : !this.state.searchStatus;
    this.setState({searchStatus})
  }

  _clearSearchTerm() {
    this.setState({
      searchTerm: ''
    })
  }

  _handleOpenPhotoModal() {
    this.setState({photoModal: true});
  }

  render() {
    const modalStyle = {justifyContent: 'flex-start', alignItems: 'center'};
    return (
      <Container style={styles.container} theme={glluTheme}>
        <View>
          <NavigationBarView handleSearchStatus={() => this._handleSearchStatus(false)} handleOpenPhotoModal={this._handleOpenPhotoModal.bind(this)}/>
          {this.state.searchStatus ? <SearchBar handleSearchInput={(searchTerm) => this._handleSearchInput(searchTerm)} clearText={this.state.searchTerm}/> : null}
          <MainView searchTerm={this.state.searchTerm} handleSearchStatus={(newStatus) => this._handleSearchStatus(newStatus)} clearSearchTerm={() => this._clearSearchTerm()}/>
          <Modal isOpen={this.props.modalShowing} style={modalStyle}
            position={"top"}>
            <MyBodyModal />
          </Modal>
          <SelectPhoto photoModal={this.state.photoModal} addNewItem={this.goToAddNewItem.bind(this)}/>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    pushRoute: (routeKey, route, key) => dispatch(pushRoute(routeKey, route, key)),
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  user: state.user,
  navigation: state.cardNavigation,
  modalShowing: state.myBodyType.modalShowing
});

export default connect(mapStateToProps, bindActions)(FeedPage);
