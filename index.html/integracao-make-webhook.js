// INTEGRAÇÃO COM MAKE.COM (ZAPIER ALTERNATIVO)
// Substitua no js/main.js

leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        nome: document.getElementById('nome').value,
        cargo: document.getElementById('cargo').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        empresa: document.getElementById('empresa').value,
        funcionarios: document.getElementById('funcionarios').value,
        mensagem: document.getElementById('mensagem').value,
        timestamp: new Date().toISOString(),
        pagina: window.location.href
    };
    
    try {
        // Webhook URL do Make.com
        // 1. Acesse make.com
        // 2. Crie novo Scenario
        // 3. Adicione Webhook > Custom Webhook
        // 4. Copie a URL gerada
        const WEBHOOK_URL = 'https://hook.us1.make.com/XXXXXXXXXXXXXXX';
        
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) throw new Error('Erro ao enviar webhook');
        
        console.log('Lead enviado para Make.com:', formData);
        
        // Sucesso
        leadForm.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Redireciona para WhatsApp após 2 segundos
        setTimeout(() => {
            const whatsappMsg = encodeURIComponent(
                `Olá! Solicitei o diagnóstico gratuito NR-1.\n\n` +
                `Nome: ${formData.nome}\n` +
                `Empresa: ${formData.empresa}\n` +
                `Telefone: ${formData.telefone}`
            );
            window.location.href = `https://wa.me/5511999999999?text=${whatsappMsg}`;
        }, 2000);
        
        // Limpa localStorage
        localStorage.removeItem('leadFormData');
        
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar. Por favor, entre em contato via WhatsApp.');
    }
});

// AUTOMAÇÃO SUGERIDA NO MAKE.COM:
// 
// Webhook → Múltiplas ações paralelas:
// 1. Google Sheets (adicionar linha)
// 2. Gmail (enviar notificação para você)
// 3. WhatsApp Business API (mensagem automática para lead)
// 4. Notion/Trello (criar card de follow-up)
// 5. Google Calendar (agendar lembrete de contato)
