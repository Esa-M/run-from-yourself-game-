const container = document.getElementById('container');
const vector = document.getElementById('vectors');
const power = document.getElementById('power');
const ghost = document.createElement('div')
const image = document.createElement('img')
const playerimage = document.getElementById('playerimage')
const counter = document.getElementById('counter')
const timer  = document.getElementById('timer')
image.src = "darkman.gif"
ghost.appendChild(image)
image.setAttribute('class','ghostimage')
ghost.setAttribute('class','ghost')


let speed = 30
let count = 0
let alter = false
let seconds = 60
let minute = 0
let vignette = 0
let vignette_color = "black"
let timer_int = `${minute}:${seconds}`
let win_lose = ""
setInterval(() => {
      console.log("timer started")
      if(alter == false && count >= 10){
         win_lose ="u win"
      }else{
         win_lose = "u loss"
      }
   if(seconds == 0){
        
    let restart = prompt(`time up if u want to start the game again type s ${win_lose}`)
      if(restart){
         window.location.reload()
      }
      if(seconds < 0){
         return seconds = 60
      }
   }
   if(count <= -1){
      counter.style.color = "red"
   }
   seconds = seconds - 1
   vignette += 5
   container.style.boxShadow = `inset 0 0 ${vignette}px ${vignette_color}`
   console.log(vignette)
   timer_int = `${minute}:${seconds}`
   timer.innerText = timer_int
}, 1000);

const limits ={
   left : speed,
   right: (container.clientWidth - vector.clientWidth) - speed,
   up: (container.clientHeight - vector.clientHeight) - speed,
   down: speed
}

class Player{
   constructor(vector){
    this.x =  this.randomlocation()
    this.y = this.randomlocation()
    vector.style.bottom = `${this.y}px`;
    vector.style.left = `${this.x}px`;
   }
   randomlocation(){
      return Math.floor(Math.random()*(((container.clientWidth - vector.clientWidth) - speed) + speed))
    }
   setter(){
    vector.style.bottom = `${this.y}px`;
    vector.style.left = `${this.x}px`;
   }
   up(){
    this.y += speed;
    this.setter()
    //console.log(this.x,this.y)
   }
   down(){
    this.y -= speed;
    this.setter()
    //console.log(this.x,this.y)
   }
   left(){
    this.x -= speed;
    vector.style.transform = "scaleX(-1)"
    this.setter()
    //console.log(this.x,this.y)
   }
   right(){
    this.x += speed;
    vector.style.transform = "scaleX(1)"
    this.setter()
   // console.log(this.x,this.y)
   }
   altercheck(){
     if(alter == true && count == 3 ){
         image.src = "darkman.gif"
         playerimage.src = "animated-man-running.gif"
         alter = false
     }
    }
   checkcolloidbyplayer(){
      console.log('function')
    if((ghosts.tempx - player.x >= 0 && ghosts.tempx - player.x <= speed)&& (ghosts.tempy - player.y >= 0 && ghosts.tempy - player.y <= speed)){
      image.src = "darkman.gif"
      playerimage.src =  "animated-man-running.gif"
      alter = false
     count = count + 1
     counter.innerText = count
    }
   }
    warning(){
      console.log('function called')
      if((player.x - ghosts.tempx > 0 && player.x - ghosts.tempx < 100) && (player.tempy - ghosts.tempy > 0 && player.y - ghosts.y < 100)){
           vignette_color = "red"
           container.style.boxShadow = `inset 0 0 ${vignette}px ${vignette_color} `
   }}
   
}
class Power{
 constructor(power){
  power
  this.x
  this.y 
  container.appendChild(power)
 }
 randomlocation(){
   return Math.floor(Math.random()*(((container.clientWidth - vector.clientWidth) - 100) + 100))
 }
 powersetter(){
   this.x = this.randomlocation()
   this.y = this.randomlocation()
   power.style.bottom =  `${this.y}px`
   power.style.left = `${this.x}px`
   power.style.display = 'block'
   container.appendChild(power)
 }
 
