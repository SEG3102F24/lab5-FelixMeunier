export class Employee {
  constructor(
    public name: string,
    public dateOfBirth: Date | null,
    public city: string,
    public salary: number,
    public id?: string,
    public gender?: string,
    public email?: string
  ) {}
}
