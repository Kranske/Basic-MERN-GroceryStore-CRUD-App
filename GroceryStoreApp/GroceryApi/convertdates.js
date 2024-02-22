const fs = require('fs');

function convertDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

const data = [
    {
       "orderNo": 1001,
       "orderDate": "23/05/2022",
       "custNo": 9876598765,
       "productCode": 1,
       "productName": "Edible oil",
       "productQuantity": 3,
       "productPrice": 90,
       "total": 270,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1002,
       "orderDate": "23/05/2022",
       "custNo": 4213598734,
       "productCode": 1,
       "productName": "Edible oil",
       "productQuantity": 5,
       "productPrice": 90,
       "total": 450,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1003,
       "orderDate": "23/05/2022",
       "custNo": 2342342341,
       "productCode": 6,
       "productName": "Toothbrush",
       "productQuantity": 2,
       "productPrice": 40,
       "total": 80,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1004,
       "orderDate": "23/05/2022",
       "custNo": 8890102345,
       "productCode": 9,
       "productName": "Shampoo",
       "productQuantity": 15,
       "productPrice": 20,
       "total": 300,
       "modeOfPayment": "Online"
     },
     {
       "orderNo": 1005,
       "orderDate": "23/05/2022",
       "custNo": 7008945671,
       "productCode": 1,
       "productName": "Edible oil",
       "productQuantity": 1,
       "productPrice": 90,
       "total": 90,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1006,
       "orderDate": "23/05/2022",
       "custNo": 9090909000,
       "productCode": 6,
       "productName": "Toothbrush",
       "productQuantity": 10,
       "productPrice": 40,
       "total": 400,
       "modeOfPayment": "Online"
     },
     {
       "orderNo": 1007,
       "orderDate": "23/05/2022",
       "custNo": 5437896510,
       "productCode": 9,
       "productName": "shampoo",
       "productQuantity": 50,
       "productPrice": 20,
       "total": 100,
       "modeOfPayment": "Online"
     },
     {
       "orderNo": 1008,
       "orderDate": "23/05/2022",
       "custNo": 7879797979,
       "productCode": 1,
       "productName": "Edible oil",
       "productQuantity": 10,
       "productPrice": 90,
       "total": 900,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1009,
       "orderDate": "24/05/2022",
       "custNo": 2200222012,
       "productCode": 6,
       "productName": "Toothbrush",
       "productQuantity": 4,
       "productPrice": 40,
       "total": 160,
       "modeOfPayment": "Online"
     },
     {
       "orderNo": 1010,
       "orderDate": "25/05/2022",
       "custNo": 5467458791,
       "productCode": 6,
       "productName": "Toothbrush",
       "productQuantity": 9,
       "productPrice": 40,
       "total": 360,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1011,
       "orderDate": "24/05/2022",
       "custNo": 4346356289,
       "productCode": 9,
       "productName": "shampoo",
       "productQuantity": 6,
       "productPrice": 20,
       "total": 120,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1012,
       "orderDate": "26/05/2022",
       "custNo": 7645745199,
       "productCode": 1,
       "productName": "Edible oil",
       "productQuantity": 50,
       "productPrice": 90,
       "total": 4500,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1013,
       "orderDate": "24/05/2022",
       "custNo": 7887348888,
       "productCode": 9,
       "productName": "shampoo",
       "productQuantity": 2,
       "productPrice": 20,
       "total": 40,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1014,
       "orderDate": "24/05/2022",
       "custNo": 4367543876,
       "productCode": 1,
       "productName": "Edible oil",
       "productQuantity": 5,
       "productPrice": 90,
       "total": 450,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1015,
       "orderDate": "24/05/2022",
       "custNo": 880888880,
       "productCode": 1,
       "productName": "Edible oil",
       "productQuantity": 12,
       "productPrice": 90,
       "total": 1080,
       "modeOfPayment": "Online"
     },
     {
       "orderNo": 1016,
       "orderDate": "30/05/2022",
       "custNo": 4377764728,
       "productCode": 1,
       "productName": "Edible oil",
       "productQuantity": 15,
       "productPrice": 90,
       "total": 1350,
       "modeOfPayment": "Online"
     },
     {
       "orderNo": 1017,
       "orderDate": "24/05/2022",
       "custNo": 9823473469,
       "productCode": 1,
       "productName": "Edible oil",
       "productQuantity": 20,
       "productPrice": 90,
       "total": 1800,
       "modeOfPayment": "Online"
     },
     {
       "orderNo": 1018,
       "orderDate": "27/05/2022",
       "custNo": 8789798999,
       "productCode": 9,
       "productName": "shampoo",
       "productQuantity": 100,
       "productPrice": 20,
       "total": 2000,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1019,
       "orderDate": "23/05/2022",
       "custNo": 5654638289,
       "productCode": 9,
       "productName": "shampoo",
       "productQuantity": 20,
       "productPrice": 20,
       "total": 400,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1020,
       "orderDate": "24/05/2022",
       "custNo": 9887689456,
       "productCode": 9,
       "productName": "shampoo",
       "productQuantity": 70,
       "productPrice": 20,
       "total": 1400,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1021,
       "orderDate": "26/05/2022",
       "custNo": 9876598765,
       "productCode": 9,
       "productName": "shampoo",
       "productQuantity": 3,
       "productPrice": 20,
       "total": 60,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1022,
       "orderDate": "27/05/2022",
       "custNo": 8789798999,
       "productCode": 4,
       "productName": "P_biscuit",
       "productQuantity": 2,
       "productPrice": 10,
       "total": 20,
       "modeOfPayment": "Online"
     },
     {
       "orderNo": 1023,
       "orderDate": "30/05/2022",
       "custNo": 9823473469,
       "productCode": 4,
       "productName": "P_biscuit",
       "productQuantity": 5,
       "productPrice": 11,
       "total": 75,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1024,
       "orderDate": "02/06/2022",
       "custNo": 9090909000,
       "productCode": 9,
       "productName": "shampoo",
       "productQuantity": 20,
       "productPrice": 22,
       "total": 440,
       "modeOfPayment": "Cash"
     },
     {
       "orderNo": 1025,
       "orderDate": "02/06/2022",
       "custNo": 8789798999,
       "productCode": 1,
       "productName": "Edible oil",
       "productQuantity": 10,
       "productPrice": 99,
       "total": 990,
       "modeOfPayment": "Online"
     }]
    ;

data.forEach(item => {
  item.orderDate = convertDate(item.orderDate);
});

fs.writeFileSync('convertedData.json', JSON.stringify(data, null, 2));