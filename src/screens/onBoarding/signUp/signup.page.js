import React from "react";
import { Text, View } from "react-native";
import { commonStyle } from "../../../styles/common.style";
import { AuthBasePage } from "../../common/authBase.page";
import { NotchPushComponent } from "../../common/components/basic";

export default class SignUpPage extends AuthBasePage {
  constructor(props) {
    super(props, {});
  }

  render() {
    return (
      <View style={commonStyle.container}>
        <NotchPushComponent />
        <Text>Signup Page</Text>
      </View>
    );
  }
}

