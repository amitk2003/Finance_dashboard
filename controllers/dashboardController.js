
import Record from '../models/Record.js';
const getSummary = async (req, res) => {
  try {
    const records = await Record.find({isDeleted: false });

    const totalIncome = records
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpenses = records
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);

    const categoryTotals = records.reduce((acc, r) => {
      const key = r.category;
      acc[key] = (acc[key] || 0) + (r.type === 'income' ? r.amount : -r.amount);
      return acc;
    }, {});

    const recent = records
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.json({
      total_income: totalIncome,
      total_expenses: totalExpenses,
      net_balance: totalIncome - totalExpenses,
      category_totals: categoryTotals,
      recent_records: recent
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default getSummary;
