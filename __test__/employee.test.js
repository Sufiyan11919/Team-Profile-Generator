const Employee = require('../lib/employee');
const employee = new Employee('Sufiyan','1','sufiyan@gmail.com');
test('test for employee', () => {
    expect(employee.name).toBe('Sufiyan');
    expect(employee.id).toBe('1');
    expect(employee.email).toBe('sufiyan@gmail.com');
});

test('test for getName()', () => {
    expect(employee.getName()).toBe('Sufiyan');
});

test('test for getId()', () => {
    expect(employee.getId()).toBe('1');
});

test('test for getEmail()', () => {
    expect(employee.getEmail()).toBe('sufiyan@gmail.com');
});

test('test for getRole()', () => {
    expect(employee.getRole()).toBe('Employee');
});