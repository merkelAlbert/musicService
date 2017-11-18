export class ServerResponses {
  public static Url = 'http://2.92.77.228:8080/';
  public static Download =  ServerResponses.Url + 'getSong?id=';
  public static Novelties = ServerResponses.Url + 'getMetadataOfNewSongs';
  public static Top = ServerResponses.Url + 'getMetadataOfPopularSongs';
}
