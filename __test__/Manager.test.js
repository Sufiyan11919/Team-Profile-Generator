const Manager = require('../lib/manager');
const manager = new Manager('Sufiyan','100','sufiyan@gmail.com', '9898988989');


test('test manager', () => {
    expect(manager.name).toBe('Sufiyan');
    expect(manager.id).toBe('100');
    expect(manager.email).toBe('sufiyan@gmail.com');
}); 


test('test getName()', () => {
    expect(manager.getName()).toBe('Sufiyan');
});

test('test getId()', () => {
    expect(manager.getId()).toBe('100');
});

test('test getEmail()', () => {
    expect(manager.getEmail()).toBe('sufiyan@gmail.com');
});


test('test getRole()', () => {
    expect(manager.getRole()).toBe('Manager');
});