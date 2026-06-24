# ■ 詳細設計書：Todoアプリ（ログイン機能なし）

---

## 1. システム概要

本システムは、React + TypeScriptで構築するシンプルなTodo管理アプリである。
データはLocalStorageに永続化し、API通信・認証機能は持たない。

---

## 2. 技術構成

- React 18
- TypeScript
- Vite（想定）
- CSS（またはCSS Modules）

---

## 3. ディレクトリ構成

```bash
src/
├── components/
│   ├── TodoForm.tsx
│   ├── TodoList.tsx
│   ├── TodoItem.tsx
├── hooks/
│   ├── useTodos.ts
├── types/
│   ├── todo.ts
├── utils/
│   ├── storage.ts
├── App.tsx
└── main.tsx
```

---

## 4. 型定義

### 4.1 Todo型

```ts
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};
```

---

## 5. コンポーネント設計

---

## 5.1 App.tsx（ルートコンポーネント）

### ■ 役割

- Todo状態の保持
- 子コンポーネントへのデータ受け渡し

### ■ 状態

```ts
const [todos, setTodos] = useState<Todo[]>([]);
```

---

### ■ 依存コンポーネント

- TodoForm
- TodoList

---

## 5.2 TodoForm.tsx

### ■ 役割

- Todoの入力・追加処理

### ■ Props

```ts
type Props = {
  onAdd: (title: string) => void;
};
```

---

### ■ 内部状態

```ts
const [input, setInput] = useState<string>("");
```

---

### ■ 主な処理

#### addTodo

```ts
const handleSubmit = () => {
  if (!input.trim()) return;
  onAdd(input);
  setInput("");
};
```

---

## 5.3 TodoList.tsx

### ■ 役割

- Todo一覧表示
- TodoItemの描画

### ■ Props

```ts
type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};
```

---

### ■ 処理

- todos.mapでTodoItem生成

---

## 5.4 TodoItem.tsx

### ■ 役割

- 1件のTodo表示
- 完了切替・削除操作

### ■ Props

```ts
type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};
```

---

### ■ UI仕様

- チェックボックス
- タイトル表示
- 削除ボタン

---

### ■ 表示ロジック

```tsx
<span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
  {todo.title}
</span>
```

---

## 6. カスタムフック設計

---

## 6.1 useTodos.ts

### ■ 役割

- Todoの状態管理ロジックを集約
- LocalStorage連携

---

### ■ 内部状態

```ts
const [todos, setTodos] = useState<Todo[]>([]);
```

---

### ■ 初期読み込み

```ts
useEffect(() => {
  const stored = localStorage.getItem("todos");
  if (stored) {
    setTodos(JSON.parse(stored));
  }
}, []);
```

---

### ■ 永続化

```ts
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

---

### ■ 関数設計

#### ① addTodo

```ts
const addTodo = (title: string) => {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: Date.now(),
  };

  setTodos((prev) => [...prev, newTodo]);
};
```

---

#### ② toggleTodo

```ts
const toggleTodo = (id: string) => {
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    ),
  );
};
```

---

#### ③ deleteTodo

```ts
const deleteTodo = (id: string) => {
  setTodos((prev) => prev.filter((todo) => todo.id !== id));
};
```

---

## 7. utils設計

---

## 7.1 storage.ts

### ■ 役割

LocalStorage操作の共通化

```ts
const STORAGE_KEY = "todos";

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const loadTodos = (): Todo[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
```

---

## 8. 状態遷移設計

### ■ Todo状態

```text
未完了 → 完了 → 未完了（トグル）
```

---

## 9. 画面仕様

### ■ レイアウト

```
---------------------------------
| [入力欄          ] [追加]     |
---------------------------------
| □ Todo1        [削除]        |
| ☑ Todo2        [削除]        |
---------------------------------
```

---

## 10. イベント設計

| イベント | トリガー       | 処理     |
| -------- | -------------- | -------- |
| onAdd    | 追加ボタン押下 | Todo追加 |
| onToggle | チェック変更   | 完了切替 |
| onDelete | 削除ボタン     | 削除     |

---

## 11. エラーハンドリング

- 空文字入力：無視
- JSON破損：空配列初期化
- LocalStorageなし：例外握りつぶし

---

## 12. 非機能要件

### ■ パフォーマンス

- 100〜300件程度のTodoを想定

### ■ 保守性

- ロジックはuseTodosに集約
- UIと状態管理を分離

### ■ 拡張性

- API接続に差し替え可能構造

---

## 13. 今後の拡張ポイント

- フィルタ（All / Active / Done）
- 編集機能（inline edit）
- ドラッグ＆ドロップ並び替え
- バックエンド連携（REST / Firebase）
