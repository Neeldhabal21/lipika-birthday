const $=id=>document.getElementById(id),S=[...document.querySelectorAll('.screen')];let cur=0;
$('dots').innerHTML=S.map(()=>'<i></i>').join('');
for(let i=0;i<16;i++){const h=document.createElement('div');h.className='bh';h.textContent=['💗','💖','✨','💕'][i%4];h.style.left=Math.random()*100+'vw';h.style.fontSize=14+Math.random()*22+'px';h.style.animationDuration=9+Math.random()*10+'s';h.style.animationDelay=-Math.random()*12+'s';document.body.appendChild(h)}
function fx(c,t,l,x){const d=document.createElement('div');d.className='fx '+c;d.textContent=t;d.style.left=l;if(x)x(d);document.body.appendChild(d);setTimeout(()=>d.remove(),8000)}
function confetti(){const c=['#ff5d8f','#ffe27a','#8fd3ff','#b69bff','#7be0a8'];for(let i=0;i<80;i++)fx('conf','',Math.random()*100+'vw',d=>{d.style.background=c[i%5];d.style.animationDelay=Math.random()*.8+'s'})}
function balloons(){['🎈','❤️','🎈','💖','🎈','💗'].forEach((e,i)=>fx('balloon',e,8+i*16+'vw',d=>d.style.animationDelay=i*.3+'s'))}
let nt;function notes(on){clearInterval(nt);if(on)nt=setInterval(()=>fx('note',['♪','♫','💗'][Math.random()*3|0],Math.random()*100+'vw'),600)}
function go(i){cur=i;S.forEach((s,k)=>s.classList.toggle('on',k===i));[...$('dots').children].forEach((d,k)=>d.classList.toggle('d',k<=i));scrollTo(0,0);notes(i>0);
 if(i===2)startGame();if(i===4)initScratch();if(i===6)showLetter();if(i===8){confetti();balloons()}}
document.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>go(cur+1));
$('gift').onclick=function(){this.classList.add('open');confetti();startMusic();setTimeout(()=>{go(1);balloons()},1100)};
$('again').onclick=()=>{confetti();balloons()};$('replay').onclick=()=>location.reload();
/* music: plays song.mp3 if present, else a soft music-box melody */
let au=new Audio('song.mp3'),mode='',muted=false,ac,mt;au.loop=true;au.volume=.7;
function box(){if(mode==='box')return;mode='box';ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.resume)ac.resume();const F={C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,G4:392,A4:440,B4:493.88},b=.42;
 const m=[['G4',.75],['G4',.25],['A4',1],['G4',1],['C5',1],['B4',2],['G4',.75],['G4',.25],['A4',1],['G4',1],['D5',1],['C5',2],['G4',.75],['G4',.25],['G5',1],['E5',1],['C5',1],['B4',1],['A4',2],['F5',.75],['F5',.25],['E5',1],['C5',1],['D5',1],['C5',2]];
 const loop=()=>{if(muted){mt=setTimeout(loop,500);return}let t=ac.currentTime+.05;m.forEach(([n,d])=>{const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=F[n];g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.18,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+d*b+.5);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+d*b+.6);t+=d*b});mt=setTimeout(loop,(t-ac.currentTime+1.5)*1000)};loop()}
function startMusic(){$('mu').classList.add('on');au.onerror=box;au.play().then(()=>mode='file').catch(box)}
$('mu').onclick=()=>{muted=!muted;au.muted=muted;$('mu').textContent=muted?'🔇':'🔊'};
document.addEventListener('pointerdown',e=>fx('spark','✨',e.clientX+'px',d=>d.style.top=e.clientY+'px'));
/* game */
let sc=0,gt;
function startGame(){if(gt||sc>=10)return;gt=setInterval(()=>{const h=document.createElement('div');h.className='fh';h.textContent=['💖','💗','💕','❤️'][Math.random()*4|0];h.style.left=Math.random()*82+'%';h.style.animationDuration=2.6+Math.random()*2+'s';
 h.onpointerdown=()=>{if(h.dataset.c)return;h.dataset.c=1;h.textContent='✨';sc++;$('score').textContent=sc;setTimeout(()=>h.remove(),250);if(sc>=10)winGame()};
 $('arena').appendChild(h);setTimeout(()=>h.remove(),5000)},550)}
function winGame(){clearInterval(gt);$('arena').innerHTML='<p style="font-size:3rem;margin-top:18vh">💘</p>';$('gmsg').textContent='You caught my heart… just like you did in real life 💘';$('n2').disabled=false;confetti()}
/* candles */
let off=0;document.querySelectorAll('.cd').forEach(c=>c.onclick=()=>{if(c.classList.contains('off'))return;c.classList.add('off');if(++off===3){$('cmsg').innerHTML='Wish made! ✨<br>I hope every single one comes true 💫';$('n3').disabled=false;confetti()}});
/* scratch */
function initScratch(){const c=$('sc');if(c.dataset.i)return;c.dataset.i=1;const x=c.getContext('2d'),g=x.createLinearGradient(0,0,300,170);g.addColorStop(0,'#ffb3d1');g.addColorStop(1,'#b79bff');x.fillStyle=g;x.fillRect(0,0,300,170);x.fillStyle='#fff';x.font='600 22px Fredoka,sans-serif';x.textAlign='center';x.fillText('✨ Scratch here ✨',150,92);
 let dn=false,done=false;const P=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*300/r.width,(e.clientY-r.top)*170/r.height]};
 const dr=e=>{if(!dn||done)return;const[p,q]=P(e);x.globalCompositeOperation='destination-out';x.beginPath();x.arc(p,q,20,0,7);x.fill()};
 const ck=()=>{const d=x.getImageData(0,0,300,170).data;let n=0,t=0;for(let i=3;i<d.length;i+=16){t++;if(d[i]===0)n++}if(n/t>.4){done=true;c.style.opacity=0;c.style.pointerEvents='none';confetti();$('n4').disabled=false}};
 c.onpointerdown=e=>{dn=true;c.setPointerCapture(e.pointerId);dr(e)};c.onpointermove=dr;c.onpointerup=()=>{dn=false;ck()}}
/* reasons */
['Your smile makes even my hardest days easy.','You are my comfort and my safe place.','Your happiness is my favourite feeling.','With you I want a thousand beautiful memories.','You are my favourite person in the whole world.','Distance can’t change it. My heart chooses you.'].forEach(t=>{const f=document.createElement('div');f.className='fc';f.innerHTML='<div class="fi"><div class="fr">💖</div><div class="bk">'+t+'</div></div>';f.onclick=()=>f.classList.toggle('f');$('rg').appendChild(f)});
/* letter */
function showLetter(){const l=$('lt');if(l.classList.contains('show'))return;l.querySelectorAll('p').forEach((p,i)=>p.style.animationDelay=i*1.1+'s');l.classList.add('show')}
/* memories */
['Our little moment 💕','Heart full ❤️','Together ✨','Pure happiness','My comfort','Forever us','Sweet memory','Always you','Home is you 🏠'].forEach((t,i)=>{const d=document.createElement('div');d.className='po';d.innerHTML='<img src="images/photo'+(i+1)+'.jpg" alt="" loading="lazy">'+t;d.onclick=()=>{$('lb').querySelector('img').src=d.querySelector('img').src;$('lb').classList.add('on')};$('pg').appendChild(d)});
$('lb').onclick=()=>$('lb').classList.remove('on');
