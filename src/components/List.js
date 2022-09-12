import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const style = {
  article: `flex flex-row justify-between items-center mb-4 mx-2`,
  p: `text-md capitalize font-bold text-gray-600`,
  pComplete: `text-md capitalize line-through font-bold text-gray-600`,
  row: `flex space-x-2`,
  btnEdit: `text-lg text-green-500
    hover:text-green-700 hover:scale-105`,
  btnDelete: `text-lg text-red-500
    hover:text-red-700 hover:scale-105`,
    count: `text-center text-gray-500 font-medium my-2`
};

const List = ({ items, removeItem, editItem, toggleComplete }) => {
  return (
    <div className="">
      {
        /* RETURN ITEMS ARRAY THEN MAPS METHOD */
        items.map((item) => {
          const { id, text, completed } = item;
          return (
            <article key={id} className={style.article}>
              <div className={style.row}>
                <input
                  type="checkbox"
                  onChange={() => toggleComplete(item)}
                  checked={completed ? "checked" : ""}
                />
                <p
                  className={completed ? style.pComplete : style.p}
                  onClick={() => toggleComplete(item)}
                >
                  {text}
                </p>
              </div>
              <div className={style.row}>
                {/* EDIT BTN ONLICK METHOD */}
                <button
                  type="button"
                  onClick={() => editItem(item)}
                  className={style.btnEdit}
                >
                  <FaEdit />
                </button>
                {/* DELETE BTN ONLICK METHOD */}
                <button
                  type="button"
                  onClick={() => removeItem(id)}
                  className={style.btnDelete}
                >
                  <FaTrash />
                </button>
              </div>
            </article>
          );
        })
      }
                    <p className={style.count}>{`You have ${items.length} todos`}</p>
    </div>
  );
};

export default List;
