use('mongodbVSCodePlaygroundDB');

// 판매품목 설정
db.getCollection('sales').insertMany([
  {
    item: 'abc',
    price: 10,
    quantity: 2,
    date: new Date('2024-03-01T08:00:00Z'),
  },
  {
    item: 'jkl',
    price: 20,
    quantity: 1,
    date: new Date('2024-03-01T09:00:00Z'),
  },
  {
    item: 'xyz',
    price: 5,
    quantity: 10,
    date: new Date('2024-03-15T09:00:00Z'),
  },
  {
    item: 'xyz',
    price: 5,
    quantity: 20,
    date: new Date('2024-04-04T11:21:39.736Z'),
  },
  {
    item: 'abc',
    price: 10,
    quantity: 10,
    date: new Date('2024-04-04T21:23:13.331Z'),
  },
  {
    item: 'def',
    price: 7.5,
    quantity: 5,
    date: new Date('2025-06-04T05:08:13Z'),
  },
  {
    item: 'def',
    price: 7.5,
    quantity: 10,
    date: new Date('2025-09-10T08:43:00Z'),
  },
  {
    item: 'abc',
    price: 10,
    quantity: 5,
    date: new Date('2024-02-06T20:20:13Z'),
  },
]);

// 특정 날짜에 판매된 품목 확인
const salesOnApril4th = db
  .getCollection('sales')
  .find({
    date: { $gte: new Date('2024-04-04'), $lt: new Date('2024-04-05') },
  })
  .count();

// 메시지 창 표시
console.log(`${salesOnApril4th} sales occurred in 2024.`);

// 결과 표시
// '.toArray()' 로 전체 확인
// '.hasNext()/.next()' 로 페이지별 확인
db.getCollection('sales').aggregate([
  // 2024년에 발생한 모든 거래 확인
  {
    $match: {
      date: { $gte: new Date('2024-01-01'), $lt: new Date('2025-01-01') },
    },
  },
  // 각 품목의 전체 판매량 확인
  {
    $group: {
      _id: '$item',
      totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } },
    },
  },
]);
