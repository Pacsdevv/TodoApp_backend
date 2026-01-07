import * as todoRepository from "./repository";

export const getAllTodos = async () => {
    const todos =  await todoRepository.getAllTodos();

    if (todos.length === 0) {
        throw new Error("No todos found");
    }

    return todos;
};
