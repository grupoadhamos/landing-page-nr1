// INTEGRAÇÃO COM GOOGLE SHEETS
// Substitua o código do formulário no js/main.js

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
        timestamp: new Date().toLocaleString('pt-BR')
    };
    
    try {
        // URL do Google Apps Script Web App
        const SCRIPT_URL = 'https://script.google.com/macros/s/SEU_SCRIPT_ID/exec';
        
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Com no-cors, não temos acesso ao response, mas o envio funciona
        console.log('Lead enviado para Google Sheets:', formData);
        
        // Esconde formulário e mostra sucesso
        leadForm.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Limpa localStorage
        localStorage.removeItem('leadFormData');
        
        // Opcional: Redireciona para WhatsApp
        setTimeout(() => {
            const whatsappMsg = encodeURIComponent(
                `Olá! Solicitei o diagnóstico gratuito de Riscos Psicossociais NR-1.\n\n` +
                `Nome: ${formData.nome}\n` +
                `Empresa: ${formData.empresa}\n` +
                `E-mail: ${formData.email}\n` +
                `Telefone: ${formData.telefone}`
            );
            window.location.href = `https://wa.me/5511999999999?text=${whatsappMsg}`;
        }, 2000);
        
    } catch (error) {
        console.error('Erro ao enviar:', error);
        alert('Ocorreu um erro. Por favor, tente novamente ou entre em contato via WhatsApp.');
    }
});
