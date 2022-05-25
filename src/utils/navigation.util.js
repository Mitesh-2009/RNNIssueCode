import { Dimensions, Platform } from "react-native";
import { LayoutTabsChildren, Navigation } from "react-native-navigation";
import screenId from "../constants/screen.id.enum";
import stackName from "../constants/stack.name.enum";
import { commonTheme } from "../themes/common.theme";

const decelerate = { type: "decelerate" };
const NavigationUtil = {
  setDefaultOptions: () => {
    const screenWidth = parseInt(parseFloat(Dimensions.get("window").width).toFixed(0));
    Navigation.setDefaultOptions({
      popGesture: false,
      statusBar: {
        visible: false,
      },
      topBar: {
        animate: false,
        drawBehind: true,
        height: 0,
        visible: false,
      },
      navigationBar: {
        visible: true,
        backgroundColor: "white",
      },
      layout: {
        orientation: "portrait",
        componentBackgroundColor: commonTheme.COLOR_BRIGHT,
      },
      animations: Platform.OS === "android" ? {
        setRoot: {
          alpha: { from: 0, to: 1, duration: 250, interpolation: decelerate },
          translationX: { from: screenWidth, to: 0, duration: 350, interpolation: decelerate },
          waitForRender: true,
        },
        setStackRoot: {
          alpha: { from: 0, to: 1, duration: 250, interpolation: decelerate },
          translationX: { from: screenWidth, to: 0, duration: 350, interpolation: decelerate },
          waitForRender: true,
        },
        pop: {
          content: {
            alpha: { from: 1, to: 0.2, duration: 250, interpolation: decelerate },
            translationX: { from: 0, to: screenWidth, duration: 350, interpolation: decelerate },
            waitForRender: true,
          },
        },
        push: {
          content: {
            alpha: { from: 0, to: 1, duration: 250, interpolation: decelerate },
            translationX: { from: screenWidth, to: 0, duration: 350, interpolation: decelerate },
            waitForRender: true,
          },
        },
        // these animations will not used as of now as the popups are not using the modal as of now
        showModal: {
          enabled: true,
          alpha: { from: 0, to: 1, duration: 250, interpolation: decelerate },
          scaleX: { from: 0.7, to: 1, duration: 350, interpolation: decelerate },
          scaleY: { from: 0.7, to: 1, duration: 350, interpolation: decelerate },
          waitForRender: true,
        },
        dismissModal: {
          enabled: true,
          alpha: { from: 1, to: 0, duration: 250, interpolation: decelerate },
          scaleX: { from: 1, to: 0.6, duration: 350, interpolation: decelerate },
          scaleY: { from: 1, to: 0.6, duration: 350, interpolation: decelerate },
          waitForRender: true,
        },
      } : {},
    });
  },
  showLoginPageAtStartUp: async () => {
    return Navigation.setRoot({
      root: {
        stack: {
          id: stackName.AuthenticationStack,
          children: [
            {
              component: {
                name: screenId.Auth.Login.LoginPage,
                passProps: {
                  navigationProps: {}, // we are intentionally passing the empty object here so that the null check can be avoided
                },
                options: {
                  statusBar: {
                    visible: false,
                  },
                  animations: {
                    setRoot: {
                      alpha: { from: 0, to: 1, duration: 250, interpolation: "decelerate" },
                      waitForRender: true,
                    },
                  },
                },
              },
            },
          ],
        },
      },
    });
  },
  gotoScreen: async (currentScreenID: string, nextScreenID: string, navigationProps: any = {}) => {
    return Navigation.push(currentScreenID, {
      component: {
        name: nextScreenID,
        options: {
          statusBar: {
            visible: false,
          },
        },
        passProps: {
          navigationProps: navigationProps,
        },
      },
    });
  },
  showOverlay: async (overlayID: string, passProps: any = null) => {
    return Navigation.showOverlay({
      component: {
        name: overlayID,
        passProps: passProps,
        options: {
          layout: {
            backgroundColor: commonTheme.COLOR_TRANSPARENT,
            componentBackgroundColor: commonTheme.COLOR_TRANSPARENT,
          },
          statusBar: {
            visible: false,
          },
          overlay: {
            interceptTouchOutside: true,
          },
        },
      },
    });
  },
  showProgressIndicator: async () => {
    return NavigationUtil.showOverlay(screenId.Overlays.ProgressIndicator);
  },
  showAlert: async (props) => {
    return NavigationUtil.showOverlay(screenId.Overlays.CommonAlert, props);
  },
  gotoBottomTabsNavigation: async () => {
    let earnTab: LayoutTabsChildren = {
      stack: {
        id: stackName.EarnScreenStack,
        children: [
          {
            component: {
              name: screenId.Earn.Page,
              options: {
                statusBar: {
                  visible: false,
                },
              },
            },
          },
        ],
        options: {
          bottomTab: {
            text: "Earn",
          },
          statusBar: {
            visible: false,
          },
        },
      },
    };
    let dashboardTab: LayoutTabsChildren = {
      stack: {
        id: stackName.HomeScreenStack,
        children: [
          {
            component: {
              name: screenId.Dashboard.Page,
              options: {
                statusBar: {
                  visible: false,
                },
              },
            },
          },
        ],
        options: {
          bottomTab: {
            text: "Home",
          },
          statusBar: {
            visible: false,
          },
        },
      },
    };
    let menuTab: LayoutTabsChildren = {
      stack: {
        id: stackName.MenuScreenStack,
        children: [
          {
            component: {
              name: screenId.Menu.Page,
              options: {
                statusBar: {
                  visible: false,
                },
              },
            },
          },
        ],
        options: {
          bottomTab: {
            text: "Menu",
          },
          statusBar: {
            visible: false,
          },
        },
      },
    };
    let children: Array<LayoutTabsChildren>;
    children = [earnTab, dashboardTab, menuTab];
    await Navigation.setRoot({
        root: {
          bottomTabs: {
            id: stackName.HomeBottomTab,
            options: {
              bottomTabs: {
                translucent: true,
                elevation: 100,
                tabsAttachMode: "onSwitchToTab",
                animateTabSelection: false,
                hideOnScroll: false,
                visible: true,
                animate: true,
                drawBehind: false,
                titleDisplayMode: "alwaysShow",
                backgroundColor: '#aaecec',
                currentTabIndex: 0,
              },
              statusBar: {
                visible: false,
              },
            },
            children: children,
          },
        },
      })
      .then(() => {
        if (Platform.OS === "android") {
          console.debug(`registering the tab change event for ${Platform.OS}`);
          Navigation.events().registerBottomTabSelectedListener(
            async ({ selectedTabIndex, unselectedTabIndex }) => {
              console.debug(`tab change event detected from tab ${unselectedTabIndex} to ${selectedTabIndex}`);
              if (selectedTabIndex === unselectedTabIndex) {
                if (selectedTabIndex === 0) {
                  await Navigation.popToRoot(stackName.EarnScreenStack).catch(() => {
                    console.debug("already at the root");
                  });
                }
                if (selectedTabIndex === 1) {
                  await Navigation.popToRoot(stackName.HomeScreenStack).catch(() => {
                    console.debug("already at the root");
                  });
                }
                if (selectedTabIndex === 2) {
                  await Navigation.popToRoot(stackName.MenuScreenStack).catch(() => {
                    console.debug("already at the root");
                  });
                }
              }
            },
          );
        }
      });
  },
};

export default NavigationUtil;
