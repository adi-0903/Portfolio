// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize loading screen
  initLoadingScreen()

  // Initialize background effects
  initParticleCanvas()
  initGradientBackground()

  // Initialize custom cursor
  initCustomCursor()

  // Initialize navigation
  initRadialNavigation()

  // Initialize page-specific elements
  initPageSpecificElements()

  // Initialize voice commands
  initVoiceCommands()

  // Initialize audio
  initAudio()

  // Initialize page transitions
  initPageTransitions()

  // Initialize accessibility features
  initAccessibility()
})

// Loading screen initialization
function initLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen")
  const loadingBar = document.querySelector(".loading-bar")
  const loadingPercentage = document.querySelector(".loading-percentage")

  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 10
    if (progress >= 100) {
      progress = 100
      clearInterval(interval)

      setTimeout(() => {
        loadingScreen.style.opacity = "0"
        setTimeout(() => {
          loadingScreen.style.display = "none"
          animateElementsIn()
        }, 500)
      }, 500)
    }

    loadingBar.style.width = `${progress}%`
    loadingPercentage.textContent = `${Math.floor(progress)}%`
  }, 150)
}

// Animate elements in after loading
function animateElementsIn() {
  const elements = document.querySelectorAll(".scene-content > *, .hero-content > *")
  elements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"

    setTimeout(() => {
      element.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, 100 * index)
  })
}

