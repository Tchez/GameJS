let player1 = { x: 80, y: 200, w: 70, h: 50, color: 'orange' };
let player2 = { x: 550, y: 200, w: 70, h: 50, color: 'green' };

let ellipseCenter, ellipseRadius, isPlayer1Turn, projectile, isProjectileFlying, angle;

let winner = null;

function setup() {
  createCanvas(700, 400);
  initializeGame();
}

function initializeGame() {
  ellipseCenter = { x: 115, y: 150 };
  ellipseRadius = 50;
  isPlayer1Turn = true;
  isProjectileFlying = false;
  projectile = { x: 50, y: 150, radius: 10 };
  angle = 0;
  winner = null;
}

function draw() {
  background(220);

  checkInput();

  fill(player1.color);
  rect(player1.x, player1.y, player1.w, player1.h);

  fill(player2.color);
  rect(player2.x, player2.y, player2.w, player2.h);

  fill('red');
  ellipse(ellipseCenter.x, ellipseCenter.y, 5, 5);

  if (isProjectileFlying) {
    checkCollision();

    fill('blue');
    ellipse(projectile.x, projectile.y, projectile.radius * 2, projectile.radius * 2);

    projectile.x = ellipseCenter.x + ellipseRadius * cos(angle);
    projectile.y = ellipseCenter.y + ellipseRadius * sin(angle);

    if (isPlayer1Turn) {
      angle += 0.1;
      if (angle >= TWO_PI) {
        endTurn();
      }
    } else {
      angle -= 0.1;
      if (angle <= -TWO_PI) {
        endTurn();
      }
    }
  }

  if (winner) {
    fill('black');
    textSize(32);
    textAlign(CENTER, CENTER);
    text(winner + " Wins!", width / 2, height / 2);
  }
  else {
    fill('black');
    textSize(16);
    textAlign(LEFT, BASELINE);
    text('Raio da elipse: ' + ellipseRadius, 10, 20);
  }
}

function keyPressed() {
  if (key === 'r') {
    initializeGame();
    loop();
    return;
  }

  if (isProjectileFlying || winner) {
    return;
  }


  if (key === '+') ellipseRadius += 10;
  if (key === '-') ellipseRadius -= 10;

  if (key === 'f') {
    isProjectileFlying = true;
  }
}

function checkInput() {
  if (isProjectileFlying || winner) {
    return;
  }

  if (keyIsDown(UP_ARROW)) ellipseCenter.y -= 5;
  if (keyIsDown(DOWN_ARROW)) ellipseCenter.y += 5;
  if (keyIsDown(RIGHT_ARROW)) ellipseCenter.x += 5;
  if (keyIsDown(LEFT_ARROW)) ellipseCenter.x -= 5;

  ellipseCenter.x = constrain(ellipseCenter.x, 0, width);
  ellipseCenter.y = constrain(ellipseCenter.y, 0, height);
}

function checkCollision() {
  if (
    projectile.x + projectile.radius > player1.x &&
    projectile.x - projectile.radius < player1.x + player1.w &&
    projectile.y + projectile.radius > player1.y &&
    projectile.y - projectile.radius < player1.y + player1.h
  ) {
    winner = "Player 2";
    noLoop();
  }

  if (
    projectile.x + projectile.radius > player2.x &&
    projectile.x - projectile.radius < player2.x + player2.w &&
    projectile.y + projectile.radius > player2.y &&
    projectile.y - projectile.radius < player2.y + player2.h
  ) {
    winner = "Player 1";
    noLoop();
  }

  if (projectile.x < 0 || projectile.x > width || projectile.y < 0 || projectile.y > height) {
    endTurn();
  }
}

function endTurn() {
  isProjectileFlying = false;
  angle = 0;

  isPlayer1Turn = !isPlayer1Turn;

  if (isPlayer1Turn) {
    ellipseCenter.x = player1.x + player1.w / 2;
    ellipseCenter.y = player1.y - 50;
    projectile.x = player1.x + player1.w / 2;
    projectile.y = player1.y - ellipseRadius;
  } else {
    ellipseCenter.x = player2.x + player2.w / 2;
    ellipseCenter.y = player2.y - 50;
    projectile.x = player2.x + player2.w / 2;
    projectile.y = player2.y - ellipseRadius;
  }
}
