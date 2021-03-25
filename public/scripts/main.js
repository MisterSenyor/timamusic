var ctx = canvas.getContext("2d");
var started = false;
var audioa = document.querySelector(".audioStart")
var globalClick = {x:0,y:0};
var menuMode = {width:300,height:HEIGHT/2.5,mode:"main"};
var gameName = "SOUNDSCAPE";
var srca;
//setBackground
var menuTexts = [
  new MenuText(0,0,"START",goToStart,"center",30,true,true),
  new MenuText(0,0,"ABOUT",goToAbout,"center",30,true,true),
  new MenuText(0,0,"INSTRUCTIONS",goToInstruction,"center",20,true,true),
  new MenuText(0,0,"STORY",goToIntro,"center",20,true,true)
]
// var
function mainScreen(){
  ctx.fillStyle = "white"
  ctx.font = HEIGHT/10+"px pixelated";
  ctx.textAlign = "center";
  var nameWidth = ctx.measureText(gameName);
  ctx.fillText(gameName, WIDTH/2, HEIGHT/20 + HEIGHT/6)

  //draw menu
  makeMenu()
}
// const emojies = ["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"];
// const animateUrl = () => {
//   window.location.hash = emojies[Math.floor((Date.now() / 100) % emojies.length)];
//   setTimeout(animateUrl, 50);
// }
// animateUrl();
var textCounter = 0, textBool = true;
function beforeStartScreen(){
  var preStartScreen = requestAnimationFrame(beforeStartScreen);

  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  ctx.fillStyle = "rgb(70, 70, 70)"
  if (textCounter >= 40) {
    textBool = !textBool;
    textCounter = 0;
  }
  if (textBool) {
    ctx.textAlign = "center";
    ctx.font = "30px pixelated";
    ctx.fillText("CLICK ANYWHERE TO START ", WIDTH / 2, HEIGHT / 2);
  }
  textCounter++;
  if(started){
    cancelAnimationFrame(preStartScreen);
  }
}
mainScreen();
beforeStartScreen();
var lastY;
var backFromInstructions = new MenuText(0,0,"BACK",goToMain,"center",30,true,true);
var backFromAbout = new MenuText(0,0,"BACK",goToMain,"center",30,true,true);
function instructions(){
  var instY = HEIGHT/3+60;
  var centerX = WIDTH/2;
  ctx.fillStyle = "white";
  ctx.font = "25px pixelated";
  ctx.fillText("INSTRUCTIONS", centerX, instY);
  var instructionsTxt = "Grogu is the best, Grogu is the best, Grogu will eat you up even with a bulletproof vest, Grogu eats you up, grogu throws you up, you are a simple blue cookie trying to make your way across the galaxy";
  lastY = wrapTxt(instructionsTxt, 600,WIDTH/2,instY + 70);
  backFromInstructions.x = WIDTH/2;
  backFromInstructions.y = instY + 100 + lastY * 40;
  backFromInstructions.draw();
}
function goToMain(){
  menuMode.mode = "main"
  menuMode.width = 300;
  activeTexts = [];
  console.log(activeTexts.length + ", " + activeTexts);
  for(var i = 0; i < menuTexts.length; i++){
    menuTexts[i].active = true;
  }
}
function goToIntro() {
  menuMode.mode = "intro";
}
function wrapTxt(txt, width, x, y){
  var splitTxt = txt.split(" ");
  var currString = "";
  ctx.font = "25px Roboto";
  ctx.fillStyle = "white";
  var lines = 0;
  for(var i = 0; i < splitTxt.length; i++){
    currString+=splitTxt[i] + " ";
    if(i < splitTxt.length-1){
      if(ctx.measureText(currString+" " + splitTxt[i+1]).width > width){
        ctx.fillText(currString,x,y+lines*40)
        lines++;
        currString = "";
      }
    }else{
      ctx.fillText(currString,x,y+lines*40)
      lines++;
      currString = "";
    }
  }
  return lines;
}
var mainGameLoop;
function makeMenu(){
  var y = HEIGHT/3;
  var x = WIDTH/2-menuMode.width/2;
  var height = menuMode.height;
  var width = menuMode.width;
  ctx.fillStyle = "rgba(0,0,0,0.8)";
  roundRect(ctx,x,y,width,height,25);
  if(menuMode.mode == "main"){
    mainMenu();
  }else if(menuMode.mode == "instructions"){
    instructions();
  }else if(menuMode.mode == "about"){
    about();
  } else if(menuMode.mode == "intro") {
    audioa.pause();
    playAllIntro()
  }
}
var introSpeed = 500, introNow = 0, introDisplay = 1, numberOfImages = 8,ranIntro = false;
function playAllIntro(){
  if(introNow == introSpeed){
    introNow = 0;
    introDisplay++;
    resetZoom()
  }else{
    introNow++;
  }
  if(!ranIntro){
    startStoryMusic();
    ranIntro = true;
  }
  if(introDisplay >= numberOfImages){
    introSpeed = 500, introNow = 0, introDisplay = 1, numberOfImages = 8;
    menuMode.mode = "main"
    audioa.play();
    ranIntro = false;
    stopStoryMusic();
  }else{
    drawIntro('intro'+introDisplay);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white"
    ctx.font = "30px Arial";
    ctx.textAlign = "end"
    ctx.fillText("Click to continue...",WIDTH-20,HEIGHT-30)
    ctx.strokeText("Click to continue...",WIDTH-20,HEIGHT-30);
  }
}
function mainMenu() {
  ctx.fillStyle = "rgba(0,0,0,0.8)"
  var words = menuTexts;
  var padding = 20;
  var y = HEIGHT/3;
  var x = WIDTH/2-menuMode.width/2;
  var height = menuMode.height;
  var width = menuMode.width
  ctx.font = "40px Roboto";
  // console.log(y);
  for(var i = 0; i < words.length; i++){
    var currX = WIDTH/2;
    var currY = y+padding*1.5+i*(height-padding)/words.length+30;
    ctx.fillStyle = "rgb(100, 100, 100)";
    words[i].x = currX;
    words[i].y = currY;
    words[i].draw();
  }
}
function about(){
  var instY = HEIGHT/3+60;
  var centerX = WIDTH/2;
  ctx.fillStyle = "white";
  ctx.font = "25px pixelated";
  ctx.fillText("ABOUT", centerX, instY);
  var instructionsTxt = "My name is Grogu, I eat frogs, I like the forest and hiding and logs. Mando took me in, saved me from IG11, and all that when I was only 57. Met a guy named Quiil, and Moff Gideon too. Got captured twice and had nothing to do. I studied for years under old Luke Skywalker, and left before Ben Solo put the whole place on fire.";
  lastY = wrapTxt(instructionsTxt, 600,WIDTH/2,instY + 70);
  backFromAbout.x = WIDTH/2;
  backFromAbout.y = instY + 100 + lastY * 40;
  backFromAbout.draw();
}
function grogu(){
  alert("grogu")
}
function goToStart(){
  startGame();
}
function goToAbout(){
  menuMode.width = 700;
  menuMode.mode = "about";
  activeTexts.push(backFromAbout);
}
function goToInstruction(){
  console.log("ggg");
  menuMode.mode = "instructions";
  activeTexts.push(backFromInstructions);
  menuMode.width = 700;
  for(var i = 0; i < menuTexts.length; i++){
    menuTexts[i].active = false;
  }
}
function roundRect(ctx, x, y, width, height, radius) {
  radius = {tl: radius, tr: radius, br: radius, bl: radius};
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  ctx.fill();
}

