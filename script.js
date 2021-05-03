const particle1 = document.getElementById('particle1');
const particle2 = document.getElementById('particle2');
const particle3 = document.getElementById('particle3');
const particle4 = document.getElementById('particle4');
const particle5 = document.getElementById('particle5');
const particleClear = document.getElementById('particleClear');




function loadBlackWhiteRain() {

    try {
        cancelAnimationFrame(globalID);
        ctx.clearRect(0, 0, canvas.width, canvas.height);  
    } catch (error) {
        
    }


    
    const myImage1 = new Image();
    myImage1.src = './cyberpunk.png'


    myImage1.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 706;
    ctx.drawImage(myImage1, 0, 0, canvas.width, canvas.height);

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let particlesArray = [];
    const numberOfParticles = 10000;

    let mappedImage = [];

    for (let y = 0; y < canvas.height; y++) {
        let row = [];
        for ( let x = 0; x < canvas.width; x++) {
            const red = pixels.data[(y * 4 * canvas.width) + (x * 4)];
            const green = pixels.data[(y * 4 * canvas.width) + (x * 4 + 1)];
            const blue = pixels.data[(y * 4 * canvas.width) + (x * 4 + 2)];
            const brightness = calculateRelativeBrightness(red, green, blue);
            const cell = [
                cellBrightness = brightness,

            ];
            row.push(cell)
        }
        mappedImage.push(row);
    }

    function calculateRelativeBrightness(red, green, blue) {
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        )/100;
    }

    class Particle{
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 0.5 + 0.1;
            this.size = Math.random() * 1.5;
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);
        }
        update() {
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);

            this.speed = mappedImage[this.position1][this.position2][0];
            let movement = (2.5 - this.speed) + this.velocity;

            this.y += movement;
            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle);
        }
    }
    init();

    function animate() {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.5;
            particlesArray[i].draw();
        }

        globalID = requestAnimationFrame(animate);
    }
    animate();

    particleClear.addEventListener('click', () => {
        try {
            cancelAnimationFrame(globalID);
            ctx.clearRect(0, 0, 1000, 1000);        
        } catch (error) {
            
        }
    });
    
});
};

function loadColorStorm() {

    try {
    cancelAnimationFrame(globalID);
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    } catch (error) {
        
    }

    const myImage2 = new Image();
    myImage2.src = './image4.jpg';


    myImage2.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 533;
    ctx.drawImage(myImage2, 0, 0, canvas.width, canvas.height);

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let particlesArray = [];
    const numberOfParticles = 5000;

    let mappedImage = [];

    for (let y = 0; y < canvas.height; y++) {
        let row = [];
        for ( let x = 0; x < canvas.width; x++) {
            const red = pixels.data[(y * 4 * canvas.width) + (x * 4)];
            const green = pixels.data[(y * 4 * canvas.width) + (x * 4 + 1)];
            const blue = pixels.data[(y * 4 * canvas.width) + (x * 4 + 2)];
            const brightness = calculateRelativeBrightness(red, green, blue);
            const cell = [
                cellBrightness = brightness,
                cellColor = 'rgb(' + red + ',' + green + ',' + blue + ')'

            ];
            row.push(cell)
        }
        mappedImage.push(row);
    }

    function calculateRelativeBrightness(red, green, blue) {
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        )/100;
    }

    class Particle{
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 0.5 + 0.1;
            this.size = Math.random() * 1.5 + 1;
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);
        }
        update() {
            this.position1 = Math.floor(this.y);
            this.position2 = Math.floor(this.x);

            this.speed = mappedImage[this.position1][this.position2][0];
            let movement = (2.5 - this.speed) + this.velocity;

            this.y += movement;
            this.x += movement;
            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            if (this.x >= canvas.width) {
                this.x = 0;
                this.y = Math.random() * canvas.height;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.fillStyle = mappedImage[this.position1][this.position2][1];
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle);
        }
    }
    init();

    function animate() {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.5;
            particlesArray[i].draw();
        }

        globalID = requestAnimationFrame(animate);
    }
    animate();

    particleClear.addEventListener('click', () => {
        try {
            cancelAnimationFrame(globalID);
            ctx.clearRect(0, 0, 1000, 1000);        
        } catch (error) {
            
        }
    });
    
});}

