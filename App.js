import React from "react";
import { StatusBar } from "react-native";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { store } from "./src/config/reduxStore/configure.store";
import screenId from "./src/constants/screen.id.enum";
import { LoginPageWithRedux } from "./src/screens/auth";
import { CommonAlert, ProgressIndicator, SimpleSelector } from "./src/screens/common/modals";
import { DashboardPageWithRedux } from "./src/screens/dashboard";
import { EarnPageWithRedux } from "./src/screens/earn";
import { MenuPageWithRedux } from "./src/screens/menu";
import { SignUpPageWithRedux } from "./src/screens/onBoarding";
import NavigationUtil from "./src/utils/navigation.util";

export class App {
  constructor() {
    this._registerComponents();
    // this must be the first action in the application lifecycle initiation
    Navigation.events()
      .registerAppLaunchedListener(async () => {
        await this._setGlobalProperties();
        NavigationUtil.setDefaultOptions();
        await NavigationUtil.showLoginPageAtStartUp();
      });
  }

  _registerComponents() {
    // this is the first screen component, so registering it first so that the app screen can be launched
    Navigation.registerComponent(screenId.Auth.Login.LoginPage, () => this.getComponentProvider(LoginPageWithRedux));
    Navigation.registerComponent(screenId.Dashboard.Page, () => this.getComponentProvider(DashboardPageWithRedux));
    Navigation.registerComponent(screenId.OnBoarding.SignUp.SignUpPage, () => this.getComponentProvider(SignUpPageWithRedux));
    Navigation.registerComponent(screenId.Menu.Page, () => this.getComponentProvider(MenuPageWithRedux));
    Navigation.registerComponent(screenId.Earn.Page, () => this.getComponentProvider(EarnPageWithRedux));

    Navigation.registerComponent(screenId.Overlays.CommonAlert, () => CommonAlert);
    Navigation.registerComponent(screenId.Overlays.ProgressIndicator, () => ProgressIndicator);
  }

  getComponentProvider = (Component) => ((props) => (<Provider store={store}><Component{...props} /></Provider>));

  _setGlobalProperties = async (): void => {

    // hide status bar
    StatusBar.setHidden(true);

    store.subscribe(async () => {
      let state = store.getState();
      if (state.commonDataStore.progressIndicator === 1 && !state.commonDataStore.showingProgressIndicator) {
        return NavigationUtil.showProgressIndicator();
      }
    });
  };
}
