// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});


// Scroll-to-top button
const scrollBtn = document.getElementById("scrollToTop");
window.addEventListener("scroll", () => {
  if (scrollBtn) {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  }
});
scrollBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Testimonials Slider (if on home page)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial");
if (testimonials.length > 0) {
  setInterval(() => {
    testimonials[currentTestimonial].classList.remove("active");
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add("active");
  }, 5000);
}

// Contact Form Validation + Spinner Feedback
const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (name.length < 2) {
      showFeedback("Please enter a valid name (at least 2 characters).", "red");
      return;
    }

    if (!validateEmail(email)) {
      showFeedback("Please enter a valid email address.", "red");
      return;
    }

    if (message.length < 10) {
      showFeedback("Message should be at least 10 characters.", "red");
      return;
    }

    showFeedback("Sending...", "green", true);

    // Simulate network delay for user feedback
    fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          showFeedback("Thank you for contacting us! We'll get back to you shortly.", "green");
          contactForm.reset();
        } else {
          response.json().then((data) => {
            const msg = data.errors ? data.errors[0].message : "Submission failed.";
            showFeedback(msg, "red");
          });
        }
      })
      .catch(() => {
        showFeedback("Oops! There was a problem submitting the form.", "red");
      });
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFeedback(message, color, spinner = false) {
  if (feedback) {
    feedback.style.color = color;
    feedback.innerHTML = spinner
      ? `<span class="spinner"></span> ${message}`
      : message;
  }
}

// Responsive Nav Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll("nav a.nav-link");

menuToggle?.addEventListener("click", () => {
  navLinks.forEach((link) => {
    link.classList.toggle("visible");
  });
});

