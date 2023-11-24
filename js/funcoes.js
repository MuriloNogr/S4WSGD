let life1 = 100;
let life2 = 100;
let colision = 0;
let test = false;

(function () {
  const cnv = document.querySelector('#canvas');
  const ctx = cnv.getContext('2d');

  function Imagem(){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    const robo1 = new Image();
    robo1.src = "./image/wall-e front.png"
    ctx.drawImage(robo1, player1.X, player1.Y)
    const robo2 = new Image();
    robo2.src = "./image/eva front.png"
    ctx.drawImage(robo2, player2.X, player2.Y)
  }
  //movimentos
  let moveLeft1 = false;
  let moveLeft2 = false;
  let moveUp1 = false;
  let moveUp2 = false;
  let moveRight1 = false;
  let moveRight2 = false;
  let moveDown1 = false;
  let moveDown2 = false;

  // vida


  // arrays
  const players = [];

  // quadrados
  const player1 = new Player(0, 250, 50, 67, "", 5);
  players.push(player1);

  const player2 = new Player(1000, 250, 41, 67, "", 5);
  players.push(player2);




  // pressionar as teclas
  window.addEventListener('keydown', function (e) {
    const key = e.key;
    console.log(key);
    switch (key) {
      case "ArrowLeft":
        moveLeft1 = true;
        break;
      case "a":
        moveLeft2 = true;
        break;
      case "ArrowUp":
        moveUp1 = true;
        break;
      case "w":
        moveUp2 = true;
        break;
      case "ArrowRight":
        moveRight1 = true;
        break;
      case "d":
        moveRight2 = true;
        break;
      case "ArrowDown":
        moveDown1 = true;
        break;
      case "s":
        moveDown2 = true;
        break;
    }
  });

//soltar as teclas  
  window.addEventListener('keyup', (e) => {
    const key = e.key;
    switch (key) {
      case "ArrowLeft":
        moveLeft1 = false;
        break;
      case "a":
        moveLeft2 = false;
        break;
      case "ArrowUp":
        moveUp1 = false;
        break;
      case "w":
        moveUp2 = false;
        break;
      case "ArrowRight":
        moveRight1 = false;
        break;
      case "d":
        moveRight2 = false;
        break;
      case "ArrowDown":
        moveDown1 = false;
        break;
      case "s":
        moveDown2 = false;
        break;
    }
  });

  function moverQuadrados() {
    if (moveLeft1 && !moveRight1) {
      player1.X -= 5;
    }
    if (moveLeft2 && !moveRight2) {
      player2.X -= 5;
    }
    if (moveRight1 && !moveLeft1) {
      player1.X += 5;
    }
    if (moveRight2 && !moveLeft2) {
      player2.X += 5;
    }
    if (moveUp1 && !moveDown1) {
      player1.Y -= 5;
    }
    if (moveUp2 && !moveDown2) {
      player2.Y -= 5;
    }
    if (moveDown1 && !moveUp1) {
      player1.Y += 5;
    }
    if (moveDown2 && !moveUp2) {
      player2.Y += 5;
    }
    
   //fiixar na tela - NÃO SAI DO CANVAS
   player1.X = Math.max(0, Math.min(cnv.width - player1.width, player1.X));
   player2.X = Math.max(0, Math.min(cnv.width - player2.width, player2.X));
   player1.Y = Math.max(0, Math.min(cnv.height - player1.height, player1.Y));
   player2.Y = Math.max(0, Math.min(cnv.height - player2.height, player2.Y));
   if ((player2.X >= player1.X) && (player2.X <= (player1.X + 50)) && (player2.Y >= player1.Y) && (player2.Y <= (player1.Y + 67))) { 
     colision++;
     life1 -= Math.floor(Math.random() * 20);
     life2 -= Math.floor(Math.random() * 20);
     player1.X = 0;
     player1.Y = 250;
     player2.X = 1000;
     player2.Y = 250;
     exibirQuadrados();
   }
    
   if ((player1.X >= player2.X) && (player1.X <= (player2.X + 41)) && (player1.Y >= player2.Y) && (player1.Y <= (player2.Y + 67))) {
    colision++;
    life1 -=1;
    life2 -=1;
    player1.X = 0;
    player1.Y = 250;
    player2.X = 1000;
    player2.Y = 250;
    exibirQuadrados();
    }

  }

 
  function exibirQuadrados() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (const i in players) {
      const spr = players[i];
      ctx.fillStyle = spr.color
      ctx.fillRect(spr.X, spr.Y, spr.width, spr.height);
    }
  }

  function fim(){
    if (colision == 5){
      player1.X = 0;
      player1.Y = 0;
      player2.X = 1000;
      player2.Y = 500;
      if (life1 > life2){
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 1000, 500);
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.font = 'bolder 100px palatino linotype';
        ctx.strokeText('Wall-e wins!', 250, 250);        
      }
      if (life2 > life1){
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 900, 400);
        ctx.fillStyle = 'white'      
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.font = 'bolder 70px palatino linotype';
        ctx.strokeText('Eva wins!', 350, 250);       
      }  
      if (life1 == life2){
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 1000, 500);
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.font = 'bolder 100px palatino linotype';
        ctx.strokeText('Empate!', 250, 250);     
      }
    }

    
  }
  //solicitar uma animação ao browser e chamar a função
  //que é a propria função atualizarTela
  function atualizarTela() {
    window.requestAnimationFrame(atualizarTela, cnv);
    moverQuadrados();
    exibirQuadrados();
    Imagem(); 
    fim(); 
    $('#life_1').html(`Vida WALL-E....: ${life1}%`);
    $('#life_2').html(`Vida EVA............: ${life2}%`);
    $('#colision_1').html(`Colisões................: ${colision}`);
    }
  
  atualizarTela();  

}());


