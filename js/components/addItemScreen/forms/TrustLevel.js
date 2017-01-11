import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Container, Content, Button, Text, Picker, Item, Icon} from 'native-base';
import { Row, Col, Grid } from "react-native-easy-grid";

import styles from './../mystyles';

const trustLevelIcon = require('../../../../images/icons/trust-level.png');

class TrustLevel extends Component {

  static propTypes = {
    trustLevel: React.PropTypes.string,
    updateSelectValue: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (<Container>
              <Content scrollEnabled={false}>
                <Grid style={styles.gridInput}>
                  <Row>
                    <Grid>
                      <Col size={15}>
                        <Image source={trustLevelIcon} style={styles.normalIconImage} />
                      </Col>
                      <Col size={35}>
                        <Text style={[styles.titleLabelInfo, {paddingTop: 10}]}>Trust Level</Text>
                      </Col>
                      <Col size={30}>
                        <Picker
                          style={styles.selectOptions}
                          iosHeader="Select one"
                          mode="dropdown"
                          selectedValue={this.props.trustLevel}
                          onValueChange={(value) => this.props.updateSelectValue('trustLevel', value)}>
                          <Item label="0/5" value="0" />
                          <Item label="1/5" value="1" />
                          <Item label="2/5" value="2" />
                          <Item label="3/5" value="3" />
                          <Item label="4/5" value="4" />
                          <Item label="5/5" value="5" />
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
                      <Col size={85}><Text style={styles.smallTextInput}>Increase sales by upgrading your level</Text></Col>
                    </Grid>
                  </Row>
              </Grid>
              </Content>
            </Container>)
  }

}

export default TrustLevel;
