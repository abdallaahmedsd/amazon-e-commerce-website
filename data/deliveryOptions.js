import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
]

export function getDeliveryOptionById(deliveryOptionId) {
  return deliveryOptions.find(option => option.id === deliveryOptionId) || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  let { deliveryDays } = deliveryOption;

  let deliveryDate = today;

  for(let i = 0; i < deliveryDays; i++) {
    deliveryDate = deliveryDate.add(1, 'day');
    
    if(isWeekend(deliveryDate))
      deliveryDays++;
  }

  return deliveryDate.format('dddd, MMMM D');
}

function isWeekend(date) {
  const dayName = date.format('dddd');
  return ['Friday', 'Saturday'].includes(dayName);
}