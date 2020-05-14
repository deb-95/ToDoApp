import React from 'react';
import 'mobx-react-lite/batchingForReactNative'; // more infos at https://github.com/mobxjs/mobx-react-lite/#observer-batching
import { StyleSheet, View } from 'react-native';
import TodosInterface from './src/components/todosInterface';

export default function App() {
  return (
    <View style={styles.container}>
      <TodosInterface />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
