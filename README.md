
# 🔐 Remoção Automática de Acessos no Google Drive  

Este script em **Google Apps Script** automatiza a **remoção de acessos de um usuário específico** em todos os arquivos e pastas compartilhadas no Google Drive. Ele é útil para empresas que precisam **revogar rapidamente permissões** de ex-colaboradores e reforçar a segurança da informação.  

## 🚀 Funcionalidades  

✔ **Busca apenas os arquivos e pastas compartilhados com um e-mail específico**  
✔ **Remove automaticamente permissões de visualizador e editor**  
✔ **Garante maior segurança e conformidade corporativa**  
✔ **Evita a necessidade de remover acessos manualmente em milhares de arquivos**  

## 🛠️ Como Usar  

1. **Acesse o Google Apps Script**  
   - Vá para [Google Apps Script](https://script.google.com) e crie um novo projeto.  

2. **Ative a API Drive**  
   - No editor do Apps Script, clique no **ícone de quebra-cabeça 🧩** (Serviços).  
   - Selecione **Drive API** e clique em **Adicionar**.  

3. **Cole o Código no Script**  
   Copie e cole este código no editor:  

   ```javascript
   function removeAccessFromSharedFiles() {
       var email = "colaborador@empresa.com"; // Substitua pelo e-mail desejado
       var count = 0;

       // Buscar apenas arquivos compartilhados com o e-mail
       var query = `'${email}' in readers or '${email}' in writers`;
       var files = Drive.Files.list({q: query, fields: "files(id, name, permissions)"});

       if (!files.files || files.files.length === 0) {
           Logger.log("Nenhum arquivo encontrado com esse e-mail.");
           return;
       }

       for (var i = 0; i < files.files.length; i++) {
           var file = files.files[i];

           try {
               // Remover permissões do usuário
               var permissions = file.permissions;
               for (var j = 0; j < permissions.length; j++) {
                   if (permissions[j].emailAddress === email) {
                       Drive.Permissions.remove(file.id, permissions[j].id);
                       Logger.log("Acesso removido de: " + file.name);
                       count++;
                       break;
                   }
               }
           } catch (e) {
               Logger.log("Erro ao remover acesso de: " + file.name + " - " + e.message);
           }
       }

       Logger.log("Acesso removido de " + count + " arquivos.");
   }
   ```

4. **Executar o Script**  
   - Clique em **Executar ▶** e autorize as permissões necessárias.  
   - O script removerá o acesso do e-mail informado em todos os arquivos e pastas compartilhados.  

## 🛡️ Segurança  

Este script **não deleta arquivos** – apenas remove permissões de acesso de um usuário específico. **Use com cautela e verifique os logs antes de aplicá-lo em larga escala.**  

## 📌 Licença  

Este projeto está sob a licença MIT – sinta-se à vontade para usá-lo e modificá-lo conforme necessário.  
