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
    setTimeout(()=> {
      this.props.changeBodyType(index);
    }, 200);
  }

  _changeTitleAndDescription(type) {
    setTimeout(()=> {
      if(this.state.currBodyType !== type.name){
        this.setState({currBodyType: type.name, currDescription: type.description})
      }
    }, 200);
  }
  render() {
    return (
      <Container theme={glluTheme}>
        <Header>
          <Title style={{fontFamily: 'PlayfairDisplay-Regular'}}>My Body Type</Title>
        </Header>
        <Content>
          <Text style={styles.selectBodyTypeText}>Choose your body shape to find fashion that fits you</Text>
          <View style={styles.container}>
            <ArrowTextBox title={this.state.currBodyType} description={this.state.currDescription} />
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
          </View>
          <View style={{marginTop: 15}}>
            <InformationTextIcon text={'This information is private to you only'} />
          </View>
          <Button block primary style={styles.continueButton}
            onPress={() => this.pushRoute('myBodyMeasure')}>Continue</Button>
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
