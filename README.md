# Tindev

Uma aplicação react-native expo inspirada no tinder, para fazer conexões com outros desenvolvedores, projeto feito para a matéria de Tópicos de Programação em Novas Tecnologias na UNESP de São José de Rio Preto.

O projeto pode ser diretamente instalado no seus dispositivo gerando uma versão de build android apk, notifique-se que o arquivo eas.json tenha a configuração necessária para gerar um android .apk

```
{
  "cli": {
    "version": ">= 3.14.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

```
eas build -p android --profile preview
```

também é possivel roda-lo em desenvolvimento alterando o arquivo eas.json para

```
{
  "cli": {
    "version": ">= 3.14.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
```

e rodando o comando:

```
npx expo start --dev-client
```

[Saiba mais como rodar em modo de desenvolvimento](https://docs.expo.dev/develop/development-builds/use-development-builds/)

## Features

- O projeto foi construido utilizando firebase como gerencidador do banco de dados firestore.
- Google Login, armazenando o usuário no firebase.
- Criação das informações de usuários após login.
- Lógica de rejeição e matchs de usuários.
- Implementação de chat com usuários que deram 'match'

# TO-DO

Note: 25/06/2023 muitos detalhes foram surgindo no projeto e somando com o trabalho, não fui capaz de implementar tudo que eu gostaria até o prazo final. no entando a essência do projeto está funcional.

- drawer navigation not working.
- set more users in firebase.
- test it with more phones.
- styles
- verify empyt cards decks
- .env variables
- notifications
- show messages not read in UI
- users with no images
