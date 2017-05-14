'use strict';

import React, { Component } from 'react';
import { Image,View, Text } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";

import styles from './styles';

const RECTANGLE_SHAPE = require('../../../../images/types/RECTANGLE_SHAPE_WHITE.png');
const APPLE_SHAPE = require('../../../../images/types/APPLE_SHAPE_WHITE.png');
const FULL_HOURGLASS_SHAPE = require('../../../../images/types/FULL_HOURGLASS_SHAPE_WHITE.png');
const INVERTED_TRIANGLE = require('../../../../images/types/INVERTED_TRIANGLE_WHITE.png');
const LEAN_COLUMN_SHAPE = require('../../../../images/types/LEAN_COLUMN_SHAPE_WHITE.png');
const NEAT_HOURGLASS_SHAPE = require('../../../../images/types/NEAT_HOURGLASS_SHAPE_WHITE.png');
const PEAR_SHAPE= require('../../../../images/types/PEAR_SHAPE_WHITE.png');


class TypeView extends Component {

  static propTypes = {
    type: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      types: [
        { name: 'rectangle', img: RECTANGLE_SHAPE },
        { name: 'apple', img: APPLE_SHAPE },
        { name: 'full hour glass', img: FULL_HOURGLASS_SHAPE },
        { name: 'inverted triangle', img: INVERTED_TRIANGLE },
        { name: 'lean column', img: LEAN_COLUMN_SHAPE },
        { name: 'neat hourglass', img: NEAT_HOURGLASS_SHAPE },
        { name: 'pear', img: PEAR_SHAPE }
      ]
    }
  }

  render() {
    let bgContainer = null;
    let typeLabel = null;
    this.state.types.map((type) => {
      if (this.props.type === type.name) {
        bgContainer = type.img;
        typeLabel = type.text;
        return false;
      }
    });
    return (<View style={styles.typeContainer}>
              <Grid>
                <Col>
                  <Image source={bgContainer} style={styles.typeImage} />
                </Col>
              </Grid>
            </View>)
  }
}

export default TypeView;
