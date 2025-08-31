export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount);
};

export const categoryColors = {
  academic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  entertainment: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  religious: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  sports: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  social: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  music: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  arts: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  gaming: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
};