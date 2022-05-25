import React from "react";
import { Button, View } from "react-native";
import screenId from "../../../constants/screen.id.enum";
import { commonStyle } from "../../../styles/common.style";
import { commonTheme } from "../../../themes/common.theme";
import NavigationUtil from "../../../utils/navigation.util";
import { AuthBasePage } from "../../common/authBase.page";
import { StandardButton } from "../../common/components";
import { NotchPushComponent } from "../../common/components/basic";

export default class LoginPage extends AuthBasePage {
  constructor(props) {
    super(props, {});
  }

  render() {
    return (
      <View style={commonStyle.container}>
        <NotchPushComponent />
        <View>
          <StandardButton
            width={"auto"}
            color={commonTheme.COLOR_PRIMARY}
            labelText={"Login"}
            onPress={() => {
              return NavigationUtil.gotoBottomTabsNavigation();
            }} />
          <StandardButton
            width={"auto"}
            showCompact
            isBottomButton={true}
            color={commonTheme.COLOR_SECONDARY}
            labelText={"Go to Signup"}
            onPress={() => {
              return NavigationUtil.gotoScreen(this.props.componentId, screenId.OnBoarding.SignUp.SignUpPage);
            }} />
        </View>
      </View>
    );
  }
}
