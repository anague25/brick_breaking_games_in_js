const canvas = document.querySelector('canvas');
const affichageScore = document.querySelector(".score");
const ctx = canvas.getContext('2d');
const rayonBalle = 10, barreheight = 10, barrewidth = 75, 
nbCol = 8,nbRow = 5, largeurBrique = 75, hauteurBrique = 20;

let x = canvas.width/2, y = canvas.height-30, barreX = (canvas.width-75)/2, fin = false, vitesseX = 5,
vitesseY = -5 ;

let score = 0;

// - barrewidth
// -barreheight
function dessineBallle(){
    ctx.beginPath();
    ctx.arc(x,y,rayonBalle,0,Math.PI*2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

function dessineBallles(){
    ctx.beginPath();
    ctx.arc(x,y,rayonBalle,0,Math.PI*2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// dessineBallle();

function dessineBarre(){
    ctx.beginPath();
    ctx.rect(barreX,440,barrewidth,barreheight);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
}

// dessineBarre();


//tableau avec les briques

const briques = [];

for(let i=0 ;i < nbRow;i++){
    briques[i] = [];

    for( let j=0 ; j< nbCol;j++){
        briques[i][j] = {x:0, y:0, status:1};
    }
}

function dessineBriques(){
    for(let i = 0; i<nbRow;i++){
        for(let j=0;j<nbCol;j++){
            if(briques[i][j].status === 1){
                let briqueX = (j*(largeurBrique+10)+35);
                let briqueY = (i*(hauteurBrique+10)+30);

                briques[i][j].x = briqueX;
                briques[i][j].y = briqueY;
                
                ctx.beginPath();
                ctx.rect(briqueX,briqueY,largeurBrique,hauteurBrique);
                ctx.fillStyle="#333";
                ctx.fill();
                ctx.closePath;
            }
            
        }
    }
}

// dessineBriques();
console.log(briques);


function dessine(){

    if(fin === false){
        
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dessineBriques();
    dessineBallle();
    dessineBarre();
    collisionBbriques();

    if(x + vitesseX > canvas.width - rayonBalle || x + vitesseX < rayonBalle ){
        vitesseX=  -vitesseX;
    }
    if(y + vitesseY < rayonBalle ){
        vitesseY= -vitesseY;
    }

    if(y + vitesseY > canvas.height - rayonBalle){
        if(x > barreX && x < barreX+barrewidth){
            vitesseX = vitesseX+0.1;
            vitesseY = vitesseY+0.1;
            vitesseY = -vitesseY;
        }else{
            fin = true;
            affichageScore.innerHTML = `Perdu! <br> cliquer sur le Casse-Brique pour recommencer.`;
        }
    
    }
    



    x += vitesseX;
    y += vitesseY;

    requestAnimationFrame(dessine);
    }
}
dessine();




//deplacer la barre par rapport a la souris

document.addEventListener("mousemove",mouvementSouris);

function mouvementSouris(e){
    let posXBarreCanvas = e.clientX - canvas.offsetLeft;
    console.log(posXBarreCanvas);

    if(posXBarreCanvas > 25 && posXBarreCanvas < canvas.width - 25){
        barreX = posXBarreCanvas - (barrewidth/2) ;
    }

}


// detruire les briques

function collisionBbriques(){
 
for(let i = 0; i< nbRow; i++){
    for(let j = 0; j < nbCol; j++){
        let b = briques[i][j];
        if(b.status === 1){
            if(x > b.x && x < b.x + largeurBrique && y > b.y && y < b.y + hauteurBrique){
                vitesseY = -vitesseY;
                b.status = 0;

                score++;

                affichageScore.innerHTML = `Score : ${score}`;

                if(score === nbRow*nbCol){
                    setTimeout(message,1000);
                    function message(){
                    affichageScore.innerHTML = `GAGNER <BR> Bravo vous avez terminez le jeu , cliquer sur le casse brique pour recommencer.`;
                    fin = true;
                    }
                }
            }
        }
    }
}

   
}


//recommencer le jeu 

canvas.addEventListener('click',()=>{
    if(fin === true){
        fin = false;
        document.location.reload();
    }
})







