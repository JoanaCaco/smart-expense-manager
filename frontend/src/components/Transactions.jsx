import { useState } from "react";
import { toast } from "react-toastify";

import {
    useGetTransactionsQuery,
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,
} from "../store/apis/transactionApi";

import Spinner from "./Spinner";

const categories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Salary",
    "Bonus",
    "Healthcare",
    "Shopping",
    "Utilities",
    "Education",
    "Other",
];

const Transactions = () => {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        notes: "",
    });

    const [editingId, setEditingId] = useState(null);

    const { title, amount, type, category, notes } = formData;

    const {
        data: transactions,
        isLoading,
        isError,
    } = useGetTransactionsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [createTransaction] = useCreateTransactionMutation();
    const [updateTransaction] = useUpdateTransactionMutation();
    const [deleteTransaction] = useDeleteTransactionMutation();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const resetForm = () => {
        setFormData({
            title: "",
            amount: "",
            type: "expense",
            category: "",
            notes: "",
        });
        setEditingId(null);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!title || !amount || !category) {
            toast.error("Please fill all required fields");
            return;
        }

        const transactionData = {
            title,
            amount: Number(amount),
            type,
            category,
            notes,
        };

        const response = editingId
            ? await updateTransaction({ id: editingId, ...transactionData })
            : await createTransaction(transactionData);

        if (response.error) {
            toast.error(response.error.data?.message || "Transaction failed");
        } else {
            toast.success(
                editingId
                    ? "Transaction updated successfully"
                    : "Transaction added successfully"
            );
            resetForm();
        }
    };

    const handleEdit = (transaction) => {
        setEditingId(transaction._id);

        setFormData({
            title: transaction.title,
            amount: transaction.amount,
            type: transaction.type,
            category: transaction.category,
            notes: transaction.notes || "",
        });
    };

    const handleDelete = async (id) => {
        const response = await deleteTransaction(id);

        if (response.error) {
            toast.error(response.error.data?.message || "Delete failed");
        } else {
            toast.success("Transaction deleted");
        }
    };

    if (isLoading) return <Spinner />;

    if (isError) {
        return <p className="error">Failed to load transactions.</p>;
    }

    return (
        <>
            <section className="heading">
                <h1>Transactions</h1>
                <p>Add, edit and manage your income and expenses</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            value={title}
                            className="form-control"
                            placeholder="Transaction title"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="number"
                            name="amount"
                            value={amount}
                            className="form-control"
                            placeholder="Amount"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <select
                            name="type"
                            value={type}
                            className="form-control"
                            onChange={onChange}
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <select
                            name="category"
                            value={category}
                            className="form-control"
                            onChange={onChange}
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="notes"
                            value={notes}
                            className="form-control"
                            placeholder="Notes"
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-block">
                        {editingId ? "Update Transaction" : "Add Transaction"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            className="btn btn-block btn-secondary"
                            onClick={resetForm}
                        >
                            Cancel Edit
                        </button>
                    )}
                </form>
            </section>

            <section className="content">
                <h2>Your Transactions</h2>

                {transactions?.length > 0 ? (
                    <div className="items">
                        {transactions.map((transaction) => (
                            <div className="item" key={transaction._id}>
                                <h3>{transaction.title}</h3>
                                <p>Category: {transaction.category}</p>
                                <p>Type: {transaction.type}</p>
                                <p>Amount: {transaction.amount} ALL</p>
                                {transaction.notes && (
                                    <p>Notes: {transaction.notes}</p>
                                )}

                                <div className="item-actions">
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleEdit(transaction)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn-delete"
                                        onClick={() =>
                                            handleDelete(transaction._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No transactions yet.</p>
                )}
            </section>
        </>
    );
};

export default Transactions;