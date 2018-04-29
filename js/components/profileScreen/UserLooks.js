import React, {Component} from 'react';
import {View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import i18n from 'react-native-i18n';
import _ from 'lodash';
import Fonts from '../../styles/Fonts.styles';
import MediaContainer from '../common/MediaContainer';
const deviceWidth = Dimensions.get('window').width;
import ParisAdjustableMessage from '../paris/ParisAdjustableMessage';
import ModalQuestion from '../uploadLookScreen/forms/ModalQuestion';

class UserLooks extends Component {

  static propTypes = {
    userLooks: React.PropTypes.array,
    handleSwipeTab: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    userId: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    this._handleEditPress = this._handleEditPress.bind(this);
    this.state = {
      filterHeight: 0,
      flatLooksLeft: _.filter(props.userLooks, (look, index) => index % 2 === 0),
      flatLooksRight: _.filter(props.userLooks, (look, index) => index % 2 === 1),
      itemScreenLook: 0,
      photoModal: false,
      isMyProfile: this.props.isMyProfile,
      isLoading: false,
      noMoreData: false,
      isRefreshing: false,
      currentScrollPosition: 0,
      loadingMore: false,
      modalParams: {
        modalVisible: false,
      },
    };
    this.currPosition = 0;
    this.contentHeight = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userLooks !== this.props.userLooks) {
      this.setState({
        flatLooksLeft: _.filter(nextProps.userLooks, (look, index) => index % 2 === 0),
        flatLooksRight: _.filter(nextProps.userLooks, (look, index) => index % 2 === 1),
        loadingMore: false
      });
    }

    if (nextProps.clearedField) {
      this.contentHeight = 0;
      this.contentHeight = 0;
      this.currPosition = 0;
      this.setState({ noMoreData: false });
    }
    if (nextProps) {

    }
  }

  componentDidMount() {
    const that = this;
    setInterval(() => {
      that.handleScrollPositionForVideo();
    }, 1000);
  }

  handleScrollPositionForVideo() {
    if (this.state.currentScrollPosition !== this.currPosition) {
      this.setState({ currentScrollPosition: this.currPosition });
    }
  }

  _handleEditPress(look) {
    this._setModalVisible({
      modalVisible: true,
      title: i18n.t('EDIT_LOOK'),
      confirmString: i18n.t('CONTINUE'),
      cancelString: '',
      subtitle: i18n.t('EDIT_IN_CONTRUCTION'),
      confirmAction: this._hideModal,
      cancelAction: this._hideModal,
    });
    /*this.props.editNewLook(look.id).then(() => {
      this.props.navigateTo('uploadLookScreen', { mode: 'edit' });
    });*/
  }

  renderLookStatus(look) {
    return (
      <View style={[{
        position: 'absolute',
        left: 0
      }, look.coverType === 'video' ? { top: 30 } : { top: 15 }, Platform.OS === 'ios' && look.coverType === 'video' ? { left: 3 } : null]}>
        <Text style={styles.lookStatusText}>{look.state}</Text>
      </View>
    );
  }

  _setModalVisible(params: object) {
    const { modalParams } = this.state;
    this.setState({ modalParams: { ...modalParams, ...params } });
  }

  _hideModal = () => {
    this.setState({ modalParams: { modalVisible: false } })
  }

  renderEmptyView() {
    return (
      <View>
        <ParisAdjustableMessage text={'Sorry, no looks available yet'}/>
      </View>
    );
  }

  _handleDeleteLook(look) {
    this._setModalVisible({
      modalVisible: true,
      title: 'ARE YOU SURE U WANT TO DELETE THIS LOOK?',
      confirmString: 'DELETE',
      cancelString: 'NO, IT WAS A MISTAKE',
      cancelAction: this._hideModal,
      confirmAction: () => {
        this.props.deleteLook(look.id);
        this._hideModal();
      }
  })
  }

  renderEditLookBtn(look) {
    return (
      <TouchableOpacity onPress={() => this._handleEditPress(look)} style={[styles.editLookBtn]}>
        <Text style={styles.editText}>{i18n.t('EDIT_LARGE')}</Text>
      </TouchableOpacity>

    );
  }

  _renderModal() {
    const { modalParams } = this.state;
    return (
      <ModalQuestion
        {...modalParams}
        closeModal={this.setModalVisible} />
    );
  }

  _renderDeleteLookBtn(look) {
    return (
      <TouchableOpacity onPress={() => this._handleDeleteLook(look)} style={[styles.deleteLookBtn]}>
        <Text style={styles.deleteText}>{i18n.t('DELETE_LARGE')}</Text>
      </TouchableOpacity>

    );
  }

  _renderLooks = (looks) => {
    const { canEdit, navigateTo } = this.props;
    return _.map(looks, look => (
      <MediaContainer
        look={look}
        currScroll={this.props.currentScrollPosition}
        likeUpdate={this.props.likeUpdate}
        navigateTo={navigateTo}
        unlikeUpdate={this.props.unlikeUpdate}
        navigateToLooksScreen={this.props.navigateToLooksScreen}
        sendParisMessage={this.props.showParisBottomMessage}
        key={look.id}
        shouldOptimize={this.state.flatLooksLeft.length > 20}
        showMediaGrid={false}
        fromScreen={'profileScreen'}>
        { this.state.isMyProfile && canEdit ? this._renderDeleteLookBtn(look) : null}
        { this.state.isMyProfile && canEdit ? this.renderEditLookBtn(look) : null}
      </MediaContainer>
    ));
  }

  render() {
    if (this.props.userLooks.length === 0 && !this.props.isLoading) {
      return this.renderEmptyView();
    } else {
      return (
        <View style={styles.tab}>
          <View style={styles.columnContainer}>
            <View style={styles.looksColumn}>
              {this._renderLooks(this.state.flatLooksLeft)}
            </View>
            <View style={styles.looksColumn}>
              {this._renderLooks(this.state.flatLooksRight)}
            </View>
          </View>
          {this._renderModal()}
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#FFFFFF',
    paddingTop: 5
  },
  mainGrid: {
    backgroundColor: '#FFFFFF',
    marginTop: -10,
  },
  deleteLookBtn: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    opacity: 0.6,
  },
  editLookBtn: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    opacity: 0.6,
  },
  deleteText: {
    fontSize: 14,
    padding: 6,
    fontFamily: Fonts.regularFont,
    color: 'white',
  },
  editText: {
    fontSize: 14,
    padding: 6,
    fontFamily: Fonts.regularFont,
    color: 'white',
  },
  columnContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: deviceWidth,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  looksColumn: {
    flex: 0.5, flexDirection: 'column', padding: 0, paddingHorizontal: 0, margin: 0,
  },
  lookStatusText: {
    color: '#fff', fontSize: 10, flex: 1, backgroundColor: '#00D7B2', padding: 3,
  },
});

export default UserLooks;
