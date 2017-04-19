import 'react-native';
import React from 'react';
import Index from '../index.ios.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

/*global test() */
test('renders correctly', () => {
  renderer.create(
    <Index />
  );
});

