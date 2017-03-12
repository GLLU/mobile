import React, {Component} from 'react';
import BasePage from '../common/BasePage';
import {Container, Header, Content, Button, Icon, Title } from 'native-base';
import {Text, View} from 'react-native';
import styles from './styles';
import glluTheme from '../../themes/gllu-theme';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { changeBodyType } from '../../actions/myBodyType';
const { popRoute, pushRoute } = actions;

import HorizontalCarousel from './horizontalCarousel/horizontalCarousel';
import CarouselItem from './horizontalCarousel/carouselItem';
import ArrowTextBox from './arrowTextBox';
import InformationTextIcon from '../common/informationTextIcon';


class MyBodyType extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      currBodyType: '',
      currDescription: ''
    }
  }

  static propTypes = {
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    changeBodyType: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    bodyTypes: React.PropTypes.object,
    currentBodyType: React.PropTypes.object,
    currentIndex: React.PropTypes.number,
    gender: React.PropTypes.string
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  _bodyTypeChange(index) {
    const { gender, bodyTypes } = this.props
    const bodyType = bodyTypes[gender][index];
    this.logEvent('ChooseBodyTypeScreen', { name: 'Select bodyType', bodyType: bodyType.name });
    setTimeout(()=> {
      let data = {
        index,
        gender
      }
      this.props.changeBodyType(data);
    }, 200);
  }

  _changeTitleAndDescription(type) {
    setTimeout(()=> {
      if(this.state.currBodyType !== type.name){
        this.setState({currBodyType: type.name, currDescription: type.description})
      }
    }, 200);
  }

  handleContinuePress() {
    this.logEvent('ChooseBodyTypeScreen', { name: 'Continue click' });
    this.pushRoute('myBodyMeasure');
  }

  render() {
    return (
      <Container theme={glluTheme}>
        <Header style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <Title style={{fontFamily: 'PlayfairDisplay-Regular', alignSelf: 'center'}}>My Body Type</Title>
          </View>
        </Header>
        <Content>
          <View style={styles.container}>

            <HorizontalCarousel pageStyle={ {backgroundColor: "white", borderRadius: 5}}
              sneak={100} initialPage={this.props.currentIndex}
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
          <Button block primary style={styles.continueButton}
            onPress={this.handleContinuePress.bind(this)}>Continue</Button>
        </Content>
      </Container>
    )
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    changeBodyType: index => dispatch(changeBodyType(index))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  bodyTypes: state.myBodyType.bodyTypes,
  currentBodyType: state.myBodyType.currentBodyType,
  currentIndex: state.myBodyType.currentIndex,
  gender: state.user.gender
});

export default connect(mapStateToProps, bindAction)(MyBodyType);
