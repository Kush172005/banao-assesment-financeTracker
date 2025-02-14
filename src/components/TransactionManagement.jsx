import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addTransaction,
    editTransaction,
    deleteTransaction,
} from "../slices/transactionsSlice";
import { useGetExchangeRatesQuery } from "../services/exchangeRateApi";

const TransactionManagement = () => {
    const dispatch = useDispatch();
    const { transactions } = useSelector((state) => state.transactions);

    const [newTransaction, setNewTransaction] = useState({
        type: "expense",
        category: "",
        amount: "",
        description: "",
        currency: "USD",
    });
    const [editingId, setEditingId] = useState(null);

    const {
        data: exchangeRates,
        isLoading,
        error,
    } = useGetExchangeRatesQuery();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!exchangeRates || !exchangeRates.conversion_rates) {
            alert("Exchange rates not available. Please try again later.");
            return;
        }

        const amount = parseFloat(newTransaction.amount);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const convertedAmount = convertToUSD(amount, newTransaction.currency);

        const transactionData = {
            id: editingId !== null ? editingId : Date.now(),
            ...newTransaction,
            amount: convertedAmount, // Always storing amount in USD
            originalAmount: amount,
            originalCurrency: newTransaction.currency,
        };

        if (editingId !== null) {
            dispatch(editTransaction(transactionData));
            setEditingId(null);
        } else {
            dispatch(addTransaction(transactionData));
        }

        setNewTransaction({
            type: "expense",
            category: "",
            amount: "",
            description: "",
            currency: "USD",
        });
    };

    const handleEdit = (transaction) => {
        setNewTransaction(transaction);
        setEditingId(transaction.id);
    };

    const handleDelete = (id) => {
        dispatch(deleteTransaction(id));
    };

    const convertToUSD = (amount, currency) => {
        if (!exchangeRates || !exchangeRates.conversion_rates) return amount;
        if (currency === "USD") return amount;

        const rate = exchangeRates.conversion_rates[currency];
        return rate ? amount / rate : amount;
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Transaction Management</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded shadow space-y-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">Type</label>
                        <select
                            name="type"
                            value={newTransaction.type}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={newTransaction.category}
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
                            value={newTransaction.amount}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Currency</label>
                        <select
                            name="currency"
                            value={newTransaction.currency}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="USD">USD (US Dollar)</option>
                            <option value="INR">INR (Indian Rupee)</option>
                            <option value="EUR">EUR (Euro)</option>
                            <option value="GBP">GBP (British Pound)</option>
                            <option value="JPY">JPY (Japanese Yen)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block mb-1">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={newTransaction.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingId !== null
                        ? "Update Transaction"
                        : "Add Transaction"}
                </button>
            </form>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Transaction List</h2>
                {isLoading ? (
                    <p>Loading exchange rates...</p>
                ) : error ? (
                    <p>Error fetching exchange rates</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Type</th>
                                    <th className="p-2 text-left">Category</th>
                                    <th className="p-2 text-left">
                                        Amount (Original)
                                    </th>
                                    <th className="p-2 text-left">
                                        Amount (USD)
                                    </th>
                                    <th className="p-2 text-left">
                                        Description
                                    </th>
                                    <th className="p-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="border-b"
                                    >
                                        <td className="p-2">
                                            {transaction.type}
                                        </td>
                                        <td className="p-2">
                                            {transaction.category}
                                        </td>
                                        <td className="p-2">
                                            {transaction.originalAmount}{" "}
                                            {transaction.originalCurrency}
                                        </td>
                                        <td className="p-2">
                                            ${transaction.amount.toFixed(2)}
                                        </td>
                                        <td className="p-2">
                                            {transaction.description}
                                        </td>
                                        <td className="p-2">
                                            <button
                                                onClick={() =>
                                                    handleEdit(transaction)
                                                }
                                                className="text-blue-600 mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(transaction.id)
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
                )}
            </div>
        </div>
    );
};

export default TransactionManagement;
