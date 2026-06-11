import { useState } from "react";
import { toast } from "react-toastify";

import {
    useGetBudgetsQuery,
    useCreateBudgetMutation,
    useUpdateBudgetMutation,
    useDeleteBudgetMutation,
} from "../store/apis/budgetApi";

import Spinner from "./Spinner";

const categories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Healthcare",
    "Shopping",
    "Utilities",
    "Education",
    "Other",
];

const Budgets = () => {
    const [formData, setFormData] = useState({
        category: "",
        limit: "",
        month: "",
    });

    const [editingId, setEditingId] = useState(null);

    const { category, limit, month } = formData;

    const {
        data: budgets,
        isLoading,
        isError,
    } = useGetBudgetsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [createBudget] = useCreateBudgetMutation();
    const [updateBudget] = useUpdateBudgetMutation();
    const [deleteBudget] = useDeleteBudgetMutation();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const resetForm = () => {
        setFormData({
            category: "",
            limit: "",
            month: "",
        });
        setEditingId(null);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!category || !limit || !month) {
            toast.error("Please fill all fields");
            return;
        }

        const budgetData = {
            category,
            limit: Number(limit),
            month,
        };

        const response = editingId
            ? await updateBudget({ id: editingId, ...budgetData })
            : await createBudget(budgetData);

        if (response.error) {
            toast.error(response.error.data?.message || "Budget failed");
        } else {
            toast.success(
                editingId ? "Budget updated successfully" : "Budget added"
            );
            resetForm();
        }
    };

    const handleEdit = (budget) => {
        setEditingId(budget._id);

        setFormData({
            category: budget.category,
            limit: budget.limit,
            month: budget.month,
        });
    };

    const handleDelete = async (id) => {
        const response = await deleteBudget(id);

        if (response.error) {
            toast.error(response.error.data?.message || "Delete failed");
        } else {
            toast.success("Budget deleted");
        }
    };

    if (isLoading) return <Spinner />;

    if (isError) {
        return <p className="error">Failed to load budgets.</p>;
    }

    return (
        <>
            <section className="heading">
                <h1>Budgets</h1>
                <p>Create and manage your monthly category budgets</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
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
                            type="number"
                            name="limit"
                            value={limit}
                            placeholder="Budget Limit"
                            className="form-control"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="month"
                            name="month"
                            value={month}
                            className="form-control"
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-block">
                        {editingId ? "Update Budget" : "Add Budget"}
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
                <h2>Your Budgets</h2>

                {budgets?.length > 0 ? (
                    <div className="items">
                        {budgets.map((budget) => (
                            <div key={budget._id} className="item">
                                <h3>{budget.category}</h3>
                                <p>Limit: {budget.limit} ALL</p>
                                <p>Month: {budget.month}</p>

                                <div className="item-actions">
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleEdit(budget)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn-delete"
                                        onClick={() =>
                                            handleDelete(budget._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No budgets found.</p>
                )}
            </section>
        </>
    );
};

export default Budgets;