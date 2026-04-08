export class CyberDash {
  constructor(canvas, updateScoreUI, onGameOver) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.updateScoreUI = updateScoreUI;
    this.onGameOver = onGameOver;
    this.animationId = null;
    
    // Internal dimensions
    this.baseY = this.canvas.height - 50;
    
    // Entities
    this.player = {
      x: 50,
      y: 0,
      width: 40,
      height: 40,
      vy: 0,
      gravity: 0.7,
      jumpPower: -13,
      isGrounded: true,
      jumps: 0,
      maxJumps: 2
    };
    
    this.handleInput = this.handleInput.bind(this);
    this.loop = this.loop.bind(this);
  }

  start() {
    this.score = 0;
    this.speed = 6;
    this.isGameOver = false;
    this.player.y = this.baseY - this.player.height;
    this.player.vy = 0;
    this.player.jumps = 0;
    this.isPaused = false;
    this.obstacles = [];
    this.particles = [];
    this.frames = 0;
    this.updateScoreUI(0);
    
    window.addEventListener('keydown', this.handleInput);
    this.canvas.addEventListener('touchstart', this.handleInput);
    this.canvas.addEventListener('mousedown', this.handleInput);
    
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.loop();
  }

  stop() {
    this.isGameOver = true;
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('keydown', this.handleInput);
    this.canvas.removeEventListener('touchstart', this.handleInput);
    this.canvas.removeEventListener('mousedown', this.handleInput);
  }

  togglePause() {
    if (!this.isGameOver) {
      this.isPaused = !this.isPaused;
    }
    return this.isPaused;
  }

  handleInput(e) {
    if (e.type === 'keydown' && e.code !== 'Space') return;
    e.preventDefault();
    if (this.isPaused) return; // Prevent input while paused
    if (this.player.jumps < this.player.maxJumps && !this.isGameOver) {
      this.player.vy = this.player.jumpPower;
      this.player.isGrounded = false;
      this.player.jumps++;
      this.createParticles(this.player.x + 20, this.player.y + 40, 10, '#00d4ff');
    }
  }

  createParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        life: 1,
        color
      });
    }
  }

  update() {
    this.frames++;
    this.score++;
    if (this.frames % 10 === 0) this.updateScoreUI(Math.floor(this.score / 10));
    
    // Speed increases slowly
    if (this.frames % 500 === 0) this.speed += 0.5;

    // Player physics
    this.player.vy += this.player.gravity;
    this.player.y += this.player.vy;

    if (this.player.y + this.player.height >= this.baseY) {
      this.player.y = this.baseY - this.player.height;
      this.player.vy = 0;
      this.player.isGrounded = true;
      this.player.jumps = 0;
    }

    // Spawn Obstacles
    if (this.frames % Math.floor(Math.random() * 60 + 60) === 0) {
      this.obstacles.push({
        x: this.canvas.width,
        y: this.baseY - 40,
        width: 30,
        height: 40,
        markedForDeletion: false
      });
    }

    // Update Obstacles
    this.obstacles.forEach(obs => {
      obs.x -= this.speed;
      if (obs.x + obs.width < 0) obs.markedForDeletion = true;
      
      // Collision AABB
      if (
        this.player.x < obs.x + obs.width &&
        this.player.x + this.player.width > obs.x &&
        this.player.y < obs.y + obs.height &&
        this.player.y + this.player.height > obs.y
      ) {
        this.isGameOver = true;
        this.createParticles(this.player.x + 20, this.player.y + 20, 30, '#e94560');
      }
    });

    this.obstacles = this.obstacles.filter(o => !o.markedForDeletion);

    // Particles
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.05;
    });
    this.particles = this.particles.filter(p => p.life > 0);
  }

  draw() {
    // Clear
    this.ctx.fillStyle = '#050510';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Floor
    this.ctx.fillStyle = '#16213e';
    this.ctx.fillRect(0, this.baseY, this.canvas.width, this.canvas.height - this.baseY);
    
    this.ctx.strokeStyle = '#cb6ce6';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.baseY);
    this.ctx.lineTo(this.canvas.width, this.baseY);
    this.ctx.stroke();

    // Draw Grid (Cyberpunk feel)
    this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
    for(let i=0; i<this.canvas.width; i+=50) {
        this.ctx.beginPath();
        this.ctx.moveTo((i - (this.frames * 2) % 50), 0);
        this.ctx.lineTo((i - (this.frames * 2) % 50), this.baseY);
        this.ctx.stroke();
    }

    if (!this.isGameOver || this.particles.length > 0) {
      // Draw Player
      this.ctx.fillStyle = '#cb6ce6';
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = '#cb6ce6';
      this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
      this.ctx.shadowBlur = 0; // reset
    }

    // Draw Obstacles
    this.ctx.fillStyle = '#e94560';
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = '#e94560';
    this.obstacles.forEach(obs => {
      this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
    this.ctx.shadowBlur = 0;

    // Draw particles
    this.particles.forEach(p => {
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.globalAlpha = 1;

  }

  loop() {
    if (!this.isGameOver && !this.isPaused) {
      this.update();
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

    if (this.isGameOver && this.particles.length === 0) {
      this.onGameOver(Math.floor(this.score / 10));
    } else {
      this.animationId = requestAnimationFrame(this.loop);
    }
  }
}
