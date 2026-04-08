/* ═══════════════════════════════════════════
   NEON SERPENT — Snake Game
   Cyberpunk themed, classic Snake mechanics
   ═══════════════════════════════════════════ */

export class SnakeGame {
  constructor(canvas, updateScoreUI, onGameOver) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.updateScoreUI = updateScoreUI;
    this.onGameOver = onGameOver;

    this.CELL = 20;
    this.cols = Math.floor(canvas.width / this.CELL);
    this.rows = Math.floor(canvas.height / this.CELL);

    this.handleKey = this.handleKey.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
    this.loop = this.loop.bind(this);
  }

  start() {
    this.score = 0;
    this.isGameOver = false;
    this.isPaused = false;
    this.direction = { x: 1, y: 0 };
    this.nextDir = { x: 1, y: 0 };
    this.snake = [
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 },
    ];
    this.food = this._spawnFood();
    this.particles = [];
    this.glowIntensity = 0;
    this.frameCount = 0;
    this.speed = 150; // ms per tick
    this.lastTick = performance.now();
    this.touchStart = null;

    window.addEventListener('keydown', this.handleKey);
    this.canvas.addEventListener('touchstart', this.handleTouch, { passive: false });
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });

    this.updateScoreUI(0);
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.loop();
  }

  stop() {
    this.isGameOver = true;
    if (this.animationId) cancelAnimationFrame(this.animationId);
    window.removeEventListener('keydown', this.handleKey);
    this.canvas.removeEventListener('touchstart', this.handleTouch);
  }

  togglePause() {
    if (!this.isGameOver) {
      this.isPaused = !this.isPaused;
    }
    return this.isPaused;
  }

  handleKey(e) {
    if (this.isPaused) return;
    const map = {
      ArrowUp:    { x: 0, y: -1 },
      ArrowDown:  { x: 0, y: 1 },
      ArrowLeft:  { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      KeyW: { x: 0, y: -1 },
      KeyS: { x: 0, y: 1 },
      KeyA: { x: -1, y: 0 },
      KeyD: { x: 1, y: 0 },
    };
    const dir = map[e.code];
    if (!dir) return;
    e.preventDefault();
    // Prevent reversing
    if (dir.x === -this.direction.x && dir.y === -this.direction.y) return;
    this.nextDir = dir;
  }

  handleTouch(e) {
    if (this.isPaused) return;
    e.preventDefault();
    this.touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  handleTouchEnd(e) {
    if (this.isPaused) return;
    e.preventDefault();
    if (!this.touchStart) return;
    const dx = e.changedTouches[0].clientX - this.touchStart.x;
    const dy = e.changedTouches[0].clientY - this.touchStart.y;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      const dir = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
      if (dir.x !== -this.direction.x) this.nextDir = dir;
    } else {
      const dir = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
      if (dir.y !== -this.direction.y) this.nextDir = dir;
    }
    this.touchStart = null;
  }

  _spawnFood() {
    const foodTypes = [
      { symbol: '<>', color: '#00d4ff', glow: '#00d4ff', xp: 10 },
      { symbol: '{  }', color: '#cb6ce6', glow: '#cb6ce6', xp: 20 },
      { symbol: ';', color: '#ffcd41', glow: '#ffcd41', xp: 30 },
      { symbol: '()', color: '#e94560', glow: '#e94560', xp: 15 },
    ];
    const type = foodTypes[Math.floor(Math.random() * foodTypes.length)];
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * this.cols),
        y: Math.floor(Math.random() * this.rows),
      };
    } while (this.snake.some(s => s.x === pos.x && s.y === pos.y));
    return { ...pos, ...type };
  }

  _tick() {
    this.direction = { ...this.nextDir };
    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y,
    };

    // Wall collision (wrap-around disabled — hits wall = death)
    if (head.x < 0 || head.x >= this.cols || head.y < 0 || head.y >= this.rows) {
      this._die(); return;
    }
    // Self collision
    if (this.snake.some(s => s.x === head.x && s.y === head.y)) {
      this._die(); return;
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += this.food.xp;
      this.updateScoreUI(this.score);
      this._burst(
        this.food.x * this.CELL + this.CELL / 2,
        this.food.y * this.CELL + this.CELL / 2,
        this.food.color
      );
      this.food = this._spawnFood();
      // Speed up every 50 pts, min 60ms
      this.speed = Math.max(60, 150 - Math.floor(this.score / 50) * 10);
    } else {
      this.snake.pop();
    }
  }

  _die() {
    this.isGameOver = true;
    // Death burst on head
    const px = this.snake[0].x * this.CELL + this.CELL / 2;
    const py = this.snake[0].y * this.CELL + this.CELL / 2;
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: px, y: py,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1,
        color: '#e94560',
      });
    }
  }

  _burst(x, y, color) {
    for (let i = 0; i < 16; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        life: 1,
        color,
      });
    }
  }

  _updateParticles() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.03;
    });
    this.particles = this.particles.filter(p => p.life > 0);
  }

  draw() {
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;
    const C = this.CELL;
    this.frameCount++;

    // Background
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += C) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y <= H; y += C) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Death-zone border — pulsing red glow
    const borderPulse = 0.5 + 0.5 * Math.sin(this.frameCount * 0.08);
    const borderWidth = 3;
    ctx.shadowBlur = 12 + borderPulse * 16;
    ctx.shadowColor = '#e94560';
    ctx.strokeStyle = `rgba(233, 69, 96, ${0.6 + borderPulse * 0.4})`;
    ctx.lineWidth = borderWidth;
    ctx.strokeRect(borderWidth / 2, borderWidth / 2, W - borderWidth, H - borderWidth);
    ctx.shadowBlur = 0;

    if (!this.isGameOver) {
      // Draw snake
      this.snake.forEach((seg, i) => {
        const alpha = Math.max(0.2, 1 - i / this.snake.length);
        const isHead = i === 0;
        const px = seg.x * C;
        const py = seg.y * C;
        const pad = isHead ? 1 : 3;

        // Glow
        ctx.shadowBlur = isHead ? 20 : 10;
        ctx.shadowColor = '#cb6ce6';

        // Segment color — head is bright, tail fades to cyan
        const t = i / Math.max(this.snake.length - 1, 1);
        const r = Math.round((1 - t) * 203 + t * 0);
        const g = Math.round((1 - t) * 108 + t * 212);
        const b = Math.round((1 - t) * 230 + t * 255);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.roundRect(px + pad, py + pad, C - pad * 2, C - pad * 2, isHead ? 6 : 4);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Eyes on head
        if (isHead) {
          ctx.fillStyle = '#fff';
          ctx.shadowBlur = 0;
          const eyeSize = 3;
          const d = this.direction;
          let ex1, ey1, ex2, ey2;
          if (d.x === 1) {
            ex1 = px + C - 6; ey1 = py + 5;
            ex2 = px + C - 6; ey2 = py + C - 8;
          } else if (d.x === -1) {
            ex1 = px + 4; ey1 = py + 5;
            ex2 = px + 4; ey2 = py + C - 8;
          } else if (d.y === -1) {
            ex1 = px + 5; ey1 = py + 4;
            ex2 = px + C - 8; ey2 = py + 4;
          } else {
            ex1 = px + 5; ey1 = py + C - 6;
            ex2 = px + C - 8; ey2 = py + C - 6;
          }
          ctx.beginPath(); ctx.arc(ex1, ey1, eyeSize, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(ex2, ey2, eyeSize, 0, Math.PI * 2); ctx.fill();
          // Pupils
          ctx.fillStyle = '#e94560';
          ctx.beginPath(); ctx.arc(ex1 + d.x, ey1 + d.y, 1.5, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(ex2 + d.x, ey2 + d.y, 1.5, 0, Math.PI * 2); ctx.fill();
        }
      });
    }

    // Food — pulsing glow
    const pulse = 0.5 + 0.5 * Math.sin(this.frameCount * 0.12);
    ctx.shadowBlur = 10 + pulse * 15;
    ctx.shadowColor = this.food.color;
    ctx.fillStyle = this.food.color;
    ctx.font = `bold ${C - 4}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this.food.symbol,
      this.food.x * C + C / 2,
      this.food.y * C + C / 2
    );
    ctx.shadowBlur = 0;

    // Particles
    this.particles.forEach(p => {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Score label
    ctx.fillStyle = 'rgba(203,108,230,0.6)';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`▶ SCORE: ${this.score}`, 8, 8);

    // Controls hint
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = '11px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('WASD / ↑↓←→', W - 8, 8);
  }

  loop(timestamp = 0) {
    if (!this.isPaused) {
      this._updateParticles();
    }
    this.draw();

    if (this.isPaused) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '30px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2);
    }

    if (!this.isGameOver) {
      if (!this.isPaused && timestamp - this.lastTick >= this.speed) {
        this._tick();
        this.lastTick = timestamp;
      }
      this.animationId = requestAnimationFrame(this.loop);
    } else {
      if (this.particles.length > 0) {
        this.animationId = requestAnimationFrame(this.loop);
      } else {
        this.onGameOver(this.score);
      }
    }
  }
}
