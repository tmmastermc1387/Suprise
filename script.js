// 👇 فقط این ۳ خط را عوض کن 👇
const LOVE_NAME = "پگاه";
const MY_NAME = "طاها";
const START_DATE = "2026-08-27";
const TYPE_TEXT = "پگاه قشنگم، این سایت را فقط برای تو ساختم... چون تو خاص‌ترین آدم دنیای منی. روزهایی که با همیم را شمردم، برات نامه نوشتم، قول دادم... بیا پایین، یه عالمه حرف دارم برات ❤️";

const MAGIC_SENTENCES = [
"پگاه، تو قشنگ‌ترین اتفاق زندگی منی، بدون هیچ اغراقی.",
"پگاه، اگه ۱۰۰ بار به دنیا بیام، ۱۰۰ بارش تو را انتخاب می‌کنم.",
"خنده‌ات شارژر قلب منه پگاه.",
"با تو حتی ترافیک و بارون هم قشنگه.",
"پگاه، تو دلیل لبخند بی‌دلیل منی وسط روز.",
"کنارت بودن یعنی خونه بودن.",
"پگاه تو همونی هستی که همیشه دعا می‌کردم بیاد.",
"عاشق اون لحظه‌ام که اسمم را با ناز صدا می‌کنی.",
"پگاه یعنی صبح، یعنی روشنایی، یعنی خود تو.",
"هر روز بیشتر از دیروز عاشقتم پگاه."
];

document.getElementById('loveName').textContent = LOVE_NAME;
document.getElementById('myName').textContent = MY_NAME;
document.getElementById('footName').textContent = LOVE_NAME;
document.getElementById('loveCode').textContent = "❤️ " + LOVE_NAME + " ∞ " + MY_NAME + " ❤️";

function calcDays(){
  try{
    const start = new Date(START_DATE);
    const now = new Date();
    const diff = Math.floor((now - start) / (1000*60*60*24));
    if(isNaN(diff) || diff < 0) return "خیلی";
    return diff.toLocaleString('fa-IR');
  }catch(e){ return "خیلی"; }
}
document.getElementById('daysCount').textContent = calcDays();
document.getElementById('statDays').textContent = calcDays();

const openBtn = document.getElementById('openBtn');
const mainContent = document.getElementById('mainContent');
const intro = document.getElementById('intro');
const heartsBg = document.getElementById('heartsBg');
const musicBtn = document.getElementById('musicBtn');

openBtn.addEventListener('click', () => {
  intro.style.display = 'none';
  mainContent.classList.remove('hidden');
  musicBtn.classList.remove('hidden');
  startHearts();
  typeWriter();
  window.scrollTo({top:0, behavior:'smooth'});
});

function createHeart(big=false){
  const h = document.createElement('div');
  h.className = 'heart-float';
  h.textContent = ['❤️','💖','💕','💘','🌸','✨','💗'][Math.floor(Math.random()*7)];
  h.style.left = Math.random()*100 + 'vw';
  h.style.fontSize = big ? (30+Math.random()*40)+'px' : (12+Math.random()*22)+'px';
  h.style.animationDuration = (4+Math.random()*4)+'s';
  heartsBg.appendChild(h);
  setTimeout(()=>h.remove(), 8000);
}
function startHearts(){
  setInterval(()=>createHeart(false), 400);
  setInterval(()=>createHeart(true), 2500);
}
setInterval(()=>createHeart(false), 700);

