import type { Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TodoList = ({ todos, onToggle, onDelete }: Props) => {
  if (todos.length === 0) {
    return <p className="todo-empty">まだ Todo がありません。</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
