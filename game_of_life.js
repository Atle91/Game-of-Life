$(document).ready(()=> {
    const c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    let count = 0;
    let cellSize = 5;
    let row = 600;
    let col = 600;
    let golGrid = [];
    let mirrorGrid = [];
    let fps = 24;
    let fpsInterval, then, startTime,now, elapsed;
    let golAnimation = {
      pause: true
    }
    setup()
    $(".gol-apply").click(() => {
      row = Math.round(document.getElementById("canvasWidth").value/6)*6;
      col = Math.round(document.getElementById("canvasHeight").value/6)*6;
      golAnimation.pause = false;
      setup();
      count = 0;
    })
  
    function setSize(){
      let golContainer = $("#gol-container");
      let width = Math.min(window.innerWidth*0.6,600);
      
      row = Math.round(width/6)*6;
      col = Math.round(width/6)*6;
      document.getElementById("canvasWidth").value = col;
      document.getElementById("canvasHeight").value = col;

    }
  
    function startAnimating(fps){
      fpsInterval = 1000/fps;
      then = Date.now();
      startTime = then;
    }
  
  
  
  
    function setup(){
      startAnimating(fps);
      setSize();
  
      fillGrid(row, col);
      document.getElementById("gol-container").style.width = row +"px";
      document.getElementById("gol-container").style.height = col +"px";
      c.width = row;
      c.height = col;
      step()
    }
  
  
  
  
    function step(){
      now = Date.now();
      elapsed = now - then;
      if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        draw();
        updateGrid();
      }
  
      if(!golAnimation.pause){
  
        requestAnimationFrame(step)
      }else{
        draw();
      }
    }
  
    function fillGrid(){
  
      for(let i = 0; i < row; i++){
        golGrid.push(new Array(row));
        mirrorGrid.push(new Array(row));
        for(let j = 0; j < col; j++){
          golGrid[i][j] = Math.round(Math.random()*0.72);
        }
      }
  
    }
  
    function draw(){
      count++;
      $(".generation").html(count);
      ctx.fillStyle = "hsl(174, 5%, 4%)";
      ctx.fillRect(0,0, c.width, c.height);
      ctx.fillStyle = "hsl(184, 56%, 59%)";
      for(let i = 1; i < row; i++){
        for(let j = 1; j < col; j++){
          if(golGrid[i][j]){
  
            ctx.fillRect(i*cellSize,j*cellSize, cellSize, cellSize);
          }else{
          }
        }
      }
  
    }
    function updateGrid(){
      for(let i = 1; i < row-1; i++){
        for(let j = 1; j < col-1; j++){
          let totalLives = 0;
  
        totalLives += golGrid[i-1][j-1] //top left
        totalLives += golGrid[i-1][j] //top left
        totalLives += golGrid[i-1][j+1] //top left
        
        totalLives += golGrid[i][j-1] //top left
        totalLives += golGrid[i][j+1] //top left
        
        totalLives += golGrid[i+1][j-1] //top left
        totalLives += golGrid[i+1][j] //top left
        totalLives += golGrid[i+1][j+1] //top left
        
  
        switch(totalLives){
          case 2:
          mirrorGrid[i][j] = golGrid[i][j];
          break;
          case 3:
          mirrorGrid[i][j] = 1;
          break;
          default:
          mirrorGrid[i][j] = 0;
          
        }
      }
  
      
    }
    
    for(let i = 1; i < row-1; i++){
    //top, bottom
    mirrorGrid[i][0] = mirrorGrid[i][row-3];
    mirrorGrid[i][row-2] = mirrorGrid[i][1];
    //left, right
    mirrorGrid[0][i] = mirrorGrid[row-3][i];
    mirrorGrid[row-2][i] = mirrorGrid[1][i];
  }
  
  let save = golGrid;
  golGrid = mirrorGrid;
  mirrorGrid = save;
  
  }
  
  $(".gol-reset").click(() => {
  
    setup();
    draw();
    golAnimation.pause = true;
    count = 0;
  })
  $(".gol-pause").click(() => {
    golAnimation.pause = true;
  })  

})
