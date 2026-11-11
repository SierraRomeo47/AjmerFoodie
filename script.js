/**
 * AJMERFOODIE | DR. SHIKHA MATHUR
 * Interactive Behaviors, Dynamic Form Handlers & Social Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Toast Notification Helper
  const toastNotice = document.getElementById('toastNotice');
  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  // 4. Copy to Clipboard for Email & Phone
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('Drskhmat29@gmail.com')
        .then(() => showToast('✅ Email copied: Drskhmat29@gmail.com'))
        .catch(() => showToast('Email: Drskhmat29@gmail.com'));
    });
  }

  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+918005888490')
        .then(() => showToast('✅ Phone/WhatsApp copied: +91-8005888490'))
        .catch(() => showToast('Phone: +91-8005888490'));
    });
  }

  // 5. Portfolio Category Filter
  const tabButtons = document.querySelectorAll('.tab-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filter === 'all' || itemCat === filter) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });

  // 6. Collaboration Package Selection -> Auto-fill Form
  const selectPackageBtns = document.querySelectorAll('.select-package-btn');
  const briefTextarea = document.getElementById('campaignBrief');
  const budgetSelect = document.getElementById('campaignBudget');

  selectPackageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgName = btn.getAttribute('data-package');
      
      // Scroll smoothly to inquiry form
      const inquirySection = document.getElementById('inquiry');
      if (inquirySection) {
        inquirySection.scrollIntoView({ behavior: 'smooth' });
      }

      // Pre-populate brief with package name
      if (briefTextarea) {
        briefTextarea.value = `Hi Dr. Shikha, we would like to collaborate under the [${pkgName}] package.\n\nCampaign Details: `;
        briefTextarea.focus();
      }

      // Preselect reasonable budget option if applicable
      if (budgetSelect) {
        if (pkgName.includes('Spotlight')) {
          budgetSelect.value = '₹15,000 - ₹35,000';
        } else if (pkgName.includes('360°')) {
          budgetSelect.value = '₹35,000 - ₹75,000';
        } else if (pkgName.includes('Resort')) {
          budgetSelect.value = '₹75,000 - ₹1,50,000';
        }
      }

      showToast(`Selected: ${pkgName}`);
    });
  });

  // 7. FAQ Accordion Toggle
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close other items
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 8. Form Validation & Data Extraction
  const form = document.getElementById('collabForm');
  const brandName = document.getElementById('brandName');
  const contactPerson = document.getElementById('contactPerson');
  const brandEmail = document.getElementById('brandEmail');
  const brandPhone = document.getElementById('brandPhone');
  const feedbackEl = document.getElementById('formFeedback');

  function validateForm() {
    let isValid = true;

    // Reset error states
    [brandName, contactPerson, brandEmail, brandPhone].forEach(input => {
      input.classList.remove('invalid');
    });

    if (!brandName.value.trim()) {
      brandName.classList.add('invalid');
      isValid = false;
    }

    if (!contactPerson.value.trim()) {
      contactPerson.classList.add('invalid');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!brandEmail.value.trim() || !emailRegex.test(brandEmail.value.trim())) {
      brandEmail.classList.add('invalid');
      isValid = false;
    }

    if (!brandPhone.value.trim() || brandPhone.value.trim().length < 8) {
      brandPhone.classList.add('invalid');
      isValid = false;
    }

    return isValid;
  }

  function getFormData() {
    const category = document.querySelector('input[name="collabCategory"]:checked')?.value || 'Brand Collaboration';
    
    const deliverables = [];
    document.querySelectorAll('input[name="deliverables"]:checked').forEach(cb => {
      deliverables.push(cb.value);
    });

    const timeline = document.getElementById('campaignTimeline')?.value || 'This Month';
    const budget = document.getElementById('campaignBudget')?.value || 'Discuss';
    const brief = document.getElementById('campaignBrief')?.value.trim() || 'Excited to discuss collaboration details.';

    return {
      brand: brandName.value.trim(),
      contact: contactPerson.value.trim(),
      email: brandEmail.value.trim(),
      phone: brandPhone.value.trim(),
      category: category,
      deliverables: deliverables.length ? deliverables.join(', ') : 'Reels / Stories',
      timeline: timeline,
      budget: budget,
      brief: brief
    };
  }

  // 9. Send via WhatsApp Fast-Track Handler
  const whatsappSubmitBtn = document.getElementById('whatsappSubmitBtn');
  if (whatsappSubmitBtn) {
    whatsappSubmitBtn.addEventListener('click', () => {
      if (!validateForm()) {
        showToast('⚠️ Please fill out all required fields first.');
        return;
      }

      const data = getFormData();
      const message = 
`🌟 *New Brand Collaboration Inquiry for AjmerFoodie* 🌟
-------------------------------------
🏢 *Brand:* ${data.brand}
👤 *Contact Person:* ${data.contact}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🏷️ *Category:* ${data.category}
🎬 *Deliverables:* ${data.deliverables}
🗓️ *Timeline:* ${data.timeline}
💰 *Budget:* ${data.budget}

📝 *Campaign Brief:*
${data.brief}
-------------------------------------
Sent via AjmerFoodie Official Collaboration Portal`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/918005888490?text=${encodedMsg}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Feedback
      if (feedbackEl) {
        feedbackEl.className = 'form-feedback success';
        feedbackEl.innerHTML = `
          <strong>✨ Opening WhatsApp Chat!</strong><br>
          Your inquiry is pre-filled and being sent directly to Dr. Shikha Mathur at <strong>+91-8005888490</strong>. We will get back to you shortly!
        `;
      }
    });
  }

  // 10. Send via Email Handler (Form Submit -> Vercel Serverless API + Mailto Fallback)
  const emailSubmitBtn = document.getElementById('emailSubmitBtn');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        showToast('⚠️ Please check the required fields.');
        return;
      }

      const data = getFormData();
      const originalBtnHTML = emailSubmitBtn ? emailSubmitBtn.innerHTML : '';

      if (emailSubmitBtn) {
        emailSubmitBtn.disabled = true;
        emailSubmitBtn.innerHTML = '<span>Sending Inquiry...</span>';
      }

      const triggerMailtoFallback = (refId) => {
        const subject = encodeURIComponent(`Brand Collaboration Inquiry: ${data.brand} x AjmerFoodie [${refId}]`);
        const body = encodeURIComponent(
`Hello Dr. Shikha Mathur,

We would love to collaborate with AjmerFoodie. Below are the details of our brand and proposed campaign:

Reference ID: #${refId}
Brand / Business: ${data.brand}
Contact Person: ${data.contact}
Email: ${data.email}
WhatsApp/Phone: ${data.phone}

Collaboration Category: ${data.category}
Desired Deliverables: ${data.deliverables}
Campaign Timeline: ${data.timeline}
Estimated Budget: ${data.budget}

Campaign Brief & Objectives:
${data.brief}

Looking forward to hearing from you.

Best regards,
${data.contact} (${data.brand})`
        );

        window.location.href = `mailto:Drskhmat29@gmail.com?subject=${subject}&body=${body}`;
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const result = await response.json();
          const refId = result.referenceId || ('AF-' + Math.floor(100000 + Math.random() * 900000));

          if (result.mode === 'sent_direct') {
            if (feedbackEl) {
              feedbackEl.className = 'form-feedback success';
              feedbackEl.innerHTML = `
                <strong>🎉 Inquiry Sent Successfully! (Ref: #${refId})</strong><br>
                Your collaboration request has been delivered directly to <strong>Dr. Shikha Mathur</strong>. We will get back to you within 12–24 hours!
              `;
            }
            showToast('✅ Inquiry sent directly!');
            form.reset();
            return;
          }

          // Fallback mode (e.g. RESEND_API_KEY not yet set on Vercel)
          triggerMailtoFallback(refId);
          if (feedbackEl) {
            feedbackEl.className = 'form-feedback success';
            feedbackEl.innerHTML = `
              <strong>🎉 Inquiry Logged & Email Drafted! (Ref: #${refId})</strong><br>
              Your inquiry has been logged and your email application has been launched addressed to <strong>Drskhmat29@gmail.com</strong>.<br>
              You can also fast-track this directly via <strong>WhatsApp (+91-8005888490)</strong>.
            `;
          }
          showToast('Opening email client...');
          return;
        }
      } catch (err) {
        // Static server or offline fallback
        console.warn('API endpoint unreachable, falling back to mailto:', err);
      } finally {
        if (emailSubmitBtn) {
          emailSubmitBtn.disabled = false;
          emailSubmitBtn.innerHTML = originalBtnHTML;
        }
      }

      // Direct mailto fallback if /api/contact returned non-200 or wasn't running
      const refId = 'AF-' + Math.floor(100000 + Math.random() * 900000);
      triggerMailtoFallback(refId);
      if (feedbackEl) {
        feedbackEl.className = 'form-feedback success';
        feedbackEl.innerHTML = `
          <strong>🎉 Inquiry Drafted! (Ref: #${refId})</strong><br>
          Your email application has been launched with your inquiry addressed to <strong>Drskhmat29@gmail.com</strong>.<br>
          You can also fast-track this directly via <strong>WhatsApp (+91-8005888490)</strong>.
        `;
      }
      showToast('Opening email client...');
    });
  }

  // 11. Subtle Header Scroll Shadow
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
});
