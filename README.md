# rgt 과제전형

- 1과제 RestFul Api 작성
  -  post 를 하여 그냥 정보가 넣는것인지 아니면 input 을 하여 Data 를 넣는것인지 잘모르겠음
- 2과제 Shopping Cart 프로그램 작성
  -  table_no 는 어떤식으로 가야하는지 설명이 필요
  -  order_id 는 주로 백에서 자동처리가 되는것이 아닌지?
  -  각 음료 명마다 같은 order_id 가 같아도 괜찮은것인지?
-  서버에서 get 으로 호출한후 가공하여 하는것인지 그대로 data 를 가져와 가공하는것인지 모르겠음


### 문제점
- CORS 오류 문제 POSTMAN 에서는 잘작동하나 실 클라이언트인 LocalHost 에서는 CORS 문제 발생
- https --> http 호출문제 현 백엔드 서버는 http로 구성되어있음 CORS 문제를 해결하기위해 https 로 도메인을 변경하면 http 오류가 생김
- 위 오류를 해결하기위해서는 터미널에서 ```open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security;``` 을 쓸 필요성이있음
