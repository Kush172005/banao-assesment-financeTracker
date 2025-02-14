import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const { transactions } = useSelector((state) => state.transactions);
    const { budgetGoals } = useSelector((state) => state.budgetGoals);

    useEffect(() => {
        console.log("Dashboard Transactions Data: ", transactions);
    }, [transactions]);

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const expensesByCategory = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    const savings = totalIncome - totalExpenses;

    const chartData = {
        labels: Object.keys(expensesByCategory),
        datasets: [
            {
                data: Object.values(expensesByCategory),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
            },
        ],
    };

    return (
        <div className="space-y-10 p-6">
            <h1 className="text-4xl font-bold text-gray-800 text-center">
                Dashboard
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        title: "Total Income",
                        amount: totalIncome,
                        color: "text-green-600",
                        bg: "bg-green-100",
                    },
                    {
                        title: "Total Expenses",
                        amount: totalExpenses,
                        color: "text-red-600",
                        bg: "bg-red-100",
                    },
                    {
                        title: "Savings",
                        amount: savings,
                        color: "text-blue-600",
                        bg: "bg-blue-100",
                    },
                ].map(({ title, amount, color, bg }, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all ${bg}`}
                    >
                        <h2 className="text-xl font-semibold text-gray-700">
                            {title}
                        </h2>
                        <p className={`text-3xl font-bold ${color}`}>
                            ${amount.toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Expenses Pie Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
                    Expenses by Category
                </h2>
                <div className="w-full flex justify-center">
                    <div className="w-72">
                        <Pie data={chartData} />
                    </div>
                </div>
            </div>

            {/* Budget Goals */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
                    Budget Goals
                </h2>
                <div className="space-y-4">
                    {budgetGoals.length === 0 ? (
                        <p className="text-gray-500 text-center">
                            No budget goals set.
                        </p>
                    ) : (
                        budgetGoals.map((goal, index) => {
                            const spent = expensesByCategory[goal.category] || 0;
                            const percentage = Math.min(
                                (spent / goal.amount) * 100,
                                100
                            );
                            const isOverBudget = spent > goal.amount;

                            return (
                                <div key={index} className="space-y-2">
                                    <p className="text-gray-600 font-medium">
                                        {goal.category}:{" "}
                                        <span className="font-semibold">
                                            ${spent.toFixed(2)} / ${goal.amount}
                                        </span>
                                    </p>
                                    <div className="w-full bg-gray-300 rounded-full h-3">
                                        <div
                                            className="h-3 rounded-full transition-all"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: isOverBudget
                                                    ? "#EF4444"
                                                    : "#3B82F6",
                                            }}
                                        ></div>
                                    </div>
                                    {isOverBudget && (
                                        <p className="text-red-600 text-sm">
                                            Over budget by $
                                            {(spent - goal.amount).toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
