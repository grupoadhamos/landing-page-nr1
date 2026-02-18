// Smooth scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fecha todos os itens
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abre o item clicado se não estava ativo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Form handling
const leadForm = document.getElementById('leadForm');
const successMessage = document.getElementById('successMessage');

if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Coleta dados do formulário
        const formData = {
            nome: document.getElementById('nome').value,
            cargo: document.getElementById('cargo').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            empresa: document.getElementById('empresa').value,
            funcionarios: document.getElementById('funcionarios').value,
            mensagem: document.getElementById('mensagem').value,
            timestamp: new Date().toISOString()
        };
        
        try {
            // Aqui você integraria com seu backend/CRM
            // Exemplo com fetch para API:
            /*
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) throw new Error('Erro ao enviar');
            */
            
            // Simulação de envio bem-sucedido
            console.log('Lead capturado:', formData);
            
            // Esconde formulário e mostra mensagem de sucesso
            leadForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Scroll para a mensagem de sucesso
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Opcional: Envia para Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXXXXX',
                    'transaction_id': formData.timestamp
                });
            }
            
            // Opcional: Redireciona para WhatsApp após 3 segundos
            setTimeout(() => {
                const whatsappMsg = encodeURIComponent(
                    `Olá! Acabei de solicitar o diagnóstico gratuito de Riscos Psicossociais.\n\n` +
                    `Nome: ${formData.nome}\n` +
                    `Empresa: ${formData.empresa}\n` +
                    `Funcionários: ${formData.funcionarios}`
                );
                // window.location.href = `https://wa.me/5511999999999?text=${whatsappMsg}`;
            }, 3000);
            
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente ou entre em contato via WhatsApp.');
        }
    });
}

// Máscaras de input
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value;
        }
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplica animação aos elementos
document.querySelectorAll('.problem-card, .factor-card, .benefit-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contador regressivo (opcional)
function updateCountdown() {
    const targetDate = new Date('2026-05-26T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    // Você pode usar esses valores para exibir um contador na página
    console.log(`Faltam ${days} dias, ${hours} horas e ${minutes} minutos para 26/05/2026`);
}

// Atualiza contador a cada minuto
setInterval(updateCountdown, 60000);
updateCountdown();

// Tracking de eventos (exemplo para Google Analytics)
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
    }
    console.log('Event tracked:', eventName, eventParams);
}

// Tracking de cliques em CTAs
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.trim();
        trackEvent('cta_click', {
            button_text: buttonText,
            button_location: button.closest('section')?.id || 'unknown'
        });
    });
});

// Tracking de tempo na página
let timeOnPage = 0;
setInterval(() => {
    timeOnPage += 30;
    if (timeOnPage % 60 === 0) {
        trackEvent('time_on_page', {
            seconds: timeOnPage
        });
    }
}, 30000);

// Detecta saída da página (Exit Intent)
let exitIntentShown = false;
document.addEventListener('mouseout', (e) => {
    if (!exitIntentShown && e.clientY < 0) {
        exitIntentShown = true;
        // Aqui você pode exibir um popup de exit intent
        console.log('Exit intent detected!');
        trackEvent('exit_intent', {});
    }
});

// Validação adicional do formulário
if (leadForm) {
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            emailInput.setCustomValidity('Por favor, insira um e-mail válido');
            emailInput.reportValidity();
        } else {
            emailInput.setCustomValidity('');
        }
    });
}

// Sticky CTA button (opcional - aparece ao rolar)
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const formSection = document.getElementById('form');
    
    if (scrollPosition > 1000 && formSection) {
        // Aqui você pode adicionar um botão flutuante sticky
        console.log('User scrolled past hero - could show sticky CTA');
    }
});

// Auto-save do formulário no localStorage (recupera dados se recarregar)
if (leadForm) {
    // Salva dados ao digitar
    leadForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', () => {
            const formData = {};
            leadForm.querySelectorAll('input, select, textarea').forEach(f => {
                if (f.type !== 'checkbox') {
                    formData[f.id] = f.value;
                }
            });
            localStorage.setItem('leadFormData', JSON.stringify(formData));
        });
    });
    
    // Recupera dados ao carregar página
    const savedData = localStorage.getItem('leadFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        Object.keys(formData).forEach(key => {
            const field = document.getElementById(key);
            if (field && formData[key]) {
                field.value = formData[key];
            }
        });
    }
    
    // Limpa localStorage após envio bem-sucedido
    leadForm.addEventListener('submit', () => {
        localStorage.removeItem('leadFormData');
    });
}

console.log('Landing Page NR-1 Adhamos carregada com sucesso!');