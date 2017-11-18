export class ServerRequestsUrls {
  public static Url = 'http://2.92.77.228:8080/';
  public static Download =  ServerRequestsUrls.Url + 'getSong?id=';
  public static Novelties = ServerRequestsUrls.Url + 'getMetadataOfNewSongs';
  public static Top = ServerRequestsUrls.Url + 'getMetadataOfPopularSongs';
}

