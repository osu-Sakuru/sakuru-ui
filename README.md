<p align="center">
  <a href="https://www.codefactor.io/repository/github/osu-sakuru/sakuru-ui">
    <img src="https://www.codefactor.io/repository/github/osu-sakuru/sakuru-ui/badge" alt="CodeFactor" />
  </a>
</p>

# Sakuru-UI

I will **NOT** provide any help nor advices how to use this on your project, I made this repo public because I feel like some people might use structure, or general idea of my project for their own projects.

**IF YOU DECIDE TO USE THIS, YOU ARE SOLELY RESPONSIBLE FOR IT.**

Current project structure:
```sh
├── CODEOWNERS
├── LICENSE
├── README.md
├── env.d.ts
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── fonts
│   │   ├── img
│   │   └── svg
│   │       └── flags
│   ├── components
│   │   ├── AppFooter
│   │   │   └── AppFooter.vue
│   │   ├── AppHeader
│   │   │   ├── ActionsBar
│   │   │   │   └── ActionsBar.vue
│   │   │   └── AppHeader.vue
│   │   ├── AppModal
│   │   │   └── AppModal.vue
│   │   ├── AppNotification
│   │   │   └── AppNotification.vue
│   │   ├── FormStep
│   │   │   └── FormStep.vue
│   │   ├── HomeContacts
│   │   │   └── HomeContacts.vue
│   │   ├── HomeRecords
│   │   │   └── HomeRecords.vue
│   │   ├── SearchBar
│   │   │   └── SearchBar.vue
│   │   └── UI
│   │       ├── ActionButton.vue
│   │       ├── AppLogo.vue
│   │       ├── FormInput.vue
│   │       ├── LangSwitcher.vue
│   │       ├── SocialButton.vue
│   │       ├── StepIcon.vue
│   │       └── index.ts
│   ├── enums
│   │   └── GameModes.enum.ts
│   ├── interfaces
│   ├── locales
│   │   ├── index.ts
│   │   ├── locales.defaults.ts
│   │   ├── locales.main.ts
│   │   └── src
│   │       ├── de-DE.json
│   │       ├── en-US.json
│   │       ├── tr-TR.json
│   │       └── ua-UA.json
│   ├── main.ts
│   ├── public
│   ├── router
│   │   └── index.ts
│   ├── stores
│   │   ├── meta.ts
│   │   └── user.ts
│   ├── utils.ts
│   └── views
│       ├── HomeLoggedIn.vue
│       ├── HomeView.vue
│       └── RegView.vue
├── tsconfig.config.json
├── tsconfig.json
├── vite.config.ts
└── yarn.lock
```
