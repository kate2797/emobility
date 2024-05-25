import {
  emailHasErrors,
  passwordIsTooShort,
  someFieldsAreMissing,
} from "../utils/auth-utils";

describe("emailHasErrors tests", () => {
  it("given email without @ in it, emailHasErrors should return true", () => {
    expect(emailHasErrors("hello")).toBeTruthy();
  });
  it("given email with @ in it, emailHasErrors should return false", () => {
    expect(emailHasErrors("kent.dodds@gmail.com")).toBeFalsy();
  }); // Helped fix the logic of how error-handling was done, before I was using an empty string, but I should have had just not run the computation
  it("given an empty string as an email, emailHasErrors should return undefined", () => {
    expect(emailHasErrors("")).toBeUndefined(); // The function returns early if it encounters an empty string
  });
});

describe("passwordIsTooShort tests", () => {
  it("given a password of length 3, passwordIsTooShort should return true", () => {
    expect(passwordIsTooShort("123")).toBeTruthy();
  });
  it("given a password of length 6, passwordIsTooShort should return false", () => {
    expect(passwordIsTooShort("123456")).toBeFalsy(); // >= 6 is a pass
  }); // Was not passing before
  it("given an empty string as a password, passwordIsTooShort should return undefined", () => {
    expect(passwordIsTooShort("")).toBeUndefined(); // The function returns early if it encounters an empty string
  });
});

describe("someFieldsAreMissing tests", () => {
  it("given the parameters `Tesla` and an empty string, someFieldsAreMissing should return true", () => {
    expect(someFieldsAreMissing("Tesla", "")).toBeTruthy();
  });
  it("given the parameters `Tesla` and `Alice Smith`, someFieldsAreMissing should return false", () => {
    expect(someFieldsAreMissing("Tesla", "Alice Smith")).toBeFalsy();
  });
});
