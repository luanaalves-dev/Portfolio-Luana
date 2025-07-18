
  const EMAIL_SERVICE_ID = "service_qnznm4d";
  const EMAIL_TEMPLATE_ID = "template_hxda4jh";
  const EMAIL_PUBLIC_KEY = "XFi8fDSQVJH0P0456";

  // Inicializar EmailJS

  emailjs.init(EMAIL_PUBLIC_KEY);

  // ========================================
  // ELEMENTOS DO DOM
  // ========================================
  const form = document.getElementById("contactForm");
  const submitButton = document.getElementById("submitButton");
  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");
  const sentMessage = document.getElementById("sentMessage");

  // ========================================
  // FUNÇÕES UTILITÁRIAS
  // ========================================
  function showMessage(type, message = "") {
    // Ocultar todas as mensagens
    loadingMessage.style.display = "none";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";

    // Mostrar a mensagem apropriada
    if (type === "loading") {
      loadingMessage.style.display = "block";
    } else if (type === "success") {
      sentMessage.style.display = "block";
    } else if (type === "error") {
      errorMessage.textContent = message;
      errorMessage.style.display = "block";
    }
  }

  function resetForm() {
    form.reset();
    submitButton.disabled = false;
    submitButton.innerHTML = "Submit Message";
  }
  function validateConfiguration() {
    if (
      EMAIL_SERVICE_ID === "YOUR_SERVICE_ID" ||
      EMAIL_TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
      EMAIL_PUBLIC_KEY === "YOUR_PUBLIC_KEY"
    ) {
      showMessage(
        "error",
        "Please configure your EmailJS credentials in the JavaScript code!"
      );
      return false;
    }
    return true;
  }

  // ========================================
  // FORM HANDLER
  // ========================================
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validate configuration
    if (!validateConfiguration()) {
      return;
    }

    // Mostrar loading
    showMessage("loading");
    submitButton.disabled = true;
    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';

    // Collect form data
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
      timestamp: new Date().toLocaleString("en-US", {
        timeZone: "Europe/Dublin",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      // Send email via EmailJS
      const response = await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        formData
      );

      console.log("✅ Email sent successfully!", response);

      // Show  success
      showMessage("success");

      // Clear form after 2 seconds
      setTimeout(() => {
        resetForm();
      }, 2000);
    } catch (error) {
      console.error(" Error sending email:", error);

      // Show up erro
      let errorMsg = "Failed to send message. Please try again.";

      if (error.text) {
        errorMsg = error.text;
      } else if (error.message) {
        errorMsg = error.message;
      }

      showMessage("error", errorMsg);

      // Re-enable button
      submitButton.disabled = false;
      submitButton.innerHTML = "Submit Message";
    }
  });

  // CONFIGURATION TEST
  // ========================================
  function testConfiguration() {
    console.log("=== EmailJS Configuration Test ===");

    if (!validateConfiguration()) {
      console.log(" EmailJS not configured yet!");
      console.log("");
      console.log("Steps to configure:");
      console.log("1. Go to https://emailjs.com and create an account");
      console.log("2. Add an email service (Gmail, Outlook, etc.)");
      console.log("3. Create an email template");
      console.log("4. Get your Service ID, Template ID, and Public Key");
      console.log("5. Replace the values in the JavaScript code");
      return;
    }

    console.log("✅ EmailJS configured successfully!");
    console.log("Service ID:", EMAIL_SERVICE_ID);
    console.log("Template ID:", EMAIL_TEMPLATE_ID);
    console.log("Public Key:", EMAIL_PUBLIC_KEY.substring(0, 8) + "...");
  }

  // Executar teste ao carregar a página
  window.addEventListener("load", testConfiguration);
