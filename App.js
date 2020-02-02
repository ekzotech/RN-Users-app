import * as NavigationService from './src/services/NavigationService';

import {DetailsScreen} from './src/screens/DetailsScreen';
import {EditScreen} from './src/screens/EditScreen';
import {HomeScreen} from './src/screens/HomeScreen';
import {Provider} from 'react-redux';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {store} from './src/store/store';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Edit: EditScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer ref={nav => (this.navigator = nav)} />
      </Provider>
    );
  }
}
