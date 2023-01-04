const container = document.getElementById('container');
const gameplayer = document.getElementById('player');
const power = document.getElementById('power');
const darkplayer = document.createElement('div')
const image = document.createElement('img')
const playerimage = document.getElementById('playerimage')
const counter = document.getElementById('counter')
const timer  = document.getElementById('timer')
image.src = "darkman.gif"
darkplayer.appendChild(image)
image.setAttribute('class','darkplayerimage')
darkplayer.setAttribute('class','darkplayer')


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
        
     alert(`time up if u want to start the game again type s ${win_lose}`)
      window.location.reload()
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
   right: (container.clientWidth - gameplayer.clientWidth) - speed,
   up: (container.clientHeight - gameplayer.clientHeight) - speed,
   down: speed
}

class Player{
   constructor(gameplayer){
    this.x =  this.randomlocation()
    this.y = this.randomlocation()
    gameplayer.style.bottom = `${this.y}px`;
    gameplayer.style.left = `${this.x}px`;
   }
   randomlocation(){
      return Math.floor(Math.random()*(((container.clientWidth - gameplayer.clientWidth) - speed) + speed))
    }
   setter(){
    gameplayer.style.bottom = `${this.y}px`;
    gameplayer.style.left = `${this.x}px`;
   }
   up(){
    this.y += speed;
    this.setter()
  
   }
   down(){
    this.y -= speed;
    this.setter()
   
   }
   left(){
    this.x -= speed;
    gameplayer.style.transform = "scaleX(-1)"
    this.setter()
   
   }
   right(){
    this.x += speed;
    gameplayer.style.transform = "scaleX(1)"
    this.setter()
   
   }
   altercheck(){
     if(alter == true && count == 3 ){
         image.src = "darkman.gif"
         playerimage.src = "animated-man-running.gif"
         alter = false
     }
    }
   checkcolloidbyplayer(){
    
    if((darkplayers.tempx - player.x >= 0 && darkplayers.tempx - player.x <= speed)&& (darkplayers.tempy - player.y >= 0 && darkplayers.tempy - player.y <= speed)){
      image.src = "darkman.gif"
      playerimage.src =  "animated-man-running.gif"
      alter = false
     count = count + 1
     counter.innerText = count
    }
   }
    warning(){
     
      if((player.x - darkplayers.tempx > 0 && player.x - darkplayers.tempx < 100) && (player.tempy - darkplayers.tempy > 0 && player.y - darkplayers.y < 100)){
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
   return Math.floor(Math.random()*(((container.clientWidth - gameplayer.clientWidth) - 100) + 100))
 }
 powersetter(){
   this.x = this.randomlocation()
   this.y = this.randomlocation()
   if(this.x < 100 || this.y < 100){
     return this.powersetter()
   }
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
class DarkPlayer{
   constructor(){
    this.x
    this.y
    this.tempx
    this.tempy

   }
   randomlocation(){
      return Math.floor(Math.random()*(((container.clientWidth - gameplayer.clientWidth) - gameplayer.clientWidth) + gameplayer.clientWidth))
    }
    darkplayersetter(){
      this.x = this.randomlocation()
      this.y = this.randomlocation()
      darkplayer.style.left = `${this.x}px`
      darkplayer.style.bottom = `${this.y}px`

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
      darkplayer.style.transform = 'scaleX(1)'
      this.tempx = this.tempx +  speed
     }
     if(this.tempx > player.x){
      darkplayer.style.transform = 'scaleX(-1)'
      this.tempx = this.tempx -  speed
     }
     if(this.tempy < player.y){
      this.tempy = this.tempy +  speed
     }
     if(this.tempy > player.y){
      this.tempy = this.tempy -  speed
     }
     
   darkplayer.style.left = `${this.tempx}px`
   darkplayer.style.bottom = `${this.tempy}px`

   }

   powerchase(){

      this.check()
      this.checkcolloid()
      this.tempx =this.tempx
      this.tempy = this.tempy
     if(this.tempx < powers.x){
      darkplayer.style.transform = 'scaleX(1)'
      this.tempx = this.tempx + speed 
     }
     if(this.tempx > powers.x){
      darkplayer.style.transform = 'scaleX(-1)'
      this.tempx = this.tempx - speed 
     }
     if(this.tempy < powers.y){
      this.tempy = this.tempy + speed 
     }
     if(this.tempy > powers.y){
      this.tempy = this.tempy - speed 
     }
     
   darkplayer.style.left = `${this.tempx}px`
   darkplayer.style.bottom = `${this.tempy}px`
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




let player = new Player(gameplayer);
let powers = new Power(power);
let darkplayers = new DarkPlayer(darkplayer)



setTimeout(() => {
   powers.powersetter()
   container.appendChild(darkplayer)
   darkplayers.darkplayersetter(darkplayer)
   darkplayers.update()
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
        
         powers.consumepower( )
       }
   }else{

      if((powers.x - darkplayers.tempx <= speed && powers.x - darkplayers.tempx >= 0) && (powers.y - darkplayers.tempy <= speed && powers.y - darkplayers.tempy >= 0)){
        
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
  
   switch(e.key){
    case 'ArrowUp' : player.up(); break;
    case 'ArrowLeft' : player.left();break;
    case 'ArrowRight' : player.right();break;
    case  'ArrowDown': player.down();break;
   }
   
})
