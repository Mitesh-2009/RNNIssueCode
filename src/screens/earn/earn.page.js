import React from "react";
import { Button, Text, View } from "react-native";
import screenId from "../../constants/screen.id.enum";
import { commonStyle } from "../../styles/common.style";
import { commonTheme } from "../../themes/common.theme";
import NavigationUtil from "../../utils/navigation.util";
import { BasePage } from "../common/base.page";
import { StandardButton } from "../common/components";
import { NotchPushComponent } from "../common/components/basic";

export default class EarnPage extends BasePage {
  constructor(props) {
    super(props, {});
  }

  render() {
    return (
      <View style={[commonStyle.container]}>
        <NotchPushComponent />
        <Text>Earn Page</Text>
        <StandardButton
          width={"auto"}
          showCompact
          isBottomButton={true}
          color={commonTheme.COLOR_SECONDARY}
          labelText={"Show Alert"}
          onPress={() => {
            return NavigationUtil.showAlert({messageText: "Hello React native navigation team...."});
          }} />
      </View>
    );
  }
}

