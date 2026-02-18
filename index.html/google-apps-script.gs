// GOOGLE APPS SCRIPT - Cole este código no Google Apps Script
// 1. Acesse: https://script.google.com
// 2. Novo Projeto > Cole este código
// 3. Deploy > New Deployment > Web App
// 4. Execute as: Me
// 5. Who has access: Anyone
// 6. Copie a URL gerada

function doPost(e) {
  try {
    // ID da sua planilha do Google Sheets
    const SHEET_ID = 'COLE_AQUI_O_ID_DA_SUA_PLANILHA';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);
    
    // Se a planilha estiver vazia, adiciona cabeçalhos
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Data/Hora',
        'Nome',
        'Cargo',
        'E-mail',
        'Telefone',
        'Empresa',
        'Nº Funcionários',
        'Mensagem',
        'Status'
      ]);
      
      // Formata cabeçalhos
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setBackground('#006465');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
    }
    
    // Adiciona nova linha com os dados
    sheet.appendRow([
      data.timestamp,
      data.nome,
      data.cargo,
      data.email,
      data.telefone,
      data.empresa,
      data.funcionarios,
      data.mensagem || '',
      'Novo Lead'
    ]);
    
    // Envia e-mail de notificação (opcional)
    const emailDestino = 'contato@adhamos.com.br';
    const assunto = `🔔 Novo Lead - Diagnóstico NR-1: ${data.empresa}`;
    const corpo = `
      <h2>Novo Lead Capturado!</h2>
      <p><strong>Data/Hora:</strong> ${data.timestamp}</p>
      <hr>
      <p><strong>Nome:</strong> ${data.nome}</p>
      <p><strong>Cargo:</strong> ${data.cargo}</p>
      <p><strong>E-mail:</strong> ${data.email}</p>
      <p><strong>Telefone:</strong> ${data.telefone}</p>
      <p><strong>Empresa:</strong> ${data.empresa}</p>
      <p><strong>Nº Funcionários:</strong> ${data.funcionarios}</p>
      <p><strong>Mensagem:</strong> ${data.mensagem || 'Não informada'}</p>
      <hr>
      <p><a href="https://wa.me/${data.telefone.replace(/\D/g, '')}?text=Olá%20${data.nome}">Entrar em contato via WhatsApp</a></p>
    `;
    
    MailApp.sendEmail({
      to: emailDestino,
      subject: assunto,
      htmlBody: corpo
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Lead cadastrado com sucesso'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Erro: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Google Apps Script está funcionando!');
}
