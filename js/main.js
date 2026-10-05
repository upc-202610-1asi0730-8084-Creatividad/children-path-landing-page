/* ChildrenPath Main Interactive Scripts */
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Nav Menu Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinksContainer = document.querySelector(".nav-links");

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("active");
      const isExpanded = navLinksContainer.classList.contains("active");
      navToggle.setAttribute("aria-expanded", isExpanded);
    });
  }

  // FAQ Accordion Toggle
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // Close other FAQ items in same group
        const parentList = item.closest(".faq-list");
        if (parentList) {
          parentList.querySelectorAll(".faq-item").forEach((other) => {
            if (other !== item) {
              other.classList.remove("active");
              const btn = other.querySelector(".faq-question");
              if (btn) btn.setAttribute("aria-expanded", "false");
            }
          });
        }

        item.classList.toggle("active");
        questionBtn.setAttribute("aria-expanded", !isOpen);
      });
    }
  });

  // Login Button Handler
  // Por ahora no dirige a ninguna parte, se colocara el link de la AW despues 
  const loginBtns = document.querySelectorAll(".btn-login, .btn-login-header");
  loginBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const href = btn.getAttribute("href");
      // Colocar link reemplazando a #
      if (!href || href === "#") {
        e.preventDefault();
      }
    });
  });

  // Contact Form Submission Mock
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const currentLang = localStorage.getItem("childrenpath_lang") || "en";
      const successMsg = currentLang === "es"
        ? "¡Gracias por contactarnos! Tu solicitud de demo ha sido enviada con éxito."
        : "Thank you for reaching out! Your demo request has been successfully submitted.";

      showToast(successMsg, "success");
      contactForm.reset();
    });
  }

  // Helper Toast function
  function showToast(text, type = "info") {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast-notification";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.className = `toast toast-${type} show`;

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }
});
