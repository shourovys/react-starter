// This file has intentional errors to test pre-commit validation
const testBadCode = () => {
  const badVariable = 'this should use const or let';
  console.lg('This should not be in production code');
  console.log('Multiple console.logs');
  // Missing semicolon
  return badVariable;
};

export default testBadCode;
