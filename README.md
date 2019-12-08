# JavaScript-Fetch

高雄旅遊資訊  [demo](http://htmlpreview.github.io/?https://github.com/shengfu-hou/JavaScript-Fetch-/blob/master/tourism.html)

## 摘要
  1.此練習為使用ES6-Fetch將資料載入，然後顯示於畫面中
  ```Javascript
const jsonUrl = 'https://raw.githubusercontent.com/hsiangfeng/JSHomeWork/master/JSON/datastore_search.json';

fetch(jsonUrl, {method: 'get'})
  .then((response) => {
  return response;
}).then((data) => {
  console.log(data);
})
```
  
  2.綁定事件：a.`select-opition`改變時，會將符合的資料取出，顯示於界面中
```Javascript
 document.querySelector('.area').addEventListener('change', changeArea);
```
             b. 點擊按鈕時，將需要的值取出，顯示於界面中
```Javascript
document.querySelector('.label').addEventListener('click', goto);
```
  3.分頁技巧:每一頁要顯示的資料數量，資料總數量
                 ,資料處理方法
```Javascript
  function pagination(jsonData, nowPage) {
    console.log(nowPage);
    // 取得全部資料長度
    const dataTotal = jsonData.length;

    // 要顯示在畫面上的資料數量，預設每一頁只顯示五筆資料。
    const perpage = 5;

    // page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料
    // 這邊要注意，因為有可能會出現餘數，所以要無條件進位。
    const pageTotal = Math.ceil(dataTotal / perpage);

    // 當前頁數
    let currentPage = nowPage;  

    // 因為要避免當前頁數筆總頁數還要多，假設今天總頁數是 3 筆，就不可能是 4 或 5
    // 所以要在寫入一個判斷避免這種狀況。
    // 當"當前頁數"比"總頁數"大的時候，"當前頁數"就等於"總頁數"
    if (currentPage > pageTotal) {
      currentPage = pageTotal;
    }

    // 由前面可知 最小數字為 6 ，所以用答案來回推公式。
    const minData = (currentPage * perpage) - perpage + 1 ;
    const maxData = (currentPage * perpage) ;

    // 先建立新陣列
    const data = [];
    // 使用 ES6 forEach 做資料處理
    // 這邊必須使用索引來判斷資料位子，所以要使用 index
    jsonData.forEach((item, index) => {
      // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
      const num = index + 1;
      // 當 num 比 minData 大且又小於 maxData 就push進去新陣列。
      if ( num >= minData && num <= maxData) {
        data.push(item);
      }
    })
    // 用物件方式來傳遞資料
    const page = {
      pageTotal,
      currentPage,
      hasPage: currentPage > 1,
      hasNext: currentPage < dataTotal,
    }
    displayData(data);
    pageBtn(page);
  }
```

                 



