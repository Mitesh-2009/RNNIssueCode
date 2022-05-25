import React from "react";
import { BasePage } from "./base.page";

class AuthBasePage extends BasePage {
  constructor(props, state = {}) {
    super(props, state);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }
}

export { AuthBasePage };
