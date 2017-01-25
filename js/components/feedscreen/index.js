
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, View } from 'native-base';
import { setUser } from '../../actions/user';
import styles from './styles';
import NavigationBarView from './NavigationBarView';
import MainView from './MainView';
import Modal from 'react-native-modalbox';
import MyBodyModal from '../common/myBodyModal';
import SearchBar from './SearchBar'

const {
  replaceAt,
} = actions;

class FeedPage extends Component {

  static propTypes = {
    modalShowing: React.PropTypes.bool,
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      searchTerm: '',
      searchStatus: false
    };

  }

  setUser(name) {
    this.props.setUser(name);
  }

  replaceRoute(route) {
    this.setUser(this.state.name);
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
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

  render() {
    const modalStyle = {justifyContent: 'flex-start', alignItems: 'center'};
    return (
      <Container style={styles.container}>
        <View>
          <NavigationBarView handleSearchStatus={() => this._handleSearchStatus(false)}/>
          {this.state.searchStatus ? <SearchBar handleSearchInput={(searchTerm) => this._handleSearchInput(searchTerm)} clearText={this.state.searchTerm}/> : null}
          <MainView searchTerm={this.state.searchTerm} handleSearchStatus={(newStatus) => this._handleSearchStatus(newStatus)} clearSearchTerm={() => this._clearSearchTerm()}/>
          <Modal isOpen={this.props.modalShowing} style={modalStyle}
            position={"top"}>
            <MyBodyModal />
          </Modal>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  modalShowing: state.myBodyType.modalShowing
});

export default connect(mapStateToProps, bindActions)(FeedPage);
