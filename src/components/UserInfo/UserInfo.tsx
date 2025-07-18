import { useState } from 'react';

import usersFromServer from '../../api/users'; // Переконайтеся, що це шлях до ваших даних користувачів
// import { getUserById } from '../../services/user'; // Функція для отримання користувача
import { User } from '../../types/types'; // Ваш визначений тип Post та User

// Оновлений тип для даних, що передаються з UserInfo до батьківського компонента
type NewTodoData = {
  title: string;
  userId: number;
  completed: boolean; // Вказуємо, що передаємо completed
};

type Props = {
  onSubmit: (data: NewTodoData) => void;
};

export const UserInfo: React.FC<Props> = ({ onSubmit }) => {
  // Стани компонентів
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  // Стани помилок
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  // // Функція для фільтрації вводу (опціонально, згідно завдання)
  // const sanitizeTitle = (input: string) => {
  //   // Дозволяє літери (українські та англійські), цифри та пробіли
  //   return input.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
  // };

  // Обробник зміни поля "Title"
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (hasTitleError) {
      setHasTitleError(false); // Скидаємо помилку, як тільки користувач починає вводити
    }
  };

  // Обробник зміни поля "User" (select)
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = +event.target.value; // замінив на саме значення

    setUserId(selectedUserId);
    if (hasUserError && selectedUserId !== 0) {
      setHasUserError(false); // Скидаємо помилку, якщо обрано дійсного користувача
    }
  };

  // Обробник відправки форми
  const hendelSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Запобігаємо стандартній поведінці форми

    // Перевірка поля Title
    setHasTitleError(!title);

    // Перевірка поля User (select)
    setHasUserError(!userId);

    // Якщо є помилки, зупиняємо виконання функції
    if (!title || !userId) {
      return;
    }

    // Якщо помилок немає, викликаємо onSubmit з даними для нового todo
    onSubmit({
      userId,
      title,
      // title: title.trim(), // Обрізаємо пробіли у заголовку перед відправкою
      completed: false, // Нове todo за замовчуванням не завершене
      // 'user' та 'id' генеруються у батьківському компоненті (App)
    });

    // Очищення форми після успішної відправки
    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={hendelSubmit}>
      <div className="field">
        <label htmlFor="title-id">&nbsp;Title:&nbsp;</label>

        <input
          id="title-id"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user-id">User:&nbsp;</label>

        <select
          id="user-id"
          data-cy="userSelect"
          value={userId}
          required
          onChange={handleUserChange}
        >
          <option value={0} disabled>
            Choose a user
          </option>

          {usersFromServer.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

// у handelChange добавив перевірки if()
// інші перевірки на помилку у handalSabmit
// user -> value={0} | a не -> value="0"
