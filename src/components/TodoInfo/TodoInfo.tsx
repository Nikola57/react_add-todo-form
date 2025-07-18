import classNames from 'classnames';
import { Post } from '../../typs/typs';

type Prop = { post: Post };

export const TodoInfo: React.FC<Prop> = ({ post }) => {
  // Забезпечуємо, що post існує, інакше повертаємо null або placeholder
  // if (!post) {
  //   return null;
  // }

  const user = post.user || null;

  // // Перевіряємо, чи існує user, перш ніж намагатися отримати його властивості
  // const userEmail = post.user?.email || '#';
  // const userName = post.user?.name || 'Невідомий користувач';

  return (
    <article
      data-id={post.id} // Динамічне значення з post.id
      className={classNames('TodoInfo', {
        'TodoInfo--completed': post.completed,
      })}
    >
      <h2 className="TodoInfo__title">{post.title}</h2>

      {/* Рендеримо блок UserInfo тільки якщо user існує */}
      {post.user && (
        <a className="UserInfo" href={`mailto:${user?.email}`}>
          {user?.name}
        </a>
      )}
    </article>
  );
};
