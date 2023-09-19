async function getLast() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const res = await fetch('http://211.44.24.167:9002/codingTest/getLast.php', requestOptions).then((response) => response.json());
  console.log(res);

  for (const value of res) {
    document.querySelector('.order-list').innerHTML += `
    <div class="order_inner">
      <h2>RGT 테스트 매장</h2>
      <h2>테스트</h2>
      <div class="oder-value">
        <p>주문일</p>
        <span>${formatDate(value.date_time)}</span>
      </div>
      <div class="oder-value">
        <p>주문자</p>
        <span>${value.orderer_name}</span>
      </div>
      <div class="oder-value">
        <p>테이블번호</p>
        <span>${value.table_no}</span>
      </div>
      <div class="oder-value">
        <p>주문번호</p>
        <span>${value.order_id}</span>
      </div>
      <div class="oder-button">
        <button class="prev-btn">이전 화면</button>
        <button class="next-btn">확인</button>
      </div>
    </div>
    `;
  }
}

(function init() {
  getLast();
})();

function formatDate(date) {
  console.log(date);
  let newDate = new Date(date);
  let daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  let year = newDate.getFullYear();
  let month = String(newDate.getMonth() + 1).padStart(2, '0');
  let day = String(newDate.getDate()).padStart(2, '0');
  let dayOfWeek = daysOfWeek[newDate.getDay()];
  let result = year + '-' + month + '-' + day + '(' + dayOfWeek + ')';

  return result;
}
