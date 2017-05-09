import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { connect } from 'react-redux';
import { Container, Content} from 'native-base';
import { popRoute } from '../../actions';

class BadNavigationScreen extends BasePage {

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {index, routes}=this.props.navigation;
    this.logEvent('BadNavigationScreen', {name: `Should have reached to '${routes[index].key}'`});
    this.goBack()
  }

  render() {
    return (
      <Container >
        <Content >
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

  export default connect(mapStateToProps, bindActions)(BadNavigationScreen);
