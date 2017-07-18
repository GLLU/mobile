// @flow

import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ItemBrand from "./ItemBrand";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

type Props = {
  brands: Array<object>
}

class ItemBrandsView extends PureComponent {

  props: Props;

  render() {
    const {brands, style} = this.props;
    return (
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={style}
                  contentContainerStyle={styles.container}>
        {_.map(brands, brand => <ItemBrand key={brand.id} style={{marginHorizontal: 10}} brand={brand}/>)}
      </ScrollView>
    );
  }
}

export default ItemBrandsView;

