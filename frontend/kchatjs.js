// Page Navigation Functions
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => {
    page.classList.remove("active")
  })

  // Show the selected page
  const targetPage = document.getElementById(pageId)
  if (targetPage) {
    targetPage.classList.add("active")
  }

  // Update page title
  updatePageTitle(pageId)
}

function updatePageTitle(pageId) {
  const titles = {
    "main-page": "Welcome to KCHATAI",
    "login-page": "KCHATAI Login",
    "signup-page": "KCHATAI Sign Up",
  }

  document.title = titles[pageId] || "KCHATAI"
}

// Chat Functions
let chatActive = false

function sendMessage() {
  const input = document.getElementById("chat-input")
  const message = input.value.trim()

  if (message) {
    // If this is the first message, animate the UI
    if (!chatActive) {
      activateChatInterface()
    }

    // Add the message to the chat
    addMessageToChat(message, "sent")

    // Clear the input
    input.value = ""

    // Simulate a response after a short delay
    setTimeout(() => {
      const responses = [
        "Hello! How can I help you today?",
        "That's an interesting question. Let me think about it.",
        "I'm KCHATAI, your friendly AI assistant.",
        "I'm here to assist you with any questions you might have.",
        "Could you provide more details about your question?",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      addMessageToChat(randomResponse, "received")
    }, 1000)
  }
}

function activateChatInterface() {
  // Get elements
  const logoContainer = document.getElementById("main-logo-container")
  const chatTitleContainer = document.getElementById("chat-title-container")
  const mainLogo = document.querySelector(".main-logo")
  const chatMessagesContainer = document.getElementById("chat-messages-container")
  const chatInputContainer = document.getElementById("chat-input-container")

  // Fade up the logo and title
  logoContainer.classList.add("fade-up")
  chatTitleContainer.classList.add("fade-up")
  mainLogo.classList.add("small")

  // Show the chat messages container
  setTimeout(() => {
    chatMessagesContainer.style.display = "flex"
    setTimeout(() => {
      chatMessagesContainer.classList.add("active")
    }, 50)
  }, 300)

  // Move the input to the bottom
  setTimeout(() => {
    chatInputContainer.classList.add("bottom")
  }, 300)

  chatActive = true
}

function addMessageToChat(text, type) {
  const chatMessagesContainer = document.getElementById("chat-messages-container")
  const messageElement = document.createElement("div")
  messageElement.classList.add("message", `message-${type}`)

  // Format the message text
  messageElement.innerHTML = `
    ${text}
    <span class="message-time">${formatTime(new Date())}</span>
  `

  chatMessagesContainer.appendChild(messageElement)

  // Scroll to the bottom of the chat
  chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight
}

function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

function startVoiceRecord() {
  console.log("Starting voice recording...")
  // Voice recording functionality would be implemented here
}

function startVoiceChat() {
  console.log("Starting voice chat...")
  // Voice chat functionality would be implemented here
}

// File Upload Functions
function showFileUpload() {
  const popup = document.getElementById("file-upload-popup")
  popup.classList.add("active")
}

function closeFileUpload() {
  const popup = document.getElementById("file-upload-popup")
  popup.classList.remove("active")
}

function selectFile() {
  const fileInput = document.getElementById("file-input")
  fileInput.click()
}

function selectPhoto() {
  const photoInput = document.getElementById("photo-input")
  photoInput.click()
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Chat input enter key handler
  const chatInput = document.getElementById("chat-input")
  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage()
      }
    })
  }

  // File input handlers
  const fileInput = document.getElementById("file-input")
  const photoInput = document.getElementById("photo-input")

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        console.log("File selected:", file.name)
        closeFileUpload()
        if (!chatActive) {
          activateChatInterface()
        }
        addMessageToChat(`File attached: ${file.name}`, "sent")
      }
    })
  }

  if (photoInput) {
    photoInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        console.log("Photo selected:", file.name)
        closeFileUpload()
        if (!chatActive) {
          activateChatInterface()
        }
        addMessageToChat(`Photo attached: ${file.name}`, "sent")
      }
    })
  }

  // Close popup when clicking outside
  const popup = document.getElementById("file-upload-popup")
  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        closeFileUpload()
      }
    })
  }

  // Login Form Handler
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = loginForm.querySelector('input[type="text"]').value
      const password = loginForm.querySelector('input[type="password"]').value

      if (!email || !password) {
        alert("Please fill in all fields")
        return
      }

      alert("Login successful! Redirecting...")
      showPage("main-page")
    })
  }

  // Signup Form Handler
  const signupForm = document.getElementById("signupForm")
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const inputs = signupForm.querySelectorAll("input")
      const fullName = inputs[0].value
      const email = inputs[1].value
      const password = inputs[2].value
      const confirmPassword = inputs[3].value
      const termsAccepted = document.getElementById("terms").checked

      if (!fullName || !email || !password || !confirmPassword) {
        alert("Please fill in all fields")
        return
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match")
        return
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters long")
        return
      }

      if (!termsAccepted) {
        alert("Please accept the Terms & Conditions")
        return
      }

      alert("Account created successfully! Please log in.")
      showPage("login-page")
    })
  }

  // Social Login Handlers
  const googleButtons = document.querySelectorAll(".google-login, .google-signup-small")
  googleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("Google authentication would be implemented here")
    })
  })

  const facebookButton = document.querySelector(".facebook-signup-small")
  if (facebookButton) {
    facebookButton.addEventListener("click", () => {
      alert("Facebook authentication would be implemented here")
    })
  }

  // Initialize the application
  showPage("main-page")
})

