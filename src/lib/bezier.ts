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
