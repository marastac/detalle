const flower = document.getElementById("flower");
const intro = document.getElementById("intro");
const gallery = document.getElementById("gallery");
const final = document.getElementById("final");
const quoteBox = document.getElementById("quoteBox");
const hearts = document.getElementById("hearts");
const loveLetter = document.getElementById("loveLetter");

const photos = [
  { src: "media/fotito1.jpg", caption: "Desde el primer día, supe que eras diferente." },
  { src: "media/fotito2.jpg", caption: "Eres mi lugar seguro, mi persona favorita." },
  { src: "media/fotito3.jpg", caption: "Tus abrazos curan todo, Daniela." },
  { src: "media/fotito4.jpg", caption: "Gracias por caminar a mi lado. Te amo, Mario 💌" }
];

flower.addEventListener("click", () => {
  intro.style.display = "none";
  flower.style.display = "none";

  photos.forEach(data => {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="photo-frame">
        <img src="${data.src}" alt="foto" />
        <div class="photo-caption">${data.caption}</div>
      </div>
    `;
    gallery.appendChild(container);
  });

  final.style.display = "block";
  fetchLoveQuote();
  startPetalRain();
});

function fetchLoveQuote() {
  fetch("https://api.quotable.io/random?tags=love")
    .then(res => res.json())
    .then(data => {
      quoteBox.textContent = `“${data.content}” — ${data.author}`;
    })
    .catch(() => {
      quoteBox.textContent = "El amor es la poesía de los sentidos.";
    });
}

function showHearts() {
  hearts.style.display = "block";
}

function showLetter() {
  loveLetter.style.display = "block";
  loveLetter.scrollIntoView({ behavior: "smooth" });
}

particlesJS("particles-js", {
  particles: {
    number: { value: 50 },
    color: { value: "#ff66cc" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 5 },
    move: { enable: true, speed: 2 }
  }
});

function startPetalRain() {
  const canvas = document.getElementById("petals-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const petals = [];

  function Petal() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = 10 + Math.random() * 10;
    this.speed = 1 + Math.random() * 2;
    this.opacity = 0.5 + Math.random() * 0.5;
    this.angle = Math.random() * 2 * Math.PI;

    this.draw = function () {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    };

    this.update = function () {
      this.y += this.speed;
      if (this.y > canvas.height) this.y = -20;
    };
  }

  for (let i = 0; i < 100; i++) {
    petals.push(new Petal());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}
