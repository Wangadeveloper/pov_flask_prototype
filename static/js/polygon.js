const canvas = document.getElementById("polygonCanvas");
const ctx = canvas.getContext("2d");

let currentSides = 5;
let targetSides = 5;
let radius = 100;

// Responsive canvas
function resizeCanvas() {
    const maxSize = Math.min(window.innerWidth, window.innerHeight) * 0.6;
    const size = Math.max(220, Math.min(maxSize, 360));
    canvas.width = size;
    canvas.height = size;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Input modes
function setMode(mode) {
    document.getElementById("sliderControl").classList.toggle("hidden", mode !== "slider");
    document.getElementById("numberControl").classList.toggle("hidden", mode !== "number");
}

function updateFromSlider() {
    targetSides = parseInt(document.getElementById("sidesSlider").value);
    document.getElementById("sideValue").textContent = targetSides;
    document.getElementById("sidesInput").value = targetSides;
}

function updateFromInput() {
    let val = parseInt(document.getElementById("sidesInput").value);
    if (val < 3 || isNaN(val)) return;
    targetSides = val;
    document.getElementById("sidesSlider").value = val;
    document.getElementById("sideValue").textContent = val;
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentSides < targetSides) currentSides += 0.05;
    if (currentSides > targetSides) currentSides -= 0.05;

    const n = Math.round(currentSides);
    radius = canvas.width * 0.38;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const points = [];
    for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n;
        points.push({
            x: cx + radius * Math.cos(angle),
            y: cy + radius * Math.sin(angle)
        });
    }

    drawPolygon(points);
    calculateProperties(n);

    requestAnimationFrame(animate);
}

function drawPolygon(points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
    ctx.closePath();

    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Angle markers
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(37,99,235,0.25)";
        ctx.stroke();
    });

    // Vertices
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#2563eb";
        ctx.fill();
    });
}

function calculateProperties(n) {
    const interior = ((n - 2) * 180) / n;
    const exterior = 360 / n;
    const side = 2 * radius * Math.sin(Math.PI / n);
    const perimeter = n * side;
    const area = (n * side * side) / (4 * Math.tan(Math.PI / n));

    document.getElementById("interior").textContent = interior.toFixed(2);
    document.getElementById("exterior").textContent = exterior.toFixed(2);
    document.getElementById("perimeter").textContent = perimeter.toFixed(2);
    document.getElementById("area").textContent = area.toFixed(2);
}

animate();
