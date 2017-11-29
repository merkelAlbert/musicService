export class ServerRequestsUrls {
  public static Url = 'http://10.254.5.229:8080/';
  public static Listen = ServerRequestsUrls.Url + 'getSong?download=false&id=';
  public static Download = ServerRequestsUrls.Url + 'getSong?download=true&id=';
  public static Novelties = ServerRequestsUrls.Url + 'getMetadataOfNewSongs';
  public static Top = ServerRequestsUrls.Url + 'getMetadataOfPopularSongs';
  public static Add = ServerRequestsUrls.Url + 'addSong';
  public static Search = ServerRequestsUrls.Url + 'searchSongs?searchString=';
}
