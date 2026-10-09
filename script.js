const quiz = [
  {q:"Cual es el nombre de mi personaje favorito de resident evil", a:["Leon Scott kennedy ","Leon Albert Kennedy","Leon Albert Wesker ","Leon Scott Wesker"], c:0},
  {q:"¿Con que equipo salí campeon primero?(FUTSAL)", a:["Del bono ","Las Aguilas","krause","Ninguno es correcto"], c:2},
  {q:"¿De donde viene mi contraseña general?", a:["mundo gaturro","club penguin","personaje dragon ball","juego de play 2"], c:0},
  {q:"Serie favorita?(cartoon network)", a:["El increible mundo de gumball","Steven universe","Hora de aventura","Un show mas"], c:3},
  {q:"¿En cuantos equipos de la liga universitaria jugué?", a:["1","2","3","Sancor Seguros"], c:2}
];
let qi=0, score=0;

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const el=document.getElementById(id);
  if(el) el.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='quiz') renderQuiz();
  if(id==='memory' && !memoryStarted) startMemory();
}

function renderQuiz(){
  const item=quiz[qi];
  document.getElementById('quizCounter').textContent=`Pregunta ${qi+1} de ${quiz.length}`;
  document.getElementById('quizProgress').style.width=`${(qi/quiz.length)*100}%`;
  document.getElementById('question').textContent=item.q;
  const box=document.getElementById('answers');
  box.innerHTML='';
  document.getElementById('quizResult').classList.add('hidden');
  item.a.forEach((ans,i)=>{
    const b=document.createElement('button');
    b.className='answer'; b.textContent=ans;
    b.onclick=()=>answerQuiz(i,b);
    box.appendChild(b);
  });
}
function answerQuiz(i,btn){
  const item=quiz[qi];
  document.querySelectorAll('.answer').forEach(b=>b.disabled=true);
  if(i===item.c){score++;btn.classList.add('correct')}else{
    btn.classList.add('wrong');
    document.querySelectorAll('.answer')[item.c].classList.add('correct');
  }
  setTimeout(()=>{
    qi++;
    if(qi<quiz.length) renderQuiz();
    else{
      document.getElementById('quizProgress').style.width='100%';
      const r=document.getElementById('quizResult');
      r.classList.remove('hidden');
      r.innerHTML=`<strong>Terminaste 💕</strong><br>Tu resultado: ${score}/${quiz.length}<br><br>${score===quiz.length?'¡Me conocés demasiado, excelente mamorsh! 🥹❤️':'buuuu malisimoooo no le pegaaste a todas🖕'}<br><br><button class="primary-btn" onclick="resetQuiz()">Jugar otra vez</button>`;
      document.getElementById('answers').innerHTML='';
    }
  },700);
}
function resetQuiz(){qi=0;score=0;renderQuiz()}


/* =========================
   MASCOTAS DEL INICIO
   ========================= */
function petSound(type) {
  try {
    const audioSrc = type === 'pug' ? 'assets/pug.mp3' : 'assets/salchicha.mp3';
    const audio = new Audio(audioSrc);
    audio.play().catch(e => {
      console.log("Error al reproducir el audio:", e);
    });
  } catch (e) {
    console.log("No se pudo reproducir el sonido", e);
  }
}

/* =========================
   MEMORIA CON FOTOS
   ========================= */
let memoryStarted=false, first=null, lock=false, matched=0;
const memoryPhotos=[
  'assets/memoria1.jpg','assets/memoria2.jpg','assets/memoria3.jpg','assets/memoria4.jpg',
  'assets/memoria5.jpg','assets/memoria6.jpg','assets/memoria7.jpg','assets/memoria8.jpg'
];
function startMemory(){
  memoryStarted=true;first=null;lock=false;matched=0;
  const deck=[...memoryPhotos,...memoryPhotos].sort(()=>Math.random()-.5);
  const board=document.getElementById('memoryBoard');board.innerHTML='';
  document.getElementById('memoryStatus').textContent='';
  deck.forEach((src,index)=>{
    const card=document.createElement('button');
    card.className='memory-card';card.dataset.src=src;card.dataset.index=index;
    card.innerHTML='<span class="memory-cover">❤️</span>';
    card.onclick=()=>flipCard(card);
    board.appendChild(card);
  });
}
function flipCard(card){
  if(lock||card.classList.contains('flipped')||card.classList.contains('matched'))return;
  card.classList.add('flipped');
  card.innerHTML=`<img src="${card.dataset.src}" alt="Foto de memoria" onerror="this.parentElement.classList.add('photo-missing');this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','📷')">`;
  if(!first){first=card;return}
  if(first.dataset.src===card.dataset.src){
    first.classList.add('matched');card.classList.add('matched');matched++;first=null;
    if(matched===8)document.getElementById('memoryStatus').textContent='🎉 ¡Encontraste todas! Sos increíble ❤️';
  }else{
    lock=true;
    setTimeout(()=>{
      first.classList.remove('flipped');card.classList.remove('flipped');
      first.innerHTML='<span class="memory-cover">❤️</span>';
      card.innerHTML='<span class="memory-cover">❤️</span>';
      first=null;lock=false;
    },800);
  }
}

