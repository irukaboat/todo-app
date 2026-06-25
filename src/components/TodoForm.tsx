import { useState } from "react";
import type { FormEvent } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export const TodoForm = ({ onAdd }: Props) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    onAdd(trimmed);
    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="todo-input" className="sr-only">
        Todo を入力
      </label>
      <input
        id="todo-input"
        className="todo-form__input"
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="新しい Todo を追加"
      />
      <button className="todo-form__button" type="submit">
        追加
      </button>
    </form>
  );
};
