import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Container, Content, Button, Text, Picker, Item, Icon} from 'native-base';
import { Row, Col, Grid } from "react-native-easy-grid";

import styles from './styles';

const us = require('../../../../images/flags/us.png');
const uk = require('../../../../images/flags/uk.png');
const locationIcon = require('../../../../images/icons/location.png');

class Location extends Component {

  static propTypes = {
    location: React.PropTypes.string,
    updateSelectValue: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      flags: [
          {name: 'uk', icon: uk},
          {name: 'us', icon: us}
        ]
    }
  }

  render () {
    let flagIcon = null;
    this.state.flags.map((flag) => {
      if (flag.name == this.props.location) {
        flagIcon = flag.icon;
      }
    });
    return (
      <Container>
        <Content scrollEnabled={false}>
          <Grid style={styles.gridInput}>
              <Row>
                <Grid>
                  <Col size={15}>
                    <Image source={locationIcon} style={styles.normalIconImage} />
                  </Col>
                  <Col size={35}>
                    <Text style={[styles.titleLabelInfo, {paddingTop: 10}]}>Location</Text>
                  </Col>
                  <Col size={10}>
                    <Image source={flagIcon} style={styles.flagSelectOptions} />
                  </Col>
                  <Col size={20}>
                    <Picker
                      style={styles.selectOptions}
                      iosHeader="Select one"
                      mode="dropdown"
                      selectedValue={this.props.location}
                      onValueChange={(value) => this.props.updateSelectValue('location', value)}>
                      <Item label="UK" value="uk" />
                      <Item label="US" value="us" />
                    </Picker>
                  </Col>
                  <Col size={20}>
                    <Icon style={[styles.arrowSelect, {textAlign: 'center'}]} name='ios-arrow-forward-outline' />
                  </Col>
                </Grid>
              </Row>
              <Row>
                <Grid>
                  <Col size={15} />
                  <Col size={85}><Text style={styles.smallTextInput}>Keep country updated to increase sales</Text></Col>
                </Grid>
              </Row>
          </Grid>
        </Content>
      </Container>
    )
  }

}

export default Location;
