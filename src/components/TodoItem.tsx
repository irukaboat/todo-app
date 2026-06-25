import type { Todo } from "../types/todo";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TodoItem = ({ todo, onToggle, onDelete }: Props) => {
  return (
    <li className="todo-item">
      <label className="todo-item__label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span
          className={
            todo.completed ? "todo-item__text completed" : "todo-item__text"
          }
        >
          {todo.title}
        </span>
      </label>
      <button
        className="todo-item__delete"
        type="button"
        onClick={() => onDelete(todo.id)}
      >
        削除
      </button>
    </li>
  );
};
