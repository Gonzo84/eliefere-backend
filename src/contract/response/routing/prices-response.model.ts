import { prices } from '../../../config/prices';
import { IPrice } from '../..';

export class PricesResponse {
  prices: IPrice[];

  constructor(distances: any[]) {
    this.prices = distances.map((data) => {
      const { type } = data;
      let { distance } = data.data.routes[0];
      distance = PricesResponse.convertMetersToKm(distance);
      const price = PricesResponse.calculatePriceByDistance(distance, type);
      return {
        type,
        price,
        distance,
      };
    });
    const carDistance = this.prices[2].distance;
    this.prices.push.apply(this.prices, [{
      type: 'big_car',
      price: PricesResponse.calculatePriceByDistance(carDistance, 'big_car'),
      distance: carDistance,
    }, {
      type: 'van',
      price: PricesResponse.calculatePriceByDistance(carDistance, 'van'),
      distance: carDistance,
    }, {
      type: 'truck',
      price: PricesResponse.calculatePriceByDistance(carDistance, 'truck'),
      distance: carDistance,
    }]);
  }

  private static calculatePriceByDistance(distance, type): number {
    const { coefficient } = prices[type];
    const { start } = prices;
    let difference = 0;
    const higherTariff = prices.higherTariff * distance;
    if (distance > 2) {
      difference = (distance - 2) * (prices.higherTariff - prices.lowerTariff);
    }
    return parseFloat(((start + higherTariff - difference) * coefficient).toFixed(2));
  }

  private static convertMetersToKm(meters: number): number {
    return parseFloat((meters / 1000).toFixed(1));
  }
}