/* =========================
   CARTAS
   ========================= */
function openLetter(btn,msg){
  document.querySelectorAll('.letter').forEach(x=>x.style.transform='');
  btn.style.transform='scale(.96) rotate(-2deg)';
  const box=document.getElementById('letterMessage');
  box.classList.remove('hidden');box.textContent=msg;
}

/* =========================
   RULETA
   ========================= */
const dates=["Salida a comersh/barsito 🍝","Noche de películas/series y comida hecha por los dosh 🎬"," Tomi sorprende 🎁","Helado y paseo en motiño parque/dique 🍦","Noche de juegos y capsula del tiempo 🎮"," Mile sorprende 🎁"];
let spin=0;
function spinRoulette(){
  const wheel=document.getElementById('wheel');
  spin+=1440+Math.floor(Math.random()*360);
  wheel.style.transform=`rotate(${spin}deg)`;
  setTimeout(()=>document.getElementById('dateResult').textContent=dates[Math.floor(Math.random()*dates.length)],1900);
}

/* =========================
   ROMPECABEZAS
   Foto: assets/foto_de_rompecabezas.jpg
   ========================= */
let puzzleSelected = null;
const puzzleImage = 'assets/foto_de_rompecabezas.jpg';

function startPuzzle() {
  puzzleSelected = null;
  const board = document.getElementById('puzzleBoard');
  board.innerHTML = '';
  
  // 16 piezas en total (Cuadrícula 4x4)
  const totalPieces = 16;
  const pieces = Array.from({length: totalPieces}, (_, i) => i).sort(() => Math.random() - .5);
  
  pieces.forEach((piece) => {
    const b = document.createElement('button');
    b.className = 'puzzle-piece';
    b.dataset.correct = piece;
    b.style.backgroundImage = `url("${puzzleImage}")`;
    
    // Posición proporcional para 4 columnas y 4 filas
    const col = piece % 4;
    const row = Math.floor(piece / 4);
    b.style.backgroundPosition = `${(col / 3) * 100}% ${(row / 3) * 100}%`;
    
    b.onclick = () => selectPuzzlePiece(b);
    board.appendChild(b);
  });
}

function selectPuzzlePiece(piece) {
  if (piece === puzzleSelected) {
    piece.classList.remove('selected');
    puzzleSelected = null;
    return;
  }
  if (!puzzleSelected) {
    puzzleSelected = piece;
    piece.classList.add('selected');
    return;
  }
  
  const a = puzzleSelected, b = piece;
  const aCorrect = a.dataset.correct, bCorrect = b.dataset.correct;
  const aPos = a.style.backgroundPosition, bPos = b.style.backgroundPosition;
  
  a.dataset.correct = bCorrect;
  b.dataset.correct = aCorrect;
  a.style.backgroundPosition = bPos;
  b.style.backgroundPosition = aPos;
  
  a.classList.remove('selected');
  puzzleSelected = null;
  
  const all = [...document.querySelectorAll('.puzzle-piece')];
  if (all.every((x, i) => Number(x.dataset.correct) === i)) {
    document.getElementById('puzzleStatus').textContent = '🎉 ¡Rompecabezas completado! ❤️';
    all.forEach(x => x.classList.add('solved'));
  }
}

/* =========================
   MINIJUEGO 2D: GATITO NARANJA (ÁRBOLES Y EDIFICIOS)
   ========================= */
