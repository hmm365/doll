var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

var raw = JSON.stringify({
  order_id: '0007',
  product_name: '카페모카',
  options: '',
  table_no: '3',
  quantiy: '1',
  order_date: '2023-07-17',
  order_time: '17:33:31',
  date_time: '2023-07-17 17:33:31',
  robot_status: '',
  dong: '120',
  ho: '1701',
  seq: '230710100074',
  orderer_name: '홍0동',
});

var requestOptions = {
  method: 'post',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('http://211.44.24.167:9002/codingTest/getLast.php', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
