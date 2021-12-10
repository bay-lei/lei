let text = document.querySelector("#search");
let btn = document.querySelector("#btn");
let title = document.getElementById('title');
let singer = document.getElementById('singer');
let album = document.getElementById('album');
let biaoge = document.getElementById("biaoge");
function empty(e) {
    while (e.children[1]) {
        e.removeChild(e.children[1]);
    }
}
btn.addEventListener('click', () => {
    empty(biaoge);
    let xhr = new XMLHttpRequest();
    var key = text.value;
    var url = " http://cloud-music.pl-fe.cn/search?keywords=" + key;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                const res = JSON.parse(xhr.response);
                const song = res.result.songs;
                for (var i = 0; i < song.length; i++) {
                    let a = document.createElement('tr');
                    if ((i + 1) % 2 == 0) {
                        a.style.backgroundColor = "#F7F7F7";
                    }
                    let t1 = document.createElement('td');
                    t1.style.width = 500 + "px";
                    let t2 = document.createElement('td');
                    t2.style.width = 250 + "px";
                    let t3 = document.createElement('td');
                    t3.style.width = 250 + "px";
                    t1.innerHTML = song[i].name;
                    t2.innerHTML = song[i].artists[0].name;
                    t3.innerHTML = song[i].album.name;
                    a.appendChild(t1);
                    a.appendChild(t2);
                    a.appendChild(t3);
                    biaoge.appendChild(a);
                }
                console.log(res);
            } else {
                console.log("请求失败");
            }
        }
    }
    xhr.send();
})