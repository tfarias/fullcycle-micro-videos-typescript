import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

const spyValidation = () => {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
};
describe("UniqueEntityId Unit Tests", () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });
  const validateSpy = spyValidation();

  beforeEach(() => {
    validateSpy.mockClear();
  });

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "59eb0077-a0f5-4cf4-8256-3a11b2845190";
    const valueObject = new UniqueEntityId(uuid);
    expect(valueObject.id).toEqual(uuid);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should accept a uuid not passed in constructor and return a valid uuid", () => {
    const valueObject = new UniqueEntityId();
    expect(uuidValidate(valueObject.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
