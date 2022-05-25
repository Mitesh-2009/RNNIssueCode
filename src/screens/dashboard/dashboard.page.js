import React from "react";
import { Text, View } from "react-native";
import { commonStyle } from "../../styles/common.style";
import { BasePage } from "../common/base.page";
import { NotchPushComponent } from "../common/components/basic";

export default class DashboardPage extends BasePage {

  constructor(props) {
    super(props, {});
  }

  render() {
    return (
      <View style={commonStyle.container}>
        <NotchPushComponent />
        <Text>Home Page</Text>
      </View>
    );
  }
}
