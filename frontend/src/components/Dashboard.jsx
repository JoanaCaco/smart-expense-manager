import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetDashboardStatsQuery } from "../store/apis/dashboardApi";
import Spinner from "./Spinner";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const {
        data: stats,
        isLoading,
        isError,
        refetch,
    } = useGetDashboardStatsQuery(undefined, {
        skip: !user,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            refetch();
        }
    }, [user, navigate, refetch]);

    if (!user) return null;
    if (isLoading) return <Spinner />;

    if (isError) {
        return <p className="error">Failed to load dashboard data.</p>;
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome, {user.name}</h1>
                <p>Your personal finance overview</p>
            </section>

            <section className="dashboard-grid">
                <div className="card income">
                    <h3>Total Income</h3>
                    <p>{stats?.totalIncome ?? 0} ALL</p>
                </div>

                <div className="card expenses">
                    <h3>Total Expenses</h3>
                    <p>{stats?.totalExpenses ?? 0} ALL</p>
                </div>

                <div className="card balance">
                    <h3>Balance</h3>
                    <p>{stats?.balance ?? 0} ALL</p>
                </div>

                <div className="card budget">
                    <h3>Remaining Budget</h3>
                    <p>{stats?.totalBudgetSavings ?? 0} ALL</p>
                </div>

                <div className="card saved">
                    <h3>Total Saved</h3>
                    <p>{stats?.totalSaved ?? 0} ALL</p>
                </div>

                <div className="card progress-card">
                    <h3>Saving Progress</h3>
                    <p>{stats?.savingProgress ?? 0}%</p>
                </div>
            </section>

            <section className="content">
                <h2>Budget Summary</h2>

                {stats?.budgetSummary?.length > 0 ? (
                    <div className="items">
                        {stats.budgetSummary.map((budget) => (
                            <div className="item" key={budget._id}>
                                <h3>{budget.category}</h3>
                                <p>Month: {budget.month}</p>
                                <p>Limit: {budget.limit} ALL</p>
                                <p>Spent: {budget.spent} ALL</p>
                                <p>Remaining: {budget.remaining} ALL</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No budgets yet.</p>
                )}
            </section>
        </>
    );
};

export default Dashboard;