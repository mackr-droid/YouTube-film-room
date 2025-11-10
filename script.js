let player;
let isDrawing = false;
let ctx;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '450',
    width: '800',
    videoId: 'dQw4w9WgXcQ', // default
    playerVars: { 'playsinline': 1 }
  });
}

function loadVideo() {
  const url = document.getElementById('videoUrl').value;
  const videoId = extractYouTubeId(url);
  if (videoId) {
    player.loadVideoById(videoId);
  } else {
    alert('Invalid YouTube URL');
  }
}

function extractYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

window.onload = function() {
  const canvas = document.getElementById('drawCanvas');
  ctx = canvas.getContext('2d');
  resizeCanvas(canvas);

  window.addEventListener('resize', () => resizeCanvas(canvas));

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);
};

function resizeCanvas(canvas) {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function startDrawing(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 3;
  ctx.stroke();
}

function stopDrawing() {
  if (isDrawing) ctx.closePath();
}

function toggleDrawing() {
  isDrawing = !isDrawing;
  document.getElementById('drawCanvas').style.pointerEvents = isDrawing ? 'auto' : 'none';
}

function clearCanvas() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
