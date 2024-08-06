export function formatCurrency(priceCents) {
  if(priceCents === 0)
    return (0).toFixed(2);
  
  return (priceCents / 100).toFixed(2);
}