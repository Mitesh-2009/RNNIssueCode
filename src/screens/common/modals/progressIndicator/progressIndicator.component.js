import React from "react";
import { View } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { store } from "../../../../config/reduxStore/configure.store";
import { updateProgress } from "../../../../config/reduxStore/reducers";
import { commonStyle } from "../../../../styles/common.style";
import { commonTheme } from "../../../../themes/common.theme";
import { BaseModal } from "../base.modal";

export default class ProgressIndicator extends BaseModal {
  constructor(props) {
    super(props, false);
    this.unsubscribe = store.subscribe(() => {
      if (this.closeDelay) {
        clearTimeout(this.closeDelay);
      }
      this.closeDelay = setTimeout(async () => {
        let state = store.getState();
        if (state.commonDataStore.progressIndicator === 0) {
          await this.close();
        }
      }, 100);
    });
  }

  componentDidMount() {
    super.componentDidMount();
    store.dispatch(updateProgress(true));
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    store.dispatch(updateProgress(false));
  }

  render() {
    return (
      <View style={{
        ...commonStyle.contentCenter,
        ...commonStyle.modalScreenContainer,
        backgroundColor: commonTheme.COLOR_DARK + "7F",
        paddingHorizontal: 32,
        paddingVertical: 64,
      }}>
        <UIActivityIndicator
          size={48}
          count={16}
          color={commonTheme.COLOR_BRIGHT}
          animationDuration={900}
        />
      </View>
    );
  }
}
