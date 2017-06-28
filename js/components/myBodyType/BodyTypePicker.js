import React, {Component} from 'react';
import withAnalytics from '../common/analytics/WithAnalytics'
import {Container, Content, Button, Icon, Title,StyleProvider, getTheme } from 'native-base';
import {Text, View, StyleSheet} from 'react-native';
import styles from './styles';
import glluTheme from '../../themes/gllu-theme';

import { connect } from 'react-redux';
import { changeBodyType } from '../../actions/myBodyType';

import HorizontalCarousel from './horizontalCarousel/horizontalCarousel';
import CarouselItem from './horizontalCarousel/carouselItem';
import ArrowTextBox from './arrowTextBox';
import * as _ from "lodash";
import Header from "../common/containers/ModalHeader";


class BodyTypePicker extends Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <Container theme={glluTheme}>
        <Header title='My Body Shape' goBack={this.props.goBack}/>
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
            <Text style={{color:'white'}}>Choose</Text>
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
