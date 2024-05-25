import {
  combineDateAndTime,
  computeChargeTimeInMinutes,
  computeExitDateTime,
  getChargerSpeed,
  getNextDay,
  getReplacement,
  hasEnoughBalance,
  providesEnoughCharge,
  startsOnTheSameDay,
  toInterval,
} from "../utils/booking-utils";

describe("calculateChargeTimeInMinutes tests", () => {
  it("given initial charge of 20, desired charge of 70, charger speed of 22kW and battery capacity of 90kWh, calculateChargeTimeInMinutes should return 122.72727272727272", () => {
    expect(computeChargeTimeInMinutes(20, 70, 22, 90)).toBe(122.72727272727272);
  });
  it("given initial charge of 20, desired charge of 70, charger speed of 44kW and battery capacity of 90kWh, calculateChargeTimeInMinutes should return 61.36363636363636", () => {
    expect(computeChargeTimeInMinutes(20, 70, 44, 90)).toBe(61.36363636363636);
  });
});

describe("computeExitDateTime tests", () => {
  it("given arrival date-time of 22/03/2023 at 12:00 and charge time of 30 minutes, computeExitDateTime should return 22/03/2023, 12:30", () => {
    const arrivalDateTime = new Date(2023, 3, 22, 12, 0);
    const chargeTime = 30;
    const exitDateTime = new Date(2023, 3, 22, 12, 30);
    expect(computeExitDateTime(arrivalDateTime, chargeTime)).toStrictEqual(
      exitDateTime
    );
  });
  it("given arrival date-time of 22/08/2022 at 23:30 and charge time of 40 minutes, computeExitDateTime should return 23/08/2023, 00:10", () => {
    const arrivalDateTime = new Date(2022, 8, 22, 23, 30);
    const chargeTime = 40;
    const exitDateTime = new Date(2022, 8, 23, 0, 10);
    expect(computeExitDateTime(arrivalDateTime, chargeTime)).toStrictEqual(
      exitDateTime
    );
  });
});

describe("getChargerSpeed tests", () => {
  it("given a charger with id GB*ESB*E2218*3910 and a station, getChargerSpeed should return 45", () => {
    const id = "GB*ESB*E2218*3910";
    const station = {
      address: "Outside 21 Pall Mall",
      evses: [
        {
          connectors: [
            {
              id: "GB*ESB*E2218*3908",
              power: 50,
            },
          ],
        },
        {
          connectors: [
            {
              id: "GB*ESB*E2218*3910",
              power: 45,
            },
          ],
        },
      ],
    };
    expect(getChargerSpeed(station, id)).toBe(45);
  });
});

describe("combineDateAndTime tests", () => {
  it("given a date-time object 28/08/2022 7:00 and 20/08/2022 11:00, combineDateAndTime should return a date-time object 28/08/2022 11:00", () => {
    const date = new Date(2022, 8, 28, 7, 0);
    const time = new Date(2022, 8, 20, 11, 0);
    const combined = new Date(2022, 8, 28, 11, 0);
    expect(combineDateAndTime(date, time)).toStrictEqual(combined);
  });
});

describe("hasEnoughBalance tests", () => {
  it("given a balance of 5 pounds, hasEnoughBalance should return true", () => {
    expect(hasEnoughBalance(5)).toBeTruthy();
  });
  it("given a balance of 1 pound, hasEnoughBalance should return true", () => {
    expect(hasEnoughBalance(1)).toBeTruthy();
  });
  it("given a balance of 0 pounds, hasEnoughBalance should return true", () => {
    expect(hasEnoughBalance(0)).toBeFalsy();
  });
});

describe("toInterval tests", () => {
  it("given two dates, toInterval should return an interval object specifying start and end", () => {
    const startDate = new Date(2022, 8, 28, 7, 0);
    const endDate = new Date(2022, 8, 28, 9, 30);
    const interval = { start: startDate, end: endDate };
    expect(toInterval(startDate, endDate)).toStrictEqual(interval);
  });
});

