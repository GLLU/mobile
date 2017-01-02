import React, {Component} from 'react';
import {Container, Header, Content, Button, Icon, Title, Grid, Col } from 'native-base';
import {Dimensions, Text, View, Image} from 'react-native';
import myStyles from './styles';
import gluuTheme from '../../themes/gluu-theme';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { saveUserSize} from '../../actions/myBodyMeasure';

import EditSizeView from './edit/editSizeView';
import MainSizeView from './mainSizeView';
import InformationTextIcon from '../common/informationTextIcon';

const deviceWidth = Dimensions.get('window').width;

const { popRoute, pushRoute } = actions

class MyBodyMeasure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      typeEdit: null,
      sizeInitValue: null
    }
  }

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    isEdit: React.PropTypes.bool,
    currentSize: React.PropTypes.object,
    currentBodyType: React.PropTypes.object,
    gender: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    toggleEditSize: React.PropTypes.func,
    saveUserSize: React.PropTypes.func
  }

  popRoute() {
    this.props.toggleEditSize(false, null);
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  _saveUserSize() {
    const { currentSize, currentBodyType } = this.props;
    console.log('currentSize:', currentSize);
    const data = {
      body_type: currentBodyType.uniqueName,
      size: currentSize.name.toLowerCase(),
      chest: currentSize.chest,
      waist: currentSize.waist,
      hips: currentSize.hips,
      height: currentSize.height,
      measurements_scale: currentSize.measurements_scale
    };
    this.props.saveUserSize(data);
  }

  _toggleEditSize(sizeEdit, sizeInitValue) {
    let toggleEdit = !this.state.isEdit;
    this.setState({isEdit: toggleEdit, sizeEdit: sizeEdit, sizeInitValue: sizeInitValue})
  }

  render() {
    const w = deviceWidth / 2 - 30;
    return (
      <Container theme={gluuTheme}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>My Body Measures</Title>
        </Header>
        <Content>
          <Text style={myStyles.selectBodyTypeText}>This will help us find unique items for a perfect fit</Text>
          <View style={myStyles.container}>
            <Grid>
              <Col>
              <View style={{width: w}}>
                <Image style={{width: w, height: 350}}
                   source={this.state.isEdit ? this.props.currentBodyType.imageEditUrl
                                            : this.props.currentBodyType.imageOriUrl} resizeMode={'contain'}/>
              </View>
              </Col>
              <Col>
                <Image source={this.props.currentBodyType.shapeActive} style={{height: 30, width: 30, marginBottom: 10, resizeMode: 'contain'}}/>
                <Text style={myStyles.bodyTypeText}>{this.props.currentBodyType.name}</Text>
                {this.state.isEdit
                  ? <EditSizeView gender={this.props.gender}
                     bodyTypeName={this.props.currentBodyType.uniqueName}
                     currentSize={this.props.currentSize}
                     typeEdit={this.state.sizeEdit}
                     sizeInitValue={this.state.sizeInitValue}
                     toggleEditSize={(type,sizeInit) => this._toggleEditSize(type,sizeInit)}/>
                  : <MainSizeView gender={this.props.gender}
                    bodyTypeName={this.props.currentBodyType.uniqueName}
                    typeEdit={this.state.sizeEdit}
                    sizeInitValue={this.state.sizeInitValue}
                    toggleEditSize={(type,sizeInit) => this._toggleEditSize(type,sizeInit)}/>}
              </Col>
            </Grid>
          </View>
          <View style={{marginTop: 15}}>
            <InformationTextIcon text={'This information is private to you only'} />
          </View>
          <Button block primary style={myStyles.continueButton} onPress={(e) => this._saveUserSize(e)}>All Set. Let's GLUU !</Button>
        </Content>
      </Container>
    )
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    saveUserSize: (measurements) => dispatch(saveUserSize(measurements))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  currentSize: state.myBodyMeasure.current,
  currentBodyType: state.myBodyType.currentBodyType,
  gender: state.myBodyType.gender
});

export default connect(mapStateToProps, bindAction)(MyBodyMeasure);
