import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {deleteUserItem} from '../actions/userActions';

export class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      imageHeight: null,
    };
  }

  componentDidMount() {
    if (this.props.currentUser.avatar != null) {
      Image.getSize(this.props.currentUser.avatar, (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;
        this.setState({imageHeight: imageHeight});
      });
    }
  }

  render() {
    return (
      <View style={styles.containerWrapper}>
        <ScrollView style={{flex: 1, width: '100%'}}>
          {this.props.currentUser.avatar != null && (
            <Image
              source={{uri: this.props.currentUser.avatar}}
              style={{
                width: '100%',
                height: this.state.imageHeight,
                resizeMode: 'cover',
              }}
            />
          )}
          <View style={styles.userInfoWrapper}>
            <Text style={styles.userName}>
              {this.props.currentUser.first_name}{' '}
              {this.props.currentUser.last_name}
            </Text>
            <Text style={styles.userEmail}>{this.props.currentUser.email}</Text>
          </View>
          <Button
            title={'Edit'}
            onPress={() => {
              this.props.navigation.navigate('Edit', {
                user: {...this.props.currentUser},
              });
            }}
          />
          {this.props.isLoading && <ActivityIndicator size={'large'} />}
          <Button
            title={'Delete user'}
            color="#fa3030"
            onPress={() => {
              this.props.deleteUserItem(this.props.currentUser.id);
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerWrapper: {flex: 1, width: '100%', paddingHorizontal: 16},
  userInfoWrapper: {width: '100%', alignItems: 'center'},
  userName: {fontSize: 32, fontWeight: '500', fontFamily: 'System'},
  userEmail: {
    fontSize: 22,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#444',
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

const mapDispatchToProps = {
  deleteUserItem,
};

export const DetailsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
