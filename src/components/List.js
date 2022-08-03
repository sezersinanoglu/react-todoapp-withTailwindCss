import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ items, removeItem, editItem }) => {
    return (
        <div className=''>
            {
                /* RETURN ITEMS ARRAY THEN MAPS METHOD */
                items.map((item) => {
                    const { id, title } = item
                    return (
                        <article key={id} className='flex flex-row justify-between items-center mb-4 mx-2'>
                            <p className="text-md text-gray-600">{title}</p>
                            <div className="flex space-x-2">
                                {/* EDIT BTN ONLICK METHOD */}
                                <button type='button' onClick={() => editItem(id)} className=' text-lg text-green-500
                                 hover:text-green-700 hover:scale-105'>
                                    <FaEdit />
                                </button>
                                {/* DELETE BTN ONLICK METHOD */}
                                <button type='button' onClick={() => removeItem(id)} className=' text-lg text-red-500
                                 hover:text-red-700 hover:scale-105'>
                                    <FaTrash />
                                </button>
                            </div>
                        </article>
                    );
                })
            }
        </div>
    )
}

export default List;
