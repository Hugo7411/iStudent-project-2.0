// ============================================
//  CONTACT PAGE — Form, FAQ, Status
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initBusinessStatus();
    initFAQ();
    initForm();
    initOrderNumberToggle();
    initCharCounter();
});

// ---- Business Hours Status Badge ----
function initBusinessStatus() {
    const badge = document.getElementById('statusBadge');
    if (!badge) return;

    // South Africa time (UTC+2)
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' }));
    const day = now.getDay();   // 0=Sun, 1=Mon ... 6=Sat
    const hour = now.getHours();
    const min = now.getMinutes();
    const time = hour + min / 60;

    let isOpen = false;
    if (day >= 1 && day <= 5 && time >= 8 && time < 17) isOpen = true;  // Mon–Fri 08:00–17:00
    if (day === 6 && time >= 9 && time < 13) isOpen = true;  // Sat 09:00–13:00

    badge.className = `status-badge ${isOpen ? 'open' : 'closed'}`;
    badge.innerHTML = `<span class="status-dot"></span>${isOpen ? 'We\'re open now' : 'Currently closed'}`;
}

// ---- FAQ Accordion ----
function initFAQ() {
    document.querySelectorAll('.faq-q').forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const expanded = btn.getAttribute('aria-expanded') === 'true';

            // Close all others
            document.querySelectorAll('.faq-q').forEach(other => {
                if (other !== btn) {
                    other.setAttribute('aria-expanded', 'false');
                    other.nextElementSibling.classList.remove('open');
                }
            });

            btn.setAttribute('aria-expanded', String(!expanded));
            answer.classList.toggle('open', !expanded);
        });
    });
}

// ---- Show Order Number Field When Relevant ----
function initOrderNumberToggle() {
    const select = document.getElementById('enquiryType');
    const group = document.getElementById('orderNumberGroup');
    if (!select || !group) return;

    const orderTypes = ['order-status', 'return-refund', 'shipping-query'];

    select.addEventListener('change', () => {
        const show = orderTypes.includes(select.value);
        group.style.display = show ? 'flex' : 'none';
        // Animate in
        if (show) {
            group.style.opacity = '0';
            group.style.transform = 'translateY(-6px)';
            requestAnimationFrame(() => {
                group.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            });
        }
    });
}

// ---- Character Counter for Textarea ----
function initCharCounter() {
    const textarea = document.getElementById('message');
    const counter = document.getElementById('charCount');
    const wrapper = counter?.parentElement;
    const MAX = 1000;
    if (!textarea || !counter) return;

    textarea.setAttribute('maxlength', MAX);

    textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        counter.textContent = len;
        wrapper.className = 'char-counter';
        if (len > MAX * 0.9) wrapper.classList.add('warning');
        if (len >= MAX) wrapper.classList.add('limit');
    });
}

// ---- Form Validation & Submission ----
function initForm() {
    const form = document.getElementById('contactForm');
    const successDiv = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');
    const sendAgain = document.getElementById('sendAnotherBtn');
    if (!form) return;

    // Real-time validation on blur
    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('invalid')) validateField(field);
        });
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
        let allValid = true;

        fields.forEach(field => {
            if (!validateField(field)) allValid = false;
        });

        if (!allValid) {
            // Scroll to first error
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Simulate sending
        submitBtn.classList.add('loading');
        submitBtn.querySelector('.btn-label').textContent = 'Sending';
        submitBtn.querySelector('.btn-icon').textContent = '';

        setTimeout(() => {
            const email = document.getElementById('email').value;
            document.getElementById('successEmail').textContent = email;

            form.style.display = 'none';
            successDiv.style.display = 'flex';

            showToast('Message sent successfully!', 'success');
        }, 1400);
    });

    if (sendAgain) {
        sendAgain.addEventListener('click', () => {
            form.reset();
            form.querySelectorAll('input, textarea, select').forEach(f => {
                f.classList.remove('valid', 'invalid');
            });
            form.querySelectorAll('.field-error').forEach(e => e.textContent = '');
            document.getElementById('charCount').textContent = '0';
            document.getElementById('orderNumberGroup').style.display = 'none';

            form.style.display = 'block';
            successDiv.style.display = 'none';

            submitBtn.classList.remove('loading');
            submitBtn.querySelector('.btn-label').textContent = 'Send Message';
            submitBtn.querySelector('.btn-icon').textContent = '→';
        });
    }
}

function validateField(field) {
    const id = field.id;
    const err = document.getElementById(`err-${id}`);
    let msg = '';

    if (field.required && !field.value.trim()) {
        msg = 'This field is required.';
    } else if (field.type === 'email' && field.value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            msg = 'Please enter a valid email address.';
        }
    } else if (field.tagName === 'SELECT' && field.required && !field.value) {
        msg = 'Please select an option.';
    } else if (id === 'message' && field.value.trim().length < 10) {
        msg = 'Message must be at least 10 characters.';
    }

    field.classList.toggle('invalid', !!msg);
    field.classList.toggle('valid', !msg && !!field.value.trim());
    if (err) err.textContent = msg;
    return !msg;
}