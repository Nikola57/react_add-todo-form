import { Post } from '../../typs/typs';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  posts: Post[];
};

export const TodoList: React.FC<Props> = ({ posts }) => {
  // Додана перевірка для уникнення map на undefined
  if (!posts || posts.length === 0) {
    return;
  }

  return (
    <section className="TodoList">
      {posts.map((post: Post) => (
        // Використовуйте post.id як key для унікальності та стабільності
        <TodoInfo key={post.id} post={post} />
      ))}
    </section>
  );
};

// трохи інший шлях до ID але всеодно працюе у обох випадках
