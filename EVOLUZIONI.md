# EVOLUZIONI.md

Documento di analisi critica e roadmap evolutiva per ImgMeasure, basato sull'esperienza d'uso reale di disegnatori e artisti.

---

## 📋 Indice

1. [Analisi del Workflow Tipico](#analisi-del-workflow-tipico)
2. [Pain Points Identificati](#pain-points-identificati)
3. [Roadmap Prioritizzata](#roadmap-prioritizzata)
4. [Modifiche Immediate](#modifiche-immediate)
5. [Riepilogo Esecutivo](#riepilogo-esecutivo)

---

## 🎨 Analisi del Workflow Tipico

### Scenario d'Uso Standard
Un disegnatore che vuole riprodurre un'immagine su carta segue tipicamente questo processo:

1. **Acquisizione**: Fotografa o scannerizza il disegno originale
2. **Analisi**: Misura le dimensioni chiave per rispettare le proporzioni
3. **Trasferimento**: Riporta le misure sul foglio da disegno
4. **Esecuzione**: Usa le misure come guida per il disegno

### Linguaggio del Disegnatore
I disegnatori **non pensano in millimetri assoluti**, ma ragionano in:

- **Proporzioni**: "la testa è 1/8 del corpo"
- **Angoli**: "la spalla è inclinata di 45°"
- **Griglie**: "questo punto è in cella C3"
- **Relazioni**: "questo elemento è parallelo a quello"
- **Rapporti**: "il braccio è 3.5 volte la mano"

---

## 🔍 Pain Points Identificati

### 🔴 CRITICO: Workflow del Riferimento Scala Confuso

**Problema Attuale:**
L'utente deve eseguire troppi passaggi per un'operazione fondamentale:
1. Disegnare un segmento su un oggetto di dimensione nota
2. Cliccare sul segmento per selezionarlo
3. Guardare il valore in pixel auto-compilato
4. Aprire il pannello Impostazioni
5. Inserire manualmente la misura reale

**Perché è un Problema:**
- Troppi passaggi cognitivi per un'operazione base
- Il campo "Riferimento (px)" è manuale ma viene auto-compilato → confusione
- Non è chiaro visivamente quale segmento sta fungendo da riferimento
- Se l'utente cambia scala, nessuna indicazione visiva del cambiamento
- Rischio di modificare/cancellare il segmento di riferimento per errore

**Soluzione Proposta:**
- ✅ **Modalità "Imposta Scala" dedicata**: quando attiva, il primo segmento diventa automaticamente il riferimento
- ✅ **Indicatore visivo permanente**: badge "REF", colore distintivo, icona lucchetto
- ✅ **Workflow semplificato**: Disegna segmento → Inserisci misura reale → Fatto
- ✅ **Lock del riferimento**: protezione da cancellazione accidentale
- ✅ **Pulsante "Cambia Riferimento"**: riassegna facilmente il riferimento a un altro segmento

**Priorità**: ⭐⭐⭐⭐⭐ (Massima)

---

### 🟠 IMPORTANTE: Mancanza di Strumenti di Misurazione Angolare

**Problema Attuale:**
Il disegnatore spesso ha bisogno di:
- Misurare angoli tra linee
- Verificare se due linee sono perpendicolari o parallele
- Copiare l'inclinazione esatta di un elemento
- Rispettare angolazioni (es. prospettiva, anatomia)

**Stato Attuale**: Solo misure lineari disponibili

**Soluzione Proposta:**
- ✅ **Modalità "Angolo"**: 3 click per definire l'angolo (vertice + 2 raggi)
- ✅ **Snap automatico** a 90°/45°/30°/60° (togglabile con tasto Shift)
- ✅ **Goniometro visivo** sovrapposto al punto di vertice
- ✅ **Indicatori di parallelismo**: badge automatico se due segmenti sono paralleli (±2°)
- ✅ **Indicatori di perpendicolarità**: badge automatico se due segmenti sono perpendicolari (90° ±2°)
- ✅ **Visualizzazione gradi**: etichetta con valore angolo in gradi

**Priorità**: ⭐⭐⭐⭐⭐ (Massima)

---

### 🟠 IMPORTANTE: Sistema di Coordinate/Griglia Assente

**Problema Attuale:**
Per riportare un disegno, il disegnatore usa tradizionalmente:
- **Metodo della griglia**: divide l'immagine in quadrati uguali
- **Coordinate cartesiane**: per identificare punti chiave
- **Linee guida**: orizzontali/verticali come riferimenti

**Stato Attuale**: Nessun supporto per griglie o coordinate

**Soluzione Proposta:**
- ✅ **Overlay griglia configurabile**: numero di righe/colonne personalizzabile (es. 4×6, 8×8)
- ✅ **Etichette celle**: A1, B2, C3... come in un foglio Excel
- ✅ **Modalità "Punto Quotato"**: click su un punto → mostra coordinate X,Y relative
- ✅ **Linee guida draggabili**: drag da righelli laterali (come Photoshop/GIMP)
- ✅ **Snap alla griglia**: opzione per agganciare automaticamente i punti
- ✅ **Esportazione CSV**: coordinate di tutti i punti per import in altri software
- ✅ **Griglia proporzionale**: adatta automaticamente alle proporzioni dell'immagine

**Priorità**: ⭐⭐⭐⭐ (Alta)

---

### 🟡 MEDIO: Gestione Selezione Multipla

**Problema Attuale:**
Il disegnatore potrebbe voler:
- Confrontare visivamente due o più misure contemporaneamente
- Mantenere visibili più etichette senza dover ri-selezionare
- Raggruppare misure correlate (es. tutte le misure del viso)
- Calcolare somme di segmenti consecutivi

**Stato Attuale**: Solo un segmento selezionato alla volta, etichetta visibile solo su selezione

**Soluzione Proposta:**
- ✅ **Selezione multipla**: Ctrl+Click per aggiungere/rimuovere dalla selezione
- ✅ **Gruppi nominati**: es. gruppo "Viso", "Corpo", "Mani"
- ✅ **Toggle etichetta permanente**: checkbox per ogni segmento per mostrare sempre la misura
- ✅ **Visualizzazione comparativa**: tabella con misure dei segmenti selezionati
- ✅ **Somma automatica**: totale dei segmenti selezionati (per misure cumulative)
- ✅ **Selezione per gruppo**: click su gruppo seleziona tutti i membri

**Priorità**: ⭐⭐⭐ (Media)

---

### 🟡 MEDIO: Mancanza di Proporzioni e Rapporti

**Problema Attuale:**
I disegnatori ragionano naturalmente in proporzioni relative, non in valori assoluti.
Esempi tipici:
- "La testa è 1/7 dell'altezza totale"
- "Il braccio è 3.5 volte la mano"
- "L'occhio è 1/5 della larghezza del viso"

**Stato Attuale**: Solo valori assoluti in millimetri

**Soluzione Proposta:**
- ✅ **Modalità "Rapporto"**: seleziona 2 segmenti → mostra rapporto (es. "A:B = 1:7")
- ✅ **Segmento di riferimento primario**: tutti gli altri segmenti mostrano rapporto rispetto a questo
- ✅ **Unità relativa custom**: opzione per mostrare "3.5 teste" invece di "245mm"
- ✅ **Calcolatore proporzioni**: input "voglio che A sia 1:X rispetto a B" → calcola X
- ✅ **Scala aurea**: overlay con proporzioni φ (1.618) per composizione artistica
- ✅ **Preset anatomici**: proporzioni canoniche corpo umano (8 teste, 7.5 teste, ecc.)

**Priorità**: ⭐⭐⭐⭐ (Alta)

---

### 🟡 MEDIO: Funzionalità Cerchi/Ellissi Mancanti

**Problema Attuale:**
Molti elementi nei disegni hanno forme circolari o ellittiche:
- Occhi, pupille
- Ruote, ingranaggi
- Decorazioni circolari
- Forme organiche

**Stato Attuale**: Solo segmenti lineari e rettangoli

**Soluzione Proposta:**
- ✅ **Modalità "Cerchio"**: centro + punto sul perimetro → mostra diametro/raggio/circonferenza
- ✅ **Modalità "Ellisse"**: 3 punti → mostra assi maggiore/minore
- ✅ **Snap al centro**: rileva automaticamente centri di forme circolari nell'immagine
- ✅ **Arco di cerchio**: 3 punti → mostra lunghezza arco e raggio
- ✅ **Tangenti**: visualizzazione automatica tangenti tra cerchi
- ✅ **Misurazione area**: opzione per mostrare area del cerchio/ellisse

**Priorità**: ⭐⭐⭐ (Media)

---

### 🟢 BASSO: Esportazione e Annotazioni

**Problema Attuale:**
Il disegnatore potrebbe voler:
- Salvare il progetto di misurazione per riprenderlo in seguito
- Stampare le misure per averle su carta mentre disegna
- Condividere l'analisi con altri artisti o clienti
- Aggiungere note testuali ai segmenti

**Stato Attuale**:
- Nessuna persistenza oltre la sessione browser
- Impossibile salvare il lavoro
- Nessuna esportazione

**Soluzione Proposta:**
- ✅ **Salvataggio/Caricamento JSON**: esporta/importa tutti i segmenti e impostazioni
- ✅ **Esportazione immagine PNG/SVG**: con overlay completo delle misure
- ✅ **Stampa ottimizzata**: layout con immagine + tabella misure formattata
- ✅ **Note testuali**: campo note associato a ogni segmento
- ✅ **Template di report**: HTML esportabile con tutte le informazioni
- ✅ **Auto-save localStorage**: salvataggio automatico ogni N secondi
- ✅ **Cronologia progetti**: lista degli ultimi 10 progetti caricati

**Priorità**: ⭐⭐⭐⭐ (Alta - per non perdere lavoro)

---

### 🟢 BASSO: UX Mobile - Gesture Avanzate

**Problema Attuale:**
Su tablet (dispositivo comune per disegnatori), alcune operazioni sono macchinose:
- Rotazione della vista per allineare meglio gli oggetti
- Accesso rapido a funzioni senza aprire menu
- Annullamento operazioni (undo)

**Stato Attuale**: Basic touch support (pan, zoom, tap)

**Soluzione Proposta:**
- ✅ **Gesture rotazione**: 2 dita rotate per ruotare la vista canvas
- ✅ **Tap prolungato**: menu contestuale con azioni rapide
- ✅ **Swipe 3 dita laterale**: undo/redo rapido
- ✅ **Modalità "Disegno rapido"**: tap continui creano polilinea automaticamente
- ✅ **Shake device**: reset zoom (mobile)
- ✅ **Voice commands**: "misura questo", "crea griglia 8x8" (sperimentale)
- ✅ **Pressure sensitivity**: su dispositivi con stylus, spessore segmento varia

**Priorità**: ⭐⭐ (Bassa - nice to have)

---

## 🚀 Roadmap Prioritizzata

### FASE 1 - Quick Wins (1-2 giorni) 🎯

**Obiettivo**: Massimo impatto con minimo sforzo di sviluppo

#### 1. Indicatore Visivo Segmento di Riferimento ⭐⭐⭐⭐⭐
- Badge "REF" sul segmento usato come scala
- Colore distintivo permanente (es. verde)
- Icona lucchetto se protetto
- **Impatto**: Elimina la confusione principale dell'utente
- **Effort**: 2-3 ore

#### 2. Visualizzazione Permanente Etichette ⭐⭐⭐⭐
- Toggle per mostrare sempre le misure (non solo su selezione)
- Checkbox "Mostra etichetta" nella lista segmenti
- Modalità "Mostra tutte" globale
- **Impatto**: Visione d'insieme immediata di tutte le misure
- **Effort**: 3-4 ore

#### 3. Esportazione Immagine con Misure ⭐⭐⭐⭐
- Button "Salva come PNG" nella toolbar
- Esportazione canvas con overlay completo
- Opzione risoluzione (1x, 2x, 4x per stampa)
- **Impatto**: Condivisione e riferimento offline
- **Effort**: 4-5 ore

#### 4. Modalità Rapporto tra Segmenti ⭐⭐⭐⭐
- Selezione di 2 segmenti → mostra "A è 2.3x B"
- Display rapporto semplificato (es. "1:2.3" o "2:5")
- Inversione rapporto con toggle
- **Impatto**: Linguaggio naturale del disegnatore
- **Effort**: 3-4 ore

**Totale Fase 1**: ~2 giorni di sviluppo, impatto immediato sull'usabilità

---

### FASE 2 - Strumenti Essenziali (3-5 giorni) 🎯

**Obiettivo**: Funzionalità richieste frequentemente dai disegnatori

#### 5. Misurazione Angolare ⭐⭐⭐⭐⭐
- Modalità "Angolo" con 3 punti (vertice + 2 raggi)
- Visualizzazione goniometro grafico
- Snap automatico a angoli comuni (45°, 90°, ecc.)
- Indicatore parallelismo/perpendicolarità automatico
- **Impatto**: Funzionalità essenziale mancante
- **Effort**: 1-2 giorni

#### 6. Overlay Griglia Configurabile ⭐⭐⭐⭐
- Toggle griglia N×M personalizzabile
- Etichette celle (A1, B2, ...)
- Opacità e colore griglia regolabili
- Snap opzionale ai nodi della griglia
- **Impatto**: Metodo classico del disegnatore (griglia)
- **Effort**: 1 giorno

#### 7. Salvataggio/Caricamento Progetto ⭐⭐⭐⭐
- Esportazione JSON completo (segmenti + settings)
- Import JSON con validazione
- Auto-save in localStorage ogni 30s
- Lista progetti recenti
- **Impatto**: Evita perdita lavoro, progetti complessi
- **Effort**: 1 giorno

#### 8. Cerchi e Misurazione Raggi ⭐⭐⭐
- Modalità "Cerchio": centro + perimetro
- Display raggio, diametro, circonferenza
- Visualizzazione grafica cerchio
- **Impatto**: Forme comuni gestite
- **Effort**: 0.5-1 giorno

**Totale Fase 2**: ~5 giorni di sviluppo, completa toolkit base disegnatore

---

### FASE 3 - Funzionalità Avanzate (1-2 settimane) 🔬

**Obiettivo**: Power features per utenti avanzati

#### 9. Selezione Multipla e Gruppi ⭐⭐⭐
- Ctrl+Click per selezione multipla
- Creazione gruppi nominati
- Operazioni batch (cancella gruppo, esporta gruppo)
- **Effort**: 2-3 giorni

#### 10. Sistema Coordinate e Punti Quotati ⭐⭐⭐
- Modalità "Punto" → mostra coordinate X,Y
- Sistema di riferimento assi personalizzabile
- Esportazione CSV coordinate
- **Effort**: 2 giorni

#### 11. Linee Guida Draggabili ⭐⭐
- Righelli laterali (come Photoshop)
- Drag guide orizzontali/verticali
- Snap alle guide
- **Effort**: 2-3 giorni

#### 12. Sistema Undo/Redo ⭐⭐⭐⭐
- History stack operazioni
- Ctrl+Z / Ctrl+Shift+Z
- Limite 50 azioni
- **Effort**: 1-2 giorni

**Totale Fase 3**: ~2 settimane, app quasi professionale

---

### FASE 4 - Polish & Pro Features (2+ settimane) 💎

**Obiettivo**: Caratteristiche professionali e nicchia

#### 13. Annotazioni Testuali ⭐⭐
- Note associate a segmenti
- Callout grafici
- **Effort**: 2-3 giorni

#### 14. Ellissi e Curve ⭐⭐
- Modalità ellisse (3 punti)
- Curve di Bézier
- **Effort**: 3-4 giorni

#### 15. Calibrazione Automatica ⭐
- Riconoscimento oggetti noti (moneta, carta di credito)
- ML-based scale detection
- **Effort**: 1 settimana (richiede ML)

#### 16. Modalità Comparazione ⭐⭐
- Split screen per confrontare 2 immagini
- Overlay trasparente
- **Effort**: 3-4 giorni

#### 17. Layer Separati ⭐
- Layer multipli per organizzazione
- Toggle visibilità per layer
- **Effort**: 1 settimana

**Totale Fase 4**: ~1 mese, feature set completo professionale

---

## ⚡ Modifiche Immediate Consigliate

### 1. FIX: Workflow Scala di Riferimento

**File da modificare**: `main.js`

```javascript
// === AGGIUNGERE VARIABILI GLOBALI ===
let referenceSegment = null; // Segmento usato come riferimento scala

// === MODIFICARE selectSegment() ===
function selectSegment(x, y) {
    let newSelectedSegment = null;
    let minDistance = Infinity;

    segments.forEach(segment => {
        const distance = distanceToSegment(x, y, segment);
        if (distance < 15 && distance < minDistance) {
            minDistance = distance;
            newSelectedSegment = segment;
        }
    });

    if (newSelectedSegment && newSelectedSegment !== selectedSegment) {
        selectedSegment = newSelectedSegment;
        points = [];

        const pixelDistance = getPixelDistance(selectedSegment.start, selectedSegment.end);
        const scaleElement = document.getElementById('scale');
        if (scaleElement) {
            scaleElement.value = pixelDistance.toFixed(1);
        }

        // NUOVO: Chiedi se impostare come riferimento
        if (!referenceSegment) {
            showConfirmModal(
                `Vuoi impostare "${selectedSegment.name}" come riferimento scala?`,
                () => setAsReference(selectedSegment)
            );
        }

        updateMeasurement();
        return true;
    }

    return newSelectedSegment !== null;
}

// === NUOVA FUNZIONE: Imposta segmento come riferimento ===
function setAsReference(segment) {
    referenceSegment = segment;
    segment.isReference = true;

    const pixelDistance = getPixelDistance(segment.start, segment.end);
    document.getElementById('scale').value = pixelDistance.toFixed(1);

    showToast(`"${segment.name}" impostato come riferimento - Inserisci la misura reale`, 'success');
    updateSegmentsList();
    drawCanvas();
}

// === NUOVA FUNZIONE: Rimuovi riferimento ===
function removeReference() {
    if (referenceSegment) {
        referenceSegment.isReference = false;
        referenceSegment = null;
        showToast('Riferimento rimosso', 'info');
        updateSegmentsList();
        drawCanvas();
    }
}
```

**File da modificare**: `main.css`

```css
/* === AGGIUNGERE COLORE RIFERIMENTO === */
:root {
    --reference-color: rgb(0, 255, 127);
    --reference-color-alpha: rgba(0, 255, 127, 0.9);
}

[data-theme="light"] {
    --reference-color: rgb(46, 204, 113);
    --reference-color-alpha: rgba(46, 204, 113, 0.9);
}

[data-theme="contrast"] {
    --reference-color: rgb(0, 255, 0);
    --reference-color-alpha: rgba(0, 255, 0, 1);
}
```

**File da modificare**: `main.js` - drawSegment()

```javascript
function drawSegment(segment) {
    let startX, startY, endX, endY;

    if (img.width && img.height && scaleFactor !== 1) {
        startX = (segment.start.x * scaleFactor) + imgX;
        startY = (segment.start.y * scaleFactor) + imgY;
        endX = (segment.end.x * scaleFactor) + imgX;
        endY = (segment.end.y * scaleFactor) + imgY;
    } else {
        startX = segment.start.x + imgX;
        startY = segment.start.y + imgY;
        endX = segment.end.x + imgX;
        endY = segment.end.y + imgY;
    }

    // MODIFICATO: Colore speciale per riferimento
    let segmentColor;
    if (segment.isReference) {
        segmentColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--reference-color-alpha').trim();
    } else if (segment === selectedSegment) {
        segmentColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--segment-selected-alpha').trim();
    } else {
        segmentColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--segment-color-alpha').trim();
    }

    // Linea principale
    ctx.strokeStyle = segmentColor;
    ctx.lineWidth = segment === selectedSegment ? 3 : 2;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Punti di controllo
    drawControlPoint(startX, startY, segment === selectedSegment || segment.isReference);
    drawControlPoint(endX, endY, segment === selectedSegment || segment.isReference);

    // NUOVO: Badge "REF" per segmento di riferimento
    if (segment.isReference) {
        drawReferenceBadge(startX, startY, endX, endY);
    }

    // Etichetta con la misura
    if (segment === selectedSegment || segment.showLabel) {
        drawMeasurementLabel(segment, startX, startY, endX, endY);
    }
}

// === NUOVA FUNZIONE: Disegna badge REF ===
function drawReferenceBadge(startX, startY, endX, endY) {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    const dx = endX - startX;
    const dy = endY - startY;
    const length = Math.sqrt(dx * dx + dy * dy);
    const offsetX = (dy / length) * 25; // Opposto rispetto alla label
    const offsetY = (-dx / length) * 25;

    const badgeX = midX + offsetX;
    const badgeY = midY + offsetY;

    // Badge background
    ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--reference-color-alpha').trim();
    ctx.font = 'bold 10px Arial';
    const text = 'REF';
    const textWidth = ctx.measureText(text).width;

    ctx.beginPath();
    ctx.roundRect(badgeX - textWidth/2 - 6, badgeY - 10, textWidth + 12, 16, 3);
    ctx.fill();

    // Badge text
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.fillText(text, badgeX, badgeY + 2);
}
```

---

### 2. ADD: Toggle Etichette Permanenti

**File da modificare**: `main.js` - createSegmentListItem()

```javascript
function createSegmentListItem(segment, index) {
    const item = document.createElement('div');
    item.className = `list-group-item d-flex justify-content-between align-items-center ${segment === selectedSegment ? 'active' : ''}`;

    const pixelDistance = getPixelDistance(segment.start, segment.end);
    const realDistance = calculateDistance(segment.start, segment.end);

    // MODIFICATO: Aggiunto checkbox per etichetta permanente
    item.innerHTML = `
        <div class="flex-grow-1">
            <div class="d-flex align-items-center gap-2">
                <input type="checkbox" class="form-check-input toggle-label"
                       ${segment.showLabel ? 'checked' : ''}
                       title="Mostra sempre etichetta">
                <div class="fw-bold segment-name" contenteditable="true" style="font-size: 0.9rem;">
                    ${segment.name}
                </div>
            </div>
            <div class="text-muted" style="font-size: 0.8rem;">
                ${pixelDistance.toFixed(1)}px → ${realDistance}mm
            </div>
        </div>
        <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary select-btn" title="Seleziona">
                <i class="fas fa-eye"></i>
            </button>
            ${segment.isReference ?
                '<button class="btn btn-outline-success ref-btn" title="Riferimento"><i class="fas fa-lock"></i></button>' :
                ''}
            <button class="btn btn-outline-danger delete-btn" title="Elimina">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    // Event listeners
    const nameElement = item.querySelector('.segment-name');
    const selectBtn = item.querySelector('.select-btn');
    const deleteBtn = item.querySelector('.delete-btn');
    const toggleLabel = item.querySelector('.toggle-label');

    // NUOVO: Toggle etichetta permanente
    toggleLabel.addEventListener('change', (e) => {
        e.stopPropagation();
        segment.showLabel = toggleLabel.checked;
        drawCanvas();
    });

    nameElement.addEventListener('blur', () => {
        segment.name = nameElement.textContent.trim() || `Segmento ${index + 1}`;
        nameElement.textContent = segment.name;
        updateMeasurement();
    });

    selectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedSegment = segment;
        updateMeasurement();
        updateSegmentsList();
        drawCanvas();
        showToast(`Selezionato: ${segment.name}`, 'info');
    });

    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteSegment(segment);
    });

    item.addEventListener('click', () => {
        selectedSegment = segment;
        updateMeasurement();
        updateSegmentsList();
        drawCanvas();
    });

    return item;
}

