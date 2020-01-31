import * as ActionTypes from './src/actions/ActionTypes';

import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  decrementListPage,
  getUsersList,
  incrementListPage,
} from './src/actions/userActions';

import React from 'react';
import {connect} from 'react-redux';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: {},
      listPage: 1,
      currentUser: null,
      isLoading: false,
      error: null,
      maxPages: null,
    };
  }

  componentDidMount() {
    this.props.getUsersList(this.props.listPage);
  }

  renderUser(user) {
    return (
      <TouchableOpacity
        style={styles.userCardWrapper}
        onPress={() => this.props.navigation.navigate('Details')}>
        <View style={styles.userCard}>
          <Image source={{uri: user.avatar}} style={styles.userCardAvatar} />
          <View style={styles.userCardInfoWrapper}>
            <Text style={styles.userCardTitle}>
              {user.first_name} {user.last_name}
            </Text>
            <Text style={styles.userCardEmail}>{user.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isLoading && <ActivityIndicator size={'large'} />}
        {this.props.maxPages > 1 && (
          <View style={styles.paginationButtonsWrapper}>
            <View>
              {this.props.listPage > 1 && (
                <Button
                  title={'<-'}
                  onPress={() => {
                    this.props.decrementListPage(this.props.listPage);
                  }}
                />
              )}
            </View>
            <View>
              {this.props.listPage < this.props.maxPages && (
                <Button
                  title={'->'}
                  onPress={() => {
                    this.props.incrementListPage(this.props.listPage);
                  }}
                />
              )}
            </View>
          </View>
        )}
        {this.props.usersList.data != null &&
          this.props.usersList.data.length > 0 && (
            <View style={styles.containerWrapper}>
              <FlatList
                style={styles.containerWrapper}
                data={this.props.usersList.data}
                keyExtractor={user => user.id.toString()}
                renderItem={user => this.renderUser(user.item)}
              />
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  paginationButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userCardWrapper: {width: '100%', marginBottom: 16},
  userCard: {flexDirection: 'row'},
  userCardAvatar: {height: 50, width: 50, resizeMode: 'contain'},
  userCardInfoWrapper: {flex: 1, paddingLeft: 8},
  userCardTitle: {fontFamily: 'System', fontSize: 20, fontWeight: '400'},
  userCardEmail: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '300',
    color: '#555',
  },
});

const mapStateToProps = state => {
  return {
    usersList: state.userReducer.usersList,
    listPage: state.userReducer.listPage,
    currentUser: state.userReducer.currentUser,
    isLoading: state.userReducer.isLoading,
    error: state.userReducer.error,
    maxPages: state.userReducer.maxPages,
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
  getUsersList,
  incrementListPage,
  decrementListPage,
};

// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Home);