// Particle canvas initialization
function initParticleCanvas() {
  const canvas = document.getElementById("particleCanvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 0.5
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
      this.color = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 255}, ${Math.random() * 0.3 + 0.2})`
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
    }

    draw() {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Create particles
  const particles = []
  const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 10000))

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()

      // Connect particles with lines
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// Gradient background initialization
function initGradientBackground() {
  const gradientBg = document.querySelector(".gradient-bg")
  if (!gradientBg) return

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight

    // Get the current page
    const page = gradientBg.getAttribute("data-page")

    // Different gradient configurations for each page
    switch (page) {
      case "home":
        gradientBg.style.background = `
          radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(112, 0, 255, 0.15), transparent 70%),
          radial-gradient(circle at ${(1 - x) * 100}% ${y * 30}%, rgba(0, 240, 255, 0.1), transparent 50%),
          radial-gradient(circle at ${x * 15}% ${(1 - y) * 70}%, rgba(255, 0, 170, 0.1), transparent 50%)
        `
        break
      case "about":
        gradientBg.style.background = `
          radial-gradient(circle at ${(1 - x) * 100}% ${y * 100}%, rgba(0, 240, 255, 0.15), transparent 70%),
          radial-gradient(circle at ${x * 70}% ${(1 - y) * 70}%, rgba(112, 0, 255, 0.1), transparent 50%),
          radial-gradient(circle at ${(1 - x) * 10}% ${y * 20}%, rgba(255, 0, 170, 0.1), transparent 50%)
        `
        break
      case "projects":
        gradientBg.style.background = `
          radial-gradient(circle at ${x * 100}% ${(1 - y) * 100}%, rgba(255, 0, 170, 0.15), transparent 70%),
          radial-gradient(circle at ${(1 - x) * 20}% ${y * 30}%, rgba(112, 0, 255, 0.1), transparent 50%),
          radial-gradient(circle at ${x * 80}% ${(1 - y) * 80}%, rgba(0, 240, 255, 0.1), transparent 50%)
        `
        break
      case "skills":
        gradientBg.style.background = `
          radial-gradient(circle at ${(1 - x) * 100}% ${(1 - y) * 60}%, rgba(0, 240, 255, 0.15), transparent 70%),
          radial-gradient(circle at ${x * 80}% ${y * 20}%, rgba(112, 0, 255, 0.1), transparent 50%),
          radial-gradient(circle at ${(1 - x) * 10}% ${(1 - y) * 40}%, rgba(255, 0, 170, 0.1), transparent 50%)
        `
        break
      case "contact":
        gradientBg.style.background = `
          radial-gradient(circle at ${(1 - x) * 100}% ${(1 - y) * 100}%, rgba(0, 240, 255, 0.15), transparent 70%),
          radial-gradient(circle at ${x * 20}% ${(1 - y) * 70}%, rgba(255, 0, 170, 0.1), transparent 50%),
          radial-gradient(circle at ${(1 - x) * 80}% ${y * 40}%, rgba(112, 0, 255, 0.1), transparent 50%)
        `
        break
      default:
        break
    }
  })
}

// Custom cursor initialization
function initCustomCursor() {
  const cursorFollower = document.querySelector(".cursor-follower")
  const cursorDot = document.querySelector(".cursor-dot")
  if (!cursorFollower || !cursorDot) return

  document.addEventListener("mousemove", (e) => {
    cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
  })

  // Cursor effects on interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .project-link, .research-link, .nav-item, .nav-toggle",
  )

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorFollower.style.width = "60px"
      cursorFollower.style.height = "60px"
      cursorFollower.style.background = "rgba(0, 240, 255, 0.2)"
    })

    element.addEventListener("mouseleave", () => {
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
      cursorFollower.style.background = "rgba(0, 240, 255, 0.1)"
    })
  })

  // Hide cursor when mouse leaves window
  document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget === null) {
      cursorFollower.style.opacity = "0"
      cursorDot.style.opacity = "0"
    }
  })

  document.addEventListener("mouseover", () => {
    cursorFollower.style.opacity = "1"
    cursorDot.style.opacity = "1"
  })
}

// Radial navigation initialization
function initRadialNavigation() {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")
  if (!navToggle || !navMenu) return

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains("active")) {
      navToggle.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })
}

// Initialize page-specific elements
function initPageSpecificElements() {
  // Get current page
  const currentPage = document.querySelector(".gradient-bg").getAttribute("data-page")

  switch (currentPage) {
    case "home":
      initNeuralNetworkVisualization()
      break
    case "about":
      initSkillAnimations()
      break
    case "projects":
      initProjectVisualizations()
      initGitHubHeatmap()
      initProjectModal()
      initSkillAnimations() // Add this line to initialize skill animations on the projects page
      break
    case "contact":
      initFormInteractions()
      break
    default:
      break
  }
}

// Horizontal scroll for projects initialization
// function initHorizontalScroll() {
//   const horizontalSection = document.querySelector(".horizontal-scroll-section")
//   const horizontalContainer = document.querySelector(".horizontal-scroll-container")
//   const projectItems = document.querySelectorAll(".project-item")

//   if (!horizontalSection || !horizontalContainer || projectItems.length === 0) return

//   let currentProject = 0
//   const projectCount = projectItems.length

//   // Navigate to specific project
//   function goToProject(index) {
//     if (index < 0) index = 0
//     if (index >= projectCount) index = projectCount - 1

//     currentProject = index
//     horizontalContainer.style.transform = `translateX(-${currentProject * 100}vw)`
//   }

//   // Add wheel event listener to horizontal section
//   horizontalSection.addEventListener("wheel", (e) => {
//     e.preventDefault()

//     if (e.deltaY > 0) {
//       goToProject(currentProject + 1)
//     } else {
//       goToProject(currentProject - 1)
//     }
//   })

//   // Add touch support for mobile
//   let touchStartX = 0
//   let touchEndX = 0

//   horizontalSection.addEventListener("touchstart", (e) => {
//     touchStartX = e.changedTouches[0].screenX
//   })

//   horizontalSection.addEventListener("touchend", (e) => {
//     touchEndX = e.changedTouches[0].screenX
//     handleSwipe()
//   })

//   function handleSwipe() {
//     if (touchEndX < touchStartX) {
//       goToProject(currentProject + 1)
//     } else if (touchEndX > touchStartX) {
//       goToProject(currentProject - 1)
//     }
//   }
// }

// Neural network visualization initialization
function initNeuralNetworkVisualization() {
  const canvas = document.getElementById("neuralNetworkCanvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Set canvas size
  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth
    canvas.height = canvas.parentElement.offsetHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Neural network parameters
  const layers = [5, 8, 6, 4]
  const neurons = []
  const connections = []

  // Create neurons
  for (let l = 0; l < layers.length; l++) {
    const layerNeurons = []
    const layerWidth = canvas.width / (layers.length + 1)
    const layerHeight = canvas.height / (layers[l] + 1)

    for (let n = 0; n < layers[l]; n++) {
      layerNeurons.push({
        x: layerWidth * (l + 1),
        y: layerHeight * (n + 1),
        size: Math.random() * 2 + 2,
        pulsing: Math.random() > 0.7,
        pulseSpeed: Math.random() * 0.05 + 0.01,
        pulseAmount: 0,
      })
    }

    neurons.push(layerNeurons)
  }

  // Create connections
  for (let l = 0; l < layers.length - 1; l++) {
    const layerConnections = []

    for (let n1 = 0; n1 < neurons[l].length; n1++) {
      for (let n2 = 0; n2 < neurons[l + 1].length; n2++) {
        layerConnections.push({
          from: neurons[l][n1],
          to: neurons[l + 1][n2],
          weight: Math.random(),
          signalPosition: Math.random(),
          signalSpeed: Math.random() * 0.02 + 0.005,
          active: Math.random() > 0.5,
        })
      }
    }

    connections.push(layerConnections)
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections
    for (let l = 0; l < connections.length; l++) {
      for (let c = 0; c < connections[l].length; c++) {
        const conn = connections[l][c]

        if (conn.active) {
          // Draw connection line
          ctx.beginPath()
          ctx.strokeStyle = `rgba(0, 240, 255, ${conn.weight * 0.3})`
          ctx.lineWidth = conn.weight * 1.5
          ctx.moveTo(conn.from.x, conn.from.y)
          ctx.lineTo(conn.to.x, conn.to.y)
          ctx.stroke()

          // Draw signal
          conn.signalPosition += conn.signalSpeed
          if (conn.signalPosition > 1) conn.signalPosition = 0

          const signalX = conn.from.x + (conn.to.x - conn.from.x) * conn.signalPosition
          const signalY = conn.from.y + (conn.to.y - conn.from.y) * conn.signalPosition

          ctx.beginPath()
          ctx.fillStyle = "rgba(0, 240, 255, 0.8)"
          ctx.arc(signalX, signalY, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Draw neurons
    for (let l = 0; l < neurons.length; l++) {
      for (let n = 0; n < neurons[l].length; n++) {
        const neuron = neurons[l][n]

        // Update pulse
        if (neuron.pulsing) {
          neuron.pulseAmount += neuron.pulseSpeed
          if (neuron.pulseAmount > 1 || neuron.pulseAmount < 0) {
            neuron.pulseSpeed *= -1
          }
        }

        // Draw neuron
        const size = neuron.size + neuron.pulseAmount * 2
        const gradient = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, size * 2)
        gradient.addColorStop(0, "rgba(0, 240, 255, 0.8)")
        gradient.addColorStop(1, "rgba(0, 240, 255, 0)")

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(neuron.x, neuron.y, size * 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = "rgba(0, 240, 255, 0.8)"
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// Project visualizations initialization
function initProjectVisualizations() {
  const projectCanvases = document.querySelectorAll(".project-canvas")
  if (projectCanvases.length === 0) return

  projectCanvases.forEach((canvas) => {
    const ctx = canvas.getContext("2d")
    const visualizationType = canvas.getAttribute("data-visualization")

    // Set canvas size
    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Different visualization types
    switch (visualizationType) {
      case "neural":
        createNeuralVisualization(canvas, ctx)
        break
      case "quantum":
        createQuantumVisualization(canvas, ctx)
        break
      case "synapse":
        createSynapseVisualization(canvas, ctx)
        break
      case "sentiment":
        createSentimentVisualization(canvas, ctx)
        break
      case "object-detection":
        createObjectDetectionVisualization(canvas, ctx)
        break
      case "document-analyzer":
        createDocumentAnalyzerVisualization(canvas, ctx)
        break
      case "stock-prediction":
        createStockPredictionVisualization(canvas, ctx)
        break
      case "wave-energy":
        createWaveEnergyVisualization(canvas, ctx)
        break
      case "gender-age":
        createGenderAgeVisualization(canvas, ctx)
        break
      case "speech-emotion":
        createSpeechEmotionVisualization(canvas, ctx)
        break
      case "nltk-chatbot":
        createNLTKChatbotVisualization(canvas, ctx)
        break
      default:
        break
    }
  })
}

// Neural visualization
function createNeuralVisualization(canvas, ctx) {
  const particles = []
  const particleCount = 100

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      color: `rgba(0, ${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, ${Math.random() * 0.5 + 0.3})`,
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      p.x += p.speedX
      p.y += p.speedY

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

      ctx.beginPath()
      ctx.fillStyle = p.color
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()

      // Connect particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.2 * (1 - distance / 100)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// Quantum visualization
function createQuantumVisualization(canvas, ctx) {
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const maxRadius = Math.min(canvas.width, canvas.height) * 0.4
  const orbits = 5
  const particles = []

  for (let o = 1; o <= orbits; o++) {
    const orbitRadius = maxRadius * (o / orbits)
    const particleCount = 5 + o * 3
    const orbitSpeed = 0.001 + (orbits - o) * 0.0005

    for (let i = 0; i < particleCount; i++) {
      const angle = ((Math.PI * 2) / particleCount) * i

      particles.push({
        orbitRadius,
        angle,
        speed: orbitSpeed,
        size: Math.random() * 2 + 1,
        color: `rgba(${Math.floor(Math.random() * 100) + 155}, 0, ${Math.floor(Math.random() * 155) + 100}, ${Math.random() * 0.5 + 0.3})`,
      })
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw orbits
    for (let o = 1; o <= orbits; o++) {
      const orbitRadius = maxRadius * (o / orbits)

      ctx.beginPath()
      ctx.strokeStyle = `rgba(255, 0, 170, ${0.1 * (1 - o / orbits)})`
      ctx.lineWidth = 1
      ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw center
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius / 4)
    gradient.addColorStop(0, "rgba(255, 0, 170, 0.8)")
    gradient.addColorStop(1, "rgba(255, 0, 170, 0)")

    ctx.beginPath()
    ctx.fillStyle = gradient
    ctx.arc(centerX, centerY, maxRadius / 4, 0, Math.PI * 2)
    ctx.fill()

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      p.angle += p.speed
      const x = centerX + Math.cos(p.angle) * p.orbitRadius
      const y = centerY + Math.sin(p.angle) * p.orbitRadius

      ctx.beginPath()
      ctx.fillStyle = p.color
      ctx.arc(x, y, p.size, 0, Math.PI * 2)
      ctx.fill()

      // Draw line to center
      ctx.beginPath()
      ctx.strokeStyle = `rgba(255, 0, 170, ${0.2 * (1 - p.orbitRadius / maxRadius)})`
      ctx.lineWidth = 0.5
      ctx.moveTo(x, y)
      ctx.lineTo(centerX, centerY)
      ctx.stroke()
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// Synapse visualization
function createSynapseVisualization(canvas, ctx) {
  const waves = []
  const waveCount = 5

  for (let i = 0; i < waveCount; i++) {
    waves.push({
      amplitude: Math.random() * 50 + 20,
      frequency: Math.random() * 0.01 + 0.005,
      speed: Math.random() * 0.05 + 0.01,
      phase: Math.random() * Math.PI * 2,
      color: `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 155) + 100}, ${Math.random() * 0.3 + 0.2})`,
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "rgba(70, 0, 120, 0.2)")
    gradient.addColorStop(1, "rgba(0, 50, 100, 0.2)")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw waves
    for (let w = 0; w < waves.length; w++) {
      const wave = waves[w]

      wave.phase += wave.speed

      ctx.beginPath()
      ctx.strokeStyle = wave.color
      ctx.lineWidth = 2

      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    // Draw particles along the main wave
    const mainWave = waves[0]
    const particleCount = 20

    for (let i = 0; i < particleCount; i++) {
      const x = (canvas.width / particleCount) * i
      const y = canvas.height / 2 + Math.sin(x * mainWave.frequency + mainWave.phase) * mainWave.amplitude

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10)
      gradient.addColorStop(0, "rgba(100, 100, 255, 0.8)")
      gradient.addColorStop(1, "rgba(100, 100, 255, 0)")

      ctx.beginPath()
      ctx.fillStyle = gradient
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// Sentiment Analysis visualization
function createSentimentVisualization(canvas, ctx) {
  const width = canvas.width
  const height = canvas.height

  // Create sentiment data
  const sentimentData = []
  const dataPoints = 50

  for (let i = 0; i < dataPoints; i++) {
    // Generate random sentiment between -1 and 1
    const sentiment = Math.random() * 2 - 1
    sentimentData.push(sentiment)
  }

  function animate() {
    ctx.clearRect(0, 0, width, height)

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, "rgba(0, 30, 60, 0.2)")
    gradient.addColorStop(1, "rgba(0, 10, 30, 0.2)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw sentiment graph
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = "rgba(0, 240, 255, 0.8)"

    // Move to first point
    const pointWidth = width / (dataPoints - 1)
    const centerY = height / 2

    ctx.moveTo(0, centerY - sentimentData[0] * centerY * 0.8)

    // Draw lines to each point
    for (let i = 1; i < dataPoints; i++) {
      ctx.lineTo(i * pointWidth, centerY - sentimentData[i] * centerY * 0.8)
    }
    ctx.stroke()

    // Draw positive/negative threshold line
    ctx.beginPath()
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.setLineDash([5, 5])
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw data points
    for (let i = 0; i < dataPoints; i++) {
      const x = i * pointWidth
      const y = centerY - sentimentData[i] * centerY * 0.8

      // Color based on sentiment (positive = cyan, negative = magenta)
      const color = sentimentData[i] >= 0 ? "rgba(0, 240, 255, 0.8)" : "rgba(255, 0, 170, 0.8)"

      ctx.beginPath()
      ctx.fillStyle = color
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    // Shift data for animation
    sentimentData.shift()
    sentimentData.push(Math.random() * 2 - 1)

    requestAnimationFrame(animate)
  }

  animate()
}

// Object Detection visualization
function createObjectDetectionVisualization(canvas, ctx) {
  const width = canvas.width
  const height = canvas.height

  // Create objects to detect
  const objects = []
  const objectCount = 8

  for (let i = 0; i < objectCount; i++) {
    objects.push({
      x: Math.random() * width,
      y: Math.random() * height,
      width: Math.random() * 50 + 20,
      height: Math.random() * 50 + 20,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      detected: false,
      detectionTime: 0,
    })
  }

  function animate() {
    ctx.clearRect(0, 0, width, height)

    // Draw grid background
    ctx.strokeStyle = "rgba(0, 240, 255, 0.1)"
    ctx.lineWidth = 1

    const gridSize = 20
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Update and draw objects
    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i]

      // Update position
      obj.x += obj.speedX
      obj.y += obj.speedY

      // Bounce off walls
      if (obj.x < 0 || obj.x + obj.width > width) {
        obj.speedX *= -1
      }

      if (obj.y < 0 || obj.y + obj.height > height) {
        obj.speedY *= -1
      }

      // Randomly detect objects
      if (Math.random() < 0.02) {
        obj.detected = true
        obj.detectionTime = 30
      }

      if (obj.detectionTime > 0) {
        obj.detectionTime--
        if (obj.detectionTime === 0) {
          obj.detected = false
        }
      }

      // Draw object
      ctx.strokeStyle = obj.detected ? "rgba(0, 240, 255, 0.8)" : "rgba(255, 255, 255, 0.3)"
      ctx.lineWidth = obj.detected ? 2 : 1

      ctx.beginPath()
      ctx.rect(obj.x, obj.y, obj.width, obj.height)
      ctx.stroke()

      // Draw detection label if detected
      if (obj.detected) {
        ctx.fillStyle = "rgba(0, 240, 255, 0.8)"
        ctx.font = "10px var(--font-mono)"
        ctx.fillText("OBJECT", obj.x, obj.y - 5)

        // Draw detection confidence
        const confidence = Math.floor(Math.random() * 20 + 80)
        ctx.fillText(`${confidence}%`, obj.x, obj.y + obj.height + 15)
      }
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// Document Analyzer visualization
function createDocumentAnalyzerVisualization(canvas, ctx) {
  const width = canvas.width
  const height = canvas.height

  // Create document elements
  const documentLines = []
  const lineCount = 15

  for (let i = 0; i < lineCount; i++) {
    const lineLength = Math.random() * 0.6 + 0.3 // 30% to 90% of width
    documentLines.push({
      width: lineLength * width,
      y: (height / (lineCount + 1)) * (i + 1),
      highlighted: false,
      highlightTime: 0,
    })
  }

  // Create connection points
  const connectionPoints = []
  const pointCount = 5

  for (let i = 0; i < pointCount; i++) {
    connectionPoints.push({
      x: Math.random() * width,
      y: Math.random() * height,
      connections: [],
    })
  }

  // Create connections between points
  for (let i = 0; i < pointCount; i++) {
    for (let j = i + 1; j < pointCount; j++) {
      if (Math.random() < 0.7) {
        connectionPoints[i].connections.push(j)
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height)

    // Draw document lines
    for (let i = 0; i < documentLines.length; i++) {
      const line = documentLines[i]

      // Randomly highlight lines
      if (Math.random() < 0.01) {
        line.highlighted = true
        line.highlightTime = 50
      }

      if (line.highlightTime > 0) {
        line.highlightTime--
        if (line.highlightTime === 0) {
          line.highlighted = false
        }
      }

      ctx.beginPath()
      ctx.strokeStyle = line.highlighted ? "rgba(0, 240, 255, 0.8)" : "rgba(255, 255, 255, 0.3)"
      ctx.lineWidth = line.highlighted ? 2 : 1
      ctx.moveTo(width * 0.1, line.y)
      ctx.lineTo(width * 0.1 + line.width, line.y)
      ctx.stroke()
    }

    // Draw connection points
    for (let i = 0; i < connectionPoints.length; i++) {
      const point = connectionPoints[i]

      // Draw connections
      for (let j = 0; j < point.connections.length; j++) {
        const connectedPoint = connectionPoints[point.connections[j]]

        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 0, 170, 0.3)"
        ctx.lineWidth = 1
        ctx.moveTo(point.x, point.y)
        ctx.lineTo(connectedPoint.x, connectedPoint.y)
        ctx.stroke()
      }

      // Draw point
      ctx.beginPath()
      ctx.fillStyle = "rgba(255, 0, 170, 0.8)"
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// Stock Price Prediction visualization
function createStockPredictionVisualization(canvas, ctx) {
  const width = canvas.width
  const height = canvas.height

  // Create stock data
  const stockData = []
  const predictionData = []
  const dataPoints = 50
  let lastValue = 100

  for (let i = 0; i < dataPoints; i++) {
    // Generate random stock movement
    lastValue += (Math.random() - 0.5) * 10
    if (lastValue < 50) lastValue = 50
    if (lastValue > 150) lastValue = 150

    stockData.push(lastValue)

    // Generate prediction (slightly different from actual)
    if (i > dataPoints - 10) {
      predictionData.push(lastValue + (Math.random() - 0.3) * 15)
    } else {
      predictionData.push(null)
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height)

    // Draw background
    const gradient = ctx.createLinearGradient(0, height, 0, 0)
    gradient.addColorStop(0, "rgba(0, 50, 30, 0.2)")
    gradient.addColorStop(1, "rgba(0, 30, 10, 0.2)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1

    for (let y = 0; y < height; y += height / 5) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Calculate scaling
    const min = 50
    const max = 150
    const range = max - min

    // Draw stock data
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = "rgba(0, 240, 255, 0.8)"

    const pointWidth = width / (dataPoints - 1)

    for (let i = 0; i < dataPoints; i++) {
      const x = i * pointWidth
      const y = height - ((stockData[i] - min) / range) * height

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Draw prediction data
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = "rgba(255, 0, 170, 0.8)"
    ctx.setLineDash([5, 5])

    let started = false
    for (let i = 0; i < dataPoints; i++) {
      if (predictionData[i] !== null) {
        const x = i * pointWidth
        const y = height - ((predictionData[i] - min) / range) * height

        if (!started) {
          ctx.moveTo(x, y)
          started = true
        } else {
          ctx.lineTo(x, y)
        }
      }
    }
    ctx.stroke()
    ctx.setLineDash([])

    // Draw prediction label
    ctx.fillStyle = "rgba(255, 0, 170, 0.8)"
    ctx.font = "12px var(--font-mono)"
    ctx.fillText("PREDICTION", width - 100, 20)

    // Update data for animation
    stockData.shift()
    lastValue += (Math.random() - 0.5) * 5
    if (lastValue < 50) lastValue = 50
    if (lastValue > 150) lastValue = 150
    stockData.push(lastValue)

    predictionData.shift()
    if (predictionData[predictionData.length - 2] !== null) {
      predictionData.push(lastValue + (Math.random() - 0.3) * 15)
    } else {
      predictionData.push(null)
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// Wave Energy visualization
function createWaveEnergyVisualization(canvas, ctx) {
  const width = canvas.width
  const height = canvas.height

  // Wave parameters
  const waves = []
  const waveCount = 3

  for (let i = 0; i < waveCount; i++) {
    waves.push({
      amplitude: 20 + i * 10,
      frequency: 0.01 + i * 0.005,
      speed: 0.05 + i * 0.02,
      phase: Math.random() * Math.PI * 2,
      color: `rgba(0, ${180 + i * 20}, ${220 + i * 10}, ${0.5 - i * 0.1})`,
    })
  }

  // Energy conversion points
  const converters = []
  const converterCount = 5

  for (let i = 0; i < converterCount; i++) {
    converters.push({
      x: (width * (i + 1)) / (converterCount + 1),
      y: height / 2,
      size: 10,
      energy: 0,
      maxEnergy: 100,
      pulseSize: 0,
    })
  }

  function animate() {
    ctx.clearRect(0, 0, width, height)

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "rgba(0, 20, 40, 0.2)")
    gradient.addColorStop(0.5, "rgba(0, 40, 80, 0.2)")
    gradient.addColorStop(1, "rgba(0, 20, 40, 0.2)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Calculate wave height at each point
    const resolution = 5
    const points = []

    for (let x = 0; x <= width; x += resolution) {
      let y = height / 2

      for (const wave of waves) {
        wave.phase += wave.speed / 60
        y += Math.sin(x * wave.frequency + wave.phase) * wave.amplitude
      }

      points.push({ x, y })
    }

    // Draw waves
    for (let i = 0; i < waveCount; i++) {
      const wave = waves[i]

      ctx.beginPath()
      ctx.moveTo(0, height)

      for (const point of points) {
        let waveY = height / 2

        for (let j = 0; j <= i; j++) {
          waveY += Math.sin(point.x * waves[j].frequency + waves[j].phase) * waves[j].amplitude
        }

        ctx.lineTo(point.x, waveY)
      }

      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()

      ctx.fillStyle = wave.color
      ctx.fill()
    }

    // Update and draw converters
    for (let i = 0; i < converters.length; i++) {
      const converter = converters[i]

      // Calculate wave height at converter position
      let waveHeight = height / 2
      for (const wave of waves) {
        waveHeight += Math.sin(converter.x * wave.frequency + wave.phase) * wave.amplitude
      }

      // Update converter position to follow wave
      converter.y = waveHeight

      // Generate energy based on wave movement
      const energyGenerated = Math.abs(Math.sin(converter.x * waves[0].frequency + waves[0].phase)) * 2
      converter.energy = Math.min(converter.maxEnergy, converter.energy + energyGenerated)

      // Pulse when energy is high
      if (converter.energy > converter.maxEnergy * 0.8) {
        converter.pulseSize = 20
        converter.energy *= 0.8
      }

      // Draw energy pulse
      if (converter.pulseSize > 0) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(0, 240, 255, ${(converter.pulseSize / 20) * 0.5})`
        ctx.arc(converter.x, converter.y, converter.pulseSize, 0, Math.PI * 2)
        ctx.fill()

        converter.pulseSize -= 1
      }

      // Draw converter
      ctx.beginPath()
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.arc(converter.x, converter.y, converter.size, 0, Math.PI * 2)
      ctx.fill()

      // Draw energy level
      const energyHeight = (converter.energy / converter.maxEnergy) * 40
      ctx.fillStyle = "rgba(0, 240, 255, 0.8)"
      ctx.fillRect(converter.x - 2, converter.y - converter.size - energyHeight, 4, energyHeight)
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// Gender and Age Detection visualization
function createGenderAgeVisualization(canvas, ctx) {
  const width = canvas.width
  const height = canvas.height

  // Create face detection boxes
  const faces = []
  const faceCount = 6

  for (let i = 0; i < faceCount; i++) {
    const size = Math.random() * 40 + 40
    faces.push({
      x: Math.random() * (width - size),
      y: Math.random() * (height - size),
      size: size,
      gender: Math.random() > 0.5 ? "Male" : "Female",
      age: Math.floor(Math.random() * 70 + 10),
      confidence: Math.random() * 0.2 + 0.8,
      detected: false,
      detectionTime: 0,
    })
  }

  function animate() {
    ctx.clearRect(0, 0, width, height)

    // Draw scanning effect
    const scanLineY = ((Date.now() % 2000) / 2000) * height
    ctx.fillStyle = "rgba(0, 240, 255, 0.1)"
    ctx.fillRect(0, scanLineY, width, 2)

    // Draw grid background
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
    ctx.lineWidth = 1

    const gridSize = 20
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Update and draw faces
    for (let i = 0; i < faces.length; i++) {
      const face = faces[i]

      // Detect faces when scan line passes over them
      if (scanLineY >= face.y && scanLineY <= face.y + face.size) {
        face.detected = true
        face.detectionTime = 100
      }

      if (face.detectionTime > 0) {
        face.detectionTime--
        if (face.detectionTime === 0) {
          face.detected = false
        }
      }

      // Draw face box
      ctx.strokeStyle = face.detected ? "rgba(0, 240, 255, 0.8)" : "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = face.detected ? 2 : 1

      ctx.beginPath()
      ctx.rect(face.x, face.y, face.size, face.size)
      ctx.stroke()

      // Draw face detection info
      if (face.detected) {
        // Gender
        ctx.fillStyle = face.gender === "Male" ? "rgba(0, 180, 255, 0.8)" : "rgba(255, 100, 200, 0.8)"
        ctx.font = "10px var(--font-mono)"
        ctx.fillText(face.gender, face.x, face.y - 25)

        // Age
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.fillText(`Age: ${face.age}`, face.x, face.y - 10)

        // Confidence
        ctx.fillStyle = "rgba(0, 240, 255, 0.8)"
        ctx.fillText(`Conf: ${Math.floor(face.confidence * 100)}%`, face.x, face.y + face.size + 15)

        // Draw facial landmarks (simplified)
        ctx.fillStyle = "rgba(0, 240, 255, 0.8)"

        // Eyes
        const eyeSize = face.size * 0.1
        ctx.beginPath()
        ctx.arc(face.x + face.size * 0.3, face.y + face.size * 0.4, eyeSize, 0, Math.PI * 2)
        ctx.arc(face.x + face.size * 0.7, face.y + face.size * 0.4, eyeSize, 0, Math.PI * 2)
        ctx.fill()

        // Mouth
        ctx.beginPath()
        ctx.arc(face.x + face.size * 0.5, face.y + face.size * 0.7, face.size * 0.15, 0, Math.PI)
        ctx.stroke()
      }
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// Speech Emotion Recognition visualization
function createSpeechEmotionVisualization(canvas, ctx) {
  const width = canvas.width
  const height = canvas.height

  // Audio waveform data
  const waveformData = []
  const dataPoints = 100
  let time = 0

  for (let i = 0; i < dataPoints; i++) {
    waveformData.push(0)
  }

  // Emotion categories
  const emotions = ["Happy", "Sad", "Angry", "Fear", "Neutral"]
  const emotionColors = [
    "rgba(255, 215, 0, 0.8)", // Happy - Gold
    "rgba(100, 149, 237, 0.8)", // Sad - Blue
    "rgba(255, 69, 0, 0.8)", // Angry - Red
    "rgba(138, 43, 226, 0.8)", // Fear - Purple
    "rgba(169, 169, 169, 0.8)", // Neutral - Gray
  ]

  let currentEmotion = 0
  let emotionChangeTimer = 0

  function animate() {
    ctx.clearRect(0, 0, width, height)

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "rgba(20, 20, 40, 0.2)")
    gradient.addColorStop(1, "rgba(10, 10, 20, 0.2)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Generate audio waveform
    time += 0.1
    waveformData.shift()
    const amplitude = 50 + Math.sin(time * 0.5) * 30
    const newPoint = Math.sin(time * 2) * amplitude + Math.sin(time * 5) * 20
    waveformData.push(newPoint)

    // Draw waveform
    ctx.beginPath()
    ctx.strokeStyle = "rgba(0, 240, 255, 0.8)"
    ctx.lineWidth = 2

    const pointWidth = width / (dataPoints - 1)
    const centerY = height / 2

    for (let i = 0; i < dataPoints; i++) {
      const x = i * pointWidth
      const y = centerY + waveformData[i]

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Draw emotion detection
    emotionChangeTimer++
    if (emotionChangeTimer > 60) {
      // Change emotion every 60 frames
      currentEmotion = Math.floor(Math.random() * emotions.length)
      emotionChangeTimer = 0
    }

    // Draw emotion indicator
    ctx.fillStyle = emotionColors[currentEmotion]
    ctx.font = "16px var(--font-mono)"
    ctx.fillText(`DETECTED: ${emotions[currentEmotion]}`, 20, 30)

    // Draw confidence bar
    const confidence = 70 + Math.random() * 25
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
    ctx.fillRect(20, 40, 150, 10)
    ctx.fillStyle = emotionColors[currentEmotion]
    ctx.fillRect(20, 40, (confidence / 100) * 150, 10)

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.font = "12px var(--font-mono)"
    ctx.fillText(`${Math.floor(confidence)}%`, 180, 50)

    // Draw frequency spectrum
    const spectrumBars = 20
    const barWidth = (width - 40) / spectrumBars

    for (let i = 0; i < spectrumBars; i++) {
      const barHeight = Math.random() * 60 + 10
      const x = 20 + i * barWidth
      const y = height - 80

      ctx.fillStyle = `rgba(0, 240, 255, ${0.3 + (barHeight / 70) * 0.5})`
      ctx.fillRect(x, y - barHeight, barWidth - 2, barHeight)
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// NLTK Chatbot visualization
function createNLTKChatbotVisualization(canvas, ctx) {
  const width = canvas.width
  const height = canvas.height

  // Chat messages
  const messages = [
    { text: "Hello! How can I help you?", type: "bot", time: 0 },
    { text: "What's the weather like?", type: "user", time: 60 },
    { text: "I can help with that!", type: "bot", time: 120 },
    { text: "Tell me a joke", type: "user", time: 180 },
    { text: "Why did the AI cross the road?", type: "bot", time: 240 },
  ]

  let currentTime = 0
  let visibleMessages = []

  // Text processing visualization
  const processingSteps = ["Tokenization", "Stemming", "POS Tagging", "Response Generation"]
  let currentStep = 0
  let stepTimer = 0

  function animate() {
    ctx.clearRect(0, 0, width, height)

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, "rgba(10, 30, 60, 0.2)")
    gradient.addColorStop(1, "rgba(30, 10, 60, 0.2)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    currentTime++

    // Update visible messages
    visibleMessages = messages.filter((msg) => currentTime >= msg.time)

    // Draw chat interface
    const chatY = 20
    const messageHeight = 25
    const maxMessages = Math.floor((height - 100) / messageHeight)

    visibleMessages.slice(-maxMessages).forEach((message, index) => {
      const y = chatY + index * messageHeight
      const isBot = message.type === "bot"

      // Message bubble
      ctx.fillStyle = isBot ? "rgba(0, 240, 255, 0.2)" : "rgba(255, 0, 170, 0.2)"
      const textWidth = ctx.measureText(message.text).width + 20
      const x = isBot ? 10 : width - textWidth - 10

      ctx.fillRect(x, y, textWidth, 20)

      // Message text
      ctx.fillStyle = isBot ? "rgba(0, 240, 255, 0.9)" : "rgba(255, 0, 170, 0.9)"
      ctx.font = "12px var(--font-mono)"
      ctx.fillText(message.text, x + 10, y + 15)
    })

    // Draw processing steps
    stepTimer++
    if (stepTimer > 30) {
      currentStep = (currentStep + 1) % processingSteps.length
      stepTimer = 0
    }

    const processY = height - 60
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.font = "14px var(--font-mono)"
    ctx.fillText("PROCESSING:", 20, processY)

    processingSteps.forEach((step, index) => {
      const x = 20 + index * 120
      const isActive = index === currentStep

      ctx.fillStyle = isActive ? "rgba(0, 240, 255, 0.8)" : "rgba(255, 255, 255, 0.4)"
      ctx.font = "10px var(--font-mono)"
      ctx.fillText(step, x, processY + 20)

      // Progress indicator
      if (isActive) {
        ctx.fillStyle = "rgba(0, 240, 255, 0.6)"
        ctx.fillRect(x, processY + 25, 100, 3)
      }
    })

    // Draw typing indicator when bot is "thinking"
    if (currentTime % 120 > 100) {
      ctx.fillStyle = "rgba(0, 240, 255, 0.6)"
      ctx.font = "12px var(--font-mono)"
      ctx.fillText("Bot is typing...", 20, height - 20)

      // Animated dots
      const dots = Math.floor((currentTime % 30) / 10) + 1
      ctx.fillText(".".repeat(dots), 120, height - 20)
    }

    // Reset animation cycle
    if (currentTime > 300) {
      currentTime = 0
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// GitHub activity heatmap initialization
function initGitHubHeatmap() {
  const heatmapContainer = document.getElementById("githubHeatmap")
  if (!heatmapContainer) return

  const daysInYear = 365
  const cellSize = 12
  const cellGap = 3
  const cellsPerRow = 7 // One week
  const rows = Math.ceil(daysInYear / cellsPerRow)

  // Create canvas
  const canvas = document.createElement("canvas")
  canvas.width = heatmapContainer.offsetWidth
  canvas.height = 150
  heatmapContainer.appendChild(canvas)

  const ctx = canvas.getContext("2d")

  // Generate random activity data
  const activityData = []
  for (let i = 0; i < daysInYear; i++) {
    // More activity in recent months
    const recency = i / daysInYear
    const maxActivity = Math.floor(recency * 10) + 1
    activityData.push(Math.floor(Math.random() * maxActivity))
  }

  // Draw heatmap
  function drawHeatmap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const totalWidth = cellsPerRow * (cellSize + cellGap)
    const startX = (canvas.width - totalWidth) / 2
    const startY = (canvas.height - rows * (cellSize + cellGap)) / 2

    for (let i = 0; i < daysInYear; i++) {
      const row = Math.floor(i / cellsPerRow)
      const col = i % cellsPerRow

      const x = startX + col * (cellSize + cellGap)
      const y = startY + row * (cellSize + cellGap)

      const activity = activityData[i]
      let color

      if (activity === 0) {
        color = "rgba(255, 255, 255, 0.1)"
      } else if (activity <= 2) {
        color = "rgba(0, 240, 255, 0.3)"
      } else if (activity <= 5) {
        color = "rgba(0, 240, 255, 0.5)"
      } else if (activity <= 8) {
        color = "rgba(0, 240, 255, 0.7)"
      } else {
        color = "rgba(0, 240, 255, 0.9)"
      }

      ctx.fillStyle = color
      ctx.fillRect(x, y, cellSize, cellSize)
    }
  }

  drawHeatmap()

  // Redraw on window resize
  window.addEventListener("resize", () => {
    canvas.width = heatmapContainer.offsetWidth
    drawHeatmap()
  })
}

// Project modal initialization
function initProjectModal() {
  const modal = document.getElementById("projectModal")
  if (!modal) return

  const modalClose = modal.querySelector(".modal-close")
  const modalBody = modal.querySelector(".modal-body")
  const projectLinks = document.querySelectorAll(".project-link")

  projectLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const projectId = link.getAttribute("data-link")
      const projectTitle = link.parentElement.querySelector(".project-title").textContent

      // Set modal content based on project
      modalBody.innerHTML = `
        <h2 class="text-3xl font-bold mb-6">${projectTitle}</h2>
        <div class="project-details">
          <p class="mb-4">This is a detailed view of the ${projectTitle} project. In a real portfolio, this would contain comprehensive information about the project, including:</p>
          <ul class="list-disc pl-6 mb-6">
            <li>Project overview and objectives</li>
            <li>Technologies and methodologies used</li>
            <li>Key challenges and solutions</li>
            <li>Results and impact</li>
            <li>Visual demonstrations (images, videos, interactive elements)</li>
          </ul>
          <p>The content would be tailored to showcase the specific achievements and technical expertise demonstrated in this project.</p>
        </div>
      `

      // Show modal
      modal.classList.add("active")
    })
  })

  // Close modal on click
  modalClose.addEventListener("click", () => {
    modal.classList.remove("active")
  })

  // Close modal on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active")
    }
  })
}

// Form interactions initialization
function initFormInteractions() {
  const form = document.getElementById("contactForm")
  if (!form) return

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Simulate form submission
    const submitButton = form.querySelector(".submit-button")
    const originalText = submitButton.querySelector(".button-text").textContent

    submitButton.disabled = true
    submitButton.textContent = "SENDING..."

    setTimeout(() => {
      submitButton.querySelector(".button-text").textContent = "SENT!"

      setTimeout(() => {
        submitButton.disabled = false
        submitButton.querySelector(".button-text").textContent = originalText
        form.reset()
      }, 2000)
    }, 1500)
  })
}