 consumepower(){
   if(power){
      container.removeChild(power)
     if(alter == false){
      count++
      console.log(count)
      counter.innerText = count
     }
   }
   setTimeout(() => {
      this.powersetter()
   }, 5000);
 }

}
class Ghost{
   constructor(){
    this.x
    this.y
    this.tempx
    this.tempy

   }
   randomlocation(){
      return Math.floor(Math.random()*(((container.clientWidth - vector.clientWidth) - vector.clientWidth) + vector.clientWidth))
    }
    ghostsetter(){
      this.x = this.randomlocation()
      this.y = this.randomlocation()
      ghost.style.left = `${this.x}px`
      ghost.style.bottom = `${this.y}px`

      this.tempx = this.x
      this.tempy = this.y
    }
    check(){
      // condition for left
       if(this.tempx < limits.left){
        return this.tempx = limits.left
       }
      // condition for right
       if(this.tempx > limits.right){
        return this.tempx = limits.right
       }
        // condition for up
        if(this.tempy > limits.up){
           return this.tempy = limits.up   
          }
         // condition for down
          if(this.tempy < limits.down){
           return this.tempy = limits.down
          }
     }
     checkcolloid(){
      if((player.x - this.tempx <= speed && player.x - this.tempx >= 0) && (player.y - this.tempy <= speed && player.y - this.tempy >= 0)){
         image.src = "animated-man-running.gif"
         playerimage.src = "darkman.gif"
         alter = true
        count = count - 1
        counter.innerText = count
      }
     }
   chase(){
     
      this.check()
      this.checkcolloid()
     if(this.tempx < player.x){
      ghost.style.transform = 'scaleX(1)'
      this.tempx = this.tempx +  speed
     }
     if(this.tempx > player.x){
      ghost.style.transform = 'scaleX(-1)'
      this.tempx = this.tempx -  speed
     }
     if(this.tempy < player.y){
      this.tempy = this.tempy +  speed
     }
     if(this.tempy > player.y){
      this.tempy = this.tempy -  speed
     }
     
   ghost.style.left = `${this.tempx}px`
   ghost.style.bottom = `${this.tempy}px`

   }

   powerchase(){

      this.check()
      this.checkcolloid()
      this.tempx =this.tempx
      this.tempy = this.tempy
     if(this.tempx < powers.x){
      ghost.style.transform = 'scaleX(1)'
      this.tempx = this.tempx + speed 
     }
     if(this.tempx > powers.x){
      ghost.style.transform = 'scaleX(-1)'
      this.tempx = this.tempx - speed 
     }
     if(this.tempy < powers.y){
      this.tempy = this.tempy + speed 
     }
     if(this.tempy > powers.y){
      this.tempy = this.tempy - speed 
     }
     
   ghost.style.left = `${this.tempx}px`
   ghost.style.bottom = `${this.tempy}px`
   }
   
    update(){
      setInterval(() => { 
      switch(alter){
         case false : return this.chase()
         case true : return  this.powerchase()
      }
        }, 500);
    }

  
   
}




let player = new Player(vector);
let powers = new Power(power);
let ghosts = new Ghost(ghost)



setTimeout(() => {
   powers.powersetter()
   container.appendChild(ghost)
   ghosts.ghostsetter(ghost)
   ghosts.update()
}, 1000);


const check =()=>{
 // condition for left
  if(player.x < limits.left){
   return player.x = limits.left
  }
 // condition for right
  if(player.x > limits.right){
   return player.x = limits.right
  }
   // condition for up
   if(player.y > limits.up){
      return player.y = limits.up   
     }
    // condition for down
     if(player.y < limits.down){
      return player.y = limits.down
     }
}

const checkForConsumingPower=()=>{
   if(alter == false){
      if((powers.x - player.x <= speed && powers.x - player.x >= 0) && (powers.y - player.y <= speed && powers.y - player.y >= 0)){
         console.log('power consumed by player')
         powers.consumepower( )
       }
   }else{

      if((powers.x - ghosts.tempx <= speed && powers.x - ghosts.tempx >= 0) && (powers.y - ghosts.tempy <= speed && powers.y - ghosts.tempy >= 0)){
         console.log('power consumed by ghost')
         powers.consumepower( )
       }
   }
}

window.addEventListener('keyup',(e)=>{
    check();
    checkForConsumingPower()
    player.altercheck()
    player.warning()
    player.checkcolloidbyplayer()
    console.log(ghosts)
    console.log(powers)
   switch(e.key){
    case 'ArrowUp' : player.up(); break;
    case 'ArrowLeft' : player.left();break;
    case 'ArrowRight' : player.right();break;
    case  'ArrowDown': player.down();break;
   }
   
})
