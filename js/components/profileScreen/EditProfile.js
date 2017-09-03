import React, { Component } from 'react';
import {
Image, Animated, InteractionManager, TouchableOpacity, View, Text, TextInput, ScrollView, FormData, Modal,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import I18n from 'react-native-i18n';
import asScreen from '../common/containers/Screen';
import styles from './styles';
import ExpandableTextArea from './ExpandableTextArea';
import EditProfileHeader from './EditProfileHeader';
import EditProfileName from './EditProfileName';
import ProfileAvatar from '../common/avatars/ProfileAvatar';
import InformationTextIcon from '../common/informationTextIcon';
import { openCamera } from '../../lib/camera/CameraUtils';
import { saveUserSize } from '../../actions/myBodyMeasure';
import { changeUserAvatar, changeUserAboutMe } from '../../actions/user';
import BodyTypePicker from '../myBodyType/BodyTypePicker';
import SpinnerSwitch from '../loaders/SpinnerSwitch';
import { formatAvatar } from '../../utils/UploadUtils';

const profileBackground = require('../../../images/backgrounds/profile-screen-background.png');

class EditProfile extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    navigation: React.PropTypes.object,
    bodyType: React.PropTypes.object,
    saveUserSize: React.PropTypes.func,
    changeUserAvatar: React.PropTypes.func,
    changeUserAboutMe: React.PropTypes.func,
  }

  static defaultProps = {
    user: {},
  }

  constructor(props) {
    super(props);
    this.toggleBodyTypeModal = this.toggleBodyTypeModal.bind(this);
    this._saveChanges = this._saveChanges.bind(this);
    this._changeUserAvatar = this._changeUserAvatar.bind(this);
    this.state = {
      aboutMe: props.user.about_me || '',
      modalShowing:false,
      isUpdating: false,
      isChangingAvatar: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.avatar !== this.props.user.avatar) {
      this.setState({ isChangingAvatar: false });
    }
  }

  _saveChanges() {
    const { user, bodyType } = this.props;
    const measurements = {
      body_type: bodyType.body_type,
      chest: user.user_size.chest,
      waist: user.user_size.waist,
      hips: user.user_size.hips,
      height: user.user_size.height,
      measurements_scale: user.user_size.measurements_scale,
    };
    this.setState({ isUpdating: true }, () => {
      Promise.all([
        this.props.changeUserAboutMe({id: this.props.user.id, about_me: this.state.aboutMe}),
        this.props.saveUserSize(measurements)
      ]).then(this.props.goBack)
        .catch(err => console.log(err));
    });
  }

  _changeUserAvatar() {
    this.props.logEvent('EditProfileScreen', { name: 'Change avatar click from editProfile' });
    this.uploadAvatar().then(() => {
      this.setState({ isChangingAvatar: true });
    }).catch(err => this.setState({ isChangingAvatar: false }))
  }

  async uploadAvatar() {
    this.props.logEvent('EditProfileScreen', { name: 'Open Camera click from editProfile' });
    const path = await openCamera(false);
    const image = formatAvatar(path);
    if (image) {
      const { id } = this.props.user;
      this.props.changeUserAvatar({ id, image });
    } else {
      throw new Error('user cancelled');
    }
  }

  _handleAboutMeTextInput(text) {
    this.setState({aboutMe: text})
  }

  _handleAboutMeEndEding() {
    this.props.logEvent('EditProfileScreen', { name: 'Tell us about you' });
  }

  toggleBodyTypeModal = (shouldActive) => {
    this.props.logEvent('EditProfileScreen', { name: `body type modal is ${shouldActive ? 'visible' : 'hidden'}` });
    this.setState({ modalShowing: shouldActive });
  };
  render() {

    return (
      <View style={{ backgroundColor: '#E9E9EF' }}>
        <View style={{ position: 'absolute', top: 0 }}>
          <Image source={profileBackground} style={styles.editProfileBg}>
            <LinearGradient
              colors={['#0C0C0C', '#4C4C4C']}
              style={[styles.linearGradient, { opacity: 0.7, height: 150 }]} />
            <EditProfileHeader cancelEdit={this.props.goBack} save={this._saveChanges} />
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <ProfileAvatar
                avatarUrl={this.props.user.avatar.url} style={{ width: 70, height: 70 }}
                isLoading={this.state.isChangingAvatar} changeUserAvatar={this._changeUserAvatar}
                isEditable />
            </View>
          </Image>


        </View>
        <ScrollView
          style={[styles.scrollView]}
        >
          <EditProfileName name={this.props.user.name} username={this.props.user.username} />
          <ExpandableTextArea
            text={this.state.aboutMe}
            onEndEditing={this._handleAboutMeEndEding.bind(this)}
            handleTextInput={text => this._handleAboutMeTextInput(text)}
          />
          <TouchableOpacity onPress={() => this.toggleBodyTypeModal(true)} style={styles.editBodyTypeTitleContainer}>
            <Text style={styles.editBodyTypeTitle}>{I18n.t('EDIT_SHAPE')}</Text>
          </TouchableOpacity>
          <View style={styles.bodyMeasureContainer}>
            <BodyTypePicker
              goBack={() => this.toggleBodyTypeModal(false)}
              onPick={() => this.toggleBodyTypeModal(false)} />
          </View>
          <View style={styles.privateInfoContainer}>
            <InformationTextIcon text={I18n.t('PRIVATE_INFO')} />
          </View>
        </ScrollView>
        {this.state.isUpdating ? <SpinnerSwitch /> : null}
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    saveUserSize: measurements => dispatch(saveUserSize(measurements)),
    changeUserAvatar: data => dispatch(changeUserAvatar(data)),
    changeUserAboutMe: data => dispatch(changeUserAboutMe(data)),

  };
}

const mapStateToProps = state => ({
  cardNavigation: state.cardNavigation,
  myUserId: state.user.id,
  stats: state.stats,
  user: state.user,
  bodyType: state.myBodyType.currentBodyType,
});

export default connect(mapStateToProps, bindAction)(asScreen(EditProfile));
