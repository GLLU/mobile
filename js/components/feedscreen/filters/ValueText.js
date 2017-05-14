'use strict';

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";

import styles from '../styles';

class ValueText extends Component {
  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number
  }

  onChange(min, max) {
    this.setState({min, max});
  }

  render() {
    const {min, max} = this.props;
    return (
      <Grid style={{paddingLeft: 10, paddingRight: 10}}>
        <Col size={80}>
          <Text style={styles.legendLabel}>
            ₤ {min}
          </Text>
        </Col>
        <Col size={20}>
          <Text style={styles.legendLabel}>
            ₤ {max}
          </Text>
        </Col>
      </Grid>
    );
  }
}

export default ValueText;
