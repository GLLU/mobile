import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Dimensions, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, View } from 'native-base';
import styles from './styles';
import NavigationBarView from './NavigationBarView';
import MainView from './MainView';
import Modal from 'react-native-modalbox';
import MyBodyModal from '../common/myBodyModal';
import { addNewLook, setUser, pushRoute, navigateTo } from '../../actions';
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
      contentHeight: null
    };
  }

  componentWillMount() {
    if (!this.props.user || this.props.user.id == -1) {
      this.props.navigateTo('splashscreen');
    }

    BackAndroid.addEventListener('hardwareBackPress', this.handleHardwareBackPress.bind(this));
  }

  componentWillUnmount() {
    console.log('componentWillUnmount feedscreen');
    BackAndroid.removeEventListener('hardwareBackPress', this.handleHardwareBackPress.bind(this));
  }

  handleHardwareBackPress() {
    this.setState({photoModal: false});
    return true;
  }

  setUser(name) {
    this.props.setUser(name);
  }

  goToAddNewItem(imagePath) {
    this.setState({photoModal: false}, () => {
      console.log('imagePath',imagePath)

      this.props.addNewLook(imagePath).then(() => {
        console.log('then')
        this.props.navigateTo('tagItemScreen', 'feedscreen');
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

  _handleLayout(e) {
    const height = e.nativeEvent.layout.height;
    console.log('container height', height, glluTheme.toolbarHeight);
    this.setState({contentHeight: height - glluTheme.toolbarHeight});
  }

  render() {
    const modalStyle = {justifyContent: 'flex-start', alignItems: 'center'};
    let contentStyle = { flex: 1 };
    if (this.state.contentHeight) {
      _.merge(contentStyle, { height: this.state.contentHeight });
    }
    return (
      <Container style={styles.container} theme={glluTheme} onLayout={e => this._handleLayout(e)}>
        <Header style={{backgroundColor: '#f2f2f2', paddingHorizontal: 0}}>
          <NavigationBarView handleSearchStatus={() => this._handleSearchStatus(false)} handleOpenPhotoModal={this._handleOpenPhotoModal.bind(this)}/>
        </Header>
        <Content
            scrollEnabled={false}
            contentContainerStyle={contentStyle}>
          <MainView searchStatus={this.state.searchStatus}/>
          <Modal isOpen={this.props.modalShowing} style={modalStyle}
            position={"top"}>
            <MyBodyModal />
          </Modal>
          <SelectPhoto photoModal={this.state.photoModal} addNewItem={this.goToAddNewItem.bind(this)}/>
        </Content>
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
