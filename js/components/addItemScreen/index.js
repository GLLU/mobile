import React, { Component } from 'react';
import { Container, Header, Content, Button, Icon, Title, View } from 'native-base';
import { setUser, replaceAt, popRoute } from '../../actions';
import styles from './styles';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import ActionsBar from './ActionsBar';
import StepsBar from './StepsBar';

class AddItemPage extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    image: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1
    };
  }

  setUser(name) {
    this.props.setUser(name);
  }

  replaceRoute(route) {
    this.setUser(this.state.name);
    this.props.replaceAt('addItemScreen', { key: route }, this.props.navigation.key);
  }

  backToFeedScreen() {
    console.log('Back to FeedScreen');
    this.replaceRoute('feedscreen');
  }

  selectTab(step) {
    console.log('Select Tab');
    if (step > 0 && step < this.state.currentStep) {
      this.setState({currentStep: step});
    }
  }

  continueAction() {
    console.log('CONTINUE');
    this.setState({newTag: false, currentStep: parseInt(this.state.currentStep + 1)});
  }

  tagAnotherAction() {
    console.log(' TAG ANOTHER');
    this.setState({newTag: true})
  }

  publishAction() {
    console.log('Publish');
  }

  getHeadingTitle() {
    let title = '';
    switch (this.state.currentStep) {
      case 1:
        title = 'Add New Item';
        break;
      case 2:
        title = 'Additional Info';
        break;
      default:
        title = '';
    }
    return title;
  }

  _renderActionsContainer() {
    return <ActionsBar continueAction={this.continueAction.bind(this)} tagAnotherAction={this.tagAnotherAction.bind(this)} />;
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title style={{fontFamily: 'PlayfairDisplay-Regular'}}>{this.getHeadingTitle()}</Title>
        </Header>
        <Content scrollEnabled={false} contentContainerStyle={{flex: 1, backgroundColor: '#F2F2F2', justifyContent: 'space-between', paddingVertical: 10}}>
          <View style={styles.mainView}>
            <StepsBar selectTab={this.selectTab.bind(this)} currentStep={this.state.currentStep} />
            {this.state.currentStep == 1 && <StepOne key={1}/>}
            {this.state.currentStep == 2 && <StepTwo key={2}/>}
            {this.state.currentStep == 1 && this._renderActionsContainer()}
          </View>
        </Content>
      </Container>
    );
  }
}

import { connect } from 'react-redux';

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    popRoute: (key) => dispatch(popRoute(key)),
    setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  ...state.uploadLook,
});

export default connect(mapStateToProps, bindActions)(AddItemPage);
