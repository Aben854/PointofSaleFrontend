const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let width, height;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Particle constructor
function createParticle() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    radius: Math.random() * 2 + 1,
    alpha: Math.random() * 0.5 + 0.3
  };
}

// Initialize particles
const PARTICLE_COUNT = 120;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(createParticle());
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  // Background glow
  const grad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    0,
    width / 2,
    height / 2,
    Math.max(width, height)
  );
  grad.addColorStop(0, "rgba(56, 189, 248, 0.10)");
  grad.addColorStop(1, "rgba(15, 23, 42, 0.0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Draw particles
  particles.forEach((p, i) => {
    // Move
    p.x += p.vx;
    p.y += p.vy;

    // Wrap around edges
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    // Particle circle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha})`;
    ctx.fill();

    // Connect nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        const lineAlpha = 0.15 * (1 - dist / 120);
        ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(draw);
}

draw();
