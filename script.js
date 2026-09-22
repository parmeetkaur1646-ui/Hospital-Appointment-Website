const doctors = [
  {
    id: 'sarah-sharma',
    name: 'Dr. Sarah Sharma',
    specialty: 'Cardiologist',
    department: 'Cardiology',
    experience: '12 years experience',
    days: 'Mon, Wed, Fri',
    fee: '₹800',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'arjun-mehta',
    name: 'Dr. Arjun Mehta',
    specialty: 'Dermatologist',
    department: 'Dermatology',
    experience: '8 years experience',
    days: 'Tue, Thu, Sat',
    fee: '₹600',
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'priya-nair',
    name: 'Dr. Priya Nair',
    specialty: 'Pediatrician',
    department: 'Pediatrics',
    experience: '10 years experience',
    days: 'Mon – Sat',
    fee: '₹700',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'rohan-verma',
    name: 'Dr. Rohan Verma',
    specialty: 'Neurologist',
    department: 'Neurology',
    experience: '15 years experience',
    days: 'Mon, Tue, Thu',
    fee: '₹1000',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'ananya-iyer',
    name: 'Dr. Ananya Iyer',
    specialty: 'Orthopedic Specialist',
    department: 'Orthopedics',
    experience: '9 years experience',
    days: 'Wed, Fri, Sat',
    fee: '₹750',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'karan-desai',
    name: 'Dr. Karan Desai',
    specialty: 'General Physician',
    department: 'General Medicine',
    experience: '6 years experience',
    days: 'Mon – Sat',
    fee: '₹500',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
  }
];
 
function renderDoctors() {
  const grid = document.getElementById('doctorGrid');
  grid.innerHTML = doctors.map(doc => `
    <div class="doctor-card">
      <img src="${doc.image}" alt="${doc.name}" />
      <h3>${doc.name}</h3>
      <p class="doctor-specialty">${doc.specialty}</p>
      <div class="doctor-meta">
        <span><strong>Experience:</strong> ${doc.experience}</span>
        <span><strong>Available:</strong> ${doc.days}</span>
        <span><strong>Fee:</strong> ${doc.fee}</span>
      </div>
      <button class="btn btn-primary book-now-btn" data-doctor-id="${doc.id}">Book Now</button>
    </div>
  `).join('');
}

function populateDoctorSelect() {
  const select = document.getElementById('doctor');
  doctors.forEach(doc => {
    const option = document.createElement('option');
    option.value = doc.id;
    option.textContent = `${doc.name} — ${doc.specialty}`;
    select.appendChild(option);
  });
}
 
function setupMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
 
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}
 
function setupBookNowButtons() {
  const grid = document.getElementById('doctorGrid');
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.book-now-btn');
    if (!btn) return;
 
    const doctorId = btn.dataset.doctorId;
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) return;
 
    document.getElementById('doctor').value = doctorId;
    document.getElementById('department').value = doctor.department;
 
    document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
  });
}
 
function setupDateRestriction() {
  const dateInput = document.getElementById('appointmentDate');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(`err-${fieldId}`);
  field.classList.add('invalid');
  errorEl.textContent = message;
}
 
function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(`err-${fieldId}`);
  field.classList.remove('invalid');
  errorEl.textContent = '';
}
 
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
 
function isValidPhone(phone) {
  return /^\d{10}$/.test(phone.replace(/\D/g, ''));
}
 
function setupAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  const confirmationCard = document.getElementById('confirmationCard');
  const confirmationMessage = document.getElementById('confirmationMessage');
  const confirmationDetails = document.getElementById('confirmationDetails');
  const bookAnotherBtn = document.getElementById('bookAnotherBtn');
 
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
 
    const fields = {
      patientName: document.getElementById('patientName').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      department: document.getElementById('department').value,
      doctor: document.getElementById('doctor').value,
      appointmentDate: document.getElementById('appointmentDate').value,
      appointmentTime: document.getElementById('appointmentTime').value,
      reason: document.getElementById('reason').value.trim()
    };

    Object.keys(fields).forEach(clearError);
 
    if (!fields.patientName) {
      showError('patientName', 'Please enter your name.');
      isValid = false;
    }
 
    if (!fields.email) {
      showError('email', 'Email is required.');
      isValid = false;
    } else if (!isValidEmail(fields.email)) {
      showError('email', 'Please enter a valid email.');
      isValid = false;
    }
 
    if (!fields.phone) {
      showError('phone', 'Phone number is required.');
      isValid = false;
    } else if (!isValidPhone(fields.phone)) {
      showError('phone', 'Please enter a valid 10-digit number.');
      isValid = false;
    }
 
    if (!fields.department) {
      showError('department', 'Please select a department.');
      isValid = false;
    }
 
    if (!fields.doctor) {
      showError('doctor', 'Please select a doctor.');
      isValid = false;
    }
 
    if (!fields.appointmentDate) {
      showError('appointmentDate', 'Please choose a date.');
      isValid = false;
    } else {
      const today = new Date().toISOString().split('T')[0];
      if (fields.appointmentDate < today) {
        showError('appointmentDate', 'Date cannot be in the past.');
        isValid = false;
      }
    }
 
    if (!fields.appointmentTime) {
      showError('appointmentTime', 'Please choose a time.');
      isValid = false;
    }
 
    if (!fields.reason) {
      showError('reason', 'Please tell us the reason for your visit.');
      isValid = false;
    }
 
    if (!isValid) return;
 
    const doctor = doctors.find(d => d.id === fields.doctor);
    const formattedDate = new Date(fields.appointmentDate + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
 
    confirmationMessage.textContent = `Your appointment with ${doctor.name} has been successfully booked.`;
    confirmationDetails.innerHTML = `
      <div><strong>Patient:</strong> ${fields.patientName}</div>
      <div><strong>Doctor:</strong> ${doctor.name} (${doctor.specialty})</div>
      <div><strong>Department:</strong> ${fields.department}</div>
      <div><strong>Date:</strong> ${formattedDate}</div>
      <div><strong>Time:</strong> ${fields.appointmentTime}</div>
      <div><strong>Reason:</strong> ${fields.reason}</div>
    `;
 
    form.hidden = true;
    confirmationCard.hidden = false;
    confirmationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
 
  bookAnotherBtn.addEventListener('click', () => {
    form.reset();
    form.hidden = false;
    confirmationCard.hidden = true;
    Object.keys({
      patientName: 0, email: 0, phone: 0, department: 0,
      doctor: 0, appointmentDate: 0, appointmentTime: 0, reason: 0
    }).forEach(clearError);
    setupDateRestriction();
  });
}

function setupContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('contactSuccess');
 
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
 
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
 
    ['contactName', 'contactEmail', 'contactMessage'].forEach(clearError);
 
    if (!name) {
      showError('contactName', 'Please enter your name.');
      isValid = false;
    }
 
    if (!email) {
      showError('contactEmail', 'Email is required.');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('contactEmail', 'Please enter a valid email.');
      isValid = false;
    }
 
    if (!message) {
      showError('contactMessage', 'Please write a short message.');
      isValid = false;
    }
 
    if (!isValid) {
      successMsg.hidden = true;
      return;
    }
 
    successMsg.hidden = false;
    form.reset();
 
    setTimeout(() => {
      successMsg.hidden = true;
    }, 5000);
  });
}
 
function setupFooterYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}
document.addEventListener('DOMContentLoaded', () => {
  renderDoctors();
  populateDoctorSelect();
  setupMobileNav();
  setupBookNowButtons();
  setupDateRestriction();
  setupAppointmentForm();
  setupContactForm();
  setupFooterYear();
});
 