function startWholeGame(){

}

var smootha = 0.9;
var contextMenu;
function visualizea(source) {
    console.log(!context);
    if(!contextMenu){
      contextMenu = new AudioContext();
      srca = contextMenu.createMediaElementSource(source);
    }

    var delay = contextMenu.createDelay(5.0);
    delay.delayTime.value = 1.0;

    var analysera = contextMenu.createAnalyser();
    var listen = contextMenu.createGain();
    srca.connect(listen);
    listen.connect(analysera);
    analysera.connect(contextMenu.destination);
    analysera.fftSize = 2 ** 12;
    var frequencyBins = analysera.fftSize / 2;

    // length of data inside array
    var bufferLength = analysera.frequencyBinCount;
    var dataArrayb = new Uint8Array(bufferLength);
    renderFramea();
    function renderFramea() {
        // mandatory shit to set everything up
        mainGameLoop = requestAnimationFrame(renderFramea);
        analysera.smoothingTimeConstant = .9;
        // TODO - recognize the volume before pplaying. DUCK YOU FUTURE US!
        listen.gain.setValueAtTime(1, contextMenu.currentTime);
        analysera.getByteFrequencyData(dataArrayb);
        allFreqs.push(dataArray);
        // vars
        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var scale = bufferLength/WIDTH;
        var sectorLength = 0;
        var avgTimes = 0;
        currentAverage = 0;
        currentAverage/=avgTimes;
        // drawing each sector individually
        ctx.fillStyle = "#0f0f0f";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#0f0f0f";
        for (var i = 0; i < bufferLength; i++) {
            if (dataArrayb[i] != 0) {
                allHeights += dataArrayb[i];
                sectorLength++;
                currentAverage+=dataArrayb[i]
                avgTimes++;
            }

            if (i % (dataArrayb.length / times) == 0) {
                sectorVols.push(sectorLength == 0 ? 0 : (allHeights / sectorLength)*2);
                allHeights = 0, sectorLength = 0;
            }
        }
        for (var i = 0; i < sectorVols.length; i++) {
            // fill color
            // for(var i = 0)
            var floorY = player.begY+40;
            var heightOfBar = 0;
            for(var j = 0; j < sectorVols[i]; j++){
              heightOfBar++;
              //171-300
              if(j%5 == 0 || j == sectorVols[i]){
                var fillColor = j > 131 ? 131 : j;
                var fills = "hsla("+(171+fillColor)+",69%, 65%,1)";
                ctx.shadowColor = fills;
                ctx.fillStyle = fills;
                ctx.shadowColor = fills;
                ctx.fillStyle = fills;
                // filling the rect in the specific location
                ctx.fillRect(i * (WIDTH / (times - times / 4)), // x relative to i'th sector
                HEIGHT - j - j*2, // total y minus the height
                WIDTH / (times - times / 4), // width according to sector scale
                -(heightOfBar)); // height
                heightOfBar = 0;
              }
            }
        }
        for(var i = 0; i < menuTexts.length; i++){
          if(globalMouseX > menuTexts[i].x-menuTexts[i].width/2 && globalMouseX < menuTexts[i].x+menuTexts[i].width/2 && globalMouseY < menuTexts[i].y && globalMouseY > menuTexts[i].y - menuTexts[i].size){
            menuTexts[i].isFocused = false;
          }else{
            menuTexts[i].isFocused = true;
          }
        }
        mainScreen();
      sectorVols = [];
    }
}
