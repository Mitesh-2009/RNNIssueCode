import PropTypes from "prop-types";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { commonTheme } from "../../../../themes/common.theme";
import { StandardButton } from "../../components";
import { BaseModal } from "../base.modal";
import { componentStyle } from "./commonAlert.style";

const _propTypes = {
  alertTitle: PropTypes.string,
  disableLeftButton: PropTypes.bool,
  disableRightButton: PropTypes.bool,
  leftButtonText: PropTypes.string,
  messageText: PropTypes.string,
  onDismiss: PropTypes.func,
  onLeftButtonPress: PropTypes.func,
  onRightButtonPress: PropTypes.func,
  rightButtonText: PropTypes.string,
};
const _defaultProps = {
  alertTitle: "",
  disableLeftButton: false,
  disableRightButton: false,
  leftButtonText: "Cancel",
  messageText: "",
  onDismiss: null,
  onLeftButtonPress: null,
  onRightButtonPress: () => null,
  rightButtonText: "Okay",
};

export default class CommonAlert extends BaseModal {
  constructor(props) {
    super(props);

    this.state = {
      showDebug: false,
    };
  }

  _onLeftButtonPress = async () => {
    return this.close()
      .then(() => this.props.onLeftButtonPress());
  };

  _onRightButtonPress = async () => {
    return this.close()
      .then(() => this.props.onRightButtonPress());
  };

  _onDismiss = async () => {
    return this.close()
      .then(() => this.props.onDismiss());
  };

  render() {
    return (
      <View style={[componentStyle.backdrop]}>
        <View style={[componentStyle.container]}>
          {!!this.props.alertTitle || !!this.props.onDismiss ?
            <View style={componentStyle.titleCloseButtonContainer}>
              {!!this.props.alertTitle ?
                <View style={componentStyle.titleContainer}>
                  <Text style={componentStyle.titleTextStyle}>
                    {this.props.alertTitle}
                  </Text>
                </View> : null}
              {!!this.props.onDismiss ?
                <TouchableOpacity activeOpacity={.8} style={[componentStyle.closeButton]} onPress={this._onDismiss}>
                  <Text>Close</Text>
                </TouchableOpacity> :
                null}
            </View> :
            null}
          <View style={componentStyle.messageMainContainer}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={[componentStyle.listView]}>
              <View style={componentStyle.messageSubContainer}>
                <Text style={componentStyle.messageTextStyle}>
                  {this.props.messageText}
                </Text>
              </View>
            </ScrollView>
          </View>
          <View style={componentStyle.buttonContainer}>
            {!!this.props.onLeftButtonPress ?
              <StandardButton style={componentStyle.buttonStyle} disabled={this.props.disableLeftButton} width={"auto"} showCompact
                              isBottomButton={true}
                              color={commonTheme.COLOR_SECONDARY}
                              labelText={this.props.leftButtonText} onPress={this._onLeftButtonPress} /> :
              null
            }
            <StandardButton style={componentStyle.buttonStyle} disabled={this.props.disableRightButton} width={"auto"} showCompact
                            isBottomButton={true} color={commonTheme.COLOR_PRIMARY_DARK}
                            labelText={this.props.rightButtonText} onPress={this._onRightButtonPress} />
          </View>
        </View>
      </View>
    );
  }
}

CommonAlert.propTypes = _propTypes;
CommonAlert.defaultProps = _defaultProps;