// Voice commands initialization
function initVoiceCommands() {
  const voiceCommand = document.querySelector(".voice-command")
  if (!voiceCommand) return

  // Check if speech recognition is supported
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    // Show voice command indicator
    setTimeout(() => {
      voiceCommand.classList.add("active")

      setTimeout(() => {
        voiceCommand.classList.remove("active")
      }, 5000)
    }, 5000)

    // Listen for voice commands on click
    voiceCommand.addEventListener("click", () => {
      voiceCommand.classList.add("active")
      recognition.start()
    })

    // Process voice commands
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase()

      if (command.includes("navigate to") || command.includes("go to")) {
        if (command.includes("home")) {
          navigateToPage("index.html")
        } else if (command.includes("about")) {
          navigateToPage("about.html")
        } else if (command.includes("projects")) {
          navigateToPage("projects.html")
        } else if (command.includes("skills")) {
          navigateToPage("skills.html")
        } else if (command.includes("contact")) {
          navigateToPage("contact.html")
        }
      }

      voiceCommand.classList.remove("active")
    }

    recognition.onend = () => {
      voiceCommand.classList.remove("active")
    }

    recognition.onerror = () => {
      voiceCommand.classList.remove("active")
    }
  } else {
    // Hide voice command if not supported
    voiceCommand.style.display = "none"
  }
}

