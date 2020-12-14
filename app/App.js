import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Feed from "./pages/Feed";
import Thread from "./pages/Thread";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { PreferencesContext } from "./services/PreferencesContext";
import { LogoTitle } from "./components/LogoTitle";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  let theme = isThemeDark ? DarkTheme : DefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="Feed"
          mode="card"
          screenOptions={{
            headerShown: true,
            gestureEnabled: true,
            // if you want to change the back swipe width
            gestureDirection: "horizontal",
            gestureResponseDistance: {
              horizontal: 300,
            },
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
                overlayStyle: {
                  opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                  }),
                },
              };
            },
          }}
        >
          <Stack.Screen
            name="Feed"
            component={Feed}
            options={{
              headerTitle: (props) => <LogoTitle color={theme.colors.text} />,
              headerLeft: () => (
                <TouchableOpacity
                  style={styles.headerIcon}
                  onPress={() => toggleTheme()}
                >
                  <MaterialCommunityIcons
                    name={isThemeDark ? "white-balance-sunny" : "weather-night"}
                    size={30}
                    color={theme.colors.text}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="Thread"
            component={Thread}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PreferencesContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    marginHorizontal: 20,
  },
});
