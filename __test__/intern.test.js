const Intern = require('../lib/intern');
const intern = new Intern('Sufiyan','2','sufiyan@gmail.com', 'AB High School');


test('test Intern', () => {
    expect(intern.name).toBe('Sufiyan');
    expect(intern.id).toBe('2');
    expect(intern.email).toBe('sufiyan@gmail.com');
    expect(intern.school).toBe('AB High School');
}); 


test('test getName()', () => {
    expect(intern.getName()).toBe('Sufiyan');
});

test('test getId()', () => {
    expect(intern.getId()).toBe('2');
});

test('test getEmail()', () => {
    expect(intern.getEmail()).toBe('sufiyan@gmail.com');
});

test('test getSchool()', () => {
    expect(intern.getSchool()).toBe('AB High School');
});

test('test getRole()', () => {
    expect(intern.getRole()).toBe('Intern');
})