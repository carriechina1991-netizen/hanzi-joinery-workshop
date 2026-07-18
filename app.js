const REQUIRED_FIELDS = ["id", "character", "pinyin", "english", "structure", "parts", "slots", "completionMessage"];
const STRUCTURE_SLOTS = {
  "left-right": ["left", "right"],
  "top-bottom": ["top", "bottom"],
  "top-middle-bottom": ["top", "middle", "bottom"]
};

function validateQuestion(item, index, seenIds) {
  const label = `题库第 ${index + 1} 题${item && item.id ? `（${item.id}）` : ""}`;
  if (!item || typeof item !== "object") {
    console.error(`[汉字榫卯工坊] ${label}不是有效的题目对象。`);
    return false;
  }

  const missing = REQUIRED_FIELDS.filter(field => {
    const value = item[field];
    return value === undefined || value === null || value === "";
  });
  if (missing.length) {
    console.error(`[汉字榫卯工坊] ${label}缺少必要字段：${missing.join("、")}。`, item);
    return false;
  }
  if (seenIds.has(item.id)) {
    console.error(`[汉字榫卯工坊] 题目 id “${item.id}”重复。每道题的 id 必须唯一。`, item);
    return false;
  }
  if (!STRUCTURE_SLOTS[item.structure]) {
    console.error(`[汉字榫卯工坊] ${label}的 structure “${item.structure}”不受支持。请使用 left-right、top-bottom 或 top-middle-bottom。`, item);
    return false;
  }
  if (!Array.isArray(item.parts) || item.parts.length < 2) {
    console.error(`[汉字榫卯工坊] ${label}的 parts 必须是至少包含两个部件的数组。`, item);
    return false;
  }
  if (!Array.isArray(item.slots) || item.slots.length !== STRUCTURE_SLOTS[item.structure].length) {
    console.error(`[汉字榫卯工坊] ${label}的 slots 数量与 ${item.structure} 结构不匹配。`, item);
    return false;
  }

  const slotIds = item.slots.map(slot => slot && slot.id);
  const expectedSlots = STRUCTURE_SLOTS[item.structure];
  const invalidSlot = expectedSlots.find(id => !slotIds.includes(id));
  if (invalidSlot) {
    console.error(`[汉字榫卯工坊] ${label}缺少 “${invalidSlot}” 卡槽。`, item);
    return false;
  }
  const malformedSlot = item.slots.find(slot => !slot || !slot.id || !slot.label);
  if (malformedSlot) {
    console.error(`[汉字榫卯工坊] ${label}的每个 slot 都必须包含 id 和 label。`, item);
    return false;
  }
  const malformedPart = item.parts.find(part => !part || !part.id || !part.text || !part.target);
  if (malformedPart) {
    console.error(`[汉字榫卯工坊] ${label}的每个 part 都必须包含 id、text 和 target。`, item);
    return false;
  }
  const invalidTarget = item.parts.find(part => !slotIds.includes(part.target));
  if (invalidTarget) {
    console.error(`[汉字榫卯工坊] ${label}中部件 “${invalidTarget.id}”的 target “${invalidTarget.target}”没有对应卡槽。`, item);
    return false;
  }

  seenIds.add(item.id);
  return true;
}

function loadQuestions() {
  if (!Array.isArray(window.HANZI_QUESTIONS)) {
    console.error("[汉字榫卯工坊] 未找到题库。请确认 data/questions.js 存在，并且在 index.html 中先于 app.js 加载。");
    return [];
  }
  const seenIds = new Set();
  const validQuestions = window.HANZI_QUESTIONS.filter((item, index) => validateQuestion(item, index, seenIds));
  if (validQuestions.length !== window.HANZI_QUESTIONS.length) {
    console.error(`[汉字榫卯工坊] 题库共有 ${window.HANZI_QUESTIONS.length} 题，其中 ${window.HANZI_QUESTIONS.length - validQuestions.length} 题格式错误，已跳过。`);
  }
  return validQuestions;
}

const QUESTIONS = loadQuestions();
const ROUND_SIZE = 6;

const app = document.getElementById("app");
const soundButton = document.getElementById("soundButton");
const state = {screen:"home",order:[],round:0,parts:[],placed:{},selected:null,mistakes:0,correct:0,score:0,lastPoints:0,sound:true,answered:false,completed:false,outcome:"",feedback:"",drag:null};
const shuffle = items => [...items].sort(() => Math.random() - .5);
const question = () => QUESTIONS[state.order[state.round] ?? 0];
const componentClass = text => Array.from(text).length > 1 ? "compact-component" : "";

function shuffleParts(item) {
  const shuffled = shuffle(item.parts);
  const matchesCorrectOrder = item.slots.every((slot, index) => shuffled[index]?.target === slot.id);
  return matchesCorrectOrder ? [...shuffled.slice(1), shuffled[0]] : shuffled;
}

