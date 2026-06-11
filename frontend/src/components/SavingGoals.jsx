import { useState } from "react";
import { toast } from "react-toastify";

import {
    useGetSavingGoalsQuery,
    useCreateSavingGoalMutation,
    useUpdateSavingGoalMutation,
    useDeleteSavingGoalMutation,
} from "../store/apis/savingGoalApi";

import Spinner from "./Spinner";

const SavingGoals = () => {
    const [formData, setFormData] = useState({
        title: "",
        targetAmount: "",
        currentAmount: "",
        deadline: "",
    });

    const [editingId, setEditingId] = useState(null);

    const { title, targetAmount, currentAmount, deadline } = formData;

    const {
        data: goals,
        isLoading,
        isError,
    } = useGetSavingGoalsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [createSavingGoal] = useCreateSavingGoalMutation();
    const [updateSavingGoal] = useUpdateSavingGoalMutation();
    const [deleteSavingGoal] = useDeleteSavingGoalMutation();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const resetForm = () => {
        setFormData({
            title: "",
            targetAmount: "",
            currentAmount: "",
            deadline: "",
        });

        setEditingId(null);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!title || !targetAmount) {
            toast.error("Please fill title and target amount");
            return;
        }

        const goalData = {
            title,
            targetAmount: Number(targetAmount),
            currentAmount: Number(currentAmount) || 0,
            deadline,
        };

        let response;

        if (editingId) {
            response = await updateSavingGoal({
                id: editingId,
                ...goalData,
            });
        } else {
            response = await createSavingGoal(goalData);
        }

        if (response.error) {
            toast.error(
                response.error.data?.message || "Operation failed"
            );
        } else {
            toast.success(
                editingId
                    ? "Saving goal updated successfully"
                    : "Saving goal added successfully"
            );

            resetForm();
        }
    };

    const handleEdit = (goal) => {
        setEditingId(goal._id);

        setFormData({
            title: goal.title,
            targetAmount: goal.targetAmount,
            currentAmount: goal.currentAmount,
            deadline: goal.deadline
                ? goal.deadline.slice(0, 10)
                : "",
        });
    };

    const handleDelete = async (id) => {
        const response = await deleteSavingGoal(id);

        if (response.error) {
            toast.error(
                response.error.data?.message || "Delete failed"
            );
        } else {
            toast.success("Saving goal deleted");
        }
    };

    const calculateProgress = (current, target) => {
        if (!target || target === 0) {
            return 0;
        }

        return Math.round((current / target) * 100);
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return (
            <p className="error">
                Failed to load saving goals.
            </p>
        );
    }

    return (
        <>
            <section className="heading">
                <h1>Saving Goals</h1>

                <p>
                    Create and track your financial goals
                </p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            value={title}
                            className="form-control"
                            placeholder="Goal title"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="number"
                            name="targetAmount"
                            value={targetAmount}
                            className="form-control"
                            placeholder="Target amount"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="number"
                            name="currentAmount"
                            value={currentAmount}
                            className="form-control"
                            placeholder="Current saved amount"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="date"
                            name="deadline"
                            value={deadline}
                            className="form-control"
                            onChange={onChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-block"
                    >
                        {editingId
                            ? "Update Saving Goal"
                            : "Add Saving Goal"}
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
                <h2>Your Saving Goals</h2>

                {goals?.length > 0 ? (
                    <div className="items">
                        {goals.map((goal) => {
                            const progress =
                                calculateProgress(
                                    goal.currentAmount,
                                    goal.targetAmount
                                );

                            return (
                                <div
                                    className="item"
                                    key={goal._id}
                                >
                                    <h3>{goal.title}</h3>

                                    <p>
                                        Target:{" "}
                                        {goal.targetAmount} ALL
                                    </p>

                                    <p>
                                        Saved:{" "}
                                        {goal.currentAmount} ALL
                                    </p>

                                    <p>
                                        Progress: {progress}%
                                    </p>

                                    {goal.deadline && (
                                        <p>
                                            Deadline:{" "}
                                            {new Date(
                                                goal.deadline
                                            ).toLocaleDateString()}
                                        </p>
                                    )}

                                    <div className="progress-wrapper">
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${Math.min(
                                                    progress,
                                                    100
                                                )}%`,
                                            }}
                                        ></div>
                                    </div>

                                    <div className="item-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() =>
                                                handleEdit(
                                                    goal
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn-delete"
                                            onClick={() =>
                                                handleDelete(
                                                    goal._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>No saving goals found.</p>
                )}
            </section>
        </>
    );
};

export default SavingGoals;