import React, {Component} from 'react';
import { Image, Animated, InteractionManager, TouchableOpacity, Text, TextInput} from 'react-native';
import styles from './styles';
import { View } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import BodyMeasureView from '../myBodyMeasure/bodyMeasureView';
import ExpandableTextArea from './ExpandableTextArea';
import EditProfileHeader from './EditProfileHeader';
import EditProfileName from './EditProfileName';
import CircleProfileImage from './CircleProfileImage';
import { saveUserSize} from '../../actions/myBodyMeasure';
import { changeUserAvatar, changeUserAboutMe } from '../../actions/user';

const profileBackground = require('../../../images/backgrounds/profile-screen-background.jpeg');
const { popRoute } = actions;

class EditProfile extends Component {
  static propTypes = {
    user: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      about_me: this.props.user.about_me.length > 0 ? this.props.user.about_me : 'Please add About me',
      height: 0
    }
  }

  _PopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  _saveChanges(){
    const { user, bodyType } = this.props;
    const data = {
      body_type: bodyType.uniqueName,
      chest: user.user_size.chest,
      waist: user.user_size.waist,
      hips: user.user_size.hips,
      height: user.user_size.height,
      measurements_scale: user.user_size.measurements_scale
    };
    this.props.changeUserAboutMe({id: this.props.user.id, about_me: this.state.about_me});
    this.props.saveUserSize(data);
  }

  _changeUserAvatar() {
    ImagePicker.openPicker({
      includeBase64: true,
      cropping: false,
    }).then(image => {
      data = {
        image,
        id: this.props.user.id
      }
      this.props.changeUserAvatar(data);
    });
  }

  _handleAboutMeTextInput(text) {
    console.log('add text');
    this.setState({about_me: text})
  }

  render() {
    return (
      <View>
        <Image source={profileBackground} style={styles.editProfileBg}>
          <LinearGradient colors={['#0C0C0C', '#4C4C4C']} style={[styles.linearGradient, {opacity: 0.7}]} />
        <EditProfileHeader popRoute={() => this._PopRoute()} save={() => this._saveChanges()} />
        </Image>
        <CircleProfileImage avatarUrl={this.props.user.avatar.url} changeUserAvatar={() => this._changeUserAvatar()} editable={true}/>
        <EditProfileName name={this.props.user.name} username={this.props.user.username} />
        <ExpandableTextArea text={this.state.about_me} handleTextInput={(text) => this._handleAboutMeTextInput(text)}/>
        <View style={styles.editBodyTypeTitleContainer}>
          <Text style={styles.editBodyTypeTitle}>EDIT BODY TYPE</Text>
        </View>
        <View style={styles.container}>
          <BodyMeasureView gender={this.props.user.gender} bodyType={this.props.bodyType} userSize={this.props.user.user_size}/>
        </View>
      </View>
    )
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    saveUserSize: (measurements) => dispatch(saveUserSize(measurements)),
    changeUserAvatar: (data) => dispatch(changeUserAvatar(data)),
    changeUserAboutMe: (data) => dispatch(changeUserAboutMe(data))

  };
}

const mapStateToProps = state => {
  return {
    navigation: state.cardNavigation,
    myUserId: state.user.id,
    stats: state.stats,
    user: state.user,
    bodyType: state.myBodyType.currentBodyType,
  };
};

export default connect(mapStateToProps, bindAction)(EditProfile);
