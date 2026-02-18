// INTEGRAÇÃO COM RD STATION
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
        mensagem: document.getElementById('mensagem').value
    };
    
    try {
        // Token público da RD Station (Marketing > Integrações > Token)
        const RD_TOKEN = 'SEU_TOKEN_AQUI';
        
        const rdData = {
            token_rdstation: RD_TOKEN,
            identificador: 'landing-page-nr1-diagnostico',
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            empresa: formData.empresa,
            cargo: formData.cargo,
            cf_numero_funcionarios: formData.funcionarios,
            cf_mensagem: formData.mensagem,
            tags: ['NR-1', 'Diagnóstico Gratuito', 'Riscos Psicossociais']
        };
        
        const response = await fetch('https://www.rdstation.com.br/api/1.3/conversions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rdData)
        });
        
        if (!response.ok) throw new Error('Erro ao enviar para RD Station');
        
        console.log('Lead enviado para RD Station:', formData);
        
        // Sucesso
        leadForm.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXXXXX',
                'value': 2500.00,
                'currency': 'BRL'
            });
        }
        
        // Limpa localStorage
        localStorage.removeItem('leadFormData');
        
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar. Por favor, tente novamente.');
    }
});
