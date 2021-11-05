module.exports = {
  branches: ['main'],
  repositoryUrl: 'git@github.com:StewardBot/starter-typescript.git',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
  ],
};
