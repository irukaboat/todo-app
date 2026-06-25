import type { Todo } from "../types/todo";

const STORAGE_KEY = "todos";

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const loadTodos = (): Todo[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((item) => ({
      id: String((item as any).id ?? ""),
      title: String((item as any).title ?? ""),
      completed: Boolean((item as any).completed ?? false),
      createdAt: Number((item as any).createdAt ?? Date.now()),
    }));
  } catch {
    return [];
  }
};
