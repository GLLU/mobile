import React, {Component} from 'react';
import { Image, Animated, InteractionManager, TouchableOpacity, Text, TextInput} from 'react-native';
import styles from './styles';
import { View } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import { getStats } from '../../actions/user';
import Icon from 'react-native-vector-icons/FontAwesome';
import BodyMeasureView from '../myBodyMeasure/bodyMeasureView';
import { saveUserSize} from '../../actions/myBodyMeasure';
import { changeUserAvatar, changeUserAboutMe } from '../../actions/user';

const profileBackground = require('../../../images/backgrounds/profile-screen-background.jpeg');
const cancelEdit = require('../../../images/icons/cancelEdit.png');
const cameraWhite = require('../../../images/icons/cameraWhite.png');
const { popRoute } = actions;

class EditProfile extends Component {
  static propTypes = {
    user: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.user.about_me.length > 0 ? this.props.user.about_me : 'Please add About me',
      height: 0
    }
  }

  _PopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  saveChanges(){
    const { user, bodyType } = this.props;
    const data = {
      body_type: bodyType.uniqueName,
      chest: user.user_size.chest,
      waist: user.user_size.waist,
      hips: user.user_size.hips,
      height: user.user_size.height,
      measurements_scale: user.user_size.measurements_scale
    };
    this.props.changeUserAboutMe({id: this.props.user.id, about_me: this.state.text});
    this.props.saveUserSize(data);
  }

  changeUserAvatar() {
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

  _renderleftBtn() {
    return  <Image source={cancelEdit} style={styles.cancelEdit} />
  }

  _renderRightBtn() {
     return (
       <View style={{width: 40, height: 40, backgroundColor: '#00D7B2', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 20}}>
        <Icon size={20} color={'white'} name={'check'}/>
       </View>
     )
  }

  render() {
    return (
      <View>
        <Image source={profileBackground} style={styles.editProfileBg}>
          <LinearGradient colors={['#0C0C0C', '#4C4C4C']} style={[styles.linearGradient, {opacity: 0.7}]} />
          <View style={styles.header}>
            <TouchableOpacity transparent onPress={() => this._PopRoute()} style={styles.headerBtn}>
            { this._renderleftBtn() }
            </TouchableOpacity>
            <TouchableOpacity transparent onPress={() => this.saveChanges()} style={styles.headerBtn}>
            { this._renderRightBtn() }
            </TouchableOpacity>
          </View>
        </Image>
        <TouchableOpacity transparent onPress={() => this.changeUserAvatar()} style={styles.editProfileAvatarImg}>
          <Image source={{uri: this.props.user.avatar.url}} style={[styles.avatarImg, styles.editAvatarImage]} >
            <View style={{width: 100, height: 100, opacity: 0.8, backgroundColor: '#00D7B2', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 20}}>
              <Image source={cameraWhite} style={styles.profilePicBtn} resizeMode={'contain'} />
            </View>
          </Image>
        </TouchableOpacity>
        <View style={{top: 60}}>
          <View style={styles.editNameContainer}>
            <Text style={styles.editName}>{this.props.user.name}</Text>
          </View>
          <Text style={styles.editUsername}>@{this.props.user.username}</Text>
        </View>
        <View style={styles.editDescriptionContainer}>
          <TextInput style={{ height: this.state.height, fontSize: 14, lineHeight: 20 }} maxLength={180} numberOfLines={5} multiline={true} value={this.state.text} onChangeText={(text) => this.setState({text})} onContentSizeChange={(event) => this.setState({height: event.nativeEvent.contentSize.height})} editable={true} />
        </View>
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
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
    getStats: (id) => dispatch(getStats(id)),
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
