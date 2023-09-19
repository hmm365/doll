let totalPrice = 0;
let menuList;

let menuItems = [
  [
    {
      title: '커피',
    },
    {
      name: '아메리카노(HOT)',
      price: '2000',
      count: 0,
    },
    {
      name: '아메리카노(ICE)',
      price: '2300',
      count: 0,
    },
    {
      name: '카페라떼(HOT)',
      price: '3500',
      count: 0,
    },
    {
      name: '카푸치노(HOT)',
      price: '4000',
      count: 0,
    },
  ],
  [
    {
      title: '차/음료',
    },
    {
      name: '레몬에이드',
      price: '3500',
      count: 0,
    },
    {
      name: '밀크쉐이크',
      price: '4500',
      count: 0,
    },
    {
      name: '말차라뗴',
      price: '4500',
      count: 0,
    },
    {
      name: '초코라뗴',
      price: '5000',
      count: 0,
    },
  ],
  [
    {
      title: '디저트',
    },
    {
      name: '초코 쿠키',
      price: '2500',
      count: 0,
    },
    {
      name: '아몬드 쿠키',
      price: '3000',
      count: 0,
    },
    {
      name: '초코 케익',
      price: '4000',
      count: 0,
    },
    {
      name: '딸기 케익',
      price: '4500',
      count: 0,
    },
  ],
  [
    {
      title: '기타',
    },
    {
      name: '생수',
      price: '2000',
      count: 0,
    },
    {
      name: '콜라',
      price: '2500',
      count: 0,
    },
    {
      name: '사이다',
      price: '2500',
      count: 0,
    },
    {
      name: '페리에',
      price: '4000',
      count: 0,
    },
  ],
];

let cardWrap = document.querySelector('.card-wrap');

menuItems.forEach((item) => {
  let card = document.createElement('div');
  card.classList.add('card');
  item.forEach((el, i) => {
    let cardContent = '';
    if (i == 0) {
      cardContent = `
  <div>
    <h2>${el.title}</h2>
  </div>
`;
    } else {
      let formattedNumber = el.price.toLocaleString('en-US');
      cardContent = `
        <div>
          <h3>${el.name}</h3>
          <div class="price">
            <span style="margin-right: 10px">${formattedNumber} 원</span>
            <button class="add-btn" data-price="${formattedNumber}" data-name="${el.name}"><img src="./asset/images/cart.png" alt="카트" /></button>
          </div>
        </div>
      `;
    }
    card.innerHTML += cardContent;
  });
  cardWrap.appendChild(card);
});

let addButtons = document.querySelectorAll('.add-btn');
let cartInner = document.querySelector('.cart-inner');
let orderButton = null;
let resetButton = null;
let minButtons = null;
addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    let itemName = button.dataset.name;
    menuItems.forEach((item) => {
      item.forEach((el) => {
        if (el.name == itemName) {
          el.count++;
        }
      });
    });
    addCart();
  });
});

function addCart() {
  orderButton = null;
  resetButton = null;
  minButtons = null;
  cartInner.innerHTML = '';
  totalPrice = 0;
  let text = '';
  menuItems.forEach((item) => {
    item.forEach((el) => {
      if (el.count > 0) {
        let formattedNumber = el.price.toLocaleString('en-US');
        text += `<li>
          ${el.name} ${el.count}개 ${Number(formattedNumber) * Number(el.count)} 원
          <button class='min-button' data-name="${el.name}">-</button>
        </li>`;
        totalPrice += Number(formattedNumber) * Number(el.count);
      }
    });
  });

  if (totalPrice > 0) {
    cartInner.innerHTML += `<h2>주문목록</h2>`;
    cartInner.innerHTML += text;
    cartInner.innerHTML += `<li>
        총 ${totalPrice} 원
        <button class='reset'>초기화</button>
      </li>`;
    cartInner.innerHTML += `<div>
        <button class='order'>주문하기</button>
      </div>`;

    minButtons = document.querySelectorAll('.min-button');
    minButtons.forEach((button) => {
      button.addEventListener('click', () => {
        let itemName = button.dataset.name;
        menuItems.forEach((item) => {
          item.forEach((el) => {
            if (el.name == itemName) {
              el.count--;
            }
          });
        });
        addCart();
      });
    });
    orderButton = document.querySelector('.reset').addEventListener('click', () => {
      cartInner.innerHTML = '';
      totalPrice = 0;
      menuItems.forEach((category) => {
        category.forEach((item) => {
          if (item.hasOwnProperty('count')) {
            item.count = 0;
          }
        });
      });
    });
    resetButton = document.querySelector('.order').addEventListener('click', () => {
      restFulApiTest();
    });
  }
}

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

  menuItems.forEach((item) => {
    item.forEach(async (el) => {
      if (el.count > 0) {
        const raw = JSON.stringify({
          order_id: '0001',
          product_name: el.name,
          options: '',
          table_no: '1',
          quantiy: el.count,
          order_date: year + '-' + month + '-' + day,
          order_time: hours + ':' + minutes + ':' + seconds,
        });

        const requestOptions = {
          method: 'post',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        const res = await fetch('http://211.44.24.167:9002/codingTest/post.php', requestOptions).then((response) => response.text());
        window.alert(res);
        cartInner.innerHTML = '';
        totalPrice = 0;
        menuItems.forEach((category) => {
          category.forEach((item) => {
            if (item.hasOwnProperty('count')) {
              item.count = 0;
            }
          });
        });
      }
    });
  });
}