let runner,rc,runnerId=null,player,obstacles,runnerRunning=false,lastTime=0;
function startRunner(){
  runner=document.getElementById('runner');rc=runner.getContext('2d');
  player={x:55,y:205,w:30,h:30,vy:0,onGround:true};
  
  // Volvemos a la distancia y cantidad de obstáculos original
  obstacles=[
    {x:360,y:220,w:25,h:40,type:'tree'},
    {x:500,y:200,w:30,h:60,type:'building'},
    {x:690,y:220,w:25,h:40,type:'tree'},
    {x:850,y:190,w:35,h:70,type:'building'}
  ];
  
  runnerRunning=true;lastTime=performance.now();
  document.getElementById('runnerStatus').textContent='¡Llegá hasta el gatito naranja! 🧡';
  if(runnerId)cancelAnimationFrame(runnerId);
  runnerId=requestAnimationFrame(runnerLoop);
}
function jumpRunner(){
  if(!runnerRunning)startRunner();
  if(player.onGround){player.vy=-12;player.onGround=false}
}
function runnerLoop(t){
  const dt=Math.min((t-lastTime)/16.67,2);lastTime=t;
  updateRunner(dt);drawRunner();
  if(runnerRunning)runnerId=requestAnimationFrame(runnerLoop);
}
function updateRunner(dt){
  player.vy+=.65*dt;player.y+=player.vy*dt;
  if(player.y>=205){player.y=205;player.vy=0;player.onGround=true}
  obstacles.forEach(o=>o.x-=4*dt);
  
  const last=obstacles[obstacles.length-1];
  if(last.x<420) {
    // Alternamos aleatoriamente entre árbol y edificio al generar nuevos
    const nextType = Math.random() > 0.5 ? 'tree' : 'building';
    obstacles.push({
      x: last.x + 150 + Math.random() * 90,
      y: 180 + Math.random() * 40,
      w: 25 + Math.random() * 15,
      h: 260 - (180 + Math.random() * 40),
      type: nextType
    });
  }
  
  obstacles=obstacles.filter(o=>o.x>-60);
  for(const o of obstacles){
    if(player.x<o.x+o.w&&player.x+player.w>o.x&&player.y<o.y+o.h&&player.y+player.h>o.y){
      runnerRunning=false;
      document.getElementById('runnerStatus').textContent='💥 ¡Uy! El manyi se te escapo. Tocá reiniciar.';
    }
  }
  
  if(obstacles.length>0 && obstacles[obstacles.length-1].x<0){
    runnerRunning=false;
  }
  
  if(obstacles.length>0 && obstacles[0].x<180){
    const targetX=480;
    if(targetX-player.x<5){
      runnerRunning=false;
      document.getElementById('runnerStatus').textContent='🐱🧡 ¡Atrapaste al maldito terrible! ¡Ganaste!';
    }
  }
}
function drawRunner(){
  const w=runner.width,h=runner.height;
  rc.clearRect(0,0,w,h);
  // cielo
  rc.fillStyle='#fff0f5';rc.fillRect(0,0,w,h);
  // nubes
  rc.fillStyle='rgba(255,255,255,.8)';
  rc.beginPath();rc.arc(100,45,22,0,Math.PI*2);rc.arc(125,45,28,0,Math.PI*2);rc.arc(150,48,18,0,Math.PI*2);rc.fill();
  // suelo
  rc.fillStyle='#7b173d';rc.fillRect(0,235,w,25);
  rc.fillStyle='#ff4f81';rc.fillRect(0,232,w,3);
  
  // Dibujar obstáculos (Árboles 🌲 y Edificios 🏢)
  obstacles.forEach(o => {
    if(o.type === 'tree') {
      // Tronco del árbol
      rc.fillStyle='#8B5A2B';
      rc.fillRect(o.x + o.w/3, o.y + o.h*0.6, o.w/3, o.h*0.4);
      // Copa del árbol (forma de pino/redonda en tonos verdes o acordes a la paleta)
      rc.fillStyle='#2d6a4f';
      rc.beginPath();
      rc.moveTo(o.x + o.w/2, o.y);
      rc.lineTo(o.x + o.w, o.y + o.h*0.7);
      rc.lineTo(o.x, o.y + o.h*0.7);
      rc.closePath();
      rc.fill();
    } else {
      // Edificio
      rc.fillStyle='#5c677d';
      rc.fillRect(o.x, o.y, o.w, o.h);
      // Ventanitas del edificio
      rc.fillStyle='#ffe6a7';
      for(let vy = o.y + 6; vy < o.y + o.h - 8; vy += 10) {
        rc.fillRect(o.x + 5, vy, o.w - 10, 5);
      }
    }
  });

  // Jugador: avatar
  rc.font='30px sans-serif';rc.fillText('👱‍♀️',player.x-2,player.y+28);
  // Gato naranja al final (posición original)
  rc.font='34px sans-serif';rc.fillText('🐱',485,230);
  rc.font='13px DM Sans';rc.fillStyle='#7b173d';rc.fillText('META',488,250);
}