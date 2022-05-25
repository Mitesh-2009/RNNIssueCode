import React from "react";
import { Text, View } from "react-native";
import { commonStyle } from "../../styles/common.style";
import { BasePage } from "../common/base.page";
import { NotchPushComponent } from "../common/components/basic";
import { pageStyle } from "./menu.page.style";

export default class MenuPage extends BasePage {
  constructor(props) {
    super(props, {});
  }

  render() {
    return (
      <View style={[commonStyle.container, pageStyle.mainContainer]}>
        <NotchPushComponent />
        <Text style={{color: 'white'}}>Menu Page</Text>
      </View>
    );
  }
}
