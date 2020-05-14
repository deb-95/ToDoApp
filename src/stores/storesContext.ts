import React from 'react'
import  TodosStore from './todosStore';

export const storesContext = React.createContext({
  todosStore: new TodosStore(),
});