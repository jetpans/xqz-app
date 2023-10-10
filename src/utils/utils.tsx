export default function getRoute(serverURL: string, route: string) {
  return "http://" + serverURL + "/" + route;
}