describe("startsOnTheSameDay tests", () => {
  const replacementStateSame = new Date(2022, 8, 28, 7, 0);
  const desiredArrivalSame = new Date(2022, 8, 28, 9, 30);
  const replacementStateDifferent = new Date(2022, 8, 28, 7, 0);
  const desiredArrivalDifferent = new Date(2022, 8, 29, 19, 0);
  it("given two dates with matching day, month and year, startsOnTheSameDay should return true", () => {
    expect(
      startsOnTheSameDay(replacementStateSame, desiredArrivalSame)
    ).toBeTruthy();
  });
  it("given two dates with non-matching day, month and year, startsOnTheSameDay should return false", () => {
    expect(
      startsOnTheSameDay(replacementStateDifferent, desiredArrivalDifferent)
    ).toBeFalsy();
  });
});

describe("providesEnoughCharge tests", () => {
  const usableBattery = 90;
  const chargerSpeed = 50;
  const startDateEnough = new Date(2022, 8, 28, 7, 0);
  const endDateEnough = new Date(2022, 8, 28, 10, 30);
  const intervalEnough = { start: startDateEnough, end: endDateEnough };
  const startDateLittle = new Date(2022, 8, 28, 7, 0);
  const endDateLittle = new Date(2022, 8, 28, 7, 10);
  const intervalLittle = { start: startDateLittle, end: endDateLittle };
  it("given a slot that provides the given EV model with >= 20% charge, providesEnoughCharge should return true", () => {
    expect(
      providesEnoughCharge(usableBattery, chargerSpeed, intervalEnough)
    ).toBeTruthy();
  });
  it("given a slot that provides the given EV model with < 20% charge, providesEnoughCharge should return false", () => {
    expect(
      providesEnoughCharge(usableBattery, chargerSpeed, intervalLittle)
    ).toBeFalsy();
  });
});

describe("getNextDay tests", () => {
  const today = new Date(2022, 8, 14);
  const tomorrow = new Date(2022, 8, 15);
  it("given a date 14/08/2022, getNextDay should return the next day (15/08/2022)", () => {
    expect(getNextDay(today)).toStrictEqual(tomorrow);
  });
});

describe("getReplacement tests", () => {
  const chargeTimeInMinutes = 30;
  const noSlots = [];
  const slots = [
    {
      start: new Date(2022, 10, 7, 10, 45),
      end: new Date(2022, 10, 7, 11, 30),
    },
    {
      start: new Date(2022, 10, 10, 7, 0),
      end: new Date(2022, 10, 10, 11, 30), // Buffer taken into account
    },
  ];
  const slotsDesiredDurationCannotFit = [
    {
      start: new Date(2022, 10, 10, 6, 0),
      end: new Date(2022, 10, 10, 7, 10), // Buffer taken into account
    },
    {
      start: new Date(2022, 10, 10, 7, 50),
      end: new Date(2022, 10, 10, 9, 0), // Buffer taken into account
    },
    {
      start: new Date(2022, 10, 10, 12, 10),
      end: new Date(2022, 10, 10, 12, 30),
    },
  ];
  const slotsNoOverlap = [
    {
      start: new Date(2022, 10, 6, 6, 0),
      end: new Date(2022, 10, 6, 7, 10), // Buffer taken into account
    },
  ];
  const userTarget = toInterval(
    new Date(2022, 10, 10, 7, 0),
    new Date(2022, 10, 10, 8, 10) // Buffer taken into account
  );
  const nextSlotWithDesiredDuration = {
    start: new Date(2022, 10, 10, 11, 30),
    end: new Date(2022, 10, 10, 12, 0),
  };
  const anyAvailable = {
    start: new Date(2022, 10, 10, 7, 10),
    end: new Date(2022, 10, 10, 7, 40), // And buffer will be applied on top
  };
  it("given an array with no slots, getReplacement should return null", () => {
    expect(getReplacement(noSlots, userTarget, chargeTimeInMinutes)).toBeNull();
  });
  it("given an array with no overlapping slots, getReplacement should return null", () => {
    expect(
      getReplacement(slotsNoOverlap, userTarget, chargeTimeInMinutes)
    ).toBeNull();
  });
  it("given an array of overlapping slots but with enough time to account for user's desired charge duration, getReplacement should return the first available one considering the duration", () => {
    expect(
      getReplacement(slots, userTarget, chargeTimeInMinutes)
    ).toStrictEqual(nextSlotWithDesiredDuration);
  });
  it("given an array of overlapping slots with not enough time for a full charge, getReplacement should return any slot", () => {
    expect(
      getReplacement(
        slotsDesiredDurationCannotFit,
        userTarget,
        chargeTimeInMinutes
      )
    ).toStrictEqual(anyAvailable);
  });
});
