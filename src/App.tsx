import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos'; // Це початкові дані todo
import { TodoList } from './components/TodoList';
import { UserInfo } from './components/UserInfo';
import { getUserById } from './services/user'; // Функція для отримання користувача
import { Post } from './typs/typs'; // Ваш визначений тип Post

// Зверніть увагу: `initialTodos` створюється один раз під час завантаження модуля.
const initialTodos: Post[] = todosFromServer.map(todo => ({
  id: todo.id, // Додайте id сюди
  title: todo.title,
  completed: todo.completed,
  userId: todo.userId,
  user: getUserById(todo.userId),
}));

// Генерує новий унікальний ID для завдання
function getNewPostId(posts: Post[]) {
  // Знаходимо максимальний ID серед ВСІХ завдань (post.id)
  const maxId = Math.max(...posts.map(post => post.id));

  return maxId + 1;
}

// Тип для даних, які передаються з UserInfo
type AddPostData = {
  title: string;
  userId: number;
  completed: boolean;
};

export const App = () => {
  const [posts, setPosts] = useState<Post[]>(initialTodos);

  const addPost = (data: AddPostData) => {
    const newUser = getUserById(data.userId); // Отримуємо user тут
    const newPost: Post = {
      id: getNewPostId(posts), // Генеруємо id тут
      title: data.title,
      userId: data.userId,
      completed: data.completed, // Використовуємо значення completed, передане з UserInfo
      user: newUser,
    };

    setPosts(currentPosts => [...currentPosts, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <UserInfo onSubmit={addPost} />
      <TodoList posts={posts} />
    </div>
  );
};

// 1) initial
// 2) addPost