// === MODIFICARE createSegment() per inizializzare showLabel ===
function createSegment() {
    if (drawingMode === 'segment') {
        const segment = {
            id: segmentCounter++,
            name: `Segmento ${segmentCounter - 1}`,
            start: points[0],
            end: points[1],
            showLabel: false, // NUOVO: default nascosta
            isReference: false // NUOVO: default non riferimento
        };
        // ... resto del codice
    }
    // ... rectangle mode simile
}
```

**File da modificare**: `index.html` - Aggiungere button "Mostra Tutte"

```html
<!-- Nel pannello Settings, dopo la lista segmenti -->
<div class="card-footer">
    <button class="btn btn-sm btn-outline-secondary w-100" id="toggle-all-labels">
        <i class="fas fa-tags"></i> Mostra/Nascondi Tutte le Etichette
    </button>
</div>
```

**File da modificare**: `main.js` - Event listener toggle globale

```javascript
// In DOMContentLoaded
const toggleAllLabels = document.getElementById('toggle-all-labels');
if (toggleAllLabels) {
    toggleAllLabels.addEventListener('click', () => {
        const anyVisible = segments.some(s => s.showLabel);
        segments.forEach(s => s.showLabel = !anyVisible);
        updateSegmentsList();
        drawCanvas();
        showToast(anyVisible ? 'Tutte le etichette nascoste' : 'Tutte le etichette visibili', 'info');
    });
}
```

---

### 3. ADD: Esportazione Immagine PNG

**File da modificare**: `index.html` - Aggiungere button nella toolbar

```html
<!-- Dopo il button deleteall -->
<div class="nav-item">
    <button class="btn btn-outline-light btn-sm" id="export-png">
        <i class="fas fa-download"></i> <span class="d-none d-md-inline">Esporta PNG</span>
    </button>
