// src/typs/typs.ts
export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

// Це ваш об'єднаний тип для відображення в TodoList
export type Post = {
  id: number; // ВАЖЛИВО: ДОДАНО id
  title: string;
  completed: boolean;
  userId: number;
  user: User | null; // User може бути null, якщо не знайдено
};

// // gemini type     -->       // він у UserInfo
// export type NewTodoData = {
//   title: string;
//   userId: number;
//   completed: boolean;
// };
