import React, { Component } from "react";
import { Navigation } from "react-native-navigation";

class BasePage extends Component {
  _isMounted = false;

  constructor(props, state = {}) {
    super(props);
    this.state = {
      ...state,
    };
    this._isMounted = true;

    // this is only required when we are required to listen to events like `componentDidAppear` and `componentDidDisappear`
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    // Not mandatory
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
    this._isMounted = false;
  }

}

export { BasePage };
