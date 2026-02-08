// Initialize Lucide Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(16, 16, 37, 0.95)';
        } else {
            navbar.style.background = 'rgba(16, 16, 37, 0.7)';
        }
    });

    // Dashboard Logic
    if (window.location.pathname.includes('dashboard.html')) {
        initDashboard();
    }
});

function initDashboard() {
    // 1. Simulate Threat Map
    const canvas = document.getElementById('threatMapCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        // Resize listener
        window.addEventListener('resize', () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        });

        // Draw Map Background (Simplified grid/dots for "World")
        // In a real app, we'd use a GeoJSON or image. Here we use random dots to simulate nodes.
        const nodes = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1
        }));

        function drawMap() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw Nodes
            ctx.fillStyle = 'rgba(0, 243, 255, 0.3)';
            nodes.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Random "Attack" lines
            if (Math.random() > 0.9) {
                const start = nodes[Math.floor(Math.random() * nodes.length)];
                const end = nodes[Math.floor(Math.random() * nodes.length)];
                
                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
                ctx.strokeStyle = `rgba(234, 11, 67, ${Math.random()})`; // Red attack color
                ctx.lineWidth = 1;
                ctx.stroke();

                // Draw impact ring
                ctx.beginPath();
                ctx.arc(end.x, end.y, 5, 0, Math.PI * 2);
                ctx.strokeStyle = '#ea0b43';
                ctx.stroke();
            }

            requestAnimationFrame(drawMap);
        }
        drawMap();
    }

    // 2. Initialize Charts (using Chart.js if available)
    if (typeof Chart !== 'undefined') {
        const ctxIncident = document.getElementById('incidentChart').getContext('2d');
        new Chart(ctxIncident, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    label: 'Attacks Blocked',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: '#00f3ff',
                    backgroundColor: 'rgba(0, 243, 255, 0.1)',
                    borderWidth: 2,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#a0a0b0' } }
                },
                scales: {
                    y: { ticks: { color: '#a0a0b0' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { ticks: { color: '#a0a0b0' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });

        const ctxVuln = document.getElementById('vulnChart').getContext('2d');
        new Chart(ctxVuln, {
            type: 'doughnut',
            data: {
                labels: ['Critical', 'High', 'Medium', 'Low'],
                datasets: [{
                    data: [5, 12, 25, 15],
                    backgroundColor: ['#ea0b43', '#bd00ff', '#ffb700', '#00ff9d'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'right', labels: { color: '#a0a0b0' } }
                }
            }
        });
    }

    // 3. Update System Health Randomly
    setInterval(() => {
        const cpuVal = Math.floor(Math.random() * 30) + 10;
        const memVal = Math.floor(Math.random() * 40) + 30;
        
        document.getElementById('cpu-val').innerText = `${cpuVal}%`;
        document.getElementById('mem-val').innerText = `${memVal}%`;
        
        document.getElementById('cpu-bar').style.width = `${cpuVal}%`;
        document.getElementById('mem-bar').style.width = `${memVal}%`;
    }, 2000);
}
