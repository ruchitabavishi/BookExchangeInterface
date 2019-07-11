var Books = [

    {
        "id": "0",
        "title": "",
        "Auther": "",
        "Lender": "",
        "Borrower": "",
        "Actions": "",
        "requestedBy": ""
    }

];
var user = ""

function submit() {
    user = document.getElementById('userText').value

    document.getElementById("content").appendChild(buildTable(Books));
}
function buildTable(data) {
    debugger
    var bookTitle = ""
    var bookAuther = ""
    if (document.getElementById('booksTable')) {
        var myNode = document.getElementById("content");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

    }
    var table = document.createElement("table");
    table.setAttribute("id", "booksTable")
    table.className = "gridtable";
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    ["ID", "Title", "Auther", "Lender", "Borrower", "Action"].forEach(function (el) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(el));
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
    data.forEach(function (el) {
        var tr = document.createElement("tr");
        for (var o in el) {
            if (o != "requestedBy") {
                var td = document.createElement("td");
                if (o == "Actions") {
                    debugger
                    var text = ""
                    if (el.title == "") {
                        var btn = document.createElement('input');
                        btn.type = "button";
                        btn.className = "btn";
                        btn.value = "Add Book";
                        btn.onclick = (function () {
                            Books.splice(-1, 1)
                            var tempObj = {
                                "id": Books.length,
                                "title": document.getElementById('bookTitle').value,
                                "Auther": document.getElementById('bookAuther').value,
                                "Lender": user,
                                "Borrower": "-",
                                "Actions": ""
                            }
                            Books.push(tempObj)
                            tempObj = {
                                "id": "0",
                                "title": "",
                                "Auther": "",
                                "Lender": "",
                                "Borrower": "",
                                "Actions": "",
                                "requestedBy": ""
                            }
Books.push(tempObj)
                            document.getElementById("content").appendChild(buildTable(Books));

                        });
                        td.appendChild(btn);
                    }
                    if (el.Lender == user) {
                        text = "-"
                    }

                    else if (el.Borrower == "-" && el.Lender != user) {
                        var btn = document.createElement('input');
                        btn.type = "button";
                        btn.className = "btn";
                        btn.value = "Borrow";
                        btn.onclick = (function () {
                            el.Borrower = user
                            btn.value = "Return"
                            var txt;
                            var person = prompt("Please Enter Time in Seconds", "60");
                            if (person == null || person == "") {
                                setTimeout(function () {
                                    el.Borrower = "-"
                                    document.getElementById("content").appendChild(buildTable(Books));
                                }, 10000)
                            } else {
                                txt = "Hello " + person + "! How are you today?";
                                setTimeout(function () {
                                    el.Borrower = "-"
                                    document.getElementById("content").appendChild(buildTable(Books));
                                }, person * 1000)
                            }
                            btn.value = "Return";

                        });
                        td.appendChild(btn);


                    }
                    else if (el.Borrower == user) {
                        var btn = document.createElement('input');
                        btn.type = "button";
                        btn.className = "btn";
                        btn.value = "Return";
                        btn.onclick = (function () {
                            el.Borrower = "-"
                            btn.value = "Borrow";
                        });
                        td.appendChild(btn);
                    }
                    else if (el.Borrower != "" && !el.requestedBy) {

                        var btn = document.createElement('input');
                        btn.type = "button";
                        btn.className = "btn";
                        btn.value = "Request Next";
                        btn.onclick = (function () {
                            el.requestedBy = user
                            document.getElementById("content").appendChild(buildTable(Books));
                        });
                        td.appendChild(btn);
                    }
                    else if (el.requestedBy == user) {
                        td.appendChild(document.createTextNode("Requested "))
                    }
                    else if (el.requestedBy != "") {
                        td.appendChild(document.createTextNode("Requested By" + el.requestedBy))
                    }
                }
                else if (o == "title" && el[o] == "") {
                    var inpt = document.createElement('input');
                    inpt.type = "text";
                    inpt.setAttribute("id", "bookTitle")
                    td.appendChild(inpt);
                }
                else if (o == "Auther" && el[o] == "") {
                    var inpt = document.createElement('input');
                    inpt.type = "text";
                    inpt.setAttribute("id", "bookAuther")
                    td.appendChild(inpt);
                }
                else {


                    td.appendChild(document.createTextNode(el[o]))

                }
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }
    );


    table.appendChild(tbody);

    return table;
}

function timeOutAndReAssign(el) {
    debugger

}
window.onload = function () {
    // document.getElementById("content").appendChild(buildTable(Books));
}