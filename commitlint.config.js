export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Commit message format rules
    'header-min-length': [2, 'always', 10],
    'header-max-length': [2, 'always', 72],

    // Type rules
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // new feature
        'fix', // bug fix
        'docs', // documentation changes
        'style', // code style changes (formatting, etc.)
        'refactor', // code refactoring
        'test', // adding tests
        'chore', // build process or auxiliary tool changes
        'perf', // performance improvements
        'ci', // CI configuration changes
        'build', // build system changes
        'revert', // revert previous commit
        'wip', // work in progress
      ],
    ],

    // Subject rules
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'never', ['upper-case', 'sentence-case']],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 72],

    // Body rules
    'body-leading-blank': [1, 'always'],
    'body-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100],

    // Footer rules
    'footer-leading-blank': [1, 'always'],
    'footer-max-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
  },
  prompt: {
    messages: {
      skip: ': skip',
      max: 'upper %d chars',
      min: '%d chars is the minimum',
      lowerWarning: 'the lower case is not used in the header',
      upperWarning: 'the upper case is not used in the body',
      lowerWarningAmend: 'the lower case is not used for the body',
      upperWarningAmend:
        'the upper case is not used for the body (commit message without length change)',
    },
    questions: {
      type: 'Select the type of change that your commit represents:',
      scope:
        'What is the scope of this change (e.g. component or file name): (press enter to skip)',
      subject:
        'Write a short, imperative description of the change (press enter to skip)',
      body: 'Provide a longer description of the change (press enter to skip)',
      breaking: 'Are there any breaking changes? (y/n)',
      footer:
        'List any breaking changes or issue numbers (press enter to skip).',
    },
    useConventionalCommits: true,
  },
};