let ti = 0;
function typeWriter(){
  const el = document.getElementById('typewriter');
  if(ti < TYPE_TEXT.length){
    el.textContent += TYPE_TEXT.charAt(ti);
    ti++;
    setTimeout(typeWriter, 55);
  }
}
function scrollToId(id){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

let magicIndex = 0;
document.getElementById('magicBtn').addEventListener('click', function(){
  const t = document.getElementById('magicText');
  t.style.opacity = 0;
  setTimeout(()=>{
    t.textContent = "💌 " + MAGIC_SENTENCES[magicIndex % MAGIC_SENTENCES.length];
    t.style.opacity = 1;
    magicIndex++;
    createHeart(true); createHeart(true);
  }, 250);
});

let quizScore = 0;
let answered = {};
function checkAnswer(btn, isCorrect, qid){
  if(answered[qid]) return;
  answered[qid] = true;
  const block = btn.closest('.q-block');
  const btns = block.querySelectorAll('.opt');
  btns.forEach(b=>b.disabled = true);
  const fb = document.getElementById('f-'+qid);
  if(isCorrect){
    btn.classList.add('ok');
    fb.textContent = "آفرین پگاه! درست گفتی 🥹❤️";
    fb.style.color = "#28a745";
    quizScore++;
  } else {
    btn.classList.add('no');
    fb.textContent = "نههه پگاه! اشتباه گفتی، ولی بازم دوستت دارم 😝";
    fb.style.color = "#dc3545";
    btns.forEach(b=>{
      if(b.getAttribute('onclick').includes('true')) b.classList.add('ok');
    });
  }
  document.getElementById('quizScore').textContent = quizScore.toLocaleString('fa-IR');
  if(Object.keys(answered).length === 3){
    const r = document.getElementById('quizResult');
    r.classList.remove('hidden');
    if(quizScore === 3) r.innerHTML = "🎉 وای پگاه! هر ۳ تارو درست گفتی! معلومه خیلی دوستم داری! عاشقتم!";
    else if(quizScore === 2) r.innerHTML = "💖 ۲ از ۳! قبول شدی پگاه، ولی باید بیشتر بهم توجه کنی!";
    else r.innerHTML = "😅 عیبی نداره پگاه! مهم اینه که دوستت دارم، حالا برو پایین سؤال مهم را جواب بده!";
    r.scrollIntoView({behavior:'smooth', block:'center'});
  }
}

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const celebrate = document.getElementById('celebrate');
const noTexts = ['مطمئنی پگاه؟ 🥺','نمی‌تونی بگی نه!','این دکمه خرابه 😝','بگو بله دیگه!','نه نداریم!','آخرش بله را می‌زنی 😉'];

function moveNo(){
  const x = (Math.random()-0.5)*260;
  const y = (Math.random()-0.5)*160;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
  noBtn.textContent = noTexts[Math.floor(Math.random()*noTexts.length)];
}
noBtn.addEventListener('mouseover', moveNo);
noBtn.addEventListener('click', moveNo);
noBtn.addEventListener('touchstart', moveNo);

yesBtn.addEventListener('click', () => {
  celebrate.classList.remove('hidden');
  for(let k=0;k<40;k++){ setTimeout(()=>createHeart(true), k*50); }
  launchConfetti();
  celebrate.scrollIntoView({behavior:'smooth', block:'center'});
});

function launchConfetti(){
  const box = document.getElementById('confettiBox');
  const colors = ['#ff4d6d','#ff758f','#ffd166','#8ecae6','#90be6d','#f9844a','#b565d8'];
  for(let i=0;i<120;i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random()*100 + 'vw';
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDuration = (2+Math.random()*2.5)+'s';
    c.style.animationDelay = (Math.random()*0.8)+'s';
    box.appendChild(c);
    setTimeout(()=>c.remove(), 5000);
  }
}

let audioCtx = null;
let playing = false;
let melodyTimer = null;
const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33];
let noteIdx = 0;
musicBtn.addEventListener('click', ()=>{
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if(!playing){
    playing = true;
    musicBtn.classList.add('playing');
    musicBtn.textContent = "⏸️";
    melodyTimer = setInterval(()=>{
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.value = notes[noteIdx % notes.length];
      g.gain.setValueAtTime(0.12, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + 0.6);
      noteIdx++;
    }, 450);
  } else {
    playing = false;
    musicBtn.classList.remove('playing');
    musicBtn.textContent = "🎵";
    clearInterval(melodyTimer);
  }
});
