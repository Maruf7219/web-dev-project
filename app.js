let myleads = [];
let oldLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"));
if (leadsFromLocalStorage) {
  myleads = leadsFromLocalStorage;
  render(myleads);
}

tabBtn.addEventListener("click", function () {
  // use api to get tab url from chrome
  chrome.tabs.query({ active: true, currentwindow: true }, function (tabs) {
    myleads.push(tabs[0].url);
    localStorage.setItem("myleaads", JSON.stringify(myleads));
    render(myleads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    //1st way to add anchor tag to list item
    // listItems +=
    //   "<li><a target='_blank' href=' " +
    //   myleads[i] +
    //   "' >" +
    //   myleads[i] +
    //   " </a></li>";

    //2nd way top add anchortag tag li with backticks " ` " called template string
    listItems += `<li>
    <a target='_blank' href='${leads[i]}'>${leads[i]}
     </a>
    </li>`;

    // ulEl.innerHTML += "<li>" + myleads[i] + "</li> "

    // const li = document.createElement("li")
    // li.textContent= myleads[i]
    // ulEl.append(li)
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myleads = [];
  render(myleads);
});

inputBtn.addEventListener("click", function () {
  myleads.push(inputEl.value);
  //clearing out the input field
  inputEl.value = "";
  localStorage.setItem("myleads", JSON.stringify(myleads));

  render(myleads);
  console.log(localStorage.getItem("myleads"));
});
