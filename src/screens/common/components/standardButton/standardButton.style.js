import { StyleSheet } from 'react-native';
import { commonStyle } from '../../../../styles/common.style';
import { commonTheme } from '../../../../themes/common.theme';

const componentStyle = StyleSheet.create({
  container: {
    ...commonStyle.contentCenter,
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
  },
  iconStyle: {
    height: 24,
    resizeMode: 'contain',
    width: 24,
  },
  labelStyle: {
    fontSize: 18,
  },
});

export { componentStyle };
