sessionStorage.removeItem("history");

const data={
  健康:["ジム","歩数管理アプリ","プロテイン","整体"],
  美容:["美容クリニック","脱毛サロン","スキンケアEC","エステ","痩身"],
  投資:["投資アプリ","FXサービス","資産運用セミナー"],
  保険:["保険相談サービス","医療保険","生命保険"],
  転職:["転職エージェント","求人サイト","スカウトサービス","在宅ワーク"],
  教育:["オンライン講座","プログラミングスクール","学習アプリ","資格取得"],
  不動産:["賃貸サイト","分譲マンション販売","引っ越しサービス","住宅購入サポート","住宅売却査定"],
  食品:["宅配弁当","ミールキット","冷凍食品サブスク","定期購入"],
  EC:["ファッション通販","インテリアEC","ガジェット通販"],
  エンタメ:["ゲームアプリ","ライブ配信","映画配信"],
  サブスク:["動画配信","音楽アプリ","電子書籍"],
  恋愛:["マッチングアプリ","結婚相談所"],
  旅行:["旅行予約サイト","ホテル予約"],
  ペット:["ペットフード","ペット保険"]
};

const target=[
  "10代 学生 女性",
  "10代 学生 男性",
  "大学生 女性",
  "大学生 男性",
  "20代～30代 社会人 女性",
  "20代～30代 社会人 男性",
  "20代～30代 子育て中 女性",
  "20代～30代 子育て中 男性",
  "30代～40代 社会人 女性",
  "30代～40代 社会人 男性",
  "30代～40代 子育て中 女性",
  "30代～40代 子育て中 男性",
  "40代～60代 社会人 女性",
  "40代～60代 社会人 男性",
  "60代～70代 女性",
  "60代～70代 男性"
];

const purpose=[
  "商品購入","無料会員登録","LINE登録","資料請求","初回予約","アプリDL"
];

const tone=[
  "ポップ","シンプル","高級感","クール","親しみやすい","信頼感"
];

const appeal=[
  "初回無料","今だけ50%OFF","限定○名","スマホで簡単","最短3分で完了","専門家がサポート"
];

const size=[
  "1200×628px",
  "728×90px",
  "1080×1080px",
  "250×250px",
  "1080×1920px",
  "540×960px",
  "468×60px",
  "300×250px",
  "336×280px",
  "120×600px"
];

let current={},spinning=false;

function random(arr){return arr[Math.floor(Math.random()*arr.length)];}

function spinSlot(id,list,val,delay){
  const el=document.getElementById(id);
  let count=0;

  function loop(){
    el.textContent=random(list);
    el.style.transform="translateY(-12px)";
    setTimeout(()=>el.style.transform="translateY(0)",60);

    count++;
    if(count<10){
      setTimeout(loop,50);
    }else{
      el.textContent=val;
    }
  }

  setTimeout(loop,delay);
}

function startSpin(){
  if(spinning)return;
  spinning=true;

  const btn=document.getElementById("spinBtn");
  btn.textContent="ルーレット中...";
  btn.disabled=true;

  let c,s,t,p,to,a,sz;

  do{
    c=random(Object.keys(data));
    s=random(data[c]);
    t=random(target);
  }while((c==="投資"&&t.includes("学生"))||(c==="転職"&&t.includes("学生"))||(c==="恋愛"&&t.includes("学生"))||(c==="恋愛"&&t.includes("60代"))||(s==="痩身"&&t.includes("学生")));

  p=random(purpose);
  to=random(tone);
  a=random(appeal);
  sz=random(size);

  spinSlot("service",data[c],s,0);
  spinSlot("target",target,t,80);
  spinSlot("purpose",purpose,p,160);
  spinSlot("tone",tone,to,240);
  spinSlot("appeal",appeal,a,320);
  spinSlot("size",size,sz,400);

  setTimeout(()=>{
    current={service:s,target:t,purpose:p,tone:to,appeal:a,size:sz};
    saveHistory();
    btn.textContent="ルーレット　";
    btn.disabled=false;
    spinning=false;
  },1200);
}

function reroll(type){
  if(spinning)return;
  let list={service:Object.values(data).flat(),target,purpose,tone,appeal,size}[type];
  let val=random(list);
  spinSlot(type,list,val,0);
  setTimeout(()=>current[type]=val,400);
}

function saveHistory(){
  let h=JSON.parse(sessionStorage.getItem("history")||"[]");
  h.push(current);
  sessionStorage.setItem("history",JSON.stringify(h));
  document.getElementById("historyList").innerHTML =
    h.slice().reverse().map(v=>`<div class="history-item"><strong>${v.service}</strong> / ${v.target} / ${v.purpose} / ${v.tone} / ${v.appeal} / ${v.size}</div>`).join("");
}

function shareTwitter(){
  const url = "https://hizumippc.github.io/banner-roulette/";

  const text=`今日のバナーお題☑  
#ルーレットでバナー練習

今日のお題👇
🎯 ジャンル：${current.service}
👤 ターゲット：${current.target}
📝 詳細：${current.purpose} / ${current.tone} / ${current.appeal}
📐 サイズ：${current.size}

👇お題はこちら`;

  window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
}
