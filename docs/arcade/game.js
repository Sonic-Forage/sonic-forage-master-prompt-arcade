(() => {
  'use strict';
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score');
  const highEl = document.getElementById('high');
  const statusEl = document.getElementById('status');
  const N = 24, CELL = canvas.width / N;
  const STORAGE_KEY = 'sonic_forage_strawberry_agi_snake_high';
  let high = Number(localStorage.getItem(STORAGE_KEY) || 0);
  let snake, dir, nextDir, food, shard, core, blocks, score, alive, paused, muted, tickMs, last, acc, shield, pulse, started;
  highEl.textContent = high;
  function reset(){
    snake=[{x:8,y:12},{x:7,y:12},{x:6,y:12}]; dir={x:1,y:0}; nextDir={x:1,y:0};
    score=0; alive=true; paused=false; tickMs=116; last=0; acc=0; shield=0; pulse=0; started=false;
    blocks=[]; for(let i=0;i<18;i++) blocks.push(emptyCell());
    food=emptyCell(); shard=emptyCell(); core=emptyCell(); updateHud(); statusEl.textContent='Press any direction to begin.'; draw();
  }
  function emptyCell(){
    for(let tries=0;tries<500;tries++){
      const p={x:Math.floor(Math.random()*N), y:Math.floor(Math.random()*N)};
      if(!snake?.some(s=>s.x===p.x&&s.y===p.y) && !blocks?.some(b=>b.x===p.x&&b.y===p.y)) return p;
    }
    return {x:1,y:1};
  }
  function updateHud(){ scoreEl.textContent=score; highEl.textContent=high; }
  function beep(freq=440, dur=.045, type='square'){
    if(muted) return;
    try{ const AC=window.AudioContext||window.webkitAudioContext; const ac=beep.ac||(beep.ac=new AC()); const o=ac.createOscillator(); const g=ac.createGain(); o.type=type; o.frequency.value=freq; g.gain.value=.035; o.connect(g); g.connect(ac.destination); o.start(); g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime+dur); o.stop(ac.currentTime+dur); }catch(e){}
  }
  function setDir(x,y){ if(dir.x+x===0 && dir.y+y===0) return; nextDir={x,y}; started=true; }
  addEventListener('keydown', e=>{
    const k=e.key.toLowerCase();
    if(['arrowup','w'].includes(k)) setDir(0,-1);
    if(['arrowdown','s'].includes(k)) setDir(0,1);
    if(['arrowleft','a'].includes(k)) setDir(-1,0);
    if(['arrowright','d'].includes(k)) setDir(1,0);
    if(k===' '){ paused=!paused; statusEl.textContent=paused?'Paused in the berry matrix.':'Back online. Forage.'; e.preventDefault(); }
    if(k==='r') reset();
    if(k==='m'){ muted=!muted; statusEl.textContent=muted?'Muted.':'Synth bleeps armed.'; }
  });
  function step(){
    if(!alive||paused||!started) return;
    dir=nextDir; const head={x:(snake[0].x+dir.x+N)%N, y:(snake[0].y+dir.y+N)%N};
    const hitSelf=snake.some(s=>s.x===head.x&&s.y===head.y); const hitBlock=blocks.findIndex(b=>b.x===head.x&&b.y===head.y);
    if(hitSelf || hitBlock>=0){
      if(shield>0 && hitBlock>=0){ blocks.splice(hitBlock,1); shield--; score+=5; beep(180,.07,'sawtooth'); }
      else { alive=false; statusEl.textContent='SYSTEM OUTAGE. Press R to reboot.'; beep(90,.18,'sawtooth'); return; }
    }
    snake.unshift(head); let grow=false;
    if(head.x===food.x&&head.y===food.y){ score+=10; grow=true; food=emptyCell(); beep(660,.05); }
    if(head.x===shard.x&&head.y===shard.y){ score+=25; grow=true; pulse=14; tickMs=Math.max(62,tickMs-3); shard=emptyCell(); beep(880,.06,'triangle'); }
    if(head.x===core.x&&head.y===core.y){ score+=50; grow=true; shield=2; core=emptyCell(); if(blocks.length) blocks.pop(); beep(1200,.08,'triangle'); }
    if(!grow) snake.pop();
    if(score>high){ high=score; localStorage.setItem(STORAGE_KEY,String(high)); }
    if(score && score%80===0 && blocks.length<38) blocks.push(emptyCell());
    updateHud();
  }
  function drawGrid(){
    ctx.fillStyle='#05020c'; ctx.fillRect(0,0,canvas.width,canvas.height);
    const g=ctx.createRadialGradient(320,220,10,320,320,500); g.addColorStop(0,'#25103d'); g.addColorStop(1,'#02030a'); ctx.fillStyle=g; ctx.fillRect(0,0,640,640);
    ctx.strokeStyle='rgba(0,245,255,.13)'; ctx.lineWidth=1;
    for(let i=0;i<=N;i++){ctx.beginPath();ctx.moveTo(i*CELL,0);ctx.lineTo(i*CELL,640);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i*CELL);ctx.lineTo(640,i*CELL);ctx.stroke();}
  }
  function cell(p, fill, glow, label){
    const x=p.x*CELL, y=p.y*CELL; ctx.save(); ctx.shadowColor=glow; ctx.shadowBlur=18; ctx.fillStyle=fill; ctx.fillRect(x+3,y+3,CELL-6,CELL-6); ctx.shadowBlur=0; ctx.fillStyle='#05020c'; ctx.font='20px monospace'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(label,x+CELL/2,y+CELL/2+1); ctx.restore();
  }
  function draw(){
    drawGrid(); blocks.forEach(b=>cell(b,'#ff2a2a','#ff2a2a','▣'));
    cell(food,'#ff3b8d','#ff3b8d','🍓'); cell(shard,'#00f5ff','#00f5ff','◆'); cell(core,'#ffe66d','#ffe66d','◎');
    snake.forEach((s,i)=>{ const hue=i===0?'#8cff74':(i%2?'#22c55e':'#14f195'); cell(s,hue,'#8cff74',i===0?'☻':''); });
    if(shield>0){ ctx.strokeStyle='#ffe66d'; ctx.lineWidth=4; ctx.strokeRect(4,4,632,632); }
    if(pulse>0){ ctx.fillStyle=`rgba(255,59,141,${pulse/60})`; ctx.fillRect(0,0,640,640); pulse--; }
    if(!alive){ ctx.fillStyle='rgba(0,0,0,.72)'; ctx.fillRect(0,0,640,640); ctx.fillStyle='#ffe66d'; ctx.font='42px monospace'; ctx.textAlign='center'; ctx.fillText('OUTAGE BLOCKED YOU',320,300); ctx.font='22px monospace'; ctx.fillText('R = reboot · high score persists',320,342); }
  }
  function loop(ts){ if(!last) last=ts; acc += ts-last; last=ts; while(acc>tickMs){ step(); acc-=tickMs; } draw(); requestAnimationFrame(loop); }
  reset(); requestAnimationFrame(loop);
})();
