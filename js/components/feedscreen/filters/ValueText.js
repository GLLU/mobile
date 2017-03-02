'use strict';

import React, { Component } from 'react';
import { Text } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

class ValueText extends Component {
  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number
  }

  render() {
    const {min, max} = this.props;
    return (
      <Grid style={{paddingLeft: 10, paddingRight: 10}}>
        <Col size={80}>
          <Text>
            ₤ {min}
          </Text>
        </Col>
        <Col size={20}>
          <Text>
            ₤ {max}
          </Text>
        </Col>
      </Grid>
    );
  }
}

export default ValueText;