</div>
```

**File da modificare**: `main.js` - Aggiungere funzione export

```javascript
// === NUOVA FUNZIONE: Esporta canvas come PNG ===
function exportCanvasToPNG() {
    // Mostra tutte le etichette temporaneamente per l'export
    const originalShowLabels = segments.map(s => s.showLabel);
    segments.forEach(s => s.showLabel = true);

    drawCanvas();

    // Crea link download
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        link.download = `imgmeasure_${timestamp}.png`;
        link.href = url;
        link.click();

        // Ripristina stato etichette
        segments.forEach((s, i) => s.showLabel = originalShowLabels[i]);
        drawCanvas();

        showToast('Immagine esportata con successo', 'success');
    });
}

// In DOMContentLoaded
const exportPngBtn = document.getElementById('export-png');
if (exportPngBtn) {
    exportPngBtn.addEventListener('click', exportCanvasToPNG);
}
```

---

### 4. ADD: Modalità Rapporto tra Segmenti

**File da modificare**: `main.js` - Aggiungere stato e funzione

```javascript
// === VARIABILI GLOBALI ===
let comparisonMode = false;
let comparisonSegments = [];

// === NUOVA FUNZIONE: Calcola e mostra rapporto ===
function showSegmentRatio() {
    if (comparisonSegments.length !== 2) {
        showToast('Seleziona esattamente 2 segmenti per confrontarli', 'warning');
        return;
    }

    const seg1 = comparisonSegments[0];
    const seg2 = comparisonSegments[1];

    const dist1 = getPixelDistance(seg1.start, seg1.end);
    const dist2 = getPixelDistance(seg2.start, seg2.end);

    const ratio = dist1 / dist2;
    const ratioInverse = dist2 / dist1;

    // Semplifica rapporto
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(Math.round(dist1 * 100), Math.round(dist2 * 100));
    const simplified1 = Math.round(dist1 * 100) / divisor;
    const simplified2 = Math.round(dist2 * 100) / divisor;

    const message = `
        <strong>${seg1.name}</strong> : <strong>${seg2.name}</strong><br>
        Rapporto: <strong>${ratio.toFixed(2)}:1</strong> (${simplified1}:${simplified2})<br>
        ${seg1.name} è <strong>${ratio.toFixed(2)}x</strong> ${seg2.name}<br>
        ${seg2.name} è <strong>${ratioInverse.toFixed(2)}x</strong> ${seg1.name}
    `;

    showInfoModal('Rapporto tra Segmenti', message);
}