function loadFireStorm() {

    try {
        cancelAnimationFrame(globalID);
        ctx.clearRect(0, 0, canvas.width, canvas.height);  
    } catch (error) {
        
    }

    const myImage3 = new Image();
    myImage3.src = './image6.png';

    myImage3.addEventListener('load', function(){
        const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 706;
        const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient1.addColorStop(0.2, 'pink');
        gradient1.addColorStop(0.3, 'red');
        gradient1.addColorStop(0.4, 'orange');
        gradient1.addColorStop(0.5, 'yellow');
        gradient1.addColorStop(0.6, 'green');
        gradient1.addColorStop(0.7, 'turquoise');
        gradient1.addColorStop(0.8, 'violet');
    
        const letters = ['M', 'A', 'N'];
        let switcher = 1;
        let counter = 0;
        setInterval(function(){
            counter++;
            if (counter % 12 === 0){
                switcher *= -1;
            }
        }, 500);
    
        ctx.drawImage(myImage3, 0, 0, canvas.width, canvas.height);
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        let particlesArray = [];
        const numberOfParticles = 3000;
    
        let mappedImage = [];
        for (let y = 0; y < canvas.height; y++){
            let row = [];
            for (let x = 0; x < canvas.width; x++){
                const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
                const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
                const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)];
                const brightness = calculateRelativeBrightness(red, green, blue);
                const cell = [
                    cellBrightness = brightness,
                    cellColor = 'rgb(' + red + ',' + green + ',' + blue + ')'
                ];
                row.push(cell);
            }
            mappedImage.push(row);
        }
    
        function calculateRelativeBrightness(red, green, blue){
            return Math.sqrt(
                (red * red) * 0.299 +
                (green * green) * 0.587 +
                (blue * blue) * 0.114
            )/100;
        }
    
        class Particle {
            constructor(){
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.speed = 0;
                this.velocity = Math.random() * 0.5;
                this.size = Math.random() * 2.5 + 0.2;
                this.position1 = Math.floor(this.y);
                this.position2 = Math.floor(this.x);
                this.angle = 0;
                this.letter = letters[Math.floor(Math.random() * letters.length)];
                this.random = Math.random();
            }
            update(){
                this.position1 = Math.floor(this.y);
                this.position2 = Math.floor(this.x);
                if ((mappedImage[this.position1])&&(mappedImage[this.position1][this.position2])){
                    this.speed = mappedImage[this.position1][this.position2][0];
                }
                let movement = (2.5 - this.speed) + this.velocity;
                this.angle += this.speed/20;
                this.size = this.speed * 2.5;
                
                // if (switcher === 1){
                //     ctx.globalCompositeOperation = 'luminosity';
                // } else {
                //     ctx.globalCompositeOperation = 'soft-light';
                // }
                // if (counter % 22 === 0){
                //     this.x = Math.random() * canvas.width;
                //     this.y = 0;
                // }
    
                this.y -= movement;
                this.x += movement + Math.sin(this.angle) * 2;
                if (this.y <= 0){
                    this.y = canvas.height;
                    this.x = Math.random() * canvas.width;
                }
                if (this.x >= canvas.width){
                    this.x = 0;
                    this.y = Math.random() * canvas.height;
                }
            }
            draw(){
                ctx.beginPath();
                if ((mappedImage[this.position1])&&(mappedImage[this.position1][this.position2])){
                    ctx.fillStyle = mappedImage[this.position1][this.position2][1];
                    ctx.strokeStyle = mappedImage[this.position1][this.position2][1];
                }
                //ctx.fillStyle = gradient1;
                //ctx.strokeRect(this.x, this.y, this.size * 3, this.size * 3);
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        function init(){
            for (let i = 0; i < numberOfParticles; i++){
                particlesArray.push(new Particle);
            }
        }
        init();
        function animate(){
            ctx.globalAlpha = 0.05;
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 0.2;
            for (let i = 0; i < particlesArray.length; i++){
                particlesArray[i].update();
                //ctx.globalAlpha = particlesArray[i].speed * 0.3;
                ctx.globalAlpha = 1;
                particlesArray[i].draw();
            }
            globalID = requestAnimationFrame(animate);
        }
        animate();

        particleClear.addEventListener('click', () => {
            try {
                cancelAnimationFrame(globalID);
                ctx.clearRect(0, 0, 1000, 1000);        
            } catch (error) {
                
            }
        });
        
    
    });


}

