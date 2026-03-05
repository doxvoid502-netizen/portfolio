const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
let w=canvas.width=window.innerWidth;
let h=canvas.height=window.innerHeight;
let particles=[];

function Particle(){
  this.x=Math.random()*w;
  this.y=Math.random()*h;
  this.r=Math.random()*2+1;
  this.dx=(Math.random()-0.5)*0.5;
  this.dy=(Math.random()-0.5)*0.5;
}
Particle.prototype.draw=function(){
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
  ctx.fillStyle='rgba(0,255,240,0.7)';
  ctx.fill();
}
Particle.prototype.update=function(){
  this.x+=this.dx;
  this.y+=this.dy;
  if(this.x<0||this.x>w)this.dx*=-1;
  if(this.y<0||this.y>h)this.dy*=-1;
  this.draw();
}

function init(){particles=[];for(let i=0;i<100;i++){particles.push(new Particle());}}
function animate(){
  ctx.clearRect(0,0,w,h);
  particles.forEach(p=>p.update());
  requestAnimationFrame(animate);
}
init();animate();
window.addEventListener('resize',()=>{w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;init();});

// fade-in scroll
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries, obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.style.opacity='1';entry.target.style.transform='translateY(0)';obs.unobserve(entry.target);}
  });
},{threshold:0.1});
faders.forEach(f=>observer.observe(f));