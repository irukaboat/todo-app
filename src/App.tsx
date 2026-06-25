import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">Todo アプリ</h1>
        <p className="app-subtitle">簡単なタスク管理をブラウザ上で行います。</p>
      </header>

      <main className="app-main">
        <TodoForm onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </main>
    </div>
  );
}

export default App;
