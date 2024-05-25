/**
 * A custom hook that mimics the logic of retrieving EVs from Chargetrip (the project uses static data for now).
 */
export default function useCarListAll() {
  const response = {
    data: {
      carList: [
        {
          id: "605298d0ecbb3a98c4c8e1c1",
          naming: {
            make: "BMW",
            model: "iX",
          },
          connectors: [
            {
              standard: "IEC_62196_T2",
            },
            {
              standard: "IEC_62196_T2_COMBO",
            },
          ],
          battery: {
            usable_kwh: 105.2,
            full_kwh: 111.5,
          },
        },
        {
          id: "600e964a5fc2ee68bcb1f183",
          naming: {
            make: "Kia",
            model: "e-Niro",
          },
          connectors: [
            {
              standard: "IEC_62196_T2",
            },
            {
              standard: "IEC_62196_T2_COMBO",
            },
          ],
          battery: {
            usable_kwh: 64,
            full_kwh: 67.5,
          },
        },
        {
          id: "5d161befc9eef48216d9d228",
          naming: {
            make: "Kia",
            model: "Soul EV",
          },
          connectors: [
            {
              standard: "IEC_62196_T1",
            },
            {
              standard: "CHADEMO",
            },
          ],
          battery: {
            usable_kwh: 30,
            full_kwh: 33,
          },
        },
        {
          id: "5f043c7bbc262f1627fc02b9",
          naming: {
            make: "Nissan",
            model: "Leaf",
          },
          connectors: [
            {
              standard: "IEC_62196_T2",
            },
            {
              standard: "CHADEMO",
            },
          ],
          battery: {
            usable_kwh: 56,
            full_kwh: 62,
          },
        },
        {
          id: "5f043dcabc262f1627fc0345",
          naming: {
            make: "Skoda",
            model: "Enyaq iV",
          },
          connectors: [
            {
              standard: "IEC_62196_T2",
            },
            {
              standard: "IEC_62196_T2_COMBO",
            },
          ],
          battery: {
            usable_kwh: 77,
            full_kwh: 82,
          },
        },
      ],
    },
  };
  const carListAll = response.data.carList;

  return [carListAll];
}
