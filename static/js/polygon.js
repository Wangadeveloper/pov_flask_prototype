const canvas = document.getElementById("polygonCanvas");
const ctx = canvas.getContext("2d");

let currentSides = 5;
let targetSides = 5;
let radius = 100;

function resizeCanvas() {
    const size = Math.min(window.innerHeight * 0.45, 340);
    canvas.width = size;
    canvas.height = size;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function updateSides() {
    targetSides = parseInt(document.getElementById("sides").value);
    document.getElementById("sideValue").textContent = targetSides;
}

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
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        points.push({ x, y });
    }

    drawPolygon(points);
    calculateProperties(n);

    requestAnimationFrame(animate);
}

function drawPolygon(points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.closePath();
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Angle markers
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 12, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgba(37, 99, 235, 0.25)";
        ctx.stroke();
    });

    // Vertices
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
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
