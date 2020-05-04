/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';

import ToDo from './ToDo';

const {width} = Dimensions.get('window');

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todoData, setTodoData] = useState({});

  const _addTodo = () => {
    if (newTodo !== '') {
      let id = Object.values(todoData).length;
      let newTodoObject = {
        [id]: {
          id,
          text: newTodo,
          isCompleted: false,
          createdAt: Date.now(),
        },
      };
      setNewTodo('');
      setTodoData({...todoData, ...newTodoObject});
    }
  };

  const _deleteTodo = (id) => {
    delete todoData[id];
    setTodoData({...todoData});
  };

  const _checkCompleted = (id) => {
    const completedStatus = !todoData[id].isCompleted;
    todoData[id].isCompleted = completedStatus;
    setTodoData({...todoData});
  };

  // if (!loadTodoData) {
  //   return (
  //     <View>
  //       <Text>ss</Text>
  //     </View>
  //   );
  // }
  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Dody To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="new to do"
            value={newTodo}
            onChangeText={(text) => setNewTodo(text)}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={_addTodo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(todoData)
              .reverse()
              .map((val) => (
                <ToDo
                  key={val.id}
                  {...val}
                  _checkCompleted={_checkCompleted}
                  _deleteTodo={_deleteTodo}
                />
              ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3959cc',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 40,
    marginTop: 80,
    fontWeight: '100',
  },
  card: {
    marginTop: 40,
    width: width - 40,
    backgroundColor: 'white',
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 16,
    height: 65,
  },
  todos: {
    alignItems: 'center',
  },
});

export default App;
