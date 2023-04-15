<p align="center"><a href="https://www.codefactor.io/repository/github/osu-sakuru/sakuru-ui"><img src="https://www.codefactor.io/repository/github/osu-sakuru/sakuru-ui/badge" alt="CodeFactor" /></a></p>
# Sakuru-UI

I will **NOT** provide any help nor advices how to use this on your project, I made this repo public because I feel like some people might use structure, or general idea of my project for their own projects.

**IF YOU DECIDE TO USE THIS, YOU ARE SOLELY RESPONSIBLE FOR IT.**

Current project structure:
```sh
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
│   │   ├── HomeContacts
│   │   │   └── HomeContacts.vue
│   │   ├── HomeRecords
│   │   │   └── HomeRecords.vue
│   │   └── UI
│   │       ├── ActionButton.vue
│   │       ├── LangSwitcher.vue
│   │       ├── SocialButton.vue
│   │       └── index.ts
│   ├── interfaces
│   ├── locales
│   │   ├── index.ts
│   │   ├── locales.defaults.ts
│   │   ├── locales.main.ts
│   │   └── src
│   │       ├── en-US.json
│   │       ├── tr-TR.json
│   │       └── ua-UA.json
│   ├── main.ts
│   ├── router
│   │   └── index.ts
│   ├── stores
│   │   └── user.ts
│   └── views
│       ├── HomeLoggedIn.vue
│       └── HomeView.vue
├── tsconfig.config.json
├── tsconfig.json
├── vite.config.ts
└── yarn.lock
```