// Top Right Tools Functions
// Sidebar Toggle
let sidebarOpen = false

function showMoreTools() {
  console.log("showMoreTools called") // Debug log
  const sidebar = document.getElementById("sidebar")

  if (!sidebar) {
    console.error("Sidebar element not found!")
    return
  }

  if (sidebarOpen) {
    sidebar.classList.remove("active")
    sidebarOpen = false
    console.log("Sidebar closed")
  } else {
    sidebar.classList.add("active")
    sidebarOpen = true
    console.log("Sidebar opened")
  }
}

// Theme Options
let themePopupOpen = false

function showThemeOptions() {
  const themePopup = document.getElementById("theme-popup")

  if (themePopupOpen) {
    themePopup.classList.remove("active")
    themePopupOpen = false
  } else {
    themePopup.classList.add("active")
    themePopupOpen = true

    // Close theme popup when clicking outside
    document.addEventListener("click", closeThemePopupOnClickOutside)
  }
}

function closeThemePopupOnClickOutside(event) {
  const themePopup = document.getElementById("theme-popup")
  const clickedElement = event.target

  // Check if the clicked element is not part of the theme popup or the theme option
  if (
    !themePopup.contains(clickedElement) &&
    !clickedElement.closest('.sidebar-option[onclick="showThemeOptions()"]')
  ) {
    themePopup.classList.remove("active")
    themePopupOpen = false
    document.removeEventListener("click", closeThemePopupOnClickOutside)
  }
}

// Theme System
function setTheme(theme) {
  console.log(`Setting theme to: ${theme}`)

  const body = document.body

  // Remove existing theme classes
  body.classList.remove("dark-theme", "light-theme")

  // Apply the selected theme
  if (theme === "dark") {
    body.classList.add("dark-theme")
    localStorage.setItem("theme", "dark")
  } else if (theme === "light") {
    body.classList.add("light-theme")
    localStorage.setItem("theme", "light")
  } else if (theme === "system") {
    // For system theme, detect user's preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      body.classList.add("dark-theme")
    } else {
      body.classList.add("light-theme")
    }
    localStorage.setItem("theme", "system")
  }

  // Close the popup
  const themePopup = document.getElementById("theme-popup")
  themePopup.classList.remove("active")
  themePopupOpen = false
}

// Load saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light"
  setTheme(savedTheme)
})

function startNewChat() {
  console.log("New chat clicked")

  // Close sidebar if open
  if (sidebarOpen) {
    document.getElementById("sidebar").classList.remove("active")
    sidebarOpen = false
  }

  // Reset the chat interface
  if (chatActive) {
    // Reset to initial state
    const logoContainer = document.getElementById("main-logo-container")
    const chatTitleContainer = document.getElementById("chat-title-container")
    const mainLogo = document.querySelector(".main-logo")
    const chatMessagesContainer = document.getElementById("chat-messages-container")
    const chatInputContainer = document.getElementById("chat-input-container")

    // Remove active classes
    logoContainer.classList.remove("fade-up")
    chatTitleContainer.classList.remove("fade-up")
    mainLogo.classList.remove("small")
    chatMessagesContainer.classList.remove("active")
    chatInputContainer.classList.remove("bottom")

    // Hide chat messages
    chatMessagesContainer.style.display = "none"
    chatMessagesContainer.innerHTML = ""

    // Clear input
    document.getElementById("chat-input").value = ""

    // Reset chat state
    chatActive = false

    console.log("New chat started - interface reset")
  } else {
    console.log("Already on fresh chat")
  }
}

// Add chat history functionality
function addChatToHistory(message) {
  // This function would add a new chat to the history
  // For now, we'll just log it
  console.log(`Adding to history: ${message}`)
  // In a real implementation, you would add a new history-item to the DOM
}
