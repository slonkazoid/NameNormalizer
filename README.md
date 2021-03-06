# Name Normalizer

Name normalizer bot to prevent unpingable/inappopriate nicknames

## Setup

First, download and install [`git`](https://git-scm.com/) and [`nodejs`](https://nodejs.org/)  
You may want to get a `.deb` package if you're on a debian based distribution, which has an outdated node version [here](https://github.com/nodesource/distributions#deb).  
But both (`git` and `nodejs`) packages are available on most distributions' repositories, including Arch.  
If you are planning to run this on Windows, ~~god help you~~ both packages should have installers. Also reconsider your server choices.

### Instructions

```bash
# You might want to run 'cd Desktop' first
git clone https://github.com/uAliFurkanY/NameNormalizer # clone the repository
cd NameNormalizer # change directory to the repository
npm install # install dependecies
cp .env.default .env # (copy on Windows)
nano .env # fill in the details (use gui alternative notepad on Windows)
node . # start the bot
```

### How do I get a bot token? What is a bot token?

A bot token is the way you authorize bots in Discord. You can visit [Discord Developer Portal](https://discord.com/developers/applications/), create an application and add a bot with "Server Members Intent" permission. Then, copy the token.
