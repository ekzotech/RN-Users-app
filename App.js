import {DetailsScreen} from './DetailsScreen';
import {EditScreen} from './EditScreen';
import {HomeScreen} from './HomeScreen';
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
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
