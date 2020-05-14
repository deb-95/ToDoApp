import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import { storesContext } from '../stores/storesContext';
import { Icon } from 'react-native-elements';
import { observer } from 'mobx-react';
import { ToDoItem } from '../types/todosStoreTypes';

type Props = {
  item: ToDoItem;
  isEditing: boolean;
  itemBeingEdited?: ToDoItem;
  setIsEditing: (bool: boolean) => void;
  setItemBeingEdited: (item?: ToDoItem) => void;
};

const ToDoItemComponent = (props: Props) => {
  const { item, isEditing, itemBeingEdited, setIsEditing, setItemBeingEdited } = props;
  const { todosStore } = useContext(storesContext);

  return (
    <View style={styles.todoItem}>
      <TextInput
        style={styles.todoText}
        onChangeText={(text) => todosStore.editTodoText(item, text)}
        editable={isEditing && itemBeingEdited?.id === item.id}
        value={item.text}
        onBlur={() => {
          setIsEditing(false);
          setItemBeingEdited(undefined);
        }}
      />
      <Icon
        name="check"
        color={item.isDone ? 'green' : 'red'}
        onPress={() => {
          todosStore.toggleTodoState(item);
        }}
      />
      <Icon
        name="edit"
        color="grey"
        onPress={() => {
          setIsEditing(true);
          setItemBeingEdited(item);
        }}
      />
      <Icon
        name="clear"
        color="red"
        onPress={() => {
          todosStore.removeTodo(item);
        }}
      />
    </View>
  );
};

export default observer(ToDoItemComponent);

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    justifyContent: 'space-around',
    flex: 1,
    minHeight: 40,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
  },
  todoText: { flex: 3, flexWrap: 'wrap' },
});
