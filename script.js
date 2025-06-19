function updateCountdown() {
  const now = new Date();
  const year = (now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() > 28))
    ? now.getFullYear() + 1
    : now.getFullYear();

  const birthday = new Date(year, 5, 28, 0, 0, 0); // June 28
  const diff = birthday - now;

  if (diff <= 0) {
    document.getElementById("countdown").style.display = "none";
    document.getElementById("birthday-msg").textContent =
      "🎉 Happy Birthday Neha! May your day be filled with joy, love, and cake! 🎂❤️";
    document.getElementById("fireworks").style.display = "block";
    launchFireworks();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days.toString().padStart(2, "0");
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ------------- Fireworks -------------
function launchFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticle(x, y) {
    const count = 100;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: x,
        y: y,
        speed: random(2, 10),
        angle: random(0, Math.PI * 2),
        radius: random(1, 3),
        alpha: 1,
        decay: random(0.01, 0.02),
        color: `hsl(${random(0, 360)}, 100%, 70%)`
      });
    }
  }

  function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      const vx = Math.cos(p.angle) * p.speed;
      const vy = Math.sin(p.angle) * p.speed + 0.5;

      p.x += vx;
      p.y += vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) particles.splice(i, 1);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.match(/\d+/g).join(',')}, ${p.alpha})`;
      ctx.fill();
    });
  }

  function animate() {
    updateParticles();
    requestAnimationFrame(animate);
  }

  setInterval(() => {
    const x = random(100, canvas.width - 100);
    const y = random(100, canvas.height / 2);
    createParticle(x, y);
  }, 800);

  animate();
}
