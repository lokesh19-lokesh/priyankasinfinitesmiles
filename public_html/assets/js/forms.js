/**
 * PRIYANKA'S INFINITE SMILES - FORMS JAVASCRIPT
 * Real-time frontend validation, spam honeypot check, and WhatsApp booking handoff
 */

document.addEventListener("DOMContentLoaded", () => {
  // Appointment Form & Contact Form Handlers
  const appointmentForms = document.querySelectorAll(".dental-appointment-form");

  appointmentForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Clear existing alerts
      const existingAlert = form.querySelector(".dental-alert");
      if (existingAlert) existingAlert.remove();

      // 1. Honeypot check (anti-spam)
      const honeypot = form.querySelector("input[name='website_hp']");
      if (honeypot && honeypot.value.trim() !== "") {
        console.warn("Spam bot submission blocked.");
        return;
      }

      // 2. Extract and validate fields
      const nameInput = form.querySelector("input[name='patient_name'], input[name='full_name']");
      const phoneInput = form.querySelector("input[name='phone_number'], input[name='mobile']");
      const emailInput = form.querySelector("input[name='email_address'], input[name='email']");
      const treatmentSelect = form.querySelector("select[name='treatment_required'], select[name='treatment']");
      const dateInput = form.querySelector("input[name='preferred_date']");
      const timeSelect = form.querySelector("select[name='preferred_time']");
      const messageInput = form.querySelector("textarea[name='patient_message'], textarea[name='message']");
      const consentCheckbox = form.querySelector("input[name='privacy_consent']");

      let isValid = true;
      let errorMessages = [];

      // Name validation
      if (!nameInput || nameInput.value.trim().length < 2) {
        isValid = false;
        errorMessages.push("Please enter your full name (minimum 2 characters).");
        if (nameInput) nameInput.classList.add("is-invalid");
      } else {
        if (nameInput) nameInput.classList.remove("is-invalid");
      }

      // Phone validation (Indian 10-digit format starting with 6-9)
      const cleanPhone = phoneInput ? phoneInput.value.replace(/[\s\-\(\)\+]/g, "").slice(-10) : "";
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneInput || !phoneRegex.test(cleanPhone)) {
        isValid = false;
        errorMessages.push("Please enter a valid 10-digit mobile number.");
        if (phoneInput) phoneInput.classList.add("is-invalid");
      } else {
        if (phoneInput) phoneInput.classList.remove("is-invalid");
      }

      // Email validation (optional or format check if provided)
      if (emailInput && emailInput.value.trim() !== "") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          isValid = false;
          errorMessages.push("Please enter a valid email address.");
          emailInput.classList.add("is-invalid");
        } else {
          emailInput.classList.remove("is-invalid");
        }
      }

      // Treatment selection
      if (treatmentSelect && (!treatmentSelect.value || treatmentSelect.value === "")) {
        isValid = false;
        errorMessages.push("Please select the dental treatment you require.");
        treatmentSelect.classList.add("is-invalid");
      } else if (treatmentSelect) {
        treatmentSelect.classList.remove("is-invalid");
      }

      // Date check: ensure not in the past
      if (dateInput && dateInput.value) {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          isValid = false;
          errorMessages.push("Preferred appointment date cannot be in the past.");
          dateInput.classList.add("is-invalid");
        } else {
          dateInput.classList.remove("is-invalid");
        }
      }

      // Consent check if checkbox exists
      if (consentCheckbox && !consentCheckbox.checked) {
        isValid = false;
        errorMessages.push("Please accept the privacy policy consent to proceed.");
        consentCheckbox.classList.add("is-invalid");
      } else if (consentCheckbox) {
        consentCheckbox.classList.remove("is-invalid");
      }

      // Display validation errors or proceed
      if (!isValid) {
        const alertBox = document.createElement("div");
        alertBox.className = "dental-alert dental-alert-warning";
        alertBox.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> <div><strong>Please review the form:</strong><br>${errorMessages.join("<br>")}</div>`;
        form.prepend(alertBox);
        alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      // Format appointment message for direct WhatsApp Booking Handoff
      const patientName = nameInput ? nameInput.value.trim() : "Patient";
      const patientPhone = phoneInput ? phoneInput.value.trim() : "";
      const patientEmail = emailInput ? emailInput.value.trim() : "Not provided";
      const treatmentName = treatmentSelect ? treatmentSelect.options[treatmentSelect.selectedIndex].text : "Dental Consultation";
      const prefDate = dateInput ? dateInput.value : "Soonest Available";
      const prefTime = timeSelect ? timeSelect.value : "Flexible";
      const patientMsg = messageInput && messageInput.value.trim() !== "" ? messageInput.value.trim() : "None";

      const waText = `*New Dental Appointment Request - Priyanka's Infinite Smiles*\n\n` +
        `👤 *Name:* ${patientName}\n` +
        `📱 *Phone:* ${patientPhone}\n` +
        `✉️ *Email:* ${patientEmail}\n` +
        `🦷 *Treatment:* ${treatmentName}\n` +
        `📅 *Preferred Date:* ${prefDate}\n` +
        `⏰ *Preferred Time:* ${prefTime}\n` +
        `📝 *Notes/Concern:* ${patientMsg}\n\n` +
        `_Request initiated via priyankasinfinitesmiles.com_`;

      const whatsappClinicNumber = "917893146767";
      const waUrl = `https://wa.me/${whatsappClinicNumber}?text=${encodeURIComponent(waText)}`;

      // Present success confirmation and launch WhatsApp option
      const successBox = document.createElement("div");
      successBox.className = "dental-alert dental-alert-success";
      successBox.innerHTML = `
        <i class="bi bi-check-circle-fill fs-3 text-success"></i>
        <div>
          <h5 class="mb-1 text-success font-heading">Appointment Details Ready!</h5>
          <p class="mb-2">Thank you, <strong>${patientName}</strong>. To confirm your preferred slot instantly with our Manikonda clinic coordinator, click below to send via WhatsApp or call our helpline.</p>
          <div class="d-flex flex-wrap gap-2 mt-2">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm">
              <i class="bi bi-whatsapp"></i> Confirm on WhatsApp Instantly
            </a>
            <a href="tel:+917893146767" class="btn btn-teal btn-sm">
              <i class="bi bi-telephone"></i> Call Clinic (+91 78931 46767)
            </a>
          </div>
        </div>
      `;

      form.innerHTML = "";
      form.appendChild(successBox);
      successBox.scrollIntoView({ behavior: "smooth", block: "center" });

      // Automatically open WhatsApp in a new tab after 1 second for user convenience
      setTimeout(() => {
        window.open(waUrl, "_blank");
      }, 1200);
    });
  });

  // Set minimum date for appointment inputs to today
  const todayStr = new Date().toISOString().split("T")[0];
  document.querySelectorAll("input[type='date'][name='preferred_date']").forEach(input => {
    input.setAttribute("min", todayStr);
  });
});