function chooseRoundQuestions() {
  const allIndexes = QUESTIONS.map((_, index) => index);
  const leftRight = shuffle(allIndexes.filter(index => QUESTIONS[index].structure === "left-right"));
  const vertical = shuffle(allIndexes.filter(index => QUESTIONS[index].structure === "top-bottom" || QUESTIONS[index].structure === "top-middle-bottom"));
  const selected = [...leftRight.slice(0, 3), ...vertical.slice(0, 3)];
  const selectedSet = new Set(selected);
  const remaining = shuffle(allIndexes.filter(index => !selectedSet.has(index)));

  return shuffle([...selected, ...remaining].slice(0, Math.min(ROUND_SIZE, QUESTIONS.length)));
}

function clickSound() {
  if (!state.sound) return;
  try {
    const Context = window.AudioContext || window.webkitAudioContext;
    const context = new Context();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.setValueAtTime(520, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(180, context.currentTime + .06);
    gain.gain.setValueAtTime(.055, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .08);
    oscillator.connect(gain); gain.connect(context.destination);
    oscillator.start(); oscillator.stop(context.currentTime + .08);
  } catch (_) {}
}

function setScreen(screen) { state.screen = screen; render(); }
function startGame() {
  if (!QUESTIONS.length) {
    console.error("[汉字榫卯工坊] 没有可以开始的有效题目。请检查 data/questions.js。");
    return;
  }
  state.order = chooseRoundQuestions();
  state.round = 0; state.mistakes = 0; state.correct = 0; state.score = 0;
  loadQuestion(); state.screen = "game"; render();
}
function loadQuestion() {
  state.parts = shuffleParts(question());
  state.placed = {}; state.selected = null; state.lastPoints = 0; state.answered = false; state.completed = false; state.outcome = ""; state.feedback = "";
}
function nextQuestion() {
  if (state.round === state.order.length - 1) setScreen("result");
  else { state.round++; loadQuestion(); render(); }
}
function feedback(text) {
  state.feedback = text;
  const element = document.getElementById("feedback");
  if (element) { element.textContent = text; element.classList.add("visible"); }
}
function tryPlace(partId, slot) {
  if (state.answered || state.placed[partId]) return;
  const part = question().parts.find(item => item.id === partId);
  if (!part) return;
  const slotIsFilled = Object.entries(state.placed).some(([placedPartId, placedSlot]) => placedPartId !== partId && placedSlot === slot);
  if (slotIsFilled) {
    feedback("That slot already has a component. Choose another slot.");
    return;
  }
  state.placed[partId] = slot; state.selected = null; clickSound();
  if (navigator.vibrate) navigator.vibrate(20);
  if (Object.keys(state.placed).length === question().parts.length) {
    const answerIsCorrect = question().parts.every(item => state.placed[item.id] === item.target);
    state.answered = true;
    state.outcome = answerIsCorrect ? "correct" : "wrong";
    if (answerIsCorrect) {
      const previousScore = state.score;
      state.correct++;
      state.score = Math.round(state.correct * 100 / ROUND_SIZE);
      state.lastPoints = state.score - previousScore;
      state.feedback = "Click! Every component is in the correct position.";
      render();
      setTimeout(() => {
        if (state.screen === "game" && state.outcome === "correct") {
          state.completed = true;
          render();
        }
      }, 300);
    } else {
      state.mistakes++;
      state.feedback = "Not quite — the completed character does not fit.";
      render();
    }
  } else {
    render();
    feedback("Component placed. Complete the character to check your answer.");
  }
}

function revealCorrectAnswer() {
  if (state.answered && state.outcome === "wrong") {
    state.completed = true;
    render();
  }
}

function headerHome() { setScreen("home"); }
document.getElementById("homeButton").addEventListener("click", headerHome);
soundButton.addEventListener("click", () => {
  state.sound = !state.sound;
  soundButton.textContent = state.sound ? "♪ Sound" : "Muted";
  soundButton.setAttribute("aria-label", state.sound ? "Turn sound off" : "Turn sound on");
});

function render() {
  if (state.screen === "home") app.innerHTML = `
    <section class="screen home-screen">
      <div class="hero-copy">
        <div class="home-title-sign">
          <h1>汉字榫卯工坊</h1>
          <span>HANZI JOINERY WORKSHOP</span>
        </div>
        <p class="eyebrow">OBSERVE · BUILD · REMEMBER</p>
        <h2>Build a hanzi. Hear it <em>click.</em></h2>
        <p class="hero-lead">Fit each character component into the correct position, just like joining pieces of wood.</p>
        <div class="hero-actions"><button class="primary-button" id="start">Start Building <span>→</span></button><button class="text-button" id="howto">How to Play</button></div>
        <div class="feature-row"><span>Left–right</span><i></i><span>Top–bottom</span><i></i><span>${ROUND_SIZE} per round</span></div>
        <span class="offline-note">Works offline — no internet needed</span>
      </div>
      <div class="hero-workbench" aria-hidden="true">
        <div class="wood-board"><span class="wood-label"><span class="practice-word"><i>T</i><i>O</i><i>D</i><i>A</i><i>Y</i><i>'</i><i>S</i></span><span class="practice-word"><i>P</i><i>R</i><i>A</i><i>C</i><i>T</i><i>I</i><i>C</i><i>E</i></span></span><div class="demo-character"><span>亻</span><b>+</b><span>木</span></div><div class="demo-arrow">→</div><div class="demo-result">休</div><div class="wood-pegs"><i></i><i></i><i></i></div></div>
        <img class="home-plant-art" src="assets/illustrations/plant.png" alt="">
        <img class="home-tools-art" src="assets/illustrations/wood-tools.png" alt="">
      </div>
    </section>`;
  else if (state.screen === "howto") app.innerHTML = `
    <section class="screen howto-screen"><img class="guide-plant-art" src="assets/illustrations/plant.png" alt=""><img class="guide-tools-art" src="assets/illustrations/wood-tools.png" alt=""><div class="section-heading"><p class="eyebrow">APPRENTICE GUIDE</p><h2>Build in three steps</h2><p>Look at the position first, then fit the pieces together.</p></div>
    <div class="steps"><article><span>01</span><div class="step-icon">1</div><h3>Read the clue</h3><p>Read the pinyin and English meaning. Think about which character it could be.</p></article><article><span>02</span><div class="step-icon">2</div><h3>Place every component</h3><p>Drag each wooden block into an empty slot, or tap the block and then tap a slot.</p></article><article><span>03</span><div class="step-icon">3</div><h3>Check the whole character</h3><p>After every slot is filled, a wrong character cracks. Tap the button to study the correct answer.</p></article></div>
    <div class="howto-actions"><button class="primary-button" id="start">Got It — Start <span>→</span></button><button class="text-button" id="back">Return Home</button></div></section>`;
  else if (state.screen === "game") renderGame();
  else renderResult();
  bind();
}

function renderGame() {
  const q = question();
  const correctAnswer = q.slots.map(slot => q.parts.find(part => part.target === slot.id)).filter(Boolean);
  app.innerHTML = `<section class="game-screen">
    <img class="game-plant-art" src="assets/illustrations/plant.png" alt="">
    <img class="game-tools-art" src="assets/illustrations/wood-tools.png" alt="">
    <div class="game-meta"><div><span>Progress</span><strong>${state.round + 1} / ${state.order.length}</strong></div><div class="progress-track"><i style="width:${((state.round + (state.answered ? 1 : 0))/state.order.length)*100}%"></i></div><span class="score-pill">Score ${state.score} / 100</span></div>
    <div class="prompt-card"><p>Build the character for this clue</p><div class="prompt-main"><strong>${q.pinyin}</strong><span>${q.english}</span></div><span class="structure-tag">${q.structure === "left-right" ? "Left–right" : q.structure === "top-middle-bottom" ? "Three-part vertical" : "Top–bottom"}</span></div>
    <div class="work-area ${state.outcome === "wrong" && !state.completed ? "showing-error" : ""}"><div class="bench-title"><span>JOINERY WORKBENCH</span><i></i></div><div class="slot-frame ${q.structure} ${state.outcome === "wrong" && !state.completed ? "cracking" : ""} ${state.outcome === "correct" ? "joined" : ""}">
      ${q.slots.map(slot => { const part=q.parts.find(item=>state.placed[item.id]===slot.id); const filled=Boolean(part); const wrong=filled&&state.outcome==="wrong"&&part.target!==slot.id; return `<button class="joinery-slot ${filled?"filled":""} ${wrong?"wrong-filled":""}" data-slot="${slot.id}" aria-label="${slot.label} slot" ${state.answered?"disabled":""}>${filled?`<span class="${componentClass(part.text)}">${part.text}</span>`:`<i>＋</i><small>${slot.label}</small>`}</button>`; }).join("")}
    </div><p class="feedback ${state.feedback?"visible":""}" id="feedback" aria-live="polite">${state.feedback || "Choose a component to begin."}</p>${state.outcome==="wrong"&&!state.completed?`<button class="view-answer-button" id="showAnswer">View Correct Character <span>→</span></button>`:""}</div>
    <div class="parts-tray ${state.answered?"locked":""}"><div class="tray-label">Components <span>${state.answered?"Question complete":"Drag or tap a wooden block"}</span></div><div class="parts-row">
      ${state.parts.map(part => `<button class="part-block ${state.selected===part.id?"selected":""} ${state.placed[part.id]?"placed":""}" data-part="${part.id}" ${state.placed[part.id]||state.answered?"disabled":""}><span class="${componentClass(part.text)}">${part.text}</span><small>PART</small></button>`).join("")}
    </div></div>
    ${state.completed?`<div class="completion-overlay" role="dialog" aria-modal="true"><div class="completion-card ${state.outcome==="wrong"?"wrong-answer":""}"><span class="success-kicker">${state.outcome==="correct"?"A PERFECT FIT":"CORRECT ANSWER"}</span><div class="complete-character">${q.character}</div><h2>${q.pinyin}</h2><p>${q.english}</p><div class="answer-parts" aria-label="Correct component order">${correctAnswer.map(part=>`<span class="${componentClass(part.text)}">${part.text}</span>`).join("<i>＋</i>")}</div><p class="question-score">${state.outcome==="correct"?`+${state.lastPoints} points`:`0 points`} · <strong>Total ${state.score} / 100</strong></p><p class="completion-message">${state.outcome==="correct"?q.completionMessage:"Study the correct positions before continuing."}</p><button class="primary-button" id="next">${state.round===state.order.length-1?"View Results":"Next Character"} <span>→</span></button></div></div>`:""}
  </section>`;
}

function renderResult() {
  app.innerHTML = `<section class="screen result-screen"><img class="result-plant-art" src="assets/illustrations/plant.png" alt=""><div class="result-medallion"><span>DONE</span><strong>${state.score}</strong><small>OUT OF 100</small></div><p class="eyebrow">ROUND COMPLETE</p><h2>You completed the round!</h2><p class="result-copy">You answered ${state.correct} of ${state.order.length} characters correctly. Review each revealed structure and try for an even stronger join next round.</p><div class="result-stats"><div><strong>${state.order.length}</strong><span>Questions</span></div><div><strong>${state.correct}</strong><span>Correct</span></div><div><strong>${state.mistakes}</strong><span>Incorrect</span></div></div><div class="hero-actions"><button class="primary-button" id="start">New Round <span>↻</span></button><button class="text-button" id="back">Return Home</button></div></section>`;
}

function bind() {
  document.getElementById("start")?.addEventListener("click", startGame);
  document.getElementById("howto")?.addEventListener("click", () => setScreen("howto"));
  document.getElementById("back")?.addEventListener("click", headerHome);
  document.getElementById("next")?.addEventListener("click", nextQuestion);
  document.getElementById("showAnswer")?.addEventListener("click", revealCorrectAnswer);
  document.querySelectorAll(".joinery-slot").forEach(slot => slot.addEventListener("click", () => !state.answered && state.selected && tryPlace(state.selected, slot.dataset.slot)));
  document.querySelectorAll(".part-block").forEach(block => {
    block.addEventListener("click", () => { if (!state.answered && !state.placed[block.dataset.part]) { state.selected=block.dataset.part; render(); } });
    block.addEventListener("pointerdown", event => {
      if (state.answered || state.placed[block.dataset.part]) return;
      event.preventDefault(); block.setPointerCapture(event.pointerId);
      state.selected=block.dataset.part; state.drag={id:block.dataset.part,pointer:event.pointerId,x:event.clientX,y:event.clientY,element:block};
      block.classList.add("dragging");
    });
    block.addEventListener("pointermove", event => {
      const drag=state.drag; if (!drag || drag.pointer!==event.pointerId) return;
      drag.element.style.transform=`translate3d(${event.clientX-drag.x}px,${event.clientY-drag.y}px,0) rotate(-2deg) scale(1.1)`;
      document.querySelectorAll(".joinery-slot").forEach(slot => { const r=slot.getBoundingClientRect(); slot.classList.toggle("slot-near",event.clientX>=r.left-24&&event.clientX<=r.right+24&&event.clientY>=r.top-24&&event.clientY<=r.bottom+24); });
    });
    const end = event => {
      const drag=state.drag; if (!drag || drag.pointer!==event.pointerId) return;
      const slot=document.elementsFromPoint(event.clientX,event.clientY).find(element=>element.dataset?.slot);
      drag.element.classList.remove("dragging"); drag.element.classList.add("returning"); drag.element.style.transform="";
      document.querySelectorAll(".joinery-slot").forEach(item=>item.classList.remove("slot-near"));
      setTimeout(()=>drag.element.classList.remove("returning"),260); state.drag=null;
      if (slot) tryPlace(drag.id,slot.dataset.slot);
    };
    block.addEventListener("pointerup",end); block.addEventListener("pointercancel",end);
  });
}

render();
