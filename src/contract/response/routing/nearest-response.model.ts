import { IStreetData } from '../..';

export class NearestResponse {
  nearest: IStreetData[];

  constructor(nearest: any) {
    const streetNames: string[] = [];
    this.nearest = nearest.waypoints.reduce((filtered, waypoint) => {
      if (waypoint.name !== '' && !streetNames.includes(waypoint.name)) {
        streetNames.push(waypoint.name);
        const streetData: IStreetData = {
          name: waypoint.name,
          location: waypoint.location,
          distance: waypoint.distance,
        };
        filtered.push(streetData);
      }
      return filtered;
    }, []);
  }
}
