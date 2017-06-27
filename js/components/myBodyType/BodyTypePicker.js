import React, {Component} from 'react';
import withAnalytics from '../common/analytics/WithAnalytics'
import {Container, Header, Content, Button, Icon, Title,StyleProvider, getTheme } from 'native-base';
import {Text, View, StyleSheet} from 'react-native';
import styles from './styles';
import glluTheme from '../../themes/gllu-theme';

import { connect } from 'react-redux';
import { changeBodyType } from '../../actions/myBodyType';

import HorizontalCarousel from './horizontalCarousel/horizontalCarousel';
import CarouselItem from './horizontalCarousel/carouselItem';
import ArrowTextBox from './arrowTextBox';
import * as _ from "lodash";


class BodyTypePicker extends Component {
  constructor(props) {
    super(props);
    this.renderBackButton=this.renderBackButton.bind(this);
    this.state = {
      currBodyType: '',
      currDescription: ''
    }
  }

  static propTypes = {
    changeBodyType: React.PropTypes.func,
    onPick: React.PropTypes.func,
    bodyTypes: React.PropTypes.object,
    currentBodyType: React.PropTypes.object,
    currentIndex: React.PropTypes.number,
    gender: React.PropTypes.string,
    goBack: React.PropTypes.func
  }

  static defaultProps = {
    onPick: _.noop,
  }

  _bodyTypeChange(index) {
    const { gender, bodyTypes } = this.props;
    const bodyType = bodyTypes[gender][index];
    this.props.logEvent('ChooseBodyTypeScreen', { name: 'Select bodyType', bodyType: bodyType.name });
    setTimeout(()=> {
      let data = {
        index,
        gender
      }
      this.props.changeBodyType(data);
    }, 0);
  }

  _changeTitleAndDescription(type) {
    setTimeout(()=> {
      if(this.state.currBodyType !== type.name){
        this.setState({currBodyType: type.name, currDescription: type.description})
      }
    }, 0);
  }

  handleContinuePress() {
    this.props.logEvent('ChooseBodyTypeScreen', { name: 'Continue click' });
    this.props.onPick();
  }

  renderBackButton(){
    return(
      <Button transparent onPress={this.props.goBack} style={{borderWidth: 0,flex:1, alignSelf:'center'}}>
        <Icon style={StyleSheet.flatten(styles.headerArrow)} name="ios-arrow-back" />
      </Button>
    );
  }

  render() {
    return (
      <Container theme={glluTheme}>
        <View style={{height:60,backgroundColor:'#f0f0f0'}}>
          <View style={styles.header} >
            {this.props.goBack!==undefined? this.renderBackButton():<View name='spacer' style={{flex:1}}/>}
            <Text style={[styles.headerTitle,{flex:2,textAlign:'center'}]}>My Body Shape</Text>
            <View name='spacer' style={{flex:1}}/>
          </View>
        </View>
        <StyleProvider style={getTheme(glluTheme)}>
        <Content>
          <View style={styles.container}>
            <HorizontalCarousel pageStyle={ {backgroundColor: "white", borderRadius: 5}}
                                sneak={100} initialPage={this.props.currentIndex ? this.props.currentIndex : 3}
                                currentPage={this.props.currentIndex} onPageChange={this._bodyTypeChange.bind(this)}>
              {this.props.bodyTypes[this.props.gender].map((img, i) => {
                const isActive = i === this.props.currentIndex;
                isActive ? this._changeTitleAndDescription(img) : null
                return (
                  <CarouselItem key={i} item={img} itemActive={isActive}/>
                )
              })}
            </HorizontalCarousel>
            <ArrowTextBox title={this.state.currBodyType} description={this.state.currDescription} />
          </View>
          <Button block primary style={StyleSheet.flatten(styles.continueButton)}
                  onPress={this.handleContinuePress.bind(this)}>
            <Text style={{color:'white'}}>Continue</Text>
          </Button>
        </Content>
        </StyleProvider>
      </Container>
    )
  }
}

function bindAction(dispatch) {
  return {
    changeBodyType: index => dispatch(changeBodyType(index))
  };
}

const mapStateToProps = state => ({
  bodyTypes: state.myBodyType.bodyTypes,
  currentBodyType: state.myBodyType.currentBodyType,
  currentIndex: state.myBodyType.currentIndex,
  gender: state.user.gender
});

export default connect(mapStateToProps, bindAction)(withAnalytics(BodyTypePicker));
