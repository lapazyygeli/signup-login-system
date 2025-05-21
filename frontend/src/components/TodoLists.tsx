import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createListAsync, getAllListsAsync, removeListAsync } from "../redux/thunks/listsThunks";
import { resetListsState, setSelectedList } from "../redux/reducers/listsSlice";

export interface List {
  _id: string;
  title: string;
  description?: string;
  userId: string;
}

const TodoLists = () => {
  const dispatch = useDispatch<AppDispatch>();
  const lists = useSelector((state: RootState) => state.todos.lists.lists);
  const selectedList = useSelector((state: RootState) => state.todos.lists.selectedList);
  const [newListTitle, setNewListTitle] = useState("");

  useEffect(() => {
    dispatch(getAllListsAsync());
    return () => {
      dispatch(resetListsState());
    };
  }, [dispatch]);

  const handleAdd = async () => {
    if (!newListTitle.trim()) return;
    await dispatch(createListAsync(newListTitle));
    setNewListTitle("");
  };

  const handleDelete = async () => {
    if (selectedList) {
      await dispatch(removeListAsync(selectedList._id));
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedList(e.target.value));
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="sm:text-2xl font-semibold text-indigo-700">
          Your Task Lists
        </h2>
        {lists.length === 0 && (
          <span className="hidden sm:inline text-sm text-gray-500">
            Create one list to get started.
          </span>
        )}
      </div>

      <div className="w-full relative mb-16">
        <select
          value={selectedList?._id}
          onChange={handleSelect}
          className="w-full appearance-none px-4 py-2 pr-10 border border-indigo-500 rounded-md shadow-sm bg-white text-indigo-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {lists.map((list) => (
            <option key={list._id} value={list._id}>
              {list.title}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500">
          ▼
        </div>
      </div>
      <div>
        {selectedList && (
          <TodoList listId={selectedList._id} />
        )}
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          className="w-full px-4 py-2 border border-indigo-500 rounded-md shadow-sm mb-2 text-indigo-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="New Task List Title"
        />
        <button
          onClick={handleAdd}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Add List
        </button>
      </div>
      {selectedList && (
        <div>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete Selected List
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoLists;
