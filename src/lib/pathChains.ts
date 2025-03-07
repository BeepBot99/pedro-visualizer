export type Point = { x: number; y: number };
export type Waypoint = {
  point: Point;
  handleBefore?: Point;
  handleAfter?: Point;
  smooth: boolean;
};

export type StartPoint = Omit<Waypoint, "handleBefore" | "smooth"> & {
  handleBefore?: undefined;
  smooth: false;
};

export type EndPoint = Omit<Waypoint, "handleAfter" | "smooth"> & {
  handleAfter?: undefined;
  smooth: false;
};

export type PathChain = {
  startPoint: StartPoint;
  endPoint: EndPoint;
  waypoints: Waypoint[];
};
