import {Button, Text, View} from 'react-native';

import React from 'react';
import {connect} from 'react-redux';
import {deleteUserItem} from './src/actions/userActions';

export class Details extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen</Text>

        <Button
          title={'Back'}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <Button
          title={'Edit'}
          onPress={() => {
            this.props.navigation.navigate('Edit');
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('state ', state);

  return {
    usersList: state.usersList,
    listPage: state.listPage,
    currentUser: state.currentUser,
    isLoading: state.isLoading,
    error: state.error,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getUsersList: () =>
//       dispatch({
//         type: ActionTypes.GET_USERS_LIST,
//       }),
//   };
// };

// const mapDispatchToProps = ({dispatch}) => ({
//   getUsersList: () => {
//     dispatch(getUsersList());
//   },
// });

const mapDispatchToProps = {
  deleteUserItem,
};

// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export const DetailsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
