const Engineer = require('../lib/engineer');
const engineer = new Engineer('Sufiyan','6','sufiyan@gmail.com', 'Sufiyan11919');

test('test engineer', () => {
    expect(engineer.name).toBe('Sufiyan');
    expect(engineer.id).toBe('6');
    expect(engineer.email).toBe('sufiyan@gmail.com');
    expect(engineer.github).toBe('Sufiyan11919');
}); 


test('test getName()', () => {
    expect(engineer.getName()).toBe('Sufiyan');
});

test('test getId()', () => {
    expect(engineer.getId()).toBe('6');
});

test('test getEmail()', () => {
    expect(engineer.getEmail()).toBe('sufiyan@gmail.com');
});

test('test getGithub()', () => {
    expect(engineer.getGithub()).toBe('Sufiyan11919');
});

test('test getRole()', () => {
    expect(engineer.getRole()).toBe('Engineer');
});