// Audio initialization
function initAudio() {
  const audioControl = document.querySelector(".audio-control")
  if (!audioControl) return

  let audioContext
  let oscillator
  let gainNode
  let isPlaying = false

  audioControl.addEventListener("click", () => {
    if (!audioContext) {
      // Initialize audio context
      audioContext = new (window.AudioContext || window.webkitAudioContext)()

      // Create oscillator
      oscillator = audioContext.createOscillator()
      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime)

      // Create gain node
      gainNode = audioContext.createGain()
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)

      // Connect nodes
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Start oscillator
      oscillator.start()
    }

    if (isPlaying) {
      // Fade out
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1)
      isPlaying = false
      audioControl.classList.remove("active")
    } else {
      // Fade in
      gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 1)
      isPlaying = true
      audioControl.classList.add("active")
    }
  })
}

// Page transitions initialization
function initPageTransitions() {
  const pageTransition = document.querySelector(".page-transition")
  if (!pageTransition) return

  // Add click event to all navigation links
  const navLinks = document.querySelectorAll(".nav-item")
  const exploreButton = document.getElementById("exploreButton")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.classList.contains("active")) return

      e.preventDefault()
      const href = link.getAttribute("href")

      // Trigger page transition
      pageTransition.classList.add("active")

      setTimeout(() => {
        window.location.href = href
      }, 500)
    })
  })

  // Add click event to explore button
  if (exploreButton) {
    exploreButton.addEventListener("click", (e) => {
      e.preventDefault()

      // Trigger page transition
      pageTransition.classList.add("active")

      setTimeout(() => {
        window.location.href = "projects.html"
      }, 500)
    })
  }

  // Function to navigate to a page (used by voice commands)
  window.navigateToPage = (href) => {
    // Trigger page transition
    pageTransition.classList.add("active")

    setTimeout(() => {
      window.location.href = href
    }, 500)
  }
}

