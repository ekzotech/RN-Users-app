import {Button, StyleSheet, Text, View} from 'react-native';
import {
  createUserItem,
  deleteUserItem,
  updateUserItem,
} from '../actions/userActions';

import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

export class Edit extends React.Component {
  constructor(props) {
    super(props);

    const userString = JSON.stringify(this.props.navigation.getParam('user'));
    const user = userString ? JSON.parse(userString) : {};
    const isEdit = userString != null ? true : false;
    this.state = {
      currentUser: isEdit ? user : null,
      firstName: isEdit ? user.first_name : '',
      lastName: isEdit ? user.last_name : '',
      avatar: isEdit ? user.avatar : '',
      email: isEdit ? user.email : '',
      mode: isEdit ? 'edit' : 'new',
    };
  }

  render() {
    return (
      <View style={styles.containerWrapper}>
        <Text style={styles.textFieldLabel}>Avatar link:</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            value={this.state.avatar}
            onChangeText={text => this.setState({avatar: text})}
            placeholder="Type in or paste link to avatar"
            autoCapitalize={'none'}
            autoCorrect={false}
            textContentType={'URL'}
            maxLength={255}
          />
        </View>
        <Text style={styles.textFieldLabel}>First name:</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            value={this.state.firstName}
            onChangeText={text => this.setState({firstName: text})}
            placeholder="Type in first name"
            maxLength={255}
          />
        </View>
        <Text style={styles.textFieldLabel}>Last name:</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            value={this.state.lastName}
            onChangeText={text => this.setState({lastName: text})}
            placeholder="Type in last name"
            maxLength={255}
          />
        </View>
        <Text style={styles.textFieldLabel}>email:</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            value={this.state.email}
            onChangeText={text => this.setState({email: text})}
            placeholder="Type in email"
            maxLength={255}
          />
        </View>
        {this.state.mode === 'new' && (
          <Button
            title={'Create user'}
            onPress={() => {
              const user = {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                avatar: this.state.avatar,
              };
              this.props.createUserItem(user);
            }}
          />
        )}
        {this.state.mode === 'edit' && (
          <Button
            title={'Save changes'}
            onPress={() => {
              const newUser = {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                avatar: this.state.avatar,
              };
              this.props.updateUserItem({
                user: newUser,
                userId: this.state.currentUser.id,
              });
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerWrapper: {flex: 1, width: '100%', paddingHorizontal: 16},
  textFieldLabel: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 4,
    marginTop: 12,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
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
  createUserItem,
  updateUserItem,
  deleteUserItem,
};

export const EditScreen = connect(mapStateToProps, mapDispatchToProps)(Edit);