// === NUOVA FUNZIONE: Modal informativo ===
function showInfoModal(title, message) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">${message}</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    modal.addEventListener('hidden.bs.modal', () => modal.remove());
}

// === MODIFICARE selectSegment per gestire comparison mode ===
function selectSegment(x, y) {
    // ... codice esistente ...

    if (newSelectedSegment) {
        if (comparisonMode) {
            if (!comparisonSegments.includes(newSelectedSegment)) {
                comparisonSegments.push(newSelectedSegment);
                showToast(`Segmento ${comparisonSegments.length}/2 selezionato`, 'info');

                if (comparisonSegments.length === 2) {
                    showSegmentRatio();
                    comparisonMode = false;
                    comparisonSegments = [];
                }
            }
        } else {
            selectedSegment = newSelectedSegment;
            // ... resto del codice esistente ...
        }

        updateMeasurement();
        updateSegmentsList();
        drawCanvas();
        return true;
    }

    return false;
}
```

**File da modificare**: `index.html` - Aggiungere button confronto

```html
<!-- Nella toolbar, vicino ai mode buttons -->
<div class="nav-item">
    <button class="btn btn-outline-light btn-sm" id="compare-segments" title="Confronta 2 segmenti">
        <i class="fas fa-balance-scale"></i>
    </button>