// Accessibility features initialization
function initAccessibility() {
  // Add skip to content link
  const skipLink = document.createElement("a")
  skipLink.href = "#hero"
  skipLink.className = "skip-link"
  skipLink.textContent = "Skip to content"
  document.body.insertBefore(skipLink, document.body.firstChild)

  // Add ARIA labels to interactive elements
  document.querySelectorAll("button, a").forEach((element) => {
    if (!element.getAttribute("aria-label") && !element.textContent.trim()) {
      const parentText = element.parentElement.textContent.trim()
      if (parentText) {
        element.setAttribute("aria-label", parentText)
      }
    }
  })

  // Make canvas elements accessible
  document.querySelectorAll("canvas").forEach((canvas) => {
    canvas.setAttribute("aria-hidden", "true")

    // Add description for screen readers
    const canvasType = canvas.getAttribute("data-visualization") || canvas.id
    if (canvasType) {
      const description = document.createElement("span")
      description.className = "sr-only"

      switch (canvasType) {
        case "neuralNetworkCanvas":
          description.textContent = "Animated visualization of a neural network with nodes and connections"
          break
        case "neural":
          description.textContent = "Visualization of neural architecture project"
          break
        case "quantum":
          description.textContent = "Visualization of quantum predictor project"
          break
        case "synapse":
          description.textContent = "Visualization of synapse project"
          break
        case "particleCanvas":
          description.textContent = "Background particle animation"
          break
        default:
          description.textContent = "Visual animation"
      }

      canvas.parentElement.insertBefore(description, canvas)
    }
  })
}

function initSkillAnimations() {
  const skillProgressBars = document.querySelectorAll(".skill-progress")

  if (skillProgressBars.length === 0) return

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Function to animate progress bars when they come into view
  function animateProgressBars() {
    skillProgressBars.forEach((bar) => {
      if (isInViewport(bar) && !bar.classList.contains("animated")) {
        const progress = bar.getAttribute("data-progress")
        bar.style.width = `${progress}%`
        bar.classList.add("animated")
      }
    })
  }

  // Initial check
  animateProgressBars()

  // Check on scroll
  window.addEventListener("scroll", animateProgressBars)
}
