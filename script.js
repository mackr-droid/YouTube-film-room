let player;
let isDrawing = false;
let ctx;

// Load YouTube player
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '450',
    width: '800',
    videoId: 'dQw4w9WgXcQ', // default
    playerVars: { 'playsinline': 1 }
  });
}

// Load a new YouTube video
function loadVideo() {
  const url = document.getElementById('videoUrl').value;
  const videoId = extractYouTubeId(url);
  if (videoId) {
    player.loadVideoById(videoId);
  } else {
    alert('Invalid YouTube URL');
  }
}

// Extract YouTube video ID from URL
function extractYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Canvas setup
window.onload = function() {
  const canvas = document.getElementById('drawCanvas');
  ctx = canvas.getContext('2d');
  resizeCanvas(canvas);

  window.addEventListener('resize', () => resizeCanvas(canvas));

  // Mouse listeners
  canvas.addEventListener('mousedown', (e) => {
    if (e.button === 0 && isDrawing) { // Left click only
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
      canvas.addEventListener('mousemove', draw);
    }
  });

  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);

  // Load saved notes if any
  document.getElementById('notes').value = localStorage.getItem('filmNotes') || '';
};

// Resize canvas to video size
function resizeCanvas(canvas) {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

// Draw yellow line
function draw(e) {
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = 'yellow';
  ctx.lineWidth = 3;
  ctx.stroke();
}

// Stop drawing
function stopDrawing() {
  ctx.closePath();
  document.getElementById('drawCanvas').removeEventListener('mousemove', draw);
}

// Enable/disable drawing mode
function toggleDrawing() {
  isDrawing = !isDrawing;
  document.getElementById('drawCanvas').style.pointerEvents = isDrawing ? 'auto' : 'none';
}

// Clear the drawing
function clearCanvas() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// Save notes to browser
function saveNotes() {
  const text = document.getElementById('notes').value;
  localStorage.setItem('filmNotes', text);
  alert('Notes saved!');
}

