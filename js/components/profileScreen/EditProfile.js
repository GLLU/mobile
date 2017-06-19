import React, {Component} from 'react';
import asScreen from "../common/containers/Screen"
import {
  Image, Animated, InteractionManager, TouchableOpacity, View, Text, TextInput, ScrollView, FormData, Modal } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import BodyMeasureView from '../myBodyMeasure/bodyMeasureView';
import ExpandableTextArea from './ExpandableTextArea';
import EditProfileHeader from './EditProfileHeader';
import EditProfileName from './EditProfileName';
import CircleProfileImage from '../common/avatars/CircleProfileImage';
import InformationTextIcon from '../common/informationTextIcon';
import {openCamera} from '../../lib/camera/CameraUtils'
import { saveUserSize} from '../../actions/myBodyMeasure';
import { changeUserAvatar, changeUserAboutMe } from '../../actions/user';
import BodyTypePicker from "../myBodyType/BodyTypePicker";
import SpinnerSwitch from "../loaders/SpinnerSwitch";

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
  constructor(props) {
    super(props);
    this.toggleBodyTypeModal=this.toggleBodyTypeModal.bind(this);
    this._saveChanges=this._saveChanges.bind(this);
    this.state = {
      about_me: this.props.user.about_me ? this.props.user.about_me : '',
      modalShowing:false,
      isUpdating: false
    }
  }

  _saveChanges(){
    const { user, bodyType } = this.props;
    const measurements = {
      body_type: bodyType.body_type,
      chest: user.user_size.chest,
      waist: user.user_size.waist,
      hips: user.user_size.hips,
      height: user.user_size.height,
      measurements_scale: user.user_size.measurements_scale
    };
    this.setState({isUpdating:true},()=>{
      Promise.all([
        this.props.changeUserAboutMe({id: this.props.user.id, about_me: this.state.about_me}),
        this.props.saveUserSize(measurements)
      ]).then(this.props.goBack)
        .catch((err)=>console.log(err));
    })

  }

  _changeUserAvatar() {
    this.props.logEvent('EditProfileScreen', { name: 'Change avatar click' });
    this.openCamera()
  }

  async openCamera() {
    this.props.logEvent('EditProfileScreen', { name: 'Open Camera click' });
    let image = {};
    image.path = await openCamera(false);
    image.type = 'multipart/form-data'
    const data = {
      image,
      id: this.props.user.id
    };
    this.props.changeUserAvatar(data)

  }

  _handleAboutMeTextInput(text) {
    this.setState({about_me: text})
  }

  _handleAboutMeEndEding() {
    this.props.logEvent('EditProfileScreen', { name: 'Tell us about you' });
  }

  toggleBodyTypeModal=(shouldActive)=>{
    this.props.logEvent('EditProfileScreen', { name: `body type modal is ${shouldActive? 'visible':'hidden'}` });
    this.setState({modalShowing:shouldActive});
  };

  render() {
    return (
      <View style={{backgroundColor: '#E9E9EF'}}>
        <View style={{position: 'absolute', top: 0}}>
          <Image source={profileBackground} style={styles.editProfileBg}>
            <LinearGradient colors={['#0C0C0C', '#4C4C4C']} style={[styles.linearGradient, {opacity: 0.7, height: 150}]} />
            <EditProfileHeader cancelEdit={this.props.goBack} save={this._saveChanges} />
          </Image>
        </View>
        <CircleProfileImage avatarUrl={this.props.user.avatar.url} changeUserAvatar={() => this._changeUserAvatar()} editable={true}/>
        <ScrollView
          style={[styles.scrollView]}
        >
          <EditProfileName name={this.props.user.name} username={this.props.user.username} />
          <ExpandableTextArea
            text={this.state.about_me}
            onEndEditing={this._handleAboutMeEndEding.bind(this)}
            handleTextInput={(text) => this._handleAboutMeTextInput(text)}
          />
          <View style={styles.editBodyTypeTitleContainer}>
            <Text style={styles.editBodyTypeTitle}>EDIT BODY SHAPE</Text>
          </View>
          <View style={styles.bodyMeasureContainer}>
            <BodyMeasureView gender={this.props.user.gender} bodyType={this.props.bodyType} userSize={this.props.user.user_size} onBodyTypePress={()=>this.toggleBodyTypeModal(true)}/>
          </View>
          <View style={styles.privateInfoContainer}>
            <InformationTextIcon text={'This information is private to you only'} />
          </View>
        </ScrollView>
        <Modal animationType='slide' visible={this.state.modalShowing} style={{justifyContent: 'flex-start', alignItems: 'center'}} onRequestClose={()=>this.toggleBodyTypeModal(false)}>
          <BodyTypePicker goBack={()=>this.toggleBodyTypeModal(false)} onPick={()=>this.toggleBodyTypeModal(false)}/>
        </Modal>
        {this.state.isUpdating?<SpinnerSwitch/>:null}
      </View>
    )
  }
}

function bindAction(dispatch) {
  return {
    saveUserSize: (measurements) => dispatch(saveUserSize(measurements)),
    changeUserAvatar: (data) => dispatch(changeUserAvatar(data)),
    changeUserAboutMe: (data) => dispatch(changeUserAboutMe(data))

  };
}

const mapStateToProps = state => {
  return {
    cardNavigation: state.cardNavigation,
    myUserId: state.user.id,
    stats: state.stats,
    user: state.user,
    bodyType: state.myBodyType.currentBodyType,
  };
};

export default connect(mapStateToProps, bindAction)(asScreen(EditProfile));