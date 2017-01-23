import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    updateSelectValue: React.PropTypes.func,
    countries: React.PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  render () {
    let flagIcon = null;
    this.props.countries.map((c) => {
      if (c.name == this.props.location) {
        flagIcon = c.icon;
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
                  <Col size={25}>
                    <Picker
                        style={styles.selectOptions}
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={this.props.location}
                        onValueChange={(value) => this.props.updateSelectValue('location', value)}>
                        {this.props.countries.map((c, i) => {
                          return <Item key={i} label={c.text} value={c.name} />
                        })}
                    </Picker>
                  </Col>
                  <Col size={10}>
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

function bindActions(dispatch) {
  return {
  };
}

const mapStateToProps = state => {
  return {
    countries: state.formData.countries,
  };
};

export default connect(mapStateToProps, bindActions)(Location);
