// İstersen burayı değiştir: sadece kalp yap, sadece çiçek yap vs.
const EMOJIS = ["❤️", "💖", "💘", "🌸", "🌷", "🌺", "💐"];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnOne(xPx = rand(0, window.innerWidth)) {
  const el = document.createElement("div");
  el.className = "petal";
  el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

  const size = rand(18, 42);
  const dur = rand(3.5, 7.5);
  const drift = rand(-120, 120);
  const rot = rand(-540, 540);

  el.style.fontSize = `${size}px`;
  el.style.setProperty("--x", `${xPx}px`);
  el.style.setProperty("--dur", `${dur}s`);
  el.style.setProperty("--drift", `${drift}px`);
  el.style.setProperty("--rot", `${rot}deg`);
  el.style.setProperty("--s", `${rand(0.7, 1.25)}`);

  document.body.appendChild(el);

  // Animasyon bitince sil (DOM şişmesin)
  el.addEventListener("animationend", () => el.remove());
}

// Sürekli yağdırma
let timerId = null;

function start() {
  if (timerId) return;
  timerId = setInterval(() => {
    const count = Math.random() < 0.35 ? 2 : 1;
    for (let i = 0; i < count; i++) spawnOne();
  }, 220);
}

function stop() {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
}

start();

// Tıklayınca ekstra patlama
window.addEventListener("click", (e) => {
  for (let i = 0; i < 12; i++) {
    spawnOne(e.clientX + rand(-80, 80));
  }
});

// Sekme görünmüyorsa boşuna CPU yakma
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stop();
  else start();
});
