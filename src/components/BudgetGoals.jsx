import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addBudgetGoal,
    editBudgetGoal,
    deleteBudgetGoal,
} from "../slices/budgetGoalsSlice";

const BudgetGoals = () => {
    const dispatch = useDispatch();
    const { budgetGoals } = useSelector((state) => state.budgetGoals);
    const [newGoal, setNewGoal] = useState({ category: "", amount: "" });
    const [editingId, setEditingId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGoal((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId !== null) {
            dispatch(
                editBudgetGoal({
                    id: editingId,
                    ...newGoal,
                    amount: Number.parseFloat(newGoal.amount),
                })
            );
            setEditingId(null);
        } else {
            dispatch(
                addBudgetGoal({
                    id: Date.now(),
                    ...newGoal,
                    amount: Number.parseFloat(newGoal.amount),
                })
            );
        }
        setNewGoal({ category: "", amount: "" });
    };

    const handleEdit = (goal) => {
        setNewGoal(goal);
        setEditingId(goal.id);
    };

    const handleDelete = (id) => {
        dispatch(deleteBudgetGoal(id));
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Budget Goals</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded shadow space-y-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={newGoal.category}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={newGoal.amount}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingId !== null ? "Update Goal" : "Add Goal"}
                </button>
            </form>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">
                    Budget Goals List
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 text-left">Category</th>
                                <th className="p-2 text-left">Amount</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {budgetGoals.map((goal) => (
                                <tr key={goal.id} className="border-b">
                                    <td className="p-2">{goal.category}</td>
                                    <td className="p-2">
                                        ${goal.amount.toFixed(2)}
                                    </td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleEdit(goal)}
                                            className="text-blue-600 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(goal.id)
                                            }
                                            className="text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BudgetGoals;
