'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, Dimensions } from 'react-native';
import { View } from 'native-base';
import Modal from 'react-native-modalbox';
import FilterBar from './filters/FilterBar';
import ImagesView from './items/ImagesView';
import MyBodyModal from '../common/myBodyModal'
import styles from './styles';
import _ from 'lodash';
import { showBodyTypeModal } from '../../actions/myBodyType';
import TabContent from './TabContent';


class AllTab extends TabContent {

}

export default AllTab;