import * as todoRepository from "./repository";
import { getUserById } from "../users/repository";


export const createTodo = async (body: { 
    title: string; 
    description?: string; 
    completed?:boolean; 
    user_id: number; 
    category_id?: string; 
}) => {
    
    if (!body.title || !body.user_id) throw new Error("title and user_id required");
    return await todoRepository.createTodo(body);
};


export const getAllTodos = async () => {
    const todos =  await todoRepository.getAllTodos();

    if (todos.length === 0) {
        throw new Error("No todos found");
    }

    return todos;
};


export const getTodosByUser = async (user_id: number) => {
    const todos = await todoRepository.getTodosByUser(user_id);
        if (todos.length === 0) {
            const user = await getUserById(user_id);
            if (!user) throw new Error("User not found");
        return { message: `User ${user.name} with user_id ${user_id} has no todos` };
        };

  return todos;
};


export const getTodoById = async (id: number) => {
    const todo = await todoRepository.getTodoById(id);
        if (!todo) throw new Error("Todo not found");
    return todo;
};


export const getTodosByCategoryId = async (category_id: number) => {
    const todos = await todoRepository.getTodosByCategoryId(category_id);
        if (!todos) throw new Error("Todos not found");
    return todos;
};


export const updateTodos = async (id: number, body: {
    title?: string; 
    description?: string; 
    completed?: boolean; 
    category_id?: number;
}) => {
     if (
       body.title === undefined &&
       body.description === undefined &&
       body.completed === undefined &&
       body.category_id === undefined
       ) {
         throw new Error("At least one field to update");
       };
     
       const updated = await todoRepository.updateTodo(id, body);
         if (!updated) throw new Error("Todo not found");
       return updated;
     
};


export const deleteTodo = async (id: number) => {
    const deleted = await todoRepository.deleteTodo(id);
      if (!deleted) throw new Error("Todo not found");
    return deleted;
};