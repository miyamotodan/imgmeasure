document.getElementById('upload').addEventListener('change', loadImage);
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let img = new Image(); // Carichiamo l'immagine come oggetto Image
let points = [];
let segments = [];
let selectedSegment = null;
let isDragging = false;

function loadImage(event) {
    const file = event.target.files[0];
    img.src = URL.createObjectURL(file);

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        segments = [];
        points = [];
        selectedSegment = null;
        drawCanvas(); // Chiamiamo drawCanvas solo dopo il caricamento dell'immagine
    };
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    
    if (selectSegment(x, y)) {
        drawCanvas();
        return;
    }
    
    points.push({ x, y });
    if (points.length === 2) {
        const segment = { start: points[0], end: points[1] };
        segments.push(segment);
        drawCanvas();
        points = [];
    }
});

function drawCanvas() {
    if (img.complete) {  // Verifica che l'immagine sia completamente carica
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Svuota il canvas
        ctx.drawImage(img, 0, 0); // Ridisegna l'immagine di sfondo
    } else {
        console.warn("Immagine non completamente caricata");
    }
    segments.forEach(segment => drawSegment(segment)); // Disegna i segmenti attuali
}

function drawSegment(segment) {
    ctx.strokeStyle = segment === selectedSegment ? 'blue' : 'red';
    ctx.beginPath();
    ctx.moveTo(segment.start.x, segment.start.y);
    ctx.lineTo(segment.end.x, segment.end.y);
    ctx.stroke();

    if (segment === selectedSegment) {
        const distance = calculateDistance(segment.start, segment.end);
        ctx.fillStyle = 'black';
        const poslabel = movedMidPoint(segment, 10);
        ctx.fillRect(poslabel.x-10,poslabel.y-12,70,15);
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.fillText(`${distance}`, poslabel.x, poslabel.y);
    }
}


function movedMidPoint(segment, d) {
    // Calcolo del punto medio
    const xMid = (segment.start.x + segment.end.x) / 2;
    const yMid = (segment.start.y + segment.end.y) / 2;
  
    // Calcolo del vettore direttore
    const dx = segment.end.x - segment.start.x;
    const dy = segment.end.y - segment.start.y;
  
    // Calcolo del vettore perpendicolare normalizzato
    const length = Math.sqrt(dx * dx + dy * dy);
    const nx = dy / length;
    const ny = -dx / length;
  
    // Calcolo del punto spostato
    const xSpostato = xMid + d * nx;
    const ySpostato = yMid + d * ny;
  
    return { x: xSpostato, y: ySpostato };
  }

// Funzione per calcolare la distanza con la scala
function calculateDistance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    const pixelDistance = Math.sqrt(dx * dx + dy * dy);
    
    const scale = parseFloat(document.getElementById('scale').value) || 1; // Legge il valore di scala
    const scaledDistance = pixelDistance / scale; // Applica la scala

    return scaledDistance.toFixed(2); // Restituisce la distanza scalata
}


function selectSegment(x, y) {
    selectedSegment = null;
    segments.forEach(segment => {
        if (isNearSegment(x, y, segment)) {
            selectedSegment = segment;
            points = [];
    
            const real = parseFloat(document.getElementById('real').value) || 1; // lunghezza reale
            const distance = calculateDistance(segment.start, segment.end);
            document.getElementById('realsel').value = (distance*real).toFixed(2);
        }
    });
    return selectedSegment !== null;
}

function isNearSegment(x, y, segment, maxDistance = 3) {
    // Calcolo dei vettori
    const v1 = { x: segment.end.x - segment.start.x, y: segment.end.y - segment.start.y };
    const v2 = { x: x - segment.start.x, y: y - segment.start.y };

    // Prodotto scalare
    const dot = v1.x * v2.x + v1.y * v2.y;

    // Modulo quadrato di v1
    const lenSq = v1.x * v1.x + v1.y * v1.y;

    // Parametro t per la proiezione
    let t = dot / lenSq;

    // Limitazione di t tra 0 e 1 per assicurarsi che la proiezione sia sul segmento
    t = Math.max(0, Math.min(1, t));

    // Punto di proiezione
    const projection = {
        x: segment.start.x + t * v1.x,
        y: segment.start.y + t * v1.y
    };

    // Distanza tra il punto e la proiezione
    const distanceSq = Math.pow(x - projection.x, 2) + Math.pow(y - projection.y, 2);

    return Math.sqrt(distanceSq) < maxDistance;
}

canvas.addEventListener('mousedown', function(event) {
    if (selectedSegment) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        selectedSegment.offsetStartX = x - selectedSegment.start.x;
        selectedSegment.offsetStartY = y - selectedSegment.start.y;
        selectedSegment.offsetEndX = x - selectedSegment.end.x;
        selectedSegment.offsetEndY = y - selectedSegment.end.y;
        isDragging = true;
        canvas.addEventListener('mousemove', moveSegment);
    }
});

canvas.addEventListener('mouseup', function() {
    isDragging = false;
    canvas.removeEventListener('mousemove', moveSegment);
});

function moveSegment(event) {
    if (!isDragging || !selectedSegment) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    selectedSegment.start.x = x - selectedSegment.offsetStartX;
    selectedSegment.start.y = y - selectedSegment.offsetStartY;
    selectedSegment.end.x = x - selectedSegment.offsetEndX;
    selectedSegment.end.y = y - selectedSegment.offsetEndY;

    drawCanvas();
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('delete').addEventListener('click', function() {
        //console.log('Bottone delete cliccato'); // Debug per verificare il click
        if (selectedSegment) {
            console.log('Prima della rimozione:', segments); // Debug
            segments = segments.filter(segment => segment !== selectedSegment);
            console.log('Dopo la rimozione:', segments); // Debug
            selectedSegment = null;
            drawCanvas(); // Ridisegna il canvas senza il segmento eliminato
        }
    });

    document.getElementById('deleteall').addEventListener('click', function() {
        segments=[];
        drawCanvas();     
    });

});


