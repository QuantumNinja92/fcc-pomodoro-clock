 var canvas = document.getElementById('Circle');
        var context = canvas.getContext('2d');
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = 80;
var audio = new Audio('http://dl.dropboxusercontent.com/s/0x5ay5pnf3246yk/timer.mp3?dl=0');
        var full = radius*2;
        var amount = 0;
        var amountToIncrease = 0; // this will be controlled by our timer
        var time = 0;
        var interval;

        function draw() {
            context.save();
            context.beginPath();
            context.arc(centerX, centerY, radius-8, 0, 2 * Math.PI, false);
            context.clip(); // Make a clipping region out of this path
            // instead of filling the arc, we fill a variable-sized rectangle
            // that is clipped to the arc
            context.fillStyle = '#99CC00'; // filling color
            // We want the rectangle to get progressively taller starting from the bottom
            // There are two ways to do this:
            // 1. Change the Y value and height every time
            // 2. Using a negative height
            // I'm lazy, so we're going with 2
            context.fillRect(centerX - radius, centerY + radius, radius * 2 , -amount);
            context.restore(); // reset clipping region

            // Drawing the outside circle
            context.beginPath();
            context.arc(centerX, centerY, radius-6, 0, 2 * Math.PI, false);
            context.lineWidth = 1;
            context.strokeStyle = '#99CC00'; // outside circle
            context.stroke();

            // Every time, raise amount by some value:
            amount += amountToIncrease;
            if (amount > full) amount = 0; // restart
        }

        function decrease(id){
            var btn = document.getElementById(id);
            var val = parseInt(btn.innerHTML);
            if(val > 1){
                val = val - 1;
            }
            btn.innerHTML = val;
        }
        function increase(id){
            var btn = document.getElementById(id);
            var val = parseInt(btn.innerHTML);
            if(val < 60){
                val = val + 1;
            }
            btn.innerHTML = val;
        }

        function clockCounter(){
            draw();
            if(time > 0){
                time = time -1;
            }
            else{
                audio.play();

             clearInterval(interval);
            }
            var clock = document.getElementById('clock');
            clock.innerHTML = Math.floor(time/60)+":"+time%60;
        }

        function init(){
            var clock = document.getElementById('clock');
            var btnsession = document.getElementById('session');
            var btnbreak = document.getElementById('break');
            var valsession = parseInt(btnsession.innerHTML);
            var valbreak = parseInt(btnbreak.innerHTML);
            amountToIncrease = full/(valsession*60);
            console.log(amountToIncrease);
            console.log(full);
            console.log(valsession);
            time = 60*valsession;
            interval = setInterval(clockCounter, 1099);

        }

        draw();
        // Every second we'll fill more;
        //setInterval(draw, 1000);
