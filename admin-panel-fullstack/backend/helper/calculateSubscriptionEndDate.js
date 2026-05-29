function calculateSubscriptionEndDate(duration) {
  const endDate = new Date();

  const addMonths = (n) => endDate.setMonth(endDate.getMonth() + n);

  switch (duration) {
    case '1_month':
      addMonths(1);
      break;
    case '3_months':
      addMonths(3);
      break;
    case '6_months':
      addMonths(6);
      break;
    case '1_year':
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
    default:
      addMonths(1);
  }

  return endDate;
}

module.exports = calculateSubscriptionEndDate;