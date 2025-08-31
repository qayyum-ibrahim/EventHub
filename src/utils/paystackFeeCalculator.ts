export const calculatePaystackFee = (amount: number): number => {
  // Paystack fee structure: 1.5% + ₦100 (capped at ₦2000)
  const feePercentage = 0.015;
  const fixedFee = 100;
  const maxFee = 2000;
  
  const calculatedFee = (amount * feePercentage) + fixedFee;
  return Math.min(calculatedFee, maxFee);
};

export const calculateGrandTotal = (amount: number): number => {
  const fee = calculatePaystackFee(amount);
  return amount + fee;
};