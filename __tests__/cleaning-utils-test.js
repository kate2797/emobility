import {
  handleNullProperties,
  removeMakeDuplicates,
} from "../utils/cleaning-utils";

describe("handleNullProperties tests", () => {
  it("given a station with all fields null, handleNullProperties should return everything that is in the fallback station", () => {
    const fallback = {
      name: "Currie Motors",
      speed: "turbo",
      status: "free",
      address: "100 Tachbrook Street",
      city: "London",
      parking_type: "ON_STREET",
      operator: { name: "Ubitricity" },
      evses: [
        {
          last_updated: "2022-07-21T00:29:18Z",
          connectors: [
            {
              id: "118496-1",
              standard: "IEC_62196_T2_COMBO",
              power: 150,
              power_type: "DC",
            },
          ],
        },
      ],
    };
    const toBeCleaned = {
      name: null,
      speed: null,
      status: null,
      address: null,
      city: null,
      parking_type: null,
      operator: null,
      evses: null,
    };
    expect(handleNullProperties(toBeCleaned, fallback)).toStrictEqual(fallback);
  });
});

describe("removeMakeDuplicates tests", () => {
  it("given a list of cars with duplicate makes, removeMakeDuplicates should return a car list with no make duplicates", () => {
    const carListWithDuplicates = [
      {
        id: "5d161befc9eef48216d9d228",
        naming: {
          make: "Kia",
          model: "Soul EV",
        },
      },
      {
        id: "600e964a5fc2ee68bcb1f183",
        naming: {
          make: "Kia",
          model: "e-Niro",
        },
      },
      {
        id: "5f043dcabc262f1627fc0345",
        naming: {
          make: "Skoda",
          model: "Enyaq iV",
        },
      },
    ];
    const carListWithUniqueMakes = [
      {
        id: "5d161befc9eef48216d9d228",
        naming: { make: "Kia", model: "Soul EV" },
      },
      {
        id: "5f043dcabc262f1627fc0345",
        naming: { make: "Skoda", model: "Enyaq iV" },
      },
    ];
    expect(removeMakeDuplicates(carListWithDuplicates)).toStrictEqual(
      carListWithUniqueMakes
    );
  });
});
