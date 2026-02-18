# 📊 **GUIA COMPLETO: PARA ONDE VÃO OS LEADS?**

## 🎯 **OPÇÕES DISPONÍVEIS (Do mais simples ao mais avançado)**

---

## ✅ **OPÇÃO 1: GOOGLE SHEETS (RECOMENDADO PARA COMEÇAR)**

### **Por que escolher:**
- ✅ Gratuito
- ✅ Setup em 10 minutos
- ✅ Não precisa de backend
- ✅ Envio automático de e-mail de notificação
- ✅ Ideal para validar MVP

### **Como configurar:**

#### **Passo 1: Criar Planilha**
1. Acesse: https://sheets.google.com
2. Crie nova planilha: "Leads NR-1 - Adhamos"
3. Copie o ID da URL:
   ```
   https://docs.google.com/spreadsheets/d/1AbC123XyZ.../edit
                                         ^^^^^^^^^ (copie isso)
   ```

#### **Passo 2: Criar Google Apps Script**
1. Acesse: https://script.google.com
2. Clique em "Novo projeto"
3. Cole o código do arquivo `google-apps-script.gs`
4. Na linha 10, substitua por seu ID da planilha:
   ```javascript
   const SHEET_ID = 'COLE_SEU_ID_AQUI';
   ```
5. Na linha 34, coloque seu e-mail:
   ```javascript
   const emailDestino = 'seuemail@adhamos.com.br';
   ```

#### **Passo 3: Deploy do Script**
1. Clique em "Deploy" > "Nova implantação"
2. Tipo: "Aplicativo da Web"
3. Execute como: "Eu (seu@email.com)"
4. Quem tem acesso: "Qualquer pessoa"
5. Clique em "Implantar"
6. **COPIE A URL** gerada (termina com `/exec`)

#### **Passo 4: Atualizar Landing Page**
1. Abra `js/main.js`
2. Encontre a linha ~44
3. Substitua:
   ```javascript
   const SCRIPT_URL = 'COLE_A_URL_DO_PASSO_3_AQUI';
   ```
4. Salve e faça upload do site

#### **Passo 5: Testar**
1. Abra sua landing page
2. Preencha o formulário
3. Envie
4. Verifique:
   - ✅ Planilha tem nova linha?
   - ✅ Recebeu e-mail?
   - ✅ Página mostrou mensagem de sucesso?

### **Resultado:**
Cada lead será:
- 📊 Registrado na planilha automaticamente
- 📧 Notificado via e-mail para você
- 📱 Redirecionado para WhatsApp (opcional)

---

## 🚀 **OPÇÃO 2: RD STATION**

### **Por que escolher:**
- ✅ CRM completo
- ✅ Automação de e-mails
- ✅ Lead scoring
- ✅ Funil de vendas visual
- ✅ Integração com várias ferramentas

### **Como configurar:**

#### **Passo 1: Obter Token**
1. Login no RD Station
2. Marketing > Integrações > Token Público
3. Copie seu token

#### **Passo 2: Atualizar Landing Page**
1. Abra `integracao-rdstation.js`
2. Cole seu token:
   ```javascript
   const RD_TOKEN = 'SEU_TOKEN_AQUI';
   ```
3. Copie o conteúdo completo
4. Cole no `js/main.js` (substitua a função do formulário)

#### **Passo 3: Criar Campos Personalizados no RD**
Crie estes campos no RD Station:
- `cf_numero_funcionarios` (texto)
- `cf_mensagem` (texto longo)

#### **Passo 4: Configurar Automação**
No RD Station, crie fluxo:
1. Lead chega com tag "Diagnóstico Gratuito"
2. Aguarda 2 minutos
3. Envia e-mail de boas-vindas
4. Aguarda 24h
5. Se não converteu, envia follow-up

---

## ⚡ **OPÇÃO 3: MAKE.COM (EX-INTEGROMAT)**