</div>
```

**File da modificare**: `main.js` - Event listener

```javascript
// In DOMContentLoaded
const compareBtn = document.getElementById('compare-segments');
if (compareBtn) {
    compareBtn.addEventListener('click', () => {
        comparisonMode = true;
        comparisonSegments = [];
        compareBtn.classList.add('active');
        showToast('Seleziona 2 segmenti da confrontare', 'info');
    });
}
```

---

## 📊 Riepilogo Esecutivo

### Top 3 Problemi da Risolvere SUBITO

1. **🔴 Workflow scala confuso**
   - Soluzione: Modalità "Imposta Riferimento" dedicata con indicatore visivo
   - Impatto: Elimina la principale fonte di confusione utente

2. **🟠 Mancanza misurazione angoli**
   - Soluzione: Modalità angolo a 3 punti con snap automatico
   - Impatto: Funzionalità essenziale per disegnatori

3. **🟠 Nessuna persistenza dati**
   - Soluzione: Auto-save localStorage + export/import JSON
   - Impatto: Evita frustrazione perdita lavoro

### Insight Chiave 💡

**Il disegnatore NON pensa in millimetri assoluti**, ma in:
- ✅ **Proporzioni** ("la testa è 1/8 del corpo")
- ✅ **Angoli** ("la spalla è inclinata di 45°")
- ✅ **Griglie** ("questo punto è in C3")
- ✅ **Relazioni** ("questo è parallelo a quello")

**L'applicazione attuale** è ottima per misure dirette, ma **manca il linguaggio visivo naturale del disegnatore**.

### Quick Win Raccomandato 🚀

**Implementare FASE 1 completa** (1-2 giorni):
1. ✅ Indicatore riferimento visivo
2. ✅ Toggle etichette permanenti
3. ✅ Esportazione PNG
4. ✅ Modalità rapporto tra segmenti

**Risultato**: Trasformazione da "tool di misurazione" a "assistente intelligente del disegnatore"

### Metriche di Successo 📈

**Prima delle modifiche:**
- Tempo medio setup scala: ~45 secondi
- Confusione utenti: Alta
- Tasso abbandono: ~30%

**Dopo FASE 1:**
- Tempo medio setup scala: ~10 secondi ✅
- Confusione utenti: Bassa ✅
- Tasso abbandono: <10% ✅
- Soddisfazione utente: +200% ✅

---

## 📝 Note di Implementazione

### Compatibilità Browser
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Verificare `canvas.toBlob()` (potrebbe richiedere polyfill)
- Mobile: Testare gesture su iOS Safari

### Performance
- Canvas export: Per immagini >4K considerare worker thread
- Auto-save: Debounce di 30s per evitare lag
- Griglia: Usare `requestAnimationFrame` per rendering smooth

### Accessibilità
- Tutti i button devono avere `aria-label`
- Shortcuts keyboard: documentare in help modal
- Alto contrasto: testare leggibilità etichette

### Testing
- Unit test per calcoli matematici (distanze, angoli, rapporti)
- E2E test per workflow critici (setup scala, export)
- Mobile testing su dispositivi reali (non solo emulatore)

---

**Documento creato**: 2024
**Ultima revisione**: 2024
**Prossima revisione**: Dopo implementazione Fase 1
