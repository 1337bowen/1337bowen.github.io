import * as THREE from 'three';

let scene, camera, renderer, grid, material;
const size = 300;
const cellSize = 0.006;
let animationFrameId;
let lastUpdateTime = 0;
const updateInterval = 1000; // 1 second between updates

export function initConwayAnimation() {
    init();
    onWindowResize();
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    camera.position.z = 1;

    material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });

    grid = new Array(size).fill().map(() => new Array(size).fill().map(() => Math.random() > 0.8));
    createGrid();

    animate();
}

function createGrid() {
    scene.clear();
    const borderWidth = 0.15;
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            if (grid[x][y]) {
                const geometry = new THREE.PlaneGeometry(cellSize, cellSize);
                const cell = new THREE.Mesh(geometry, material);
                
                let posX = (x / size) * 2 - 1;
                let posY = (y / size) * 2 - 1;
                
                if (Math.abs(posX) < 1 - borderWidth && Math.abs(posY) < 1 - borderWidth) {
                    continue;
                }
                
                cell.position.set(posX, posY, 0);
                scene.add(cell);
            }
        }
    }
}

function updateGrid() {
    const newGrid = grid.map(arr => [...arr]);
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const neighbors = countNeighbors(x, y);
            if (grid[x][y]) {
                newGrid[x][y] = neighbors === 2 || neighbors === 3;
            } else {
                newGrid[x][y] = neighbors === 3;
            }
        }
    }
    grid = newGrid;
}

function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newX = (x + i + size) % size;
            const newY = (y + j + size) % size;
            if (grid[newX][newY]) count++;
        }
    }
    return count;
}

function animate(currentTime) {
    animationFrameId = requestAnimationFrame(animate);
    
    if (currentTime - lastUpdateTime > updateInterval) {
        updateGrid();
        createGrid();
        lastUpdateTime = currentTime;
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    let width, height;
    if (aspect > 1) {
        width = 1;
        height = 1 / aspect;
    } else {
        width = aspect;
        height = 1;
    }
    camera.left = -width;
    camera.right = width;
    camera.top = height;
    camera.bottom = -height;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);