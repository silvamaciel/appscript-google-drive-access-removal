function removeAccessFromSharedFiles() {
    var email = "teste@gmail.com"; //substituir apenas o E-mail
    var count = 0;

    var query = `'${email}' in readers or '${email}' in writers`;
    var files = Drive.Files.list({q: query, fields: "files(id, name, permissions)"});

    if (!files.files || files.files.length === 0) {
        Logger.log("Nenhum arquivo encontrado com esse e-mail.");
        return;
    }

    for (var i = 0; i < files.files.length; i++) {
        var file = files.files[i];

        try {
  
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
