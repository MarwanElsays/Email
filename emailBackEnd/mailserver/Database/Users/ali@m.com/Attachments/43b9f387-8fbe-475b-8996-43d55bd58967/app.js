let btnl = document.getElementById('btnl');
let target = document.getElementById('target');
let center = document.getElementById('center');
let cnt = 0,currenttime,t,prevtime,wtarget,wbtnl,marg;
let data = [];

btnl.addEventListener("click",Do);
target.addEventListener("click",Do);

function Do(){
    if(cnt === 0){
        prevtime = +new Date();
        btnl.innerText="";
    }else
    {
        currenttime = +new Date();
        t = currenttime - prevtime;
        prevtime = currenttime;
        let w;
        let dist = parseFloat(marg)*2+parseFloat(wtarget)/2+parseFloat(wbtnl)/2+20;
        if(cnt%2 == 0){
           w = wbtnl;
        }else{
           w = wtarget;
        }

        let id = Math.log2(2*dist/w).toFixed(1);
        let obj = {"ID":id,"time":t};
        data.push(obj);
    }

    wtarget = (Math.random()*550).toFixed();
    wbtnl = (Math.random()*550).toFixed();
    marg = (Math.random()*400).toFixed();

    target.style.width = wtarget + "px";
    btnl.style.width = wbtnl + "px";
    center.style.marginLeft = marg + "px";
    center.style.marginRight = marg + "px";

    cnt++;

    if(cnt === 80){
        btnl.disabled = true;
        target.disabled = true;
        data.forEach(e => {
            console.log(e.ID+","+e.time);
        });
    }
    
}










