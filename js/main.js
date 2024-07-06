import './style.css'
import { initConwayAnimation } from './js/index.js'

document.querySelector('#app').innerHTML = `
  <div class="content">
    <header>
      <h1>My Blog</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <main>
      <article class="blog-post">
        <h2>Welcome to My Blog</h2>
        <p class="date">Published on July 6, 2024</p>
        <p>Welcome to my blog! The border around this content features a zoomed-in, slow-motion Conway's Game of Life implemented with Three.js.</p>
      </article>
    </main>

    <footer>
      <p>&copy; 2024 My Blog. All rights reserved.</p>
    </footer>
  </div>
`

initConwayAnimation();