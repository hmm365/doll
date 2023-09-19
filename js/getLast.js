var requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

fetch('211.44.24.167:9002/codingTest/getLast.php', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
