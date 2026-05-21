export class CircuitFixer {
  constructor(canvas, updateScoreUI, onGameOver) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.updateScoreUI = updateScoreUI;
    this.onGameOver = onGameOver; 
    
    this.gridSize = 5;
    this.cellSize = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.grid = [];
    this.solution = [];
    this.moves = 0;
    this.isCompleted = false;
    this.hintBtn = { x: 0, y: 0, width: 100, height: 40 };
    this.hintCell = null;
    
    this.handleInput = this.handleInput.bind(this);
    this.draw = this.draw.bind(this);
  }

  start() {
    this.moves = 0;
    this.isCompleted = false;
    this.isPaused = false;
    this.updateScoreUI(this.moves);
    this.initGrid();
    
    this.canvas.addEventListener('mousedown', this.handleInput);
    this.canvas.addEventListener('touchstart', this.handleInput);
    
    this.draw();
  }

  stop() {
    this.canvas.removeEventListener('mousedown', this.handleInput);
    this.canvas.removeEventListener('touchstart', this.handleInput);
  }

  togglePause() {
    if (!this.isCompleted) {
      this.isPaused = !this.isPaused;
      this.draw();
    }
    return this.isPaused;
  }

  initGrid() {
    this.grid = [];
    this.solution = [];
    for(let r=0; r<this.gridSize; r++) {
      this.grid.push(new Array(this.gridSize).fill(1));
      this.solution.push(new Array(this.gridSize).fill(0));
    }
    
    let clicks = 0;
    while(clicks < 8) {
      let r = Math.floor(Math.random() * this.gridSize);
      let c = Math.floor(Math.random() * this.gridSize);
      this.toggle(r, c);
      this.solution[r][c] ^= 1;
      clicks++;
    }
    
    let allOn = true;
    for(let r=0; r<this.gridSize; r++) {
      for(let c=0; c<this.gridSize; c++) {
        if(this.grid[r][c] === 0) allOn = false;
      }
    }
    if (allOn) {
      this.toggle(0, 0);
      this.solution[0][0] ^= 1;
    }
    this.hintCell = null;
  }

  provideHint() {
    let found = false;
    for(let r=0; r<this.gridSize; r++) {
      for(let c=0; c<this.gridSize; c++) {
        if(this.solution[r][c] === 1) {
          this.hintCell = { r, c };
          found = true;
          break;
        }
      }
      if(found) break;
    }
    this.draw();
  }

  handleInput(e) {
    if (this.isCompleted || this.isPaused) return;
    e.preventDefault();
    
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    
    let clientX, clientY;
    if (e.type === 'touchstart') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    if (
      x >= this.hintBtn.x &&
      x <= this.hintBtn.x + this.hintBtn.width &&
      y >= this.hintBtn.y &&
      y <= this.hintBtn.y + this.hintBtn.height
    ) {
      this.provideHint();
      return;
    }

    const c = Math.floor((x - this.offsetX) / this.cellSize);
    const r = Math.floor((y - this.offsetY) / this.cellSize);
    
    if (r >= 0 && r < this.gridSize && c >= 0 && c < this.gridSize) {
      this.toggle(r, c);
      this.solution[r][c] ^= 1;
      this.moves++;
      this.hintCell = null;
      this.updateScoreUI(this.moves);
      this.draw();
      this.checkWin();
    }
  }

  toggle(r, c) {
    const toggleCell = (row, col) => {
      if (row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize) {
        this.grid[row][col] = this.grid[row][col] === 1 ? 0 : 1;
      }
    };
    
    toggleCell(r, c);
    toggleCell(r-1, c);
    toggleCell(r+1, c);
    toggleCell(r, c-1);
    toggleCell(r, c+1);
  }

  checkWin() {
    let allOn = true;
    for(let r=0; r<this.gridSize; r++) {
      for(let c=0; c<this.gridSize; c++) {
        if(this.grid[r][c] === 0) allOn = false;
      }
    }
    
    if (allOn) {
      this.isCompleted = true;
      setTimeout(() => {
        this.onGameOver(this.moves, true); 
      }, 500);
    }
  }

  draw() {
    this.ctx.fillStyle = '#050510';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.hintBtn.x = this.canvas.width - 120;
    this.hintBtn.y = 20;

    this.ctx.fillStyle = 'rgba(203, 108, 230, 0.1)';
    this.ctx.strokeStyle = '#cb6ce6';
    this.ctx.lineWidth = 1;
    this.ctx.fillRect(this.hintBtn.x, this.hintBtn.y, this.hintBtn.width, this.hintBtn.height);
    this.ctx.strokeRect(this.hintBtn.x, this.hintBtn.y, this.hintBtn.width, this.hintBtn.height);
    
    this.ctx.fillStyle = '#cb6ce6';
    this.ctx.font = '16px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('HINT', this.hintBtn.x + this.hintBtn.width/2, this.hintBtn.y + this.hintBtn.height/2);
    
    const minDim = Math.min(this.canvas.width, this.canvas.height);
    const padding = 40;
    this.cellSize = (minDim - padding * 2) / this.gridSize;
    
    this.offsetX = (this.canvas.width - (this.cellSize * this.gridSize)) / 2;
    this.offsetY = (this.canvas.height - (this.cellSize * this.gridSize)) / 2;
    
    for(let r=0; r<this.gridSize; r++) {
      for(let c=0; c<this.gridSize; c++) {
        const x = this.offsetX + c * this.cellSize;
        const y = this.offsetY + r * this.cellSize;
        const isOn = this.grid[r][c] === 1;
        
        this.ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
        
        this.ctx.beginPath();
        this.ctx.arc(x + this.cellSize/2, y + this.cellSize/2, this.cellSize/3, 0, Math.PI*2);
        
        if (isOn) {
          this.ctx.fillStyle = '#00d4ff';
          this.ctx.shadowBlur = 15;
          this.ctx.shadowColor = '#00d4ff';
        } else {
          this.ctx.fillStyle = '#16213e';
          this.ctx.shadowBlur = 0;
        }
        
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        if (this.hintCell && this.hintCell.r === r && this.hintCell.c === c) {
          this.ctx.strokeStyle = '#e94560';
          this.ctx.lineWidth = 3;
          this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
        }
      }
    }

    if (this.isPaused) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '30px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2);
    }
  }
}
