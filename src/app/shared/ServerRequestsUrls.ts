export class ServerRequestsUrls {
  public static Url = 'http:2.92.100.113:8080/';
  public static Download = ServerRequestsUrls.Url + 'getSong?id=';
  public static Novelties = ServerRequestsUrls.Url + 'getMetadataOfNewSongs';
  public static Top = ServerRequestsUrls.Url + 'getMetadataOfPopularSongs';
  public static Add = ServerRequestsUrls.Url + 'addSong';
  public static Search = ServerRequestsUrls.Url + 'searchSongs?searchString=';
}