### **Por que escolher:**
- ✅ Mais flexível que Zapier
- ✅ Conecta com +1000 apps
- ✅ Plano gratuito generoso
- ✅ Visual workflow builder

### **Como configurar:**

#### **Passo 1: Criar Conta**
1. Acesse: https://make.com
2. Crie conta gratuita

#### **Passo 2: Criar Scenario**
1. Novo Scenario
2. Adicione módulo "Webhooks" > "Custom Webhook"
3. Clique em "Create a webhook"
4. **COPIE A URL** gerada

#### **Passo 3: Adicionar Ações**
Adicione módulos após o webhook:

**Configuração recomendada:**
```
Webhook (recebe lead)
    ├─> Google Sheets (registra)
    ├─> Gmail (notifica você)
    ├─> WhatsApp Business API (msg automática)
    └─> Notion/Trello (cria task)
```

#### **Passo 4: Atualizar Landing Page**
1. Abra `integracao-make-webhook.js`
2. Cole a URL do webhook:
   ```javascript
   const WEBHOOK_URL = 'SUA_URL_AQUI';
   ```
3. Copie e cole no `js/main.js`

### **Automação Sugerida no Make:**

**Módulo 1: Google Sheets**
- Ação: Add a Row
- Planilha: Leads NR-1
- Valores: mapear todos os campos

**Módulo 2: Gmail**
- Ação: Send an Email
- To: seuemail@adhamos.com.br
- Subject: `🔔 Novo Lead: {{empresa}}`
- Body: Template HTML com todos os dados

**Módulo 3: WhatsApp Business**
- Ação: Send Template Message
- To: {{telefone}}
- Template: "Olá {{nome}}, recebemos sua solicitação..."

**Módulo 4: Notion**
- Ação: Create a Database Item
- Database: CRM Adhamos
- Status: "Novo Lead"
- Follow-up: +24h

---

## 💼 **OPÇÃO 4: HUBSPOT**

### **Como configurar:**

#### **Passo 1: Criar Form no HubSpot**
1. Marketing > Lead Capture > Forms
2. Create form > Embedded form
3. Adicione os mesmos campos da landing

#### **Passo 2: Obter Código**
1. Publish > Embed code
2. Copie o código JavaScript

#### **Passo 3: Integrar**
Duas opções:

**A) Substituir formulário HTML pelo do HubSpot**
- Cole o código do HubSpot no lugar do form
- Perderá o design customizado

**B) Usar HubSpot API (recomendado)**
```javascript
const PORTAL_ID = 'SEU_PORTAL_ID';
const FORM_GUID = 'SEU_FORM_GUID';

fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        fields: [
            { name: 'firstname', value: formData.nome.split(' ')[0] },
            { name: 'lastname', value: formData.nome.split(' ').slice(1).join(' ') },
            { name: 'email', value: formData.email },
            { name: 'phone', value: formData.telefone },
            { name: 'company', value: formData.empresa }
        ]
    })
});
```

---

## 📱 **OPÇÃO 5: APENAS WHATSAPP (MAIS SIMPLES)**

Se você quer **SUPER SIMPLES** e não se importa em não ter CRM:

### **Configure assim:**

No `js/main.js`, substitua por:

```javascript
leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const empresa = document.getElementById('empresa').value;
    const funcionarios = document.getElementById('funcionarios').value;
    const mensagem = document.getElementById('mensagem').value;
    
    const whatsappMsg = encodeURIComponent(
        `🔔 *SOLICITAÇÃO DE DIAGNÓSTICO NR-1*\n\n` +
        `📋 *Nome:* ${nome}\n` +
        `💼 *Cargo:* ${cargo}\n` +
        `🏢 *Empresa:* ${empresa}\n` +
        `📊 *Funcionários:* ${funcionarios}\n` +
        `📧 *E-mail:* ${email}\n` +
        `📱 *Telefone:* ${telefone}\n\n` +
        `💬 *Mensagem:*\n${mensagem || 'Não informada'}`
    );
    
    // Redireciona direto para WhatsApp
    window.location.href = `https://wa.me/5511999999999?text=${whatsappMsg}`;
});
```

**Vantagens:**
- ✅ Zero configuração
- ✅ Lead chega direto no WhatsApp
- ✅ 100% de entrega

**Desvantagens:**
- ❌ Sem registro automático
- ❌ Sem e-mail de confirmação
- ❌ Sem automação
- ❌ Lead pode desistir antes de enviar WhatsApp

---

## 📊 **COMPARAÇÃO DAS OPÇÕES:**

| Opção | Custo | Complexidade | Tempo Setup | Automação | Recomendado Para |
|-------|-------|-------------|-------------|-----------|------------------|
| **Google Sheets** | Grátis | ⭐⭐☆☆☆ | 10 min | Básica | MVP/Validação |
| **RD Station** | R$ 69/mês | ⭐⭐⭐☆☆ | 30 min | Avançada | Marketing Ativo |
| **Make.com** | Grátis até 1000 ops | ⭐⭐⭐⭐☆ | 20 min | Máxima | Quem quer flexibilidade |
| **HubSpot** | Grátis (básico) | ⭐⭐⭐☆☆ | 20 min | Média | CRM Completo |
| **Apenas WhatsApp** | Grátis | ⭐☆☆☆☆ | 5 min | Nenhuma | Teste Rápido |

---

## 🏆 **MINHA RECOMENDAÇÃO:**

### **Para começar HOJE:**
1. **Google Sheets** (registra tudo)
2. **+ Redirecionamento WhatsApp** (contato imediato)

### **Depois de 50 leads:**
Migre para:
- **RD Station** (se vai fazer e-mail marketing)
- **Make.com** (se quer automação complexa)
- **HubSpot** (se quer CRM completo)

---

## 🔧 **IMPLEMENTAÇÃO PASSO A PASSO (Google Sheets):**

### **Configuração Completa em 15 minutos:**

#### **1. Preparação (2 min)**
- [ ] Criar planilha no Google Sheets
- [ ] Copiar ID da planilha

#### **2. Google Apps Script (5 min)**
- [ ] Criar novo projeto
- [ ] Colar código do `google-apps-script.gs`
- [ ] Substituir ID da planilha
- [ ] Substituir e-mail de destino

#### **3. Deploy (3 min)**
- [ ] Deploy > Nova implantação
- [ ] Tipo: Aplicativo Web
- [ ] Copiar URL gerada

#### **4. Atualizar Landing Page (3 min)**
- [ ] Abrir `js/main.js`
- [ ] Colar código de `integracao-google-sheets.js`
- [ ] Substituir URL do script
- [ ] Salvar

#### **5. Upload e Teste (2 min)**
- [ ] Fazer upload dos arquivos
- [ ] Testar formulário
- [ ] Verificar planilha
- [ ] Verificar e-mail recebido

---

## ✅ **CHECKLIST DE VALIDAÇÃO:**

Após configurar, teste:

- [ ] Formulário envia sem erro?
- [ ] Lead aparece na planilha?
- [ ] E-mail de notificação chegou?
- [ ] Mensagem de sucesso aparece?
- [ ] Redirecionamento WhatsApp funciona?
- [ ] Dados estão completos?
- [ ] Formato está correto?

---

## 🆘 **PROBLEMAS COMUNS:**

### **"Erro CORS"**
**Solução:** Use `mode: 'no-cors'` no fetch

### **"Script não autorizado"**
**Solução:** No Apps Script, certifique-se:
- Execute as: "Eu"
- Acesso: "Qualquer pessoa"

### **"Planilha não atualiza"**
**Solução:** 
- Verifique ID da planilha
- Teste URL do script no navegador

### **"E-mail não chega"**
**Solução:**
- Verifique spam
- Confirme e-mail no código

---

## 📞 **PRECISA DE AJUDA?**

Se tiver dúvidas na configuração, me avise qual opção escolheu e onde travou!

**Qual opção você quer implementar primeiro?** 🚀