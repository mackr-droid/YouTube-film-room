let player;
let isDrawing = false;
let ctx;

// YouTube API initialization — create player once API is ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '450',
    width: '800',
    videoId: 'dQw4w9WgXcQ', // default
    playerVars: { playsinline: 1 },
  });
}

// Handle video load
function loadVideo() {
  const input = document.getElementById('videoUrl').value.trim();
  const videoId = extractYouTubeId(input);
  if (videoId && player) {
    player.loadVideoById(videoId);
  } else {
    alert('Please enter a valid YouTube URL or video ID.');
  }
}

// Extract ID from URL or direct ID
function extractYouTubeId(input) {
  // If user enters a raw ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  const match = input.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
}

// Canvas setup
window.onload = function() {
  const canvas = document.getElementById('drawCanvas');
  ctx = canvas.getContext('2d');
  resizeCanvas(canvas);

  window.addEventListener('resize', () => resizeCanvas(canvas));

  // Left-click only drawing
  canvas.addEventListener('mousedown', (e) => {
    if (e.button === 0 && isDrawing) {
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

// Resize canvas
function resizeCanvas(canvas) {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

// Drawing in yellow
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

// Toggle drawing mode
function toggleDrawing() {
  isDrawing = !isDrawing;
  document.getElementById('drawCanvas').style.pointerEvents = isDrawing ? 'auto' : 'none';
}

// Clear drawing
function clearCanvas() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// Save notes locally
function saveNotes() {
  const text = document.getElementById('notes').value;
  localStorage.setItem('filmNotes', text);
  alert('Notes saved!');
}
