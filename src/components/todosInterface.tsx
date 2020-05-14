import React, { useState, useContext } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import { storesContext } from '../stores/storesContext';
import { Button } from 'react-native-elements';
import { observer } from 'mobx-react';
import { ToDoItem } from '../types/todosStoreTypes';
import ToDoItemComponent from './todoItemComponent';

const TodosInterface = () => {
  const { todosStore } = useContext(storesContext);
  const [todoText, setTodoText] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [itemBeingEdited, setItemBeingEdited] = useState<ToDoItem>();

  const handleButtonPress = () => {
    if (todoText) {
      todosStore.addTodo(todoText);
      setTodoText('');
    }
  };

  return (
    <View style={styles.todosContainer}>
      <View style={styles.inputArea}>
        <TextInput onChangeText={setTodoText} style={styles.todoInput} value={todoText} />
        <Button
          title="ADD"
          buttonStyle={styles.addButtonStyle}
          onPress={() => handleButtonPress()}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
      >
        <FlatList
          data={todosStore.todos}
          keyExtractor={(item) => item.id.toString()}
          extraData={{ store: todosStore.todos.length, isEditing } || {}}
          renderItem={({ item }) => {
            return (
              <ToDoItemComponent
                item={item}
                // CHECK: probably not the best way
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                itemBeingEdited={itemBeingEdited}
                setItemBeingEdited={setItemBeingEdited}
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default observer(TodosInterface);

const styles = StyleSheet.create({
  todosContainer: {
    backgroundColor: '#fff',
  },
  inputArea: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  todoInput: {
    flex: 2,
    padding: 10,
    marginRight: 10,
    shadowColor: '#406C7E',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
  addButtonStyle: { flex: 1 },
  listContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
});
