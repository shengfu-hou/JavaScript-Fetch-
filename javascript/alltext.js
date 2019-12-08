const jsonUrl = 'https://raw.githubusercontent.com/hsiangfeng/JSHomeWork/master/JSON/datastore_search.json';

let jsonData = {};
var sel = [];

fetch(jsonUrl, { method: 'get' })
  .then((response) => {
    return response.json();
  }).then((data) => {
    jsonData = data.result.records;

    get(jsonData);
    change(jsonData);
    pagination(jsonData, 1)

  });
function change(jsonData) {
  
  var area = document.querySelector('.area');
  area.addEventListener('change', changeArea);
  function changeArea(e) {
    sel = [];
    
    for (var i = 0; i < jsonData.length; i++) {
      if (jsonData[i].Zone == e.target.value) {
        sel.push(jsonData[i])
      }
      
    }
    pagination(sel,1)
    flag=false;//換頁資料
    console.log(sel);
  }
  var label = document.querySelector('.label');
  label.addEventListener('click', goto);
  function goto(e){
    sel = [];
    e.preventDefault();
    if(e.target.nodeName!=="A"){return}
    console.log(e.target.text)
   
    for (var i = 0; i < jsonData.length; i++) {
      if (jsonData[i].Zone == e.target.text) {
        sel.push(jsonData[i])
      }
      
    }
    pagination(sel,1)
    flag=false;//換頁資料
  }
  
}




function get(jsonData) {
 
  var area = document.querySelector('.area');
  var Zone = ["--請選擇行政區--"];
  //把data放入zone陣列裡，並除去重複的區域
  for (var i = 0; i < jsonData.length; i++) {
    var flag = true;
    for (var j = 0; j < Zone.length; j++) {
      if (jsonData[i].Zone == Zone[j]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      Zone.push(jsonData[i].Zone);
    }
  }
  // 載入行政區資料到 select 裡
  for (var i = 0; i < Zone.length; i++) {
    var opt = document.createElement('option');
    opt.setAttribute('value', Zone[i]);
    opt.textContent = Zone[i];
    area.appendChild(opt);
  }

}
function pagination(jsonData, nowPage) {
  console.log(nowPage);
  // 取得全部資料長度
  const dataTotal = jsonData.length;
  
  // 要顯示在畫面上的資料數量，預設每一頁只顯示五筆資料。
  const perpage = 6;

  // page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料
  // 這邊要注意，因為有可能會出現餘數，所以要無條件進位。
  const pageTotal = Math.ceil(dataTotal / perpage);
  console.log( pageTotal);
  // 當前頁數
  let currentPage = nowPage;

  // 因為要避免當前頁數筆總頁數還要多，假設今天總頁數是 3 筆，就不可能是 4 或 5
  // 所以要在寫入一個判斷避免這種狀況。
  // 當"當前頁數"比"總頁數"大的時候，"當前頁數"就等於"總頁數"
  if (currentPage > pageTotal) {
    currentPage = pageTotal;
  }

  // 由前面可知 最小數字為 6 ，所以用答案來回推公式。
  const minData = (currentPage * perpage) - perpage + 1;
  const maxData = (currentPage * perpage);

  // 先建立新陣列
  const data = [];
  // 使用 ES6 forEach 做資料處理
  // 這邊必須使用索引來判斷資料位子，所以要使用 index
  jsonData.forEach((item, index) => {
    // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
    const num = index + 1;
    // 這邊判斷式會稍微複雜一點
    // 當 num 比 minData 大且又小於 maxData 就push進去新陣列。
    if (num >= minData && num <= maxData) {
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
function displayData(data) {
  let str = '';

  data.forEach((item) => {
    str +=
    `<li class="li-style ">
     <div style="background-image: url('${item.Picture1}')">
    <h2>${item.Name}</h2>
    <p>${item.Zone}</p></div>
    <ul class="news"><li><img src="assets/icons_clock.png">${item.Opentime}</li>
      <li><img src="assets/icons_pin.png">${item.Add}</li>
        <li><img src="assets/icons_phone.png">${item.Tel}</li>
        <li class="ticket"><img src="assets/icons_tag.png">${item.Ticketinfo}</li>
    </ul>
    </li>`
  });
  var list = document.querySelector('.list');
  list.innerHTML = str;
}
var pageid = document.querySelector(".pagination");
function pageBtn(page) {
  let str = '';
  const total = page.pageTotal;
  for (let i = 1; i <= total; i++) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
  };

  pageid.innerHTML = str;
}
var flag = true;
function switchPage(e) {
  e.preventDefault();
  const page = e.target.dataset.page;
  if(flag){
    pagination(jsonData, page);
    
  }
  else{
    pagination(sel, page);
  }
  
}

pageid.addEventListener('click', switchPage);




