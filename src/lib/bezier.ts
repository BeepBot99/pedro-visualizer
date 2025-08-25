import type { PathChain, Point, Waypoint } from "$lib/pathChains";

export function pathChainToCubicBezierChain(pathChain: PathChain): Point[] {
  const points: Point[] = [pathChain.startPoint.point];
  const waypoints: Waypoint[] = [pathChain.startPoint, ...pathChain.waypoints, pathChain.endPoint];
  for (let i = 0; i < waypoints.length - 1; i++) {
    points.push(...waypointsToCubicBezier(waypoints[i], waypoints[i + 1]));
  }
  return points;
}

function waypointsToCubicBezier(startWaypoint: Waypoint, endWaypoint: Waypoint): Point[] {
  const points: Point[] = [];
  if (startWaypoint.handleAfter && endWaypoint.handleBefore) {
    points.push(startWaypoint.handleAfter, endWaypoint.handleBefore, endWaypoint.point);
  } else if (startWaypoint.handleAfter || endWaypoint.handleBefore) {
    const handle = startWaypoint.handleAfter || (endWaypoint.handleBefore as Point);
    points.push(
      ...quadraticToCubicBezier(startWaypoint.point, handle, endWaypoint.point),
      endWaypoint.point
    );
  } else {
    points.push(startWaypoint.point, endWaypoint.point, endWaypoint.point);
  }
  return points;
}

function quadraticToCubicBezier(startPoint: Point, controlPoint: Point, endPoint: Point): Point[] {
  return [
    {
      x: startPoint.x + (2 / 3) * (controlPoint.x - startPoint.x),
      y: startPoint.y + (2 / 3) * (controlPoint.y - startPoint.y)
    },
    {
      x: endPoint.x + (2 / 3) * (controlPoint.x - endPoint.x),
      y: endPoint.y + (2 / 3) * (controlPoint.y - endPoint.y)
    }
  ];
}

export function cubicBezierChainLength(points: Point[]): number {
  let length = 0;
  for (let i = 0; i < points.length - 3; i += 3) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const p2 = points[i + 2];
    const p3 = points[i + 3];
    length += cubicBezierLength(p0, p1, p2, p3);
  }
  return length;
}

function cubicBezierLength(p0: Point, p1: Point, p2: Point, p3: Point): number {
  const STEPS = 100;
  const STEP = 1 / STEPS;

  let length = 0;
  for (let t1 = 0; t1 < 1; t1 += STEP) {
    const t2 = t1 + STEP;

    const x1 = (1 - t1) ** 3 * p0.x + 3 * (1 - t1) ** 2 * t1 * p1.x + 3 * (1 - t1) * t1 * p2.x + t1 ** 3 * p3.x;
    const y1 = (1 - t1) ** 3 * p0.y + 3 * (1 - t1) ** 2 * t1 * p1.y + 3 * (1 - t1) * t1 * p2.y + t1 ** 3 * p3.y;
    const x2 = (1 - t2) ** 3 * p0.x + 3 * (1 - t2) ** 2 * t2 * p1.x + 3 * (1 - t2) * t2 * p2.x + t2 ** 3 * p3.x;
    const y2 = (1 - t2) ** 3 * p0.y + 3 * (1 - t2) ** 2 * t2 * p1.y + 3 * (1 - t2) * t2 * p2.y + t2 ** 3 * p3.y;

    const segmentLength = Math.hypot(x2 - x1, y2 - y1);
    length += segmentLength;
  }
  return length;
}