async function restFulApiTest() {
  let currentDate = new Date();

  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅
  let day = String(currentDate.getDate()).padStart(2, '0');
  let hours = String(currentDate.getHours()).padStart(2, '0');
  let minutes = String(currentDate.getMinutes()).padStart(2, '0');
  let seconds = String(currentDate.getSeconds()).padStart(2, '0');

  let formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    order_id: '0007',
    product_name: '카페모카',
    options: '',
    table_no: '3',
    quantiy: '1',
    order_date: year + '-' + month + '-' + day,
    order_time: hours + ':' + minutes + ':' + seconds,
    date_time: formattedDateTime,
    robot_status: '',
    dong: '120',
    ho: '1701',
    seq: '230710100074',
    orderer_name: '홍0동',
  });

  const requestOptions = {
    method: 'post',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const res = await fetch('http://211.44.24.167:9002/codingTest/post.php', requestOptions).then((response) => response.text());

  document.getElementById('result').innerHTML = res;
  console.log(res);
}

(function init() {
  restFulApiTest();
})();