function textParticles() {

    try {
        cancelAnimationFrame(globalID);
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        } catch (error) {
            
        }    
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 300;
    let particleArray = [];
    let adjustX = 1;
    let adjustY = -15;
    
    const mouse = {
        x: null,
        y: null,
        radius: 150
    }
    const rect = canvas.getBoundingClientRect();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x - rect.left;
        mouse.y = e.y - rect.top;
    });

    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.font = '22px Verdana';
    ctx.fillText('Welcome!', 0, 40);
    // ctx.strokeStyle = 'white';
    // ctx.strokeRect(0, 0, 100, 100);
    const textCoordinates = ctx.getImageData(0, 0, 100, 100);

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 3;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 40) + 5;
        }
        draw() {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.hypot(dx, dy);
            let forceDirectionX = dx/distance;
            let forceDirectionY = dy/distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx/10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy/10;
                }
            }

        }
    }

    // function init() {
    //     particleArray = [];
    //     for (let i = 0; i < 500; i++) {
    //         let x = Math.random() * canvas.width;
    //         let y = Math.random() * canvas.height;
    //         particleArray.push(new Particle(x, y));
    //     }
    // }

    function init() {
        particleArray = [];
        for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
            for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
                if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                    let positionX = x + adjustX;
                    let positionY = y + adjustY;
                    particleArray.push(new Particle(positionX * 10, positionY * 10));
                }
            }

        }
    }
    init();

    function animate () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].draw();
            particleArray[i].update();
        }
        connect();
        globalID = requestAnimationFrame(animate);
    }
    animate();

    function connect() {
        let opacityValue = 1;
        for(let a = 0; a < particleArray.length; a++) {
            for(let b = a; b < particleArray.length; b++) {
                let dx = particleArray[a].x - particleArray[b].x;
                let dy = particleArray[a].y - particleArray[b].y;
                let distance = Math.hypot(dx, dy);

                if (distance < 35) {
                    opacityValue = 1 - (distance/35)
                    ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(particleArray[a].x, particleArray[a].y);
                    ctx.lineTo(particleArray[b].x, particleArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    particleClear.addEventListener('click', () => {
        try {
            cancelAnimationFrame(globalID);
            ctx.clearRect(0, 0, 1000, 1000);        
        } catch (error) {
            
        }
    });

}

function colorTrail() {
    try {
        cancelAnimationFrame(globalID);
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    } catch (error) {
            
    } 
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 700;
    const particlesArray = [];
    let hue = 0;
    let frame = 0;

    const mouse = {
        x: undefined,
        y: undefined,
    }
    const rect = canvas.getBoundingClientRect();

    window.addEventListener('mousemove', function(event){
        mouse.x = event.x - rect.left;;
        mouse.y = event.y - rect.top;;
        hue+=2;
        if (frame % 2 === 0){
        for (let i = 0; i < 7; i++){
            particlesArray.push(new Particle());
        }
        }
    });

    class Particle {
        constructor(){
            this.x = mouse.x;
            this.y = mouse.y;
            this.size = Math.random() * 15 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = 'hsl(' + hue + ', 100%, 50%)';
        }
        update(){
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }
        draw(){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function handleParticles(){
        for (let i = 0; i < particlesArray.length; i++){
            for (let j = i; j < particlesArray.length; j++){
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100){
                    ctx.beginPath();
                    ctx.strokeStyle = particlesArray[i].color;
                    ctx.lineWidth = 0.2;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
            particlesArray[i].update();
            particlesArray[i].draw();
        
            if (particlesArray[i].size <= 0.3){
                particlesArray.splice(i, 1);
                console.log(particlesArray.length);
                i--;
            }
        }
    }

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.fillStyle = 'rgba(0,0,0,0.02)';
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        frame++;
        globalID = requestAnimationFrame(animate);
    }
    animate();

    particleClear.addEventListener('click', () => {
        try {
            cancelAnimationFrame(globalID);
            ctx.clearRect(0, 0, 1000, 1000);        
        } catch (error) {
            
        }
    });

}


    
    
particle1.addEventListener('click', () => {
    loadBlackWhiteRain();
});

particle2.addEventListener('click', () => {
    loadColorStorm();
});

particle3.addEventListener('click', () => {
    loadFireStorm();
});

particle4.addEventListener('click', () => {
    textParticles();
});

particle5.addEventListener('click', () => {
    colorTrail();
});

textParticles();


