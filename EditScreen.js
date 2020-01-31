import {Button, Text, View} from 'react-native';
import {createUserItem, updateUserItem} from './src/actions/userActions';

import React from 'react';
import {connect} from 'react-redux';

export class Edit extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Edit Screen</Text>

        <Button
          title={'Back'}
          onPress={() => {
            this.props.navigation.goBack();
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
  createUserItem,
  updateUserItem,
};

// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export const EditScreen = connect(mapStateToProps, mapDispatchToProps)(Edit);
