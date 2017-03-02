import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { View, Container, Content, Button, Text, Picker, Icon} from 'native-base';
import { Row, Col, Grid } from "react-native-easy-grid";
const Item = Picker.Item;
import FontSizeCalculator from './../../../calculators/FontSize';

const trustLevelIcon = require('../../../../images/icons/trust-level.png');

class TrustLevel extends Component {

  static propTypes = {
    trustLevel: React.PropTypes.string,
    updateSelectValue: React.PropTypes.func,
    trustLevels: React.PropTypes.array,
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
                      <Col size={34}>
                        <Picker
                          style={styles.selectOptions}
                          iosHeader="Select one"
                          mode="dropdown"
                          selectedValue={this.props.trustLevel}
                          onValueChange={(value) => this.props.updateSelectValue('trustLevel', value)}>
                          {this.props.trustLevels.map((t, i) => {
                            return <Item key={i} label={t.name} value={t.value} />
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
                      <Col size={85}><Text style={styles.smallTextInput}>Increase sales by upgrading your level</Text></Col>
                    </Grid>
                  </Row>
              </Grid>
              </Content>
            </Container>)
  }

}

function bindActions(dispatch) {
  return {
  };
}

const mapStateToProps = state => {
  return {
    trustLevels: state.filters.trustLevels,
  };
};

export default connect(mapStateToProps, bindActions)(TrustLevel);


const styles = StyleSheet.create({
  gridInput: {
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  smallTextInput: {
    fontFamily: 'Montserrat',
    color: '#a6a6a6',
    fontWeight: '300',
    fontSize: new FontSizeCalculator(13).getSize(),
    marginTop: 10,
  },
  normalIconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 5
  },
  flagSelectOptions: {
    width: 40,
    height: 30,
    marginLeft: 10,
    marginTop: 5,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  titleLabelInfo: {
    fontFamily: 'Montserrat',
    fontSize: new FontSizeCalculator(15).getSize(),
    color: '#7f7f7f',
    fontWeight: '300',
    marginBottom: 8
  },
});