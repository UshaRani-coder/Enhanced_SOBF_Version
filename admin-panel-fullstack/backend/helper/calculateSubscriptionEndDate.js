// Helper function to calculate subscription end date
export function calculateSubscriptionEndDate(duration) {
 const endDate = new Date();
 switch (duration) {
  case '1_month':
   endDate.setMonth(endDate.getMonth() + 1);
   break;
  case '3_months':
   endDate.setMonth(endDate.getMonth() + 3);
   break;
  case '6_months':
   endDate.setMonth(endDate.getMonth() + 6);
   break;
  case '1_year':
   endDate.setFullYear(endDate.getFullYear() + 1);
   break;
  default:
   endDate.setMonth(endDate.getMonth() + 1);
 }
 return endDate;